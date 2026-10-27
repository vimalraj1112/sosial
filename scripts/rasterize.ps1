# Rasterises the vector artwork into the poster / OG images and renders the
# placeholder showreel with ffmpeg.
#
# These assets are ORIGINAL, generated from scripts/generate-assets.mjs.
# They are placeholders for the client's real photography and film.

$ErrorActionPreference = "Continue"
$root = Split-Path -Parent $PSScriptRoot
$images = Join-Path $root "public/assets/images"
$videos = Join-Path $root "public/assets/videos"
$brand = Join-Path $root "public/assets/brand"
$tmp = Join-Path $env:TEMP "sosial-assets"

New-Item -ItemType Directory -Force -Path $videos, $tmp | Out-Null

$chrome = @(
  "C:\Program Files\Google\Chrome\Application\chrome.exe",
  "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
  "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $chrome) { throw "Chrome is required to rasterise the artwork." }

function Screenshot([string]$source, [string]$target, [int]$width, [int]$height) {
  $url = "file:///" + ($source -replace '\\', '/')
  $arguments = @(
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--window-size=$width,$height",
    "--screenshot=$target",
    $url
  )
  Start-Process -FilePath $chrome -ArgumentList $arguments -Wait -NoNewWindow `
    -RedirectStandardError (Join-Path $tmp "chrome.err") -RedirectStandardOutput (Join-Path $tmp "chrome.out")
  if (-not (Test-Path $target)) { throw "Screenshot failed for $source" }
}

Write-Host "Rasterising hero frame..."
Screenshot (Join-Path $images "hero-frame.svg") (Join-Path $tmp "hero.png") 1920 1080

Write-Host "Rasterising social card..."
Screenshot (Join-Path $images "og.svg") (Join-Path $brand "og.png") 1200 630

Write-Host "Encoding poster..."
& ffmpeg -y -loglevel error -i (Join-Path $tmp "hero.png") -c:v libwebp -quality 84 (Join-Path $images "hero-poster.webp") 2>&1 | Out-Null

Write-Host "Rendering 10s showreel (this can take a minute)..."
& ffmpeg -y -loglevel error -loop 1 -i (Join-Path $tmp "hero.png") -t 10 `
  -vf "zoompan=z='min(zoom+0.00045,1.12)':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30,noise=alls=5:allf=t+u,vignette=PI/5,format=yuv420p" `
  -an -c:v libx264 -preset medium -crf 30 -profile:v high -movflags +faststart `
  (Join-Path $videos "sosial-hero.mp4") 2>&1 | Out-Null

Write-Host "Encoding WebM alternative..."
& ffmpeg -y -loglevel error -i (Join-Path $videos "sosial-hero.mp4") -an -c:v libvpx-vp9 -crf 38 -b:v 0 -row-mt 1 `
  (Join-Path $videos "sosial-hero.webm") 2>&1 | Out-Null

Get-ChildItem $videos, (Join-Path $images "hero-poster.webp"), (Join-Path $brand "og.png") |
  Select-Object Name, @{N = "KB"; E = { [math]::Round($_.Length / 1KB) } }

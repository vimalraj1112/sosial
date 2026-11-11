/**
 * Tracks the splash intro's lifecycle for anything that animates on the first
 * paint (the hero headline typewriter, for example).
 *
 * Anything that types itself out must not start while the splash still covers
 * the page: Chrome keeps the first raster of those glyphs and can leave them
 * unfilled once the overlay lifts. Waiting for this flag means the first
 * characters are painted on an unobstructed page.
 *
 * Consumed through `useSyncExternalStore`, so a component that mounts after the
 * splash has already gone still gets the right answer immediately.
 */
type Listener = () => void;

let introComplete = false;
let watchdog: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<Listener>();

function publish() {
  for (const listener of listeners) listener();
}

export function isIntroComplete() {
  return introComplete;
}

/** Called whenever the intro starts (or replays), so animations can re-gate. */
export function markIntroPlaying() {
  introComplete = false;
  publish();

  // Safety net: if the splash never reports back, let the page type anyway.
  clearTimeout(watchdog);
  watchdog = setTimeout(markIntroComplete, 6000);
}

/** Called once the splash has fully left the screen, or when it is skipped. */
export function markIntroComplete() {
  clearTimeout(watchdog);
  if (introComplete) return;
  introComplete = true;
  publish();
}

/** Subscribe to the moment the intro finishes. Returns an unsubscribe function. */
export function subscribeIntroComplete(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

import Image from "next/image";
import { cn } from "@/lib/utils";

type VisualProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Renders our placeholder vector artwork as a plain image (SVG optimisation
 * would add no value), and switches to next/image automatically for real
 * raster photography dropped in later.
 */
export function Visual({ src, alt, className, imgClassName, priority = false, sizes }: VisualProps) {
  const isVector = src.endsWith(".svg");

  return (
    <div className={cn("relative overflow-hidden bg-paper-deep", className)}>
      {isVector ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
          className={cn("object-cover", imgClassName)}
        />
      )}
    </div>
  );
}

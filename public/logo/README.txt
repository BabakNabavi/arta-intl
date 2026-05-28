Place your final logo files in this folder.

Recommended:
  - logo-dark.svg   (full-color / dark wordmark for light backgrounds — navbar)
  - logo-light.svg  (white wordmark for dark backgrounds — footer / hero)
  - icon.svg        (square mark only)

How to switch from the text wordmark to your image logo:
  1. Drop your files here (e.g. logo-dark.svg, logo-light.svg).
  2. Open src/components/ui/Logo.tsx
  3. Uncomment the <Image> block at the top of the component and set the
     src to "/logo/logo-dark.svg" (and the light variant to
     "/logo/logo-light.svg"). Adjust width/height to your artwork.

Until then, a clean text wordmark ("ARTA TEJARAT") with an SVG mark is shown,
so the site looks complete out of the box.

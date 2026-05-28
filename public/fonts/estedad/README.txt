Place the Estedad Persian font files in this folder.

Required files (woff2 format):
  - Estedad-Regular.woff2
  - Estedad-Medium.woff2
  - Estedad-Bold.woff2

Download Estedad (free, open-source) from:
  https://github.com/aminabedi68/Estedad

The @font-face rules in src/app/globals.css already point to these paths:
  /fonts/estedad/Estedad-Regular.woff2
  /fonts/estedad/Estedad-Medium.woff2
  /fonts/estedad/Estedad-Bold.woff2

The site builds and runs without these files (a system fallback is used),
but adding them gives the Persian (RTL) interface its intended typography.

type Props = { className?: string; animated?: boolean };

/**
 * Abstract "global trade network" graphic — a stylised globe with meridians,
 * dotted trade routes and connection nodes. Pure SVG (no external assets),
 * scales cleanly and reads as international logistics / commerce.
 */
export function WorldGraphic({ className = "", animated = true }: Props) {
  return (
    <svg
      viewBox="0 0 520 520"
      className={className}
      role="img"
      aria-label="Global trade network"
      fill="none"
    >
      <defs>
        <radialGradient id="globeGlow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#2fbecd" stopOpacity="0.20" />
          <stop offset="70%" stopColor="#14a2b4" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#0a1733" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#63d4df" />
          <stop offset="100%" stopColor="#2fbecd" />
        </linearGradient>
      </defs>

      <circle cx="260" cy="260" r="250" fill="url(#globeGlow)" />

      {/* Globe outline */}
      <circle cx="260" cy="260" r="170" stroke="#3a557f" strokeWidth="1.2" opacity="0.55" />

      {/* Meridians */}
      <g stroke="#2f4d86" strokeWidth="1" opacity="0.5">
        <ellipse cx="260" cy="260" rx="170" ry="60" />
        <ellipse cx="260" cy="260" rx="170" ry="115" />
        <ellipse cx="260" cy="260" rx="60" ry="170" />
        <ellipse cx="260" cy="260" rx="115" ry="170" />
      </g>
      <line x1="90" y1="260" x2="430" y2="260" stroke="#2f4d86" strokeWidth="1" opacity="0.5" />
      <line x1="260" y1="90" x2="260" y2="430" stroke="#2f4d86" strokeWidth="1" opacity="0.4" />

      {/* Dotted trade routes (arcs) */}
      <g stroke="url(#routeGrad)" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" opacity="0.9">
        <path d="M150 180 Q 260 60 380 200" />
        <path d="M130 300 Q 280 340 400 250" />
        <path d="M180 380 Q 300 420 360 320" />
      </g>

      {/* Nodes */}
      {[
        [150, 180],
        [380, 200],
        [130, 300],
        [400, 250],
        [180, 380],
        [360, 320],
        [260, 260],
      ].map(([cx, cy], i) => (
        <g key={i}>
          {animated && (
            <circle cx={cx} cy={cy} r="6" fill="#2fbecd" opacity="0.4">
              <animate
                attributeName="r"
                values="6;16;6"
                dur="3s"
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.4;0;0.4"
                dur="3s"
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
          )}
          <circle cx={cx} cy={cy} r="4" fill="#63d4df" />
          <circle cx={cx} cy={cy} r="4" stroke="#eafafb" strokeWidth="1" opacity="0.6" />
        </g>
      ))}
    </svg>
  );
}

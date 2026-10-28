type Props = {
  className?: string;
  // Gradient ids must be unique per SVG on the page
  id: string;
  title?: string;
};

/** Brand crest: crown, maroon shield with gold border and a gold "B" monogram. */
export default function Crest({ className, id, title }: Props) {
  const gold = `${id}-gold`;
  const maroon = `${id}-maroon`;
  return (
    <svg
      viewBox="0 0 100 120"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id={gold} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F3D27A" />
          <stop offset="0.5" stopColor="#C59B27" />
          <stop offset="1" stopColor="#8E6A15" />
        </linearGradient>
        <linearGradient id={maroon} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7A1220" />
          <stop offset="1" stopColor="#3E050D" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${gold})`} strokeWidth="3" strokeLinecap="round">
        <path d="M19 34 C5 30 4 14 15 16 C21 17 20 25 14 24" />
        <path d="M18 60 C4 60 2 76 12 77 C18 77 18 70 13 70" />
        <path d="M81 34 C95 30 96 14 85 16 C79 17 80 25 86 24" />
        <path d="M82 60 C96 60 98 76 88 77 C82 77 82 70 87 70" />
        <path d="M34 106 C40 116 60 116 66 106" />
        <path d="M42 113 C46 118 54 118 58 113" />
      </g>
      <path d="M35 21 L37 7 L44 14 L50 3 L56 14 L63 7 L65 21 Z" fill={`url(#${gold})`} />
      <rect x="34" y="20" width="32" height="5" rx="1.5" fill={`url(#${gold})`} />
      <circle cx="37" cy="6" r="2.2" fill="#F3D27A" />
      <circle cx="50" cy="2.5" r="2.4" fill="#F3D27A" />
      <circle cx="63" cy="6" r="2.2" fill="#F3D27A" />
      <path
        d="M18 28 H82 V62 C82 84 67 99 50 108 C33 99 18 84 18 62 Z"
        fill={`url(#${maroon})`}
        stroke={`url(#${gold})`}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M24 34 H76 V62 C76 80 64 93 50 101 C36 93 24 80 24 62 Z"
        fill="none"
        stroke="#C59B27"
        strokeOpacity="0.55"
        strokeWidth="1.2"
      />
      <text
        x="50"
        y="84"
        textAnchor="middle"
        fontFamily="var(--font-garamond), Georgia, serif"
        fontWeight="700"
        fontSize="54"
        fill={`url(#${gold})`}
        stroke="#3E050D"
        strokeWidth="0.8"
      >
        B
      </text>
    </svg>
  );
}

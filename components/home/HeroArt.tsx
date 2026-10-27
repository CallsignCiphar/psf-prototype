/* Hero background: deep green field, soft light-green glow, topographic contours and a coordinate grid.
   Replaced by the CMS hero image when one is set; the scrim keeps text legible on any image. */
export function HeroArt() {
  const contours = Array.from({ length: 16 }, (_, i) => i);
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <defs>
          <radialGradient id="hg1" cx="82%" cy="8%" r="75%"><stop offset="0" stopColor="#10703a" /><stop offset=".55" stopColor="#04411f" /><stop offset="1" stopColor="#021f10" /></radialGradient>
          <radialGradient id="hg2" cx="10%" cy="100%" r="60%"><stop offset="0" stopColor="#34c77b" stopOpacity=".22" /><stop offset="1" stopColor="#34c77b" stopOpacity="0" /></radialGradient>
          <pattern id="hgrid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#ffffff" strokeOpacity=".05" /></pattern>
        </defs>
        <rect width="1200" height="700" fill="url(#hg1)" />
        <rect width="1200" height="700" fill="url(#hgrid)" />
        <rect width="1200" height="700" fill="url(#hg2)" />
        <g fill="none" stroke="#9fe3bd">
          {contours.map((i) => (
            <path key={i} strokeOpacity={0.05 + (i % 4) * 0.025} strokeWidth="1.2"
              d={`M ${560 + i * 6} ${-40 + i * 4} C ${760 + i * 22} ${80 + i * 18}, ${700 + i * 30} ${260 + i * 22}, ${920 + i * 20} ${360 + i * 16} S ${1180 + i * 8} ${560 + i * 12}, ${1260} ${640 + i * 10}`} />
          ))}
          {contours.slice(0, 9).map((i) => (
            <ellipse key={`e${i}`} cx="980" cy="260" rx={40 + i * 34} ry={24 + i * 22} transform="rotate(-18 980 260)" strokeOpacity={0.06 + (i % 3) * 0.03} strokeWidth="1" />
          ))}
        </g>
        <g fill="#9fe3bd">
          {[[930, 210], [1010, 300], [860, 330], [1090, 180]].map(([x, y], i) => (
            <g key={i}><circle cx={x} cy={y} r="3.5" fillOpacity=".9" /><circle cx={x} cy={y} r="12" fillOpacity=".12" /></g>
          ))}
        </g>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/80 via-brand-950/35 to-transparent" />
    </div>
  );
}

import React from "react";

interface LogoProps {
  className?: string;
  iconSize?: number;
  hideText?: boolean;
  light?: boolean;
  layout?: "horizontal" | "vertical";
  isAr?: boolean;
  dir?: "rtl" | "ltr" | "auto";
}

/**
 * Official Sham360 Brand Icon - Exact match to official brand artwork:
 * - Upper Pin Arch: Royal blue rounded crown framing the globe with clean negative space
 * - Center Globe: Royal blue ocean circle with crisp white continents (North/South America, Europe, Africa, Middle East)
 * - 360° Orbital Swoosh: Dynamic sweeping arc looping from outer-left under the globe up to the airplane
 * - Bottom Pin Tip: Solid royal blue triangular pointer tapering to a sharp bottom tip
 * - Supersonic Jet: Flying top-right at the orbit apex with swept wings and tail assembly
 */
export const LogoIcon: React.FC<{ className?: string; size?: number; light?: boolean }> = ({
  className = "",
  size = 64,
  light = false,
}) => {
  const continentColor = light ? "#0F172A" : "#FFFFFF";

  // Unique IDs for SVG elements
  const idPrefix = React.useId ? React.useId().replace(/:/g, "") : "sham";
  const maskId = `shamGapMask-${idPrefix}`;
  const gradId = `shamBlueGrad-${idPrefix}`;
  const tipGradId = `shamTipGrad-${idPrefix}`;

  const blueStart = light ? "#38BDF8" : "#00B4D8";
  const blueMid = light ? "#0EA5E9" : "#0090FF";
  const blueEnd = light ? "#0284C7" : "#0066FF";
  const tipEnd = light ? "#0369A1" : "#0055D4";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-transform duration-300 hover:scale-105 shrink-0`}
      aria-label="Sham360 Logo Emblem"
    >
      <defs>
        {/* Dynamic Sky-to-Royal Blue Gradient */}
        <linearGradient id={gradId} x1="70" y1="40" x2="170" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={blueStart} />
          <stop offset="50%" stopColor={blueMid} />
          <stop offset="100%" stopColor={blueEnd} />
        </linearGradient>

        {/* Vertical Gradient for Pin Bottom Shield Tip */}
        <linearGradient id={tipGradId} x1="120" y1="120" x2="120" y2="182" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={blueMid} />
          <stop offset="100%" stopColor={tipEnd} />
        </linearGradient>

        {/* Clip path for the Globe Continents (Center at 120, 94, Radius 38) */}
        <clipPath id={`shamGlobeClip-${idPrefix}`}>
          <circle cx="120" cy="94" r="38" />
        </clipPath>

        {/* Negative-space cut mask for the swoosh channel */}
        <mask id={maskId}>
          <rect width="240" height="240" fill="white" />
          {/* Black stroke creates pure transparent gap around the swoosh */}
          <path
            d="M 50 144 C 44 164 80 172 116 152 C 148 135 178 107 195 78"
            fill="none"
            stroke="black"
            strokeWidth="16"
            strokeLinecap="round"
          />
        </mask>
      </defs>

      {/* 1. TOP PIN ARCH (Outer Blue Crown framing the globe with clean white clearance) */}
      <path
        d="M 74 120 A 53 53 0 1 1 164 74"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* 2. SOLID BLUE PIN BOTTOM TIP (Sharp downward shield pointer with gradient) */}
      <path
        d="M 120 182 C 106 164 91 146 84 133 C 102 142 126 135 150 115 C 156 125 141 154 120 182 Z"
        fill={`url(#${tipGradId})`}
        mask={`url(#${maskId})`}
      />

      {/* 3. GLOBE OCEAN CIRCLE (Royal Blue gradient with swoosh mask) */}
      <circle
        cx="120"
        cy="94"
        r="38"
        fill={`url(#${gradId})`}
        mask={`url(#${maskId})`}
      />

      {/* 4. WHITE CONTINENTS INSIDE GLOBE */}
      <g clipPath={`url(#shamGlobeClip-${idPrefix})`} mask={`url(#${maskId})`} fill={continentColor}>
        {/* Greenland */}
        <path d="M 115 63 C 119 62 123 66 120 70 C 116 71 114 67 115 63 Z" />

        {/* North America */}
        <path d="M 90 71 C 95 65 106 66 111 71 C 113 75 108 79 106 82 C 104 86 103 91 99 93 C 95 92 93 88 90 86 C 88 82 86 75 90 71 Z" />
        <path d="M 101 92 C 103 95 101 98 99 101 C 97 101 96 98 98 94 Z" />

        {/* South America */}
        <path d="M 100 102 C 106 103 111 108 109 114 C 107 120 104 126 101 129 C 98 127 100 120 100 114 C 97 110 96 104 100 102 Z" />

        {/* Europe & Scandinavia */}
        <path d="M 124 67 C 127 64 131 67 128 71 C 125 72 122 69 124 67 Z" />
        <path d="M 120 73 C 127 70 134 72 132 78 C 128 80 123 78 120 73 Z" />
        <circle cx="117" cy="71" r="1.5" />

        {/* Africa */}
        <path d="M 123 83 C 130 81 137 84 135 90 C 134 97 135 103 131 109 C 128 114 125 119 123 121 C 121 119 122 110 122 103 C 120 97 119 90 123 83 Z" />
        <circle cx="137" cy="110" r="1.5" />

        {/* Asia & Middle East */}
        <path d="M 134 72 C 142 70 152 76 149 84 C 145 88 137 85 135 80 Z" />
        <path d="M 137 85 C 143 84 150 88 146 94 C 140 93 136 89 137 85 Z" />
        <path d="M 128 81 C 132 81 134 85 130 87 C 128 86 127 83 128 81 Z" />
      </g>

      {/* 5. DYNAMIC 360° ORBITAL SWOOSH (Royal/Cyan Blue Gradient) */}
      <path
        d="M 50 144 C 44 164 80 172 116 152 C 148 135 178 107 195 78"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="6.5"
        strokeLinecap="round"
      />

      {/* 6. SUPERSONIC JET AIRPLANE (Apex of Swoosh) */}
      <g transform="translate(195, 78) rotate(42)">
        <path
          d="M 0 -18 
             C 1.6 -13 2.2 -4 2.2 0 
             L 16 6.5 
             L 16 9 
             L 2.2 6 
             L 2.2 13.5 
             L 7 17.5 
             L 7 19.5 
             L 0 17.5 
             L -7 19.5 
             L -7 17.5 
             L -2.2 13.5 
             L -2.2 6 
             L -16 9 
             L -16 6.5 
             L -2.2 0 
             C -2.2 -4 -1.6 -13 0 -18 Z"
          fill={blueEnd}
        />
      </g>
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  className = "",
  iconSize = 40,
  hideText = false,
  light = false,
  layout = "horizontal",
  isAr,
  dir,
}) => {
  const titleSize = Math.max(iconSize * 0.46, 17);
  const subtitleSize = Math.max(iconSize * 0.22, 9.5);

  const containerDir = dir || (isAr === true ? "rtl" : isAr === false ? "ltr" : undefined);

  // Vertical Stacked Layout (e.g. For Centered Badges or Modals)
  if (layout === "vertical") {
    return (
      <div
        dir={containerDir}
        className={`flex flex-col items-center text-center gap-2 select-none whitespace-nowrap ${className}`}
      >
        <LogoIcon size={iconSize} light={light} />
        {!hideText && (
          <div className="flex flex-col items-center">
            <span
              className={`block font-black tracking-tight font-sans ${
                light ? "text-white" : "text-[#0A1C3E]"
              }`}
              style={{ fontSize: `${titleSize}px`, lineHeight: "1.1" }}
            >
              Sham<span className={light ? "text-[#38BDF8]" : "text-[#0066FF]"}>360</span>
            </span>
            <span
              className={`block font-extrabold tracking-[0.14em] font-sans uppercase ${
                light ? "text-[#38BDF8]" : "text-[#0088EB]"
              }`}
              style={{
                fontSize: `${subtitleSize}px`,
                lineHeight: "1",
                marginTop: "4px",
              }}
            >
              Smart Digital Presence
            </span>
          </div>
        )}
      </div>
    );
  }

  // Horizontal Layout - (Default in Navigation Bars, keeping clean white background)
  return (
    <div
      dir={containerDir}
      className={`flex items-center gap-2.5 sm:gap-3 select-none whitespace-nowrap ${className}`}
    >
      <LogoIcon size={iconSize} light={light} />
      {!hideText && (
        <div className="text-start flex flex-col justify-center">
          <span
            className={`block font-black tracking-tight font-sans ${
              light ? "text-white" : "text-[#0A1C3E]"
            }`}
            style={{ fontSize: `${titleSize}px`, lineHeight: "1.05" }}
          >
            Sham<span className={light ? "text-[#38BDF8]" : "text-[#0066FF]"}>360</span>
          </span>
          <span
            className={`block font-extrabold tracking-[0.12em] font-sans uppercase ${
              light ? "text-[#38BDF8]" : "text-[#0088EB]"
            }`}
            style={{
              fontSize: `${subtitleSize}px`,
              lineHeight: "1",
              marginTop: "2.5px",
            }}
          >
            Smart Digital Presence
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;

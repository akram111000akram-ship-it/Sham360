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

export const LogoIcon: React.FC<{ className?: string; size?: number }> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-transform duration-300 hover:scale-105 shrink-0`}
    >
      <defs>
        <linearGradient id="logoPinGradient" x1="76" y1="82" x2="164" y2="198" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="logoOrbitGradient" x1="76.5" y1="62.5" x2="163.5" y2="62.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="0.5" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <filter id="logoGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2563EB" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Outer Orbiting Circular Path with gap at the top, perfectly concentric and centered at (120, 126) with radius 76 */}
      <path
        d="M 163.5 62.5 A 76 76 0 1 1 76.5 62.5"
        fill="none"
        stroke="url(#logoOrbitGradient)"
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* Stylized Airplane on the Left Orbit end pointing forward along the tangent */}
      <g transform="translate(76.5, 62.5) rotate(55)">
        <path
          d="M 0 -14 L 3 -4 L 14 -2 L 14 1 L 3 0 L 3 8 L 8 11 L 8 13 L 0 11 L -8 13 L -8 11 L -3 8 L -3 0 L -14 1 L -14 -2 L -3 -4 Z"
          fill="#3B82F6"
          stroke="#3B82F6"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </g>

      {/* Main Map Pin Location Icon, mathematically symmetric and centered at (120, 126) */}
      <path
        d="M 120 198 C 76 150 76 126 76 126 A 44 44 0 0 1 164 126 C 164 126 164 150 120 198 Z"
        fill="url(#logoPinGradient)"
        filter="url(#logoGlow)"
      />

      {/* Inner White Circle (Space inside the pin) */}
      <circle cx="120" cy="126" r="22" fill="white" />

      {/* Central Blue Dot */}
      <circle cx="120" cy="126" r="10" fill="#2563EB" />
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
  const titleSize = Math.max(iconSize * 0.45, 16);
  const subtitleSize = Math.max(iconSize * 0.22, 9.5);

  const containerDir = dir || (isAr === true ? "rtl" : isAr === false ? "ltr" : undefined);

  if (layout === "vertical") {
    return (
      <div
        dir={containerDir}
        className={`flex flex-col items-center text-center gap-2 select-none whitespace-nowrap ${className}`}
      >
        <LogoIcon size={iconSize} />
        {!hideText && (
          <div className="flex flex-col items-center">
            <span
              className={`block font-black tracking-tight font-sans ${
                light ? "text-white" : "text-slate-950"
              }`}
              style={{ fontSize: `${titleSize}px`, lineHeight: "1.1" }}
            >
              Sham360
            </span>
            <span
              className={`block font-bold tracking-[0.12em] font-sans ${
                light ? "text-blue-300" : "text-blue-600"
              }`}
              style={{
                fontSize: `${subtitleSize}px`,
                lineHeight: "1",
                marginTop: "4px",
              }}
            >
              SMART DIGITAL PRESENCE
            </span>
          </div>
        )}
      </div>
    );
  }

  // Horizontal layout - respects document direction or explicit dir/isAr
  return (
    <div
      dir={containerDir}
      className={`flex items-center gap-3 sm:gap-3.5 select-none whitespace-nowrap ${className}`}
    >
      <LogoIcon size={iconSize} />
      {!hideText && (
        <div className="text-start flex flex-col justify-center">
          <span
            className={`block font-black tracking-tight font-sans ${
              light ? "text-white" : "text-slate-950"
            }`}
            style={{ fontSize: `${titleSize}px`, lineHeight: "1.1" }}
          >
            Sham360
          </span>
          <span
            className={`block font-bold tracking-[0.08em] font-sans ${
              light ? "text-blue-300" : "text-blue-600"
            }`}
            style={{
              fontSize: `${subtitleSize}px`,
              lineHeight: "1",
              marginTop: "2px",
            }}
          >
            SMART DIGITAL PRESENCE
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;

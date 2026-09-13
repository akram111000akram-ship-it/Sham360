import React from "react";

// ==============================================================================
// High-Fidelity "Real Icon View" Collection for SHAM360 Smart NFC Profiles
// Authentic official brand SVGs, gradients, and tactile executive styling
// ==============================================================================

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * 1. Authentic WhatsApp Icon
 * Official speech bubble geometry with white telephone receiver on iconic emerald gradient
 */
export const RealWhatsappIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 48 48"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="wa-gradient" x1="24" y1="2" x2="24" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#29B356" />
        <stop offset="1" stopColor="#1E9E49" />
      </linearGradient>
      <filter id="wa-shadow" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0F5132" floodOpacity="0.25" />
      </filter>
    </defs>
    {/* Base Circle */}
    <circle cx="24" cy="24" r="22" fill="url(#wa-gradient)" filter="url(#wa-shadow)" />
    {/* Specular Sheen */}
    <path
      d="M24 3C35.0457 3 44 11.9543 44 23C44 23.67 43.966 24.332 43.9 24.986C42.748 14.887 34.295 7 24 7C13.705 7 5.252 14.887 4.1 24.986C4.034 24.332 4 23.67 4 23C4 11.9543 12.9543 3 24 3Z"
      fill="white"
      fillOpacity="0.18"
    />
    {/* Speech Bubble & Phone Handset */}
    <path
      d="M24.05 10C16.34 10 10.08 16.26 10.08 23.97C10.08 26.54 10.78 28.95 12 31.02L10 38L17.2 36.08C19.23 37.21 21.57 37.85 24.05 37.85C31.76 37.85 38.02 31.59 38.02 23.88C38.02 16.17 31.76 10 24.05 10ZM31.11 29.83C30.68 31.04 28.98 32.06 27.61 32.36C26.68 32.56 25.46 32.72 21.37 31.02C16.14 28.85 12.78 23.55 12.52 23.2C12.27 22.86 10.4 20.37 10.4 17.8C10.4 15.23 11.71 13.98 12.23 13.44C12.66 13 13.37 12.8 14.04 12.8C14.26 12.8 14.46 12.81 14.64 12.82C15.17 12.84 15.43 12.88 15.78 13.72C16.22 14.77 17.28 17.37 17.41 17.64C17.55 17.91 17.68 18.28 17.5 18.63C17.33 18.99 17.18 19.16 16.92 19.46C16.66 19.76 16.42 19.99 16.15 20.32C15.91 20.6 15.63 20.91 15.93 21.43C16.23 21.94 17.27 23.63 18.8 24.99C20.78 26.75 22.4 27.32 22.97 27.56C23.4 27.74 23.91 27.7 24.23 27.36C24.63 26.93 25.13 26.21 25.64 25.5C26 24.99 26.46 24.92 26.92 25.1C27.39 25.27 29.89 26.51 30.4 26.77C30.91 27.03 31.25 27.15 31.38 27.37C31.51 27.6 31.51 28.62 31.11 29.83Z"
      fill="white"
    />
  </svg>
);

/**
 * 2. Authentic Cellular Phone / Dialer Icon
 * Vibrant tactile iOS/modern emerald-green dialer with white receiver
 */
export const RealPhoneIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 48 48"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="phone-grad" x1="24" y1="2" x2="24" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#30D158" />
        <stop offset="1" stopColor="#1EAA3E" />
      </linearGradient>
      <filter id="phone-shadow" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#115E26" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#phone-grad)" filter="url(#phone-shadow)" />
    {/* Specular highlight */}
    <path
      d="M24 3C35.0457 3 44 11.9543 44 23C44 23.67 43.966 24.332 43.9 24.986C42.748 14.887 34.295 7 24 7C13.705 7 5.252 14.887 4.1 24.986C4.034 24.332 4 23.67 4 23C4 11.9543 12.9543 3 24 3Z"
      fill="white"
      fillOpacity="0.2"
    />
    <path
      d="M32.95 30.12C31.62 30.12 30.32 29.91 29.1 29.51C28.29 29.24 27.4 29.49 26.85 30.06L24.34 32.57C20.31 30.52 17.47 27.68 15.42 23.65L17.93 21.14C18.51 20.57 18.75 19.69 18.49 18.9C18.09 17.68 17.88 16.38 17.88 15.05C17.88 13.92 16.96 13 15.83 13H12.5C11.37 13 10 13.84 10 15.2C10 26.4 19.6 36 30.8 36C32.16 36 33 24.63 33 23.5V30.17C33 30.12 32.95 30.12 32.95 30.12Z"
      fill="white"
    />
  </svg>
);

/**
 * 3. Authentic Email / Mail Icon
 * Modern vibrant envelope badge with crisp white envelope & red/blue accent
 */
export const RealEmailIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 48 48"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="email-grad" x1="24" y1="2" x2="24" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#007AFF" />
        <stop offset="1" stopColor="#0055D4" />
      </linearGradient>
      <filter id="email-shadow" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#002D73" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#email-grad)" filter="url(#email-shadow)" />
    <path
      d="M24 3C35.0457 3 44 11.9543 44 23C44 23.67 43.966 24.332 43.9 24.986C42.748 14.887 34.295 7 24 7C13.705 7 5.252 14.887 4.1 24.986C4.034 24.332 4 23.67 4 23C4 11.9543 12.9543 3 24 3Z"
      fill="white"
      fillOpacity="0.2"
    />
    <rect x="11" y="15" width="26" height="18" rx="4" fill="white" />
    {/* Envelope lines */}
    <path
      d="M12.5 17L23.16 24.47C23.67 24.83 24.33 24.83 24.84 24.47L35.5 17"
      stroke="#007AFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 4. Authentic Web Browser / Globe Icon
 * Azure deep sea gradient with glowing latitude & longitude meridians
 */
export const RealWebsiteIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 48 48"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="web-grad" x1="24" y1="2" x2="24" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0284C7" />
        <stop offset="1" stopColor="#0369A1" />
      </linearGradient>
      <filter id="web-shadow" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#082F49" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#web-grad)" filter="url(#web-shadow)" />
    <path
      d="M24 3C35.0457 3 44 11.9543 44 23C44 23.67 43.966 24.332 43.9 24.986C42.748 14.887 34.295 7 24 7C13.705 7 5.252 14.887 4.1 24.986C4.034 24.332 4 23.67 4 23C4 11.9543 12.9543 3 24 3Z"
      fill="white"
      fillOpacity="0.2"
    />
    <circle cx="24" cy="24" r="13" stroke="white" strokeWidth="2.2" />
    <path d="M11.5 24H36.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M24 11C28 15 29.5 19.5 29.5 24C29.5 28.5 28 33 24 37C20 33 18.5 28.5 18.5 24C18.5 19.5 20 15 24 11Z"
      stroke="white"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 5. Authentic Google Maps 4-Color Pin
 * The official Google Maps teardrop pin with Red, Yellow, Green, Blue geometry
 */
export const RealGoogleMapsIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 48 48"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="maps-pin-shadow" x="6" y="2" width="36" height="44" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.2" />
      </filter>
    </defs>
    <g filter="url(#maps-pin-shadow)">
      {/* Background White Circular Pill/Backdrop */}
      <circle cx="24" cy="24" r="22" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      {/* Google Maps Authentic Vector Geometry */}
      <g transform="translate(4, 2) scale(0.83)">
        {/* Red Head */}
        <path
          d="M24 6C16.82 6 11 11.82 11 19C11 28.2 24 41 24 41C24 41 37 28.2 37 19C37 11.82 31.18 6 24 6Z"
          fill="#EA4335"
        />
        {/* Blue Accent */}
        <path
          d="M24 6C31.18 6 37 11.82 37 19C37 22.4 35.5 26.2 33 29.8L24 41V6Z"
          fill="#4285F4"
        />
        {/* Green Corner */}
        <path
          d="M24 41L15 29.8C12.5 26.2 11 22.4 11 19H24V41Z"
          fill="#34A853"
        />
        {/* Yellow Accent */}
        <path
          d="M24 6V19H11C11 11.82 16.82 6 24 6Z"
          fill="#FBBC04"
        />
        {/* Red Top Cap */}
        <path
          d="M24 6C20.3 6 17 7.5 14.6 10L24 19L33.4 10C31 7.5 27.7 6 24 6Z"
          fill="#EA4335"
        />
        {/* Center Cutout */}
        <circle cx="24" cy="19" r="6" fill="white" />
      </g>
    </g>
  </svg>
);

/**
 * 6. Authentic Instagram Camera Logo with Official Gradient
 * Purple -> Pink -> Orange official gradient background with white camera outline
 */
export const RealInstagramIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 48 48"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="ig-gradient" x1="5" y1="43" x2="43" y2="5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FED576" />
        <stop offset="0.26" stopColor="#F47133" />
        <stop offset="0.61" stopColor="#BC3081" />
        <stop offset="1" stopColor="#4C63D2" />
      </linearGradient>
      <filter id="ig-shadow" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#701A75" floodOpacity="0.25" />
      </filter>
    </defs>
    <rect x="2" y="2" width="44" height="44" rx="13" fill="url(#ig-gradient)" filter="url(#ig-shadow)" />
    {/* Camera outer body */}
    <rect
      x="12"
      y="12"
      width="24"
      height="24"
      rx="7"
      stroke="white"
      strokeWidth="2.8"
    />
    {/* Camera lens */}
    <circle cx="24" cy="24" r="5.8" stroke="white" strokeWidth="2.8" />
    {/* Flash dot */}
    <circle cx="30.5" cy="17.5" r="1.5" fill="white" />
  </svg>
);

/**
 * 7. Authentic Google "G" 4-Color Logo
 * Official Google Multi-color vector
 */
export const RealGoogleGIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 48 48"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="22" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
    <path
      d="M34.8 24.32C34.8 23.57 34.73 22.84 34.6 22.14H24V26.27H30.06C29.8 27.63 28.98 28.79 27.79 29.56V32.32H31.42C33.54 30.36 34.8 27.61 34.8 24.32Z"
      fill="#4285F4"
    />
    <path
      d="M24 35.33C27.06 35.33 29.63 34.31 31.42 32.32L27.79 29.56C26.78 30.24 25.49 30.65 24 30.65C21.05 30.65 18.55 28.66 17.65 25.98H13.88V28.84C15.69 32.44 19.55 35.33 24 35.33Z"
      fill="#34A853"
    />
    <path
      d="M17.65 25.98C17.42 25.29 17.29 24.55 17.29 23.8C17.29 23.05 17.42 22.31 17.65 21.62V18.76H13.88C13.11 20.29 12.67 22 12.67 23.8C12.67 25.6 13.11 27.31 13.88 28.84L17.65 25.98Z"
      fill="#FBBC05"
    />
    <path
      d="M24 16.95C25.67 16.95 27.16 17.52 28.34 18.66L31.5 15.5C29.62 13.75 27.05 12.27 24 12.27C19.55 12.27 15.69 15.16 13.88 18.76L17.65 21.62C18.55 18.94 21.05 16.95 24 16.95Z"
      fill="#EA4335"
    />
  </svg>
);

/**
 * 8. Authentic 360° Virtual Tour Hologram Icon
 * Ultra-modern 360 viewer with orbital arrows & luminous cyber gradient
 */
export const RealVr360Icon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 48 48"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="vr-grad" x1="24" y1="2" x2="24" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366F1" />
        <stop offset="1" stopColor="#4338CA" />
      </linearGradient>
      <filter id="vr-shadow" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#312E81" floodOpacity="0.25" />
      </filter>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#vr-grad)" filter="url(#vr-shadow)" />
    {/* 360 orbital arrow ellipse */}
    <ellipse cx="24" cy="24" rx="14" ry="7" stroke="#38BDF8" strokeWidth="2.2" strokeDasharray="4 2" />
    <circle cx="24" cy="24" r="5" fill="white" />
    <path d="M22 22L27 24L22 26V22Z" fill="#4338CA" />
    {/* Arrow heads */}
    <path d="M37 22L39 25L36 26" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 26L9 23L12 22" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * 9. Authentic Facebook Icon
 * Official Facebook `#1877F2` blue circle with bold white 'f'
 */
export const RealFacebookIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="#1877F2" />
    <path
      d="M27.5 25H31L31.5 20.5H27.5V17.8C27.5 16.6 27.9 15.7 29.6 15.7H31.7V11.7C31.3 11.6 30 11.5 28.5 11.5C25.3 11.5 23.2 13.4 23.2 17.1V20.5H19.5V25H23.2V36.5H27.5V25Z"
      fill="white"
    />
  </svg>
);

/**
 * 10. Authentic LinkedIn Icon
 * Official LinkedIn `#0A66C2` blue rounded square with white 'in'
 */
export const RealLinkedinIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="44" height="44" rx="11" fill="#0A66C2" />
    <path
      d="M17 19.5H12V34H17V19.5ZM14.5 12C12.9 12 11.6 13.3 11.6 14.9C11.6 16.5 12.9 17.8 14.5 17.8C16.1 17.8 17.4 16.5 17.4 14.9C17.4 13.3 16.1 12 14.5 12Z"
      fill="white"
    />
    <path
      d="M25 19.5H20.2V34H25V26.2C25 22 30.3 21.6 30.3 26.2V34H35.1V24.5C35.1 17.1 26.7 17.4 25 20.7V19.5Z"
      fill="white"
    />
  </svg>
);

/**
 * 11. Authentic Twitter / X Icon
 * Official deep obsidian `#000000` with white geometric 'X'
 */
export const RealTwitterXIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="44" height="44" rx="11" fill="#0F172A" />
    <path
      d="M27.8 22.3L36 13H34.1L27 21.1L21.3 13H15L23.6 25.1L15 35H16.9L24.4 26.3L30.4 35H36.7L27.8 22.3ZM25.3 25.2L24.5 24L17.6 14.4H20.5L26.1 22.3L26.9 23.5L34.1 33.7H31.2L25.3 25.2Z"
      fill="white"
    />
  </svg>
);

/**
 * 12. Authentic YouTube Icon
 * Official `#FF0000` red rounded rectangle with white equilateral play triangle
 */
export const RealYoutubeIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="#FF0000" />
    <path
      d="M34.8 19.1C34.6 17.5 33.3 16.2 31.7 16C29 15.5 24 15.5 24 15.5C24 15.5 19 15.5 16.3 16C14.7 16.2 13.4 17.5 13.2 19.1C12.8 21.8 12.8 24 12.8 24C12.8 24 12.8 26.2 13.2 28.9C13.4 30.5 14.7 31.8 16.3 32C19 32.5 24 32.5 24 32.5C24 32.5 29 32.5 31.7 32C33.3 31.8 34.6 30.5 34.8 28.9C35.2 26.2 35.2 24 35.2 24C35.2 24 35.2 21.8 34.8 19.1ZM21.8 27.7V20.3L28.2 24L21.8 27.7Z"
      fill="white"
    />
  </svg>
);

/**
 * 13. Authentic Telegram Icon
 * Official `#229ED9` blue circle with white paper plane
 */
export const RealTelegramIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="#229ED9" />
    <path
      d="M34.5 14.5L12.5 23L18.5 25.5L29 18.5L20.5 27.2L20.3 32.5L24 29L29.5 33L34.5 14.5Z"
      fill="white"
      stroke="white"
      strokeWidth="0.5"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 14. Food & Dining / Restaurant Menu Icon
 * Warm amber/coral gourmet badge with fork and knife
 */
export const RealMenuIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="menu-grad" x1="24" y1="2" x2="24" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F97316" />
        <stop offset="1" stopColor="#EA580C" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#menu-grad)" />
    <path
      d="M17 13V22M15 13V19C15 20.1 15.9 21 17 21M19 13V19C19 20.1 18.1 21 17 21M17 21V35M31 13V35M31 13C28.8 13 27 14.8 27 17V23C27 25.2 28.8 27 31 27V35"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 15. Calendar / Booking Icon
 * Sleek executive calendar badge with red header
 */
export const RealCalendarIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cal-grad" x1="24" y1="2" x2="24" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366F1" />
        <stop offset="1" stopColor="#4F46E5" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#cal-grad)" />
    <rect x="13" y="14" width="22" height="20" rx="4" fill="white" />
    <path d="M13 19H35V17C35 15.34 33.66 14 32 14H16C14.34 14 13 15.34 13 17V19Z" fill="#EF4444" />
    <circle cx="18" cy="24" r="1.5" fill="#4F46E5" />
    <circle cx="24" cy="24" r="1.5" fill="#4F46E5" />
    <circle cx="30" cy="24" r="1.5" fill="#4F46E5" />
    <circle cx="18" cy="29" r="1.5" fill="#4F46E5" />
    <circle cx="24" cy="29" r="1.5" fill="#4F46E5" />
    <circle cx="30" cy="29" r="1.5" fill="#4F46E5" />
  </svg>
);

/**
 * 16. PDF Catalog / Document Icon
 * Crisp Adobe Red document badge with download fold
 */
export const RealDocumentIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="doc-grad" x1="24" y1="2" x2="24" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EF4444" />
        <stop offset="1" stopColor="#DC2626" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#doc-grad)" />
    <path
      d="M16 13C14.9 13 14 13.9 14 15V33C14 34.1 14.9 35 16 35H32C33.1 35 34 34.1 34 33V20L27 13H16Z"
      fill="white"
    />
    <path d="M26 13V20H33L26 13Z" fill="#FCA5A5" />
    <path d="M19 26H29M19 30H26" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * 17. Authentic Google Drive Icon
 * Iconic 3-color geometric Drive triangle (Yellow, Green, Blue)
 */
export const RealGoogleDriveIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="gdrive-shadow" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#0F172A" floodOpacity="0.15" />
      </filter>
    </defs>
    {/* Crisp White Foundation Disc */}
    <circle cx="24" cy="24" r="22" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" filter="url(#gdrive-shadow)" />
    {/* Drive Yellow Segment */}
    <path d="M18.8 14H29.2L35.2 24.5H24.8L18.8 14Z" fill="#FFC107" />
    {/* Drive Green Segment */}
    <path d="M12.8 24.5L18 14L23.2 24.5L18 35L12.8 24.5Z" fill="#00AC47" />
    {/* Drive Blue Segment */}
    <path d="M24.8 24.5H35.2L30 35H19.6L24.8 24.5Z" fill="#1877F2" />
  </svg>
);

/**
 * 18. Authentic Dropbox Icon
 * Official Dropbox geometric open box glyph on iconic blue
 */
export const RealDropboxIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dropbox-grad" x1="24" y1="2" x2="24" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0061FE" />
        <stop offset="1" stopColor="#004AD7" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#dropbox-grad)" />
    {/* Dropbox Diamond Facets */}
    <path d="M14 17.5L20 22L14 26.5L8 22L14 17.5Z" fill="white" />
    <path d="M34 17.5L40 22L34 26.5L28 22L34 17.5Z" fill="white" />
    <path d="M24 25L30 29.5L24 34L18 29.5L24 25Z" fill="white" />
    <path d="M24 10L30 14.5L24 19L18 14.5L24 10Z" fill="white" />
    <path d="M18 31.2L24 26.8L30 31.2L24 35.5L18 31.2Z" fill="white" fillOpacity="0.75" />
  </svg>
);

/**
 * 19. Dedicated Swiss Minimalist CV / Resume Document Icon
 * Executive dark slate & royal indigo badge with portrait & text lines
 */
export const RealCvIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cv-grad" x1="24" y1="2" x2="24" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1E293B" />
        <stop offset="1" stopColor="#0F172A" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#cv-grad)" stroke="#334155" strokeWidth="1" />
    {/* Clean White Document Sheet */}
    <rect x="14" y="11" width="20" height="26" rx="3" fill="#FFFFFF" />
    {/* Mini Avatar / Portrait Silhouette */}
    <circle cx="19.5" cy="18" r="3" fill="#0066FF" />
    {/* Name & Title Header lines */}
    <rect x="25" y="16" width="6.5" height="1.8" rx="0.9" fill="#0F172A" />
    <rect x="25" y="19" width="4.5" height="1.2" rx="0.6" fill="#94A3B8" />
    {/* Content Lines */}
    <rect x="17.5" y="24" width="13" height="1.5" rx="0.75" fill="#64748B" />
    <rect x="17.5" y="27.5" width="13" height="1.5" rx="0.75" fill="#64748B" />
    <rect x="17.5" y="31" width="9" height="1.5" rx="0.75" fill="#3B82F6" />
  </svg>
);

/**
 * 20. Authentic GitHub Icon
 */
export const RealGithubIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="#181717" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 10C16.27 10 10 16.27 10 24C10 30.19 14.02 35.43 19.59 37.28C20.29 37.41 20.55 36.98 20.55 36.61C20.55 36.28 20.54 35.2 20.53 33.84C16.64 34.69 15.82 32.16 15.82 32.16C15.18 30.54 14.26 30.11 14.26 30.11C12.99 29.24 14.36 29.26 14.36 29.26C15.77 29.36 16.51 30.71 16.51 30.71C17.76 32.85 19.79 32.23 20.59 31.87C20.72 30.96 21.08 30.34 21.48 29.99C18.37 29.64 15.11 28.44 15.11 23.09C15.11 21.56 15.65 20.32 16.55 19.34C16.4 18.99 15.92 17.57 16.69 15.65C16.69 15.65 17.86 15.28 20.52 17.08C21.63 16.77 22.82 16.62 24 16.61C25.18 16.62 26.37 16.77 27.48 17.08C30.14 15.27 31.31 15.65 31.31 15.65C32.08 17.57 31.6 18.99 31.45 19.34C32.35 20.32 32.89 21.56 32.89 23.09C32.89 28.45 29.62 29.63 26.51 29.98C27 30.4 27.45 31.23 27.45 32.51C27.45 34.34 27.43 35.82 27.43 36.61C27.43 36.98 27.69 37.42 28.4 37.28C33.97 35.42 38 30.18 38 24C38 16.27 31.73 10 24 10Z"
      fill="white"
    />
  </svg>
);

/**
 * 21. Authentic Behance / Creative Portfolio Icon
 */
export const RealBehanceIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="#1769FF" />
    <path
      d="M21 21.2C22.1 20.7 22.8 19.8 22.8 18.3C22.8 15.8 20.8 14.5 17.8 14.5H11.5V33.5H18.2C21.4 33.5 23.6 31.8 23.6 28.7C23.6 26.8 22.5 25.4 21 24.8V24.6C21 24.6 21 21.2 21 21.2ZM15.4 18.3H17.4C18.7 18.3 19.5 18.9 19.5 20.1C19.5 21.2 18.6 21.9 17.3 21.9H15.4V18.3ZM17.7 29.7H15.4V25.3H17.8C19.3 25.3 20.3 26.1 20.3 27.5C20.3 28.9 19.2 29.7 17.7 29.7Z"
      fill="white"
    />
    <path
      d="M30.4 20.7C26.5 20.7 24.1 23.6 24.1 27.3C24.1 31.2 26.6 33.7 30.5 33.7C33.6 33.7 35.6 32 36.3 29.7H33.2C32.8 30.6 31.8 31.1 30.5 31.1C28.5 31.1 27.3 29.9 27.2 28.1H36.6C36.7 27.8 36.7 27.3 36.7 26.8C36.6 23.2 34.4 20.7 30.4 20.7ZM27.3 25.9C27.6 24.3 28.7 23.2 30.4 23.2C32.1 23.2 33.1 24.3 33.3 25.9H27.3Z"
      fill="white"
    />
    <rect x="27.5" y="16.5" width="5.8" height="1.8" rx="0.9" fill="white" />
  </svg>
);

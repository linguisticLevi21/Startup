import React from "react";
import "./NavLogo.css";

/**
 * BrandIcon — minimal map-pin + dot SVG
 * size prop controls the icon size (default 24)
 */
export function BrandIcon({ size = 24 }) {
  return (
    <svg
      className="brand-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Pin body */}
      <path
        d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z"
        fill="url(#pinGrad)"
        opacity="0.95"
      />
      {/* Inner dot */}
      <circle cx="12" cy="9" r="2.5" fill="#0a0a0a" opacity="0.85" />
      {/* Subtle briefcase bars — two horizontal lines inside pin */}
      <rect x="9.5" y="8.2" width="5" height="0.7" rx="0.35" fill="white" opacity="0.55" />
      <rect x="9.5" y="9.6" width="5" height="0.7" rx="0.35" fill="white" opacity="0.35" />
      {/* Gradient definition */}
      <defs>
        <linearGradient id="pinGrad" x1="5" y1="2" x2="19" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * NavLogo — full brand lockup: icon + "Startup Arena" text
 * Pass onClick to make it navigate on click
 */
export function NavLogo({ onClick }) {
  return (
    <button className="nav-logo-lockup" onClick={onClick} aria-label="Startup Arena home">
      <BrandIcon size={24} />
      <span className="nav-logo-wordmark">Startup Arena</span>
    </button>
  );
}

export default NavLogo;

import React from 'react';

export default function Logo({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <div className={className} dir="ltr">
      <svg viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible" style={{ direction: 'ltr' }} preserveAspectRatio="xMinYMid meet">
        {/* "Ex" in bold sans-serif */}
        <text 
          x="10" 
          y="70" 
          className="fill-current font-sans font-black" 
          style={{ fontSize: '72px', letterSpacing: '-0.02em' }}
        >
          Ex
        </text>
        
        {/* Pill shape outline */}
        <rect 
          x="105" 
          y="35" 
          width="120" 
          height="40" 
          rx="20" 
          className="stroke-current" 
          strokeWidth="4"
        />
        
        {/* "rdia" in serif */}
        <text 
          x="165" 
          y="110" 
          className="fill-current font-serif italic" 
          style={{ fontSize: '48px', textAnchor: 'middle' }}
        >
          rdia
        </text>
      </svg>
    </div>
  );
}

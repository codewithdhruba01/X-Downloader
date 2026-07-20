import * as React from 'react';

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function DarkLight({ size = 24, className, ...props }: SVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <g transform="scale(1.33333)">
        <path d="M9,6v6c1.657,0,3-1.343,3-3s-1.343-3-3-3Z" fill="currentColor" />
        <path d="M9,12c-1.657,0-3-1.343-3-3s1.343-3,3-3V1.75C4.996,1.75,1.75,4.996,1.75,9s3.246,7.25,7.25,7.25v-4.25Z" fill="currentColor" />
        <circle
          cx="9"
          cy="9"
          r="7.25"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}

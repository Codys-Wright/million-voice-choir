/**
 * Flag of the Dominican Republic as an inline SVG (circle-flags style),
 * so it renders identically everywhere instead of falling back to "DO"
 * text the way the emoji does on some platforms.
 */
export function DominicanFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      role="img"
      aria-label="Flag of the Dominican Republic"
    >
      <circle cx="256" cy="256" r="256" fill="#eee" />
      <path
        d="M8 322.8A256 256 0 0 0 222.8 504V322.8H8z"
        fill="#d80027"
      />
      <path
        d="M222.8 8A256 256 0 0 0 8 189.2h214.8V8z"
        fill="#0052b4"
      />
      <path
        d="M504 189.2A256 256 0 0 0 289.2 8v181.2H504z"
        fill="#d80027"
      />
      <path
        d="M289.2 504A256 256 0 0 0 504 322.8H289.2V504z"
        fill="#0052b4"
      />
      <path
        d="M322.8 256a66.8 66.8 0 1 1-133.6 0 66.8 66.8 0 0 1 133.6 0z"
        fill="#496e2d"
      />
      <path
        d="M222.6 289.4v-44.6a33.4 33.4 0 0 0 33.4 33.5 33.4 33.4 0 0 0 33.4-33.5v44.6h-66.8z"
        fill="#0052b4"
      />
      <path
        d="M289.4 222.6v11.2a33.4 33.4 0 0 0-66.8 0v-11.2h66.8z"
        fill="#d80027"
      />
    </svg>
  )
}

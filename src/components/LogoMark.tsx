export default function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-xl bg-word-600 text-white shadow-soft ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" className="h-[80%] w-[80%]" shapeRendering="geometricPrecision">
        <path fill="#ffffff" d="M32 13 57 26.5 32 40 7 26.5 32 13Z" />
        <path fill="#ffffff" d="M19 32.5v8.5c0 5 26 5 26 0v-8.5L32 39.3 19 32.5Z" />
        <path
          fill="none"
          stroke="#12b76a"
          strokeWidth="3"
          strokeLinecap="round"
          d="M57 26.5v13"
        />
        <circle cx="57" cy="42.5" r="3.4" fill="#12b76a" />
      </svg>
    </span>
  )
}

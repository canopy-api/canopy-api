function LogomarkPaths() {
  return (
    <g fill="none" stroke="#38BDF8" strokeLinejoin="round" strokeWidth={3}>
      <path d="M10.308 5L18 17.5 10.308 30 2.615 17.5 10.308 5z" />
      <path d="M18 17.5L10.308 5h15.144l7.933 12.5M18 17.5h15.385L25.452 30H10.308L18 17.5z" />
    </g>
  )
}

export function Logomark(props) {
  return (
      <img src="/logo-dt.svg" className="h-9"/>
  )
}

export function Logo(props) {
  return (
    <div className="flex">
    <img src="/logo-dt.svg" className="h-9"/> <span className="font-mono text-2xl justify-end text-green-600 pb-2">Docs</span></div>
  )
}

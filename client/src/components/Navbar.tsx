export function Navbar() {
  return (
    <nav className="w-full border-b border-white/10 bg-[rgb(10,10,10)]/95 backdrop-blur supports-[backdrop-filter]:bg-[rgb(10,10,10)]/60">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center">
          <a className="flex items-center space-x-2" href="/">
            <span className="text-xl font-bold tracking-tight">Manim Script Generator</span>
          </a>
        </div>
      </div>
    </nav>
  )
} 
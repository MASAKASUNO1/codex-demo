export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide">AI Memory Manager</h1>
        <nav className="space-x-6 text-sm font-medium">
          <a href="/" className="hover:text-pink-200 transition-colors">Home</a>
          <a href="/add" className="hover:text-pink-200 transition-colors">Add Memo</a>
          <a href="/search" className="hover:text-pink-200 transition-colors">Search Memo</a>
        </nav>
      </div>
    </header>
  )
}
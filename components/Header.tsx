export default function Header() {
  return (
    <header className="bg-gray-100 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">AI Memory Manager</h1>
          <nav className="space-x-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="/add" className="hover:underline">Add Memo</a>
            <a href="/search" className="hover:underline">Search Memo</a>
          </nav>
        </div>
      </div>
    </header>
  )
}
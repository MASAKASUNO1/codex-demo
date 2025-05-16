export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 mt-8">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-sm">
        <span>&copy; {new Date().getFullYear()} AI Memory Manager</span>
        <span className="mt-2 sm:mt-0">Built with Next.js & Tailwind CSS</span>
      </div>
    </footer>
  )
}
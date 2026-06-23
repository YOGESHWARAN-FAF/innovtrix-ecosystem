import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="font-sans min-h-[80vh] flex items-center justify-center bg-slate-950 px-6">
      <div className="glow-bg bg-brand-primary top-1/4 left-1/4"></div>
      <div className="text-center z-10">
        <h1 className="text-8xl font-extrabold text-white tracking-tight">404</h1>
        <h2 className="text-2xl font-bold text-slate-300 mt-4">Page Not Found</h2>
        <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">
          The page you are looking for does not exist or has been relocated.
        </p>
        <Link 
          to="/" 
          className="btn-primary mt-8 px-8 py-3 mx-auto inline-flex"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}

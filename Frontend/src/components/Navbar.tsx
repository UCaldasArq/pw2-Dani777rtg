import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Home, Timer, Users } from 'lucide-react';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition',
    isActive
      ? 'bg-white/15 text-white'
      : 'text-white/85 hover:bg-white/10 hover:text-white',
  ].join(' ');

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink text-white shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <NavLink to="/" className="text-lg font-semibold tracking-tight text-white">
          Screen Time Tracker
        </NavLink>
        <nav className="flex flex-wrap gap-1 sm:gap-2" aria-label="Main">
          <NavLink to="/" className={linkClass} end>
            <Home className="h-4 w-4 opacity-90" aria-hidden />
            Home
          </NavLink>
          <NavLink to="/users" className={linkClass}>
            <Users className="h-4 w-4 opacity-90" aria-hidden />
            Users
          </NavLink>
          <NavLink to="/usage" className={linkClass}>
            <Timer className="h-4 w-4 opacity-90" aria-hidden />
            Usage
          </NavLink>
          <NavLink to="/dashboard" className={linkClass}>
            <LayoutDashboard className="h-4 w-4 opacity-90" aria-hidden />
            Dashboard
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

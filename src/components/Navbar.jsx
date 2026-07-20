import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/blogs', label: 'Insights' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur border-b border-brass/20">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="font-display text-2xl tracking-tight text-stone">
            Marjan <span className="text-brass">Classic</span>
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-9 font-body text-sm tracking-wide">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `uppercase tracking-widest text-xs transition-colors ${
                  isActive ? 'text-brass' : 'text-stone/70 hover:text-stone'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="md:hidden text-stone"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-brass/20 bg-ink px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `uppercase tracking-widest text-xs ${isActive ? 'text-brass' : 'text-stone/70'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;

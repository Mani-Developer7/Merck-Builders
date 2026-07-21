import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/banners', label: 'Hero Banners' },
  { to: '/admin/offer-banner', label: 'Offer Banner' },
  { to: '/admin/blogs', label: 'Blogs' },
  { to: '/admin/gallery', label: 'Gallery' },
  { to: '/admin/careers', label: 'Careers' },
];

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-stone flex">
      <aside className="w-64 bg-ink text-stone flex flex-col">
        <div className="p-6 border-b border-brass/20">
          <span className="font-display text-xl">
            Marjan <span className="text-brass">Classic</span>
          </span>
          <p className="text-stone/40 text-[11px] uppercase tracking-widest mt-1">Admin</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? 'bg-brass text-ink font-semibold' : 'text-stone/70 hover:bg-ink-2'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-brass/20">
          <p className="text-xs text-stone/50 mb-3 truncate">{admin?.email}</p>
          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="w-full text-xs uppercase tracking-widest border border-brass/30 rounded-lg px-4 py-2 hover:bg-brass hover:text-ink transition-colors"
          >
            Log Out
          </button>
          <NavLink to="/" className="block text-center text-xs text-stone/40 mt-3 hover:text-stone">
            ← View Site
          </NavLink>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

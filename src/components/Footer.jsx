import { NavLink } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-ink900 text-stone/80 border-t border-brass/20 mt-24">
    <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
      <div>
        <span className="font-display text-2xl text-stone">
          Marjan <span className="text-brass">Classic</span>
        </span>
        <p className="mt-4 text-sm leading-relaxed text-stone/60">
          Mall &amp; Residency — Sector 16-A, Shah Latif Town, Karachi. Building landmark
          mixed-use developments across the city.
        </p>
      </div>

      <div>
        <h4 className="font-body text-xs uppercase tracking-widest text-brass mb-4">Explore</h4>
        <ul className="space-y-2 text-sm">
          <li><NavLink to="/projects" className="hover:text-brass">Projects</NavLink></li>
          <li><NavLink to="/gallery" className="hover:text-brass">Gallery</NavLink></li>
          <li><NavLink to="/blogs" className="hover:text-brass">Insights</NavLink></li>
          <li><NavLink to="/careers" className="hover:text-brass">Careers</NavLink></li>
        </ul>
      </div>

      <div>
        <h4 className="font-body text-xs uppercase tracking-widest text-brass mb-4">Contact</h4>
        <ul className="space-y-2 text-sm text-stone/70">
          <li>Sector 16-A, Shah Latif Town, Karachi</li>
          <li>+92 300 0000000</li>
          <li>info@marjanclassic.com</li>
        </ul>
      </div>

      <div>
        <h4 className="font-body text-xs uppercase tracking-widest text-brass mb-4">Admin</h4>
        <NavLink
          to="/admin/login"
          className="inline-block text-sm border border-brass/40 rounded-full px-4 py-2 hover:bg-brass hover:text-ink transition-colors"
        >
          Admin Login
        </NavLink>
      </div>
    </div>
    <div className="border-t border-brass/10 py-6 text-center text-xs text-stone/40 font-mono">
      &copy; {new Date().getFullYear()} Marjan Classic Mall &amp; Residency. All rights reserved.
    </div>
  </footer>
);

export default Footer;

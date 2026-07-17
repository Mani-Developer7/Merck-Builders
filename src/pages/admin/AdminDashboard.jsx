import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ projects: 0, blogs: 0, gallery: 0, careers: 0 });

  useEffect(() => {
    Promise.all([
      api.get('/projects'),
      api.get('/blogs'),
      api.get('/gallery'),
      api.get('/careers'),
    ]).then(([p, b, g, c]) =>
      setCounts({ projects: p.data.length, blogs: b.data.length, gallery: g.data.length, careers: c.data.length })
    );
  }, []);

  const cards = [
    { label: 'Projects', count: counts.projects, to: '/admin/projects' },
    { label: 'Blog Posts', count: counts.blogs, to: '/admin/blogs' },
    { label: 'Gallery Images', count: counts.gallery, to: '/admin/gallery' },
    { label: 'Career Listings', count: counts.careers, to: '/admin/careers' },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-ink mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="bg-white border border-slate/10 rounded-2xl p-6 hover:border-brass/40 transition-colors"
          >
            <div className="font-display text-4xl text-ink">{c.count}</div>
            <div className="text-xs uppercase tracking-widest text-slate mt-2">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-10 bg-white border border-slate/10 rounded-2xl p-6 text-sm text-slate leading-relaxed">
        Use the sidebar to add, edit, or remove content. Everything published here — projects, blog
        posts, gallery images, and career listings — renders live on the public site.
      </div>
    </div>
  );
};

export default AdminDashboard;

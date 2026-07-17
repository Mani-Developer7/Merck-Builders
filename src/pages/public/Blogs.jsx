import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import Reveal from '../../components/Reveal';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/blogs', { params: { published: true } })
      .then((res) => setBlogs(res.data))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <Reveal>
        <p className="text-brass uppercase tracking-widest text-xs font-mono mb-2">Insights</p>
        <h1 className="font-display text-4xl md:text-5xl text-ink mb-10">News &amp; Updates</h1>
      </Reveal>

      {loading ? (
        <p className="text-slate">Loading…</p>
      ) : blogs.length === 0 ? (
        <p className="text-slate">No posts yet — publish your first one from the admin dashboard.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((b, i) => (
            <Reveal key={b._id} delay={(i % 3) * 0.08}>
              <Link to={`/blogs/${b.slug}`} className="group block">
                <div className="rounded-2xl overflow-hidden h-56">
                  <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="text-xs text-brass uppercase tracking-widest mt-4 font-mono">
                  {new Date(b.createdAt).toLocaleDateString()}
                </p>
                <h3 className="font-display text-xl text-ink mt-1 group-hover:text-brass transition-colors">
                  {b.title}
                </h3>
                <p className="text-sm text-slate mt-2 line-clamp-2">{b.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;

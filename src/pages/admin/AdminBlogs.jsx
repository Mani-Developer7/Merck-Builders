import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get('/blogs').then((res) => setBlogs(res.data)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    await api.delete(`/blogs/${id}`);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-ink">Blog Posts</h1>
        <Link to="/admin/blogs/new" className="bg-ink text-stone px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-brass hover:text-ink transition-colors">
          + New Post
        </Link>
      </div>

      {loading ? (
        <p className="text-slate">Loading…</p>
      ) : (
        <div className="bg-white border border-slate/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-2 text-left text-xs uppercase tracking-widest text-slate">
              <tr>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Author</th>
                <th className="px-5 py-3">Published</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b) => (
                <tr key={b._id} className="border-t border-slate/10">
                  <td className="px-5 py-3 flex items-center gap-3">
                    <img src={b.coverImage} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <span className="text-ink font-medium">{b.title}</span>
                  </td>
                  <td className="px-5 py-3 text-slate">{b.author}</td>
                  <td className="px-5 py-3">{b.published ? '✓' : '—'}</td>
                  <td className="px-5 py-3 text-right space-x-3">
                    <Link to={`/admin/blogs/${b._id}/edit`} className="text-brass hover:underline">Edit</Link>
                    <button onClick={() => handleDelete(b._id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-slate">No posts yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get('/projects').then((res) => setProjects(res.data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    await api.delete(`/projects/${id}`);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-ink">Projects</h1>
        <Link
          to="/admin/projects/new"
          className="bg-ink text-stone px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-brass hover:text-ink transition-colors"
        >
          + New Project
        </Link>
      </div>

      {loading ? (
        <p className="text-slate">Loading…</p>
      ) : (
        <div className="bg-white border border-slate/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-2 text-left text-xs uppercase tracking-widest text-slate">
              <tr>
                <th className="px-5 py-3">Project</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Featured</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p._id} className="border-t border-slate/10">
                  <td className="px-5 py-3 flex items-center gap-3">
                    <img src={p.coverImage} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <span className="text-ink font-medium">{p.title}</span>
                  </td>
                  <td className="px-5 py-3 text-slate">{p.category}</td>
                  <td className="px-5 py-3 text-slate">{p.status}</td>
                  <td className="px-5 py-3">{p.featured ? '✓' : ''}</td>
                  <td className="px-5 py-3 text-right space-x-3">
                    <Link to={`/admin/projects/${p._id}/edit`} className="text-brass hover:underline">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-slate">
                    No projects yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;

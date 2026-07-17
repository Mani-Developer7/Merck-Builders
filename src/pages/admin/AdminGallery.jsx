import { useEffect, useState } from 'react';
import api from '../../api/axios';

const AdminGallery = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', category: 'General' });
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => api.get('/gallery').then((res) => setItems(res.data));
  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return setError('Please choose an image');
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('category', form.category);
      fd.append('image', image);
      await api.post('/gallery', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setForm({ title: '', category: 'General' });
      setImage(null);
      e.target.reset();
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return;
    await api.delete(`/gallery/${id}`);
    load();
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-ink mb-8">Gallery</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-slate/10 rounded-2xl p-6 mb-8 flex flex-wrap gap-4 items-end">
        {error && <p className="text-red-500 text-sm w-full">{error}</p>}
        <div>
          <label className="block text-xs uppercase tracking-widest text-slate/60 mb-1.5">Title</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="input w-56" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-slate/60 mb-1.5">Category</label>
          <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input w-40" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-slate/60 mb-1.5">Image</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit" disabled={saving} className="bg-brass text-ink px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold disabled:opacity-60">
          {saving ? 'Uploading…' : 'Add Image'}
        </button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item._id} className="relative group rounded-xl overflow-hidden bg-white border border-slate/10">
            <img src={item.image} alt={item.title} className="w-full h-32 object-cover" />
            <div className="p-2">
              <p className="text-xs text-ink truncate">{item.title}</p>
              <p className="text-[10px] text-slate/50 uppercase tracking-widest">{item.category}</p>
            </div>
            <button
              onClick={() => handleDelete(item._id)}
              className="absolute top-2 right-2 bg-ink900/70 text-white text-xs w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="text-slate col-span-full">No gallery images yet.</p>}
      </div>
    </div>
  );
};

export default AdminGallery;

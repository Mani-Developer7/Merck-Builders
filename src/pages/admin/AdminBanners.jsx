import { useEffect, useState } from 'react';
import api from '../../api/axios';

const emptyForm = { eyebrow: '', title: '', highlight: '', text: '', order: '', active: true };

const AdminBanners = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => api.get('/banners').then((res) => setItems(res.data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))));
  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setImage(null);
    setExistingImage('');
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append('image', image);

      if (editingId) {
        await api.put(`/banners/${editingId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        if (!image) throw { response: { data: { message: 'Banner image is required' } } };
        await api.post('/banners', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      resetForm();
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (b) => {
    setEditingId(b._id);
    setForm({
      eyebrow: b.eyebrow || '',
      title: b.title || '',
      highlight: b.highlight || '',
      text: b.text || '',
      order: b.order ?? '',
      active: b.active,
    });
    setExistingImage(b.image);
    setImage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this banner slide?')) return;
    await api.delete(`/banners/${id}`);
    load();
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-ink mb-2">Hero Banners</h1>
      <p className="text-sm text-slate mb-8">
        These slides power the rotating hero section on the homepage. Add, edit, or reorder them below.
      </p>

      <form onSubmit={handleSubmit} className="bg-white border border-slate/10 rounded-2xl p-6 mb-10 space-y-4 max-w-2xl">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <label className="block text-xs uppercase tracking-widest text-slate/60 mb-1.5">Eyebrow Text</label>
          <input value={form.eyebrow} onChange={(e) => setForm({ ...form, eyebrow: e.target.value })} className="input" placeholder="e.g. Sector 16-A · Karachi" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-slate/60 mb-1.5">Title (regular part)</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" placeholder="e.g. Invest Today, Live Luxuriously with" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-slate/60 mb-1.5">Title (highlighted part)</label>
            <input value={form.highlight} onChange={(e) => setForm({ ...form, highlight: e.target.value })} className="input" placeholder="e.g. Marjan Classic" />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-slate/60 mb-1.5">Supporting Text</label>
          <textarea rows={2} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} className="input" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 items-end">
          <div>
            <label className="block text-xs uppercase tracking-widest text-slate/60 mb-1.5">Order</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className="input" placeholder="1" />
          </div>
          <label className="flex items-center gap-2 text-sm pb-2">
            <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="accent-brass" />
            Active (show on site)
          </label>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-slate/60 mb-1.5">Background Image</label>
          {existingImage && !image && <img src={existingImage} alt="" className="w-40 h-24 object-cover rounded-lg mb-2" />}
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="bg-brass text-ink px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold disabled:opacity-60">
            {saving ? 'Saving…' : editingId ? 'Update Banner' : 'Add Banner'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-6 py-3 rounded-full text-xs uppercase tracking-widest border border-slate/20 text-slate">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {items.map((b) => (
          <div key={b._id} className="bg-white border border-slate/10 rounded-xl p-4 flex items-center gap-4">
            <img src={b.image} alt="" className="w-24 h-16 object-cover rounded-lg flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-ink font-medium truncate">
                {b.title} <span className="text-brass">{b.highlight}</span>
              </p>
              <p className="text-xs text-slate/60 truncate">{b.eyebrow}</p>
              <p className="text-[11px] text-slate/40 mt-1">
                Order {b.order ?? '—'} · {b.active ? 'Active' : 'Hidden'}
              </p>
            </div>
            <div className="space-x-3 text-sm flex-shrink-0">
              <button onClick={() => handleEdit(b)} className="text-brass hover:underline">Edit</button>
              <button onClick={() => handleDelete(b._id)} className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-slate">No banners yet — add your first slide above.</p>}
      </div>
    </div>
  );
};

export default AdminBanners;

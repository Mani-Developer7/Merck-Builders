import { useEffect, useState } from 'react';
import api from '../../api/axios';

const emptyForm = {
  title: '',
  department: '',
  location: '',
  type: 'Full-time',
  description: '',
  requirementsText: '',
  isOpen: true,
};

const AdminCareers = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => api.get('/careers').then((res) => setItems(res.data));
  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      requirements: JSON.stringify(form.requirementsText.split(',').map((r) => r.trim()).filter(Boolean)),
    };
    try {
      if (editingId) {
        await api.put(`/careers/${editingId}`, payload);
      } else {
        await api.post('/careers', payload);
      }
      setForm(emptyForm);
      setEditingId(null);
      load();
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (c) => {
    setEditingId(c._id);
    setForm({
      title: c.title,
      department: c.department,
      location: c.location,
      type: c.type,
      description: c.description,
      requirementsText: (c.requirements || []).join(', '),
      isOpen: c.isOpen,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this listing?')) return;
    await api.delete(`/careers/${id}`);
    load();
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-ink mb-8">Careers</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-slate/10 rounded-2xl p-6 mb-8 space-y-4 max-w-2xl">
        <div className="grid sm:grid-cols-2 gap-4">
          <input required placeholder="Job title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" />
          <input required placeholder="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="input" />
          <input required placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input" />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input">
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>
        <textarea required rows={3} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input" />
        <input placeholder="Requirements (comma-separated)" value={form.requirementsText} onChange={(e) => setForm({ ...form, requirementsText: e.target.value })} className="input" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.isOpen} onChange={(e) => setForm({ ...form, isOpen: e.target.checked })} className="accent-brass" />
          Open for applications
        </label>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="bg-brass text-ink px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold disabled:opacity-60">
            {saving ? 'Saving…' : editingId ? 'Update Listing' : 'Add Listing'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="px-6 py-3 rounded-full text-xs uppercase tracking-widest border border-slate/20 text-slate">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {items.map((c) => (
          <div key={c._id} className="bg-white border border-slate/10 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-ink font-medium">{c.title} <span className="text-xs text-slate/50">· {c.department}</span></p>
              <p className="text-xs text-slate/60">{c.location} · {c.type} · {c.isOpen ? 'Open' : 'Closed'}</p>
            </div>
            <div className="space-x-3 text-sm">
              <button onClick={() => handleEdit(c)} className="text-brass hover:underline">Edit</button>
              <button onClick={() => handleDelete(c._id)} className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-slate">No listings yet.</p>}
      </div>
    </div>
  );
};

export default AdminCareers;

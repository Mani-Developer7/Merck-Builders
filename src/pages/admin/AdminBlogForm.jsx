import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';

const AdminBlogForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: '', excerpt: '', content: '', author: 'Marjan Classic Team', published: true });
  const [coverImage, setCoverImage] = useState(null);
  const [existingCover, setExistingCover] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    api.get(`/blogs/${id}`).then((res) => {
      const b = res.data;
      setForm({ title: b.title, excerpt: b.excerpt, content: b.content, author: b.author, published: b.published });
      setExistingCover(b.coverImage);
    });
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (coverImage) fd.append('coverImage', coverImage);

      if (isEdit) {
        await api.put(`/blogs/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        if (!coverImage) throw { response: { data: { message: 'Cover image is required' } } };
        await api.post('/blogs', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      navigate('/admin/blogs');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl text-ink mb-8">{isEdit ? 'Edit Post' : 'New Post'}</h1>
      <form onSubmit={handleSubmit} className="bg-white border border-slate/10 rounded-2xl p-8 space-y-5">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Field label="Title">
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" />
        </Field>
        <Field label="Author">
          <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="input" />
        </Field>
        <Field label="Excerpt">
          <textarea required rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="input" />
        </Field>
        <Field label="Content">
          <textarea required rows={8} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="input" />
        </Field>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-brass" />
          Published
        </label>
        <Field label="Cover Image">
          {existingCover && !coverImage && <img src={existingCover} alt="" className="w-32 h-20 object-cover rounded-lg mb-2" />}
          <input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} />
        </Field>

        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving} className="bg-brass text-ink px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold disabled:opacity-60">
            {saving ? 'Saving…' : 'Save Post'}
          </button>
          <button type="button" onClick={() => navigate('/admin/blogs')} className="px-6 py-3 rounded-full text-xs uppercase tracking-widest border border-slate/20 text-slate">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const Field = ({ label, children }) => (
  <div>
    <label className="block text-xs uppercase tracking-widest text-slate/60 mb-1.5">{label}</label>
    {children}
  </div>
);

export default AdminBlogForm;

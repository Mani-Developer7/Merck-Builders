import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';

const emptyForm = {
  title: '',
  category: 'Residential',
  status: 'Upcoming',
  location: '',
  shortDescription: '',
  description: '',
  startDate: '',
  completionDate: '',
  totalUnits: '',
  floors: '',
  amenitiesText: '',
  priceStartingFrom: '',
  featured: false,
};

const AdminProjectForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [coverImage, setCoverImage] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [existingGallery, setExistingGallery] = useState([]);
  const [removeGallery, setRemoveGallery] = useState([]);
  const [existingCover, setExistingCover] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    api.get(`/projects/${id}`).then((res) => {
      const p = res.data;
      setForm({
        title: p.title,
        category: p.category,
        status: p.status,
        location: p.location,
        shortDescription: p.shortDescription,
        description: p.description,
        startDate: p.startDate || '',
        completionDate: p.completionDate || '',
        totalUnits: p.totalUnits || '',
        floors: p.floors || '',
        amenitiesText: (p.amenities || []).join(', '),
        priceStartingFrom: p.priceStartingFrom || '',
        featured: p.featured,
      });
      setExistingCover(p.coverImage);
      setExistingGallery(p.gallery || []);
    });
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('category', form.category);
      fd.append('status', form.status);
      fd.append('location', form.location);
      fd.append('shortDescription', form.shortDescription);
      fd.append('description', form.description);
      fd.append('startDate', form.startDate);
      fd.append('completionDate', form.completionDate);
      fd.append('totalUnits', form.totalUnits);
      fd.append('floors', form.floors);
      fd.append('priceStartingFrom', form.priceStartingFrom);
      fd.append('featured', form.featured);
      fd.append(
        'amenities',
        JSON.stringify(form.amenitiesText.split(',').map((a) => a.trim()).filter(Boolean))
      );
      if (coverImage) fd.append('coverImage', coverImage);
      galleryFiles.forEach((f) => fd.append('gallery', f));
      if (removeGallery.length) fd.append('removeGalleryImages', JSON.stringify(removeGallery));

      if (isEdit) {
        await api.put(`/projects/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        if (!coverImage) throw { response: { data: { message: 'Cover image is required' } } };
        await api.post('/projects', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      navigate('/admin/projects');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl text-ink mb-8">{isEdit ? 'Edit Project' : 'New Project'}</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-slate/10 rounded-2xl p-8 space-y-5">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Field label="Title">
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" />
        </Field>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Category">
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input">
              <option>Residential</option>
              <option>Commercial</option>
              <option>Mixed Use</option>
            </select>
          </Field>
          <Field label="Status">
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input">
              <option>Upcoming</option>
              <option>Under Construction</option>
              <option>Completed</option>
            </select>
          </Field>
        </div>

        <Field label="Location">
          <input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input" />
        </Field>

        <Field label="Short Description (used on cards)">
          <textarea
            required
            rows={2}
            value={form.shortDescription}
            onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
            className="input"
          />
        </Field>

        <Field label="Full Description">
          <textarea
            required
            rows={5}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="input"
          />
        </Field>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Start Date">
            <input value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="input" placeholder="e.g. Jan 2024" />
          </Field>
          <Field label="Completion Date">
            <input value={form.completionDate} onChange={(e) => setForm({ ...form, completionDate: e.target.value })} className="input" placeholder="e.g. Dec 2026" />
          </Field>
          <Field label="Total Units">
            <input type="number" value={form.totalUnits} onChange={(e) => setForm({ ...form, totalUnits: e.target.value })} className="input" />
          </Field>
          <Field label="Floors">
            <input type="number" value={form.floors} onChange={(e) => setForm({ ...form, floors: e.target.value })} className="input" />
          </Field>
        </div>

        <Field label="Starting Price (e.g. PKR 1.2 Crore)">
          <input value={form.priceStartingFrom} onChange={(e) => setForm({ ...form, priceStartingFrom: e.target.value })} className="input" />
        </Field>

        <Field label="Amenities (comma-separated)">
          <input
            value={form.amenitiesText}
            onChange={(e) => setForm({ ...form, amenitiesText: e.target.value })}
            className="input"
            placeholder="Gym, Swimming Pool, 24/7 Security"
          />
        </Field>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="accent-brass"
          />
          Feature on homepage
        </label>

        <Field label="Cover Image">
          {existingCover && !coverImage && (
            <img src={existingCover} alt="" className="w-32 h-20 object-cover rounded-lg mb-2" />
          )}
          <input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} />
        </Field>

        <Field label="Gallery Images">
          {existingGallery.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {existingGallery.map((img) => (
                <div key={img} className="relative">
                  <img
                    src={img}
                    alt=""
                    className={`w-20 h-20 object-cover rounded-lg ${removeGallery.includes(img) ? 'opacity-30' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setRemoveGallery((prev) =>
                        prev.includes(img) ? prev.filter((x) => x !== img) : [...prev, img]
                      )
                    }
                    className="absolute top-0 right-0 bg-ink900/80 text-white text-xs w-5 h-5 rounded-full"
                  >
                    {removeGallery.includes(img) ? '↺' : '✕'}
                  </button>
                </div>
              ))}
            </div>
          )}
          <input type="file" accept="image/*" multiple onChange={(e) => setGalleryFiles(Array.from(e.target.files))} />
        </Field>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-brass text-ink px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save Project'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="px-6 py-3 rounded-full text-xs uppercase tracking-widest border border-slate/20 text-slate"
          >
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

export default AdminProjectForm;

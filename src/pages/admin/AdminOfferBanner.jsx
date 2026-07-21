import { useEffect, useState } from 'react';
import api from '../../api/axios';

const AdminOfferBanner = () => {
  const [form, setForm] = useState({ text: '', link: '', enabled: true });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/offer').then((res) => setForm(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await api.put('/offer', form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-ink mb-2">Offer Banner</h1>
      <p className="text-sm text-slate mb-8">
        A slim promotional strip shown across the top of the site, above the navigation. Visitors
        can dismiss it — it reappears next time they visit.
      </p>

      <form onSubmit={handleSubmit} className="bg-white border border-slate/10 rounded-2xl p-6 max-w-xl space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-widest text-slate/60 mb-1.5">Offer Text</label>
          <input
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            className="input"
            placeholder="e.g. 🎉 Limited-Time Offer — Book now with a flexible payment plan!"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-slate/60 mb-1.5">Link (optional)</label>
          <input
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            className="input"
            placeholder="/contact or https://…"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.enabled}
            onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
            className="accent-brass"
          />
          Show on site
        </label>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-brass text-ink px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save Offer'}
          </button>
          {saved && <span className="text-sm text-green-600">Saved ✓</span>}
        </div>
      </form>

      {form.text && form.enabled && (
        <div className="mt-8 max-w-xl">
          <p className="text-xs uppercase tracking-widest text-slate/50 mb-2">Live Preview</p>
          <div className="bg-brass text-ink text-center py-2.5 px-4 rounded-lg text-sm font-medium">
            {form.text}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOfferBanner;

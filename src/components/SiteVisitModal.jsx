import { useState } from 'react';

const SiteVisitModal = ({ open, onClose, projectTitle }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', date: '', notes: '' });

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // No booking backend is wired up yet — this currently just confirms in the UI.
    // Wire this to an email service, CRM, or a new /api/site-visits route to make it live.
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink900/80 backdrop-blur-sm px-4">
      <div className="bg-ink-2 border border-brass/30 rounded-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-stone/50 hover:text-stone"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="font-display text-xl text-stone">Visit Requested</h3>
            <p className="text-sm text-stone/60 mt-2">
              Our sales team will confirm your site visit for {projectTitle || 'the project'} shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-6 text-xs uppercase tracking-widest bg-brass text-ink px-5 py-2.5 rounded-full font-semibold"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-display text-xl text-stone mb-1">Schedule a Site Visit</h3>
            <p className="text-sm text-stone/60 mb-6">{projectTitle}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-ink border border-brass/20 rounded-lg px-4 py-2.5 text-sm text-stone placeholder:text-stone/40"
              />
              <input
                required
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-ink border border-brass/20 rounded-lg px-4 py-2.5 text-sm text-stone placeholder:text-stone/40"
              />
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full bg-ink border border-brass/20 rounded-lg px-4 py-2.5 text-sm text-stone"
              />
              <textarea
                placeholder="Notes (optional)"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={3}
                className="w-full bg-ink border border-brass/20 rounded-lg px-4 py-2.5 text-sm text-stone placeholder:text-stone/40"
              />
              <button
                type="submit"
                className="w-full text-xs uppercase tracking-widest bg-brass text-ink px-5 py-3 rounded-full font-semibold hover:bg-brass-light transition-colors"
              >
                Request Visit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SiteVisitModal;

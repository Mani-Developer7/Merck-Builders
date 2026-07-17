import { useState } from 'react';
import Reveal from '../../components/Reveal';
import MapEmbed from '../../components/MapEmbed';

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // No email backend wired up yet — connect this to a mail service (e.g. Nodemailer)
    // or a new /api/contact route to actually deliver these messages.
    setSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16">
      <div>
        <Reveal>
          <p className="text-brass uppercase tracking-widest text-xs font-mono mb-2">Contact</p>
          <h1 className="font-display text-4xl md:text-5xl text-ink mb-6">Get in Touch</h1>
          <p className="text-slate leading-relaxed mb-10 max-w-md">
            Sector 16-A, Shah Latif Town, Karachi. Our sales office is open daily 10am – 8pm.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          {sent ? (
            <div className="bg-stone-2 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-3">✅</div>
              <p className="text-ink font-display text-xl">Message sent</p>
              <p className="text-slate text-sm mt-2">Our team will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
              <input
                required
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-slate/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-brass"
              />
              <input
                required
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-slate/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-brass"
              />
              <input
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-slate/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-brass"
              />
              <textarea
                required
                placeholder="Message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-slate/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-brass"
              />
              <button
                type="submit"
                className="bg-ink text-stone px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-brass hover:text-ink transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <MapEmbed height={520} />
      </Reveal>
    </div>
  );
};

export default Contact;

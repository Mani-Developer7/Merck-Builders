import { useEffect, useState } from 'react';
import api from '../../api/axios';
import Reveal from '../../components/Reveal';

const Careers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/careers', { params: { isOpen: true } })
      .then((res) => setCareers(res.data))
      .catch(() => setCareers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <Reveal>
        <p className="text-brass uppercase tracking-widest text-xs font-mono mb-2">Careers</p>
        <h1 className="font-display text-4xl md:text-5xl text-ink mb-10">Join Our Team</h1>
      </Reveal>

      {loading ? (
        <p className="text-slate">Loading…</p>
      ) : careers.length === 0 ? (
        <p className="text-slate">No open roles right now — check back soon.</p>
      ) : (
        <div className="space-y-4">
          {careers.map((c, i) => (
            <Reveal key={c._id} delay={i * 0.06}>
              <div className="border border-slate/15 rounded-2xl p-6 hover:border-brass/40 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <h3 className="font-display text-xl text-ink">{c.title}</h3>
                  <span className="text-xs uppercase tracking-widest bg-stone-2 text-slate px-3 py-1 rounded-full">
                    {c.type}
                  </span>
                </div>
                <p className="text-sm text-slate/70 mb-3">
                  {c.department} · {c.location}
                </p>
                <p className="text-sm text-slate leading-relaxed">{c.description}</p>
                {c.requirements?.length > 0 && (
                  <ul className="mt-4 grid sm:grid-cols-2 gap-2">
                    {c.requirements.map((r) => (
                      <li key={r} className="text-sm text-slate/80">
                        ✓ {r}
                      </li>
                    ))}
                  </ul>
                )}
                <a
                  href={`mailto:careers@marjanclassic.com?subject=${encodeURIComponent('Application: ' + c.title)}`}
                  className="inline-block mt-5 text-xs uppercase tracking-widest bg-ink text-stone px-5 py-2.5 rounded-full font-semibold hover:bg-brass hover:text-ink transition-colors"
                >
                  Apply Now
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
};

export default Careers;

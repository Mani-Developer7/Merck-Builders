import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import Reveal from '../../components/Reveal';

const rows = [
  { key: 'category', label: 'Category' },
  { key: 'status', label: 'Status' },
  { key: 'location', label: 'Location' },
  { key: 'totalUnits', label: 'Total Units' },
  { key: 'floors', label: 'Floors' },
  { key: 'priceStartingFrom', label: 'Starting Price' },
  { key: 'completionDate', label: 'Completion' },
];

const Compare = () => {
  const [searchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const ids = (searchParams.get('ids') || '').split(',').filter(Boolean);

  useEffect(() => {
    if (ids.length === 0) return;
    Promise.all(ids.map((id) => api.get(`/projects/${id}`).then((r) => r.data).catch(() => null))).then(
      (res) => setProjects(res.filter(Boolean))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (ids.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-slate">
          No properties selected. Go to Projects and tick "Compare" on up to 3 properties.
        </p>
        <Link to="/projects" className="text-brass underline mt-4 inline-block">
          Browse Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <Reveal>
        <p className="text-brass uppercase tracking-widest text-xs font-mono mb-2">Compare</p>
        <h1 className="font-display text-4xl text-ink mb-10">Property Comparison</h1>
      </Reveal>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[640px]">
          <thead>
            <tr>
              <th className="text-left text-xs uppercase tracking-widest text-slate/60 pb-4 pr-4"> </th>
              {projects.map((p) => (
                <th key={p._id} className="text-left pb-4 px-4 min-w-[220px]">
                  <img src={p.coverImage} alt={p.title} className="w-full h-32 object-cover rounded-xl mb-3" />
                  <Link to={`/projects/${p.slug}`} className="font-display text-lg text-ink hover:text-brass">
                    {p.title}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} className="border-t border-slate/10">
                <td className="text-xs uppercase tracking-widest text-slate/60 py-4 pr-4">{r.label}</td>
                {projects.map((p) => (
                  <td key={p._id} className="py-4 px-4 text-sm text-ink font-mono">
                    {p[r.key] || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Compare;

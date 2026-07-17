import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../api/axios';
import ProjectCard from '../../components/ProjectCard';
import Reveal from '../../components/Reveal';

const categories = ['All', 'Residential', 'Commercial', 'Mixed Use'];
const statuses = ['All', 'Upcoming', 'Under Construction', 'Completed'];

const Projects = () => {
  const [searchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || '');

  useEffect(() => {
    const initialCategory = searchParams.get('category');
    if (initialCategory) setCategory(initialCategory);
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (category !== 'All') params.category = category;
    if (status !== 'All') params.status = status;
    api
      .get('/projects', { params })
      .then((res) => setProjects(res.data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, [category, status]);

  const filtered = projects.filter((p) =>
    locationFilter ? p.location.toLowerCase().includes(locationFilter.toLowerCase()) : true
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <Reveal>
        <p className="text-brass uppercase tracking-widest text-xs font-mono mb-2">Projects</p>
        <h1 className="font-display text-4xl md:text-5xl text-ink mb-10">All Developments</h1>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="flex flex-wrap gap-4 mb-10 items-center">
          <input
            placeholder="Filter by location…"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="bg-white border border-slate/20 rounded-full px-5 py-2.5 text-sm outline-none focus:border-brass"
          />
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-colors ${
                  category === c ? 'bg-ink text-stone border-ink' : 'border-slate/30 text-slate hover:border-ink'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-colors ${
                  status === s ? 'bg-brass text-ink border-brass' : 'border-slate/30 text-slate hover:border-brass'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {loading ? (
        <p className="text-slate">Loading projects…</p>
      ) : filtered.length === 0 ? (
        <p className="text-slate">No projects match these filters yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {filtered.map((p, i) => (
            <Reveal key={p._id} delay={(i % 3) * 0.08}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;

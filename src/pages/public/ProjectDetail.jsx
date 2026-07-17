import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import Reveal from '../../components/Reveal';
import EMICalculator from '../../components/EMICalculator';
import MapEmbed from '../../components/MapEmbed';
import SiteVisitModal from '../../components/SiteVisitModal';
import { useFavorites } from '../../context/FavoritesContext';

const priceToNumber = (str) => {
  if (!str) return 5000000;
  const digits = str.replace(/[^0-9]/g, '');
  return digits ? Number(digits) : 5000000;
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [tourMode, setTourMode] = useState('video'); // 'video' | '360'
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    setLoading(true);
    api
      .get(`/projects/${slug}`)
      .then((res) => setProject(res.data))
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="max-w-5xl mx-auto px-6 py-24 text-slate">Loading…</div>;
  if (!project)
    return (
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <p className="text-slate">Project not found.</p>
        <Link to="/projects" className="text-brass underline mt-4 inline-block">
          Back to Projects
        </Link>
      </div>
    );

  const images = [project.coverImage, ...(project.gallery || [])].filter(Boolean);
  const isFav = favorites?.includes(project._id);

  return (
    <div>
      {/* Gallery header */}
      <section className="max-w-7xl mx-auto px-6 pt-16">
        <Reveal>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-brass uppercase tracking-widest text-xs font-mono mb-2">
                {project.category} · {project.status}
              </p>
              <h1 className="font-display text-4xl md:text-5xl text-ink">{project.title}</h1>
              <p className="text-slate mt-2">{project.location}</p>
            </div>
            <button
              onClick={() => toggleFavorite(project._id)}
              className="text-3xl"
              aria-label="Save property"
            >
              {isFav ? '❤️' : '🤍'}
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="grid md:grid-cols-4 gap-3 h-[480px]">
            <div className="md:col-span-3 rounded-2xl overflow-hidden">
              <img src={images[activeImage]} alt={project.title} className="w-full h-full object-cover" />
            </div>
            <div className="hidden md:flex flex-col gap-3 overflow-y-auto">
              {images.map((img, i) => (
                <button key={img + i} onClick={() => setActiveImage(i)} className="rounded-xl overflow-hidden h-[112px]">
                  <img
                    src={img}
                    alt=""
                    className={`w-full h-full object-cover transition-opacity ${
                      i === activeImage ? 'opacity-100 ring-2 ring-brass' : 'opacity-60 hover:opacity-100'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Virtual tour tabs */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Reveal>
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setTourMode('video')}
              className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border ${
                tourMode === 'video' ? 'bg-ink text-stone border-ink' : 'border-slate/30 text-slate'
              }`}
            >
              🎥 Video Walkthrough
            </button>
            <button
              onClick={() => setTourMode('360')}
              className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border ${
                tourMode === '360' ? 'bg-ink text-stone border-ink' : 'border-slate/30 text-slate'
              }`}
            >
              🧭 360° Tour
            </button>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          {tourMode === 'video' ? (
            <div className="rounded-2xl overflow-hidden bg-ink aspect-video flex items-center justify-center">
              <video controls className="w-full h-full object-cover" poster={project.coverImage}>
                <source src="" type="video/mp4" />
              </video>
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden bg-ink aspect-video flex flex-col items-center justify-center text-stone/60 text-sm gap-2 border border-brass/20">
              <span className="text-4xl">🧭</span>
              <p>360° tour embed goes here.</p>
              <p className="text-xs text-stone/40 max-w-sm text-center">
                Drop in a Matterport, Kuula, or Panoraven embed URL/iframe once the scan is ready for this
                project.
              </p>
            </div>
          )}
        </Reveal>
      </section>

      {/* Details + sidebar */}
      <section className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <Reveal>
            <div>
              <h2 className="font-display text-2xl text-ink mb-3">About this Project</h2>
              <p className="text-slate leading-relaxed whitespace-pre-line">{project.description}</p>
            </div>
          </Reveal>

          {project.amenities?.length > 0 && (
            <Reveal delay={0.05}>
              <div>
                <h2 className="font-display text-2xl text-ink mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.amenities.map((a) => (
                    <div key={a} className="text-sm text-slate border border-slate/15 rounded-lg px-3 py-2">
                      ✓ {a}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <div>
              <h2 className="font-display text-2xl text-ink mb-4">Location</h2>
              <MapEmbed query={encodeURIComponent(project.location)} height={360} />
            </div>
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal>
            <div className="bg-ink-2 border border-brass/20 rounded-2xl p-6 space-y-3 font-mono text-sm">
              <Row label="Status" value={project.status} />
              <Row label="Category" value={project.category} />
              {project.totalUnits && <Row label="Total Units" value={project.totalUnits} />}
              {project.floors && <Row label="Floors" value={project.floors} />}
              {project.startDate && <Row label="Start Date" value={project.startDate} />}
              {project.completionDate && <Row label="Completion" value={project.completionDate} />}
              {project.priceStartingFrom && <Row label="Starting From" value={project.priceStartingFrom} />}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <button
              onClick={() => setModalOpen(true)}
              className="w-full bg-brass text-ink px-6 py-4 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-brass-light transition-colors"
            >
              Schedule a Site Visit
            </button>
          </Reveal>
        </div>
      </section>

      {/* EMI Calculator */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <Reveal>
          <EMICalculator defaultPrice={priceToNumber(project.priceStartingFrom)} />
        </Reveal>
      </section>

      <SiteVisitModal open={modalOpen} onClose={() => setModalOpen(false)} projectTitle={project.title} />
    </div>
  );
};

const Row = ({ label, value }) => (
  <div className="flex justify-between text-stone">
    <span className="text-stone/50">{label}</span>
    <span>{value}</span>
  </div>
);

export default ProjectDetail;

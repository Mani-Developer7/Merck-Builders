import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const statusColor = {
  Upcoming: 'bg-clay/20 text-clay border-clay/40',
  'Under Construction': 'bg-brass/20 text-brass border-brass/40',
  Completed: 'bg-green-800/20 text-green-700 border-green-700/40',
};

const ProjectCard = ({ project }) => {
  const { favorites, toggleFavorite, compareList, toggleCompare } = useFavorites();
  const [hoverIndex, setHoverIndex] = useState(0);

  const images = useMemo(
    () => [project.coverImage, ...(project.gallery || [])].filter(Boolean).slice(0, 5),
    [project]
  );

  const isNew =
    project.createdAt && Date.now() - new Date(project.createdAt).getTime() < 1000 * 60 * 60 * 24 * 30;
  const isFav = favorites?.includes(project._id);
  const isComparing = compareList?.includes(project._id);

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-ink-2 border border-brass/10 hover:border-brass/40 transition-all duration-300 hover:-translate-y-1">
      <div
        className="relative h-64 overflow-hidden"
        onMouseMove={(e) => {
          if (images.length <= 1) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const pct = (e.clientX - rect.left) / rect.width;
          setHoverIndex(Math.min(images.length - 1, Math.floor(pct * images.length)));
        }}
        onMouseLeave={() => setHoverIndex(0)}
      >
        {images.map((img, i) => (
          <img
            key={img + i}
            src={img}
            alt={project.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              i === hoverIndex ? 'opacity-100' : 'opacity-0'
            } group-hover:scale-105 transition-transform duration-500`}
          />
        ))}

        <div className="absolute top-3 left-3 flex gap-2">
          {project.featured && (
            <span className="text-[10px] uppercase tracking-widest bg-brass text-ink px-2.5 py-1 rounded-full font-semibold">
              Featured
            </span>
          )}
          {isNew && (
            <span className="text-[10px] uppercase tracking-widest bg-clay text-stone px-2.5 py-1 rounded-full font-semibold">
              New
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(project._id);
          }}
          aria-label={isFav ? 'Remove from favorites' : 'Save property'}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-ink900/60 backdrop-blur flex items-center justify-center text-lg transition-transform hover:scale-110"
        >
          {isFav ? '❤️' : '🤍'}
        </button>

        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === hoverIndex ? 'w-5 bg-brass' : 'w-1.5 bg-stone/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-[10px] uppercase tracking-widest border rounded-full px-2.5 py-0.5 ${statusColor[project.status] || ''}`}
          >
            {project.status}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-stone/50 font-mono">
            {project.category}
          </span>
        </div>

        <Link to={`/projects/${project.slug}`}>
          <h3 className="font-display text-xl text-stone group-hover:text-brass transition-colors">
            {project.title}
          </h3>
        </Link>
        <p className="text-sm text-stone/60 mt-1">{project.location}</p>
        <p className="text-sm text-stone/70 mt-3 line-clamp-2">{project.shortDescription}</p>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-brass/10">
          <div className="font-mono text-sm text-brass">
            {project.priceStartingFrom ? `From ${project.priceStartingFrom}` : 'Price on request'}
          </div>
          <label className="flex items-center gap-1.5 text-xs text-stone/50 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={!!isComparing}
              onChange={() => toggleCompare(project._id)}
              className="accent-brass"
            />
            Compare
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

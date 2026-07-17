import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';

const CompareBar = () => {
  const { compareList, clearCompare } = useFavorites();
  if (!compareList || compareList.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-ink border border-brass/40 rounded-full shadow-2xl px-6 py-3 flex items-center gap-4">
      <span className="text-sm text-stone font-body">
        {compareList.length} propert{compareList.length > 1 ? 'ies' : 'y'} selected
      </span>
      <Link
        to={`/compare?ids=${compareList.join(',')}`}
        className="text-xs uppercase tracking-widest bg-brass text-ink px-4 py-2 rounded-full font-semibold hover:bg-brass-light transition-colors"
      >
        Compare Now
      </Link>
      <button onClick={clearCompare} className="text-stone/50 hover:text-stone text-sm" aria-label="Clear comparison">
        ✕
      </button>
    </div>
  );
};

export default CompareBar;

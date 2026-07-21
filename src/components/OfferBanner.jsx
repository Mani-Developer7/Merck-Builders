import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const OfferBanner = () => {
  const [offer, setOffer] = useState(null);
  const [dismissed, setDismissed] = useState(sessionStorage.getItem('offerDismissed') === 'true');

  useEffect(() => {
    api.get('/offer').then((res) => setOffer(res.data)).catch(() => {});
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('offerDismissed', 'true');
    setDismissed(true);
  };

  if (!offer || !offer.enabled || !offer.text || dismissed) return null;

  const isInternal = offer.link?.startsWith('/');
  const content = (
    <span className="text-xs sm:text-sm font-medium tracking-wide">{offer.text}</span>
  );

  return (
    <div className="relative bg-brass text-ink">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-center gap-3 text-center pr-10">
        {offer.link ? (
          isInternal ? (
            <Link to={offer.link} className="hover:underline">
              {content}
            </Link>
          ) : (
            <a href={offer.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {content}
            </a>
          )
        ) : (
          content
        )}
      </div>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss offer"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/60 hover:text-ink text-sm"
      >
        ✕
      </button>
    </div>
  );
};

export default OfferBanner;

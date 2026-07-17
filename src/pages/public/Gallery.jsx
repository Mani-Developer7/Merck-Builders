import { useEffect, useState } from 'react';
import api from '../../api/axios';
import Reveal from '../../components/Reveal';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    api.get('/gallery').then((res) => setItems(res.data)).catch(() => setItems([]));
  }, []);

  const categories = ['All', ...new Set(items.map((i) => i.category))];
  const filtered = category === 'All' ? items : items.filter((i) => i.category === category);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <Reveal>
        <p className="text-brass uppercase tracking-widest text-xs font-mono mb-2">Gallery</p>
        <h1 className="font-display text-4xl md:text-5xl text-ink mb-10">Site &amp; Renders</h1>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="flex gap-2 flex-wrap mb-10">
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
      </Reveal>

      {filtered.length === 0 ? (
        <p className="text-slate">No gallery images yet — add some from the admin dashboard.</p>
      ) : (
        <div className="columns-2 md:columns-3 gap-4 [&>*]:mb-4">
          {filtered.map((item, i) => (
            <Reveal key={item._id} delay={(i % 6) * 0.05}>
              <button onClick={() => setLightbox(item)} className="block w-full rounded-xl overflow-hidden group relative">
                <img src={item.image} alt={item.title} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-ink900/0 group-hover:bg-ink900/30 transition-colors flex items-end p-4">
                  <span className="text-stone text-sm opacity-0 group-hover:opacity-100 transition-opacity">{item.title}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-[70] bg-ink900/90 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox.image} alt={lightbox.title} className="max-h-[85vh] max-w-full rounded-xl" />
        </div>
      )}
    </div>
  );
};

export default Gallery;

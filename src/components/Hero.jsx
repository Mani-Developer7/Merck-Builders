import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Counter from './Counter';
import api from '../api/axios';

const FALLBACK_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop',
    eyebrow: 'Sector 16-A · Shah Latif Town · Karachi',
    title: 'Invest Today, Live Luxuriously with',
    highlight: 'Marjan Classic',
    text: 'Step into a world where smart investment meets elevated living — crafted for long-term value and a lifestyle you truly deserve.',
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop',
    eyebrow: 'Mall & Residency',
    title: 'Find the Home You\u2019ve',
    highlight: 'Always Dreamed Of',
    text: 'Spaces designed for modern families, offering peace, convenience, and lasting satisfaction in the heart of Karachi.',
  },
  {
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=1920&auto=format&fit=crop',
    eyebrow: 'Retail · Residences · Community',
    title: 'A Landmark Address in',
    highlight: 'the Heart of Karachi',
    text: 'Where retail energy and residential calm share one address — thoughtfully planned to match the way you want to live.',
  },
  {
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1920&auto=format&fit=crop',
    eyebrow: 'Book Your Visit Today',
    title: 'Step Into Your Perfect',
    highlight: 'Space With Us',
    text: 'Whether you\u2019re upgrading your lifestyle or securing your first investment, our projects deliver comfort, style, and lasting value.',
  },
];

const AUTOPLAY_MS = 6000;

const Hero = () => {
  const heroRef = useRef(null);
  const bgRefs = useRef([]);
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const [slides, setSlides] = useState(FALLBACK_SLIDES);
  const [index, setIndex] = useState(0);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const timerRef = useRef(null);

  // Load banners managed from the admin dashboard; fall back to defaults if none exist
  useEffect(() => {
    api
      .get('/banners', { params: { active: true } })
      .then((res) => {
        if (res.data && res.data.length > 0) {
          bgRefs.current = [];
          setSlides(res.data);
          setIndex(0);
        }
      })
      .catch(() => {});
  }, []);

  const goTo = useCallback(
    (next) => {
      setIndex(((next % slides.length) + slides.length) % slides.length);
    },
    [slides.length]
  );

  // Autoplay
  useEffect(() => {
    timerRef.current = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [index, goTo]);

  // Crossfade background layers + fade/slide the text content on slide change
  useEffect(() => {
    bgRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, { opacity: i === index ? 1 : 0, duration: 1.2, ease: 'power2.inOut' });
    });

    gsap.fromTo(
      contentRef.current?.querySelectorAll('.hero-fade'),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' }
    );
  }, [index, slides]);

  // Mouse parallax
  useEffect(() => {
    const el = heroRef.current;
    const handleMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      bgRefs.current.forEach((layer) => {
        if (layer) gsap.to(layer, { x, y, duration: 1.2, ease: 'power3.out' });
      });
    };
    el.addEventListener('mousemove', handleMove);
    return () => el.removeEventListener('mousemove', handleMove);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (category) params.set('category', category);
    navigate(`/projects?${params.toString()}`);
  };

  const current = slides[index] || slides[0] || FALLBACK_SLIDES[0];

  return (
    <section ref={heroRef} className="relative h-screen min-h-[640px] overflow-hidden bg-ink">
      {/* Stacked, cross-fading background layers */}
      <div className="absolute inset-0 scale-110">
        {slides.map((s, i) => (
          <div
            key={s._id || s.image}
            ref={(el) => (bgRefs.current[i] = el)}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${s.image}')`, opacity: i === index ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-ink900/70 via-ink900/50 to-ink" />
        <div className="absolute inset-0 blueprint-bg opacity-40" />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
        <p className="hero-fade text-brass uppercase tracking-[0.3em] text-xs font-mono mb-5">
          {current.eyebrow}
        </p>
        <h1 className="hero-fade font-display text-5xl md:text-7xl text-stone leading-[1.05] max-w-3xl">
          {current.title} <span className="text-brass">{current.highlight}</span>
        </h1>
        <p className="hero-fade text-stone/70 max-w-xl mt-6 text-lg leading-relaxed">
          {current.text}
        </p>

        <div className="hero-fade mt-8">
          <a
            href="#featured"
            className="inline-block bg-brass text-ink px-7 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-brass-light transition-colors"
          >
            Explore Property
          </a>
        </div>

        <form
          onSubmit={handleSearch}
          className="hero-fade mt-8 bg-ink-2/80 backdrop-blur-md border border-brass/25 rounded-2xl p-3 flex flex-col sm:flex-row gap-3 max-w-2xl shadow-2xl"
        >
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search by location…"
            className="flex-1 bg-transparent px-4 py-3 text-stone placeholder:text-stone/40 text-sm outline-none"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-transparent px-4 py-3 text-stone text-sm outline-none border-t sm:border-t-0 sm:border-l border-brass/15"
          >
            <option value="" className="text-ink">All Types</option>
            <option value="Residential" className="text-ink">Residential</option>
            <option value="Commercial" className="text-ink">Commercial</option>
            <option value="Mixed Use" className="text-ink">Mixed Use</option>
          </select>
          <button
            type="submit"
            className="bg-brass text-ink px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold hover:bg-brass-light transition-colors"
          >
            Search
          </button>
        </form>
{/* 
        <div className="hero-fade grid grid-cols-3 gap-6 mt-12 max-w-md">
          <Counter end={1000} suffix="+" label="Homes Delivered" />
          <Counter end={500} suffix="+" label="Happy Clients" />
          <Counter end={10} suffix="+" label="Projects" />
        </div> */}
      </div>

      {/* Slider controls */}
      <button
        onClick={() => goTo(index - 1)}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-stone/30 text-stone items-center justify-center hover:bg-brass hover:text-ink hover:border-brass transition-colors"
      >
        ←
      </button>
      <button
        onClick={() => goTo(index + 1)}
        aria-label="Next slide"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-stone/30 text-stone items-center justify-center hover:bg-brass hover:text-ink hover:border-brass transition-colors"
      >
        →
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-brass' : 'w-1.5 bg-stone/40'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

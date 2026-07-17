import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Counter from './Counter';

const Hero = () => {
  const heroRef = useRef(null);
  const videoLayerRef = useRef(null);
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    const layer = videoLayerRef.current;

    const handleMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      gsap.to(layer, { x, y, duration: 1.2, ease: 'power3.out' });
    };

    el.addEventListener('mousemove', handleMove);

    gsap.fromTo(
      '.hero-fade',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
    );

    return () => el.removeEventListener('mousemove', handleMove);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (category) params.set('category', category);
    navigate(`/projects?${params.toString()}`);
  };

  return (
    <section ref={heroRef} className="relative h-screen min-h-[640px] overflow-hidden bg-ink">
      <div ref={videoLayerRef} className="absolute inset-0 scale-110">
        {!videoError ? (
          <video
            className="w-full h-full object-cover opacity-50"
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            poster="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop"
          >
            {/* Replace with your own drone / walkthrough footage of the project */}
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-modern-city-buildings-seen-from-above-33717-large.mp4"
              type="video/mp4"
            />
          </video>
        ) : (
          <div
            className="w-full h-full bg-cover bg-center opacity-50"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop')",
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink900/70 via-ink900/50 to-ink" />
        <div className="absolute inset-0 blueprint-bg opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
        <p className="hero-fade text-brass uppercase tracking-[0.3em] text-xs font-mono mb-5">
          Sector 16-A · Shah Latif Town · Karachi
        </p>
        <h1 className="hero-fade font-display text-5xl md:text-7xl text-stone leading-[1.05] max-w-3xl">
          Marjan Classic <span className="text-brass">Mall &amp; Residency</span>
        </h1>
        <p className="hero-fade text-stone/70 max-w-xl mt-6 text-lg leading-relaxed">
          A landmark mixed-use address where retail energy and residential calm share
          one address in the heart of Karachi.
        </p>

        <form
          onSubmit={handleSearch}
          className="hero-fade mt-10 bg-ink-2/80 backdrop-blur-md border border-brass/25 rounded-2xl p-3 flex flex-col sm:flex-row gap-3 max-w-2xl shadow-2xl"
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

        <div className="hero-fade grid grid-cols-3 gap-6 mt-16 max-w-md">
          <Counter end={1000} suffix="+" label="Homes Delivered" />
          <Counter end={500} suffix="+" label="Happy Clients" />
          <Counter end={10} suffix="+" label="Projects" />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-stone/50 text-xs uppercase tracking-widest animate-bounce">
        Scroll ↓
      </div>
    </section>
  );
};

export default Hero;

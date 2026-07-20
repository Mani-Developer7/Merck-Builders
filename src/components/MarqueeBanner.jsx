const items = [
  'Discover Your Dream Home',
  'Explore Luxury Residences',
  'Retail Spaces Ready to Move',
  'Easy & Affordable Payment Plans',
  'Invest Smart, Live Better',
];

const MarqueeBanner = () => (
  <div className="bg-brass text-ink py-4 overflow-hidden border-y border-ink/10">
    <div className="flex whitespace-nowrap animate-marquee">
      {[...items, ...items, ...items].map((text, i) => (
        <span key={i} className="mx-8 flex items-center gap-3 text-sm uppercase tracking-widest font-semibold">
          <span className="text-ink/50">✦</span> {text}
        </span>
      ))}
    </div>
  </div>
);

export default MarqueeBanner;

import Reveal from './Reveal';

const services = [
  {
    icon: '🏗️',
    title: 'Land Development',
    text: 'Infrastructure planning, zoning, and site preparation that lays the groundwork for every project we build.',
  },
  {
    icon: '🏢',
    title: 'Residential & Commercial',
    text: 'Apartments, offices, and retail spaces designed and constructed to modern standards of comfort and durability.',
  },
  {
    icon: '🏘️',
    title: 'Mall & Retail Development',
    text: 'Purpose-built retail floors, food courts, and lifestyle spaces designed to drive footfall and long-term value.',
  },
  {
    icon: '📐',
    title: 'Project Management',
    text: 'End-to-end planning, budgeting, and scheduling so every phase — from foundation to handover — stays on track.',
  },
  {
    icon: '🎨',
    title: 'Interior Finishing',
    text: 'Turnkey finishing services covering flooring, fittings, and fixtures across residential and commercial units.',
  },
  {
    icon: '🛡️',
    title: 'Facility & Amenity Management',
    text: 'Ongoing maintenance, security, and amenity upkeep that protects your investment long after handover.',
  },
];

const ServicesSection = () => (
  <section className="bg-ink text-stone py-24">
    <div className="max-w-7xl mx-auto px-6">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-brass uppercase tracking-widest text-xs font-mono mb-3">Our Services</p>
          <h2 className="font-display text-3xl md:text-4xl">What Can We Offer?</h2>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 0.08}>
            <div className="group bg-ink-2 border border-brass/15 rounded-2xl p-7 h-full hover:border-brass/50 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <span className="text-3xl">{s.icon}</span>
                <span className="font-mono text-xs text-brass/60 group-hover:text-brass transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="font-display text-xl mb-2 group-hover:text-brass transition-colors">{s.title}</h3>
              <p className="text-sm text-stone/60 leading-relaxed">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;

import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const CompanyIntro = () => (
  <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-14 items-center">
    <Reveal>
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"
          alt="Marjan Classic Mall & Residency"
          className="rounded-2xl w-full h-[420px] object-cover"
        />
        <div className="absolute -bottom-6 -right-6 bg-ink text-stone rounded-2xl px-7 py-6 shadow-xl hidden sm:block">
          <div className="font-display text-3xl text-brass">10+</div>
          <div className="text-xs uppercase tracking-widest text-stone/60 mt-1">Years Building Karachi</div>
        </div>
      </div>
    </Reveal>

    <Reveal delay={0.1}>
      <p className="text-brass uppercase tracking-widest text-xs font-mono mb-3">Marjan Classic Mall &amp; Residency</p>
      <h2 className="font-display text-3xl md:text-4xl text-ink mb-6">Company Introduction</h2>
      <p className="text-slate leading-relaxed mb-4">
        Marjan Classic Mall &amp; Residency is a landmark mixed-use development in Sector 16-A,
        Shah Latif Town, Karachi — built on a simple promise: transparent dealings, timely
        delivery, and construction quality that speaks for itself.
      </p>
      <p className="text-slate leading-relaxed mb-4">
        From land development to handover, our in-house team manages every stage of the
        project, merging modern engineering practices with practical, liveable design. Every
        unit — residential or commercial — is planned for long-term comfort and lasting value.
      </p>
      <p className="text-slate leading-relaxed mb-8">
        Backed by an experienced leadership team, we're building more than towers — we're
        building a trusted address for families and investors across Karachi.
      </p>
      <Link
        to="/projects"
        className="inline-block bg-ink text-stone px-7 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-brass hover:text-ink transition-colors"
      >
        Explore Our Projects
      </Link>
    </Reveal>
  </section>
);

export default CompanyIntro;

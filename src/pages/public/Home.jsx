import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import Hero from '../../components/Hero';
import CompanyIntro from '../../components/CompanyIntro';
import ServicesSection from '../../components/ServicesSection';
import MarqueeBanner from '../../components/MarqueeBanner';
import ProjectCard from '../../components/ProjectCard';
import Reveal from '../../components/Reveal';
import EMICalculator from '../../components/EMICalculator';
import TestimonialSlider from '../../components/TestimonialSlider';
import MapEmbed from '../../components/MapEmbed';
import BeforeAfterSlider from '../../components/BeforeAfterSlider';

// const partnerLogos = ['NBP', 'HBL Bank', 'Meezan Bank', 'UBL', 'Askari Bank'];
const awards = ['Best Mixed-Use Development 2024', 'Karachi Real Estate Excellence Award', 'ISO 9001 Certified'];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/projects', { params: { featured: true } })
      .then((res) => setFeatured(res.data.slice(0, 3)))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Hero />

      <CompanyIntro />

      {/* Featured Properties */}
      <section id="featured" className="max-w-7xl mx-auto px-6 py-24">
        <Reveal>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-brass uppercase tracking-widest text-xs font-mono mb-2">Featured</p>
              <h2 className="font-display text-3xl md:text-4xl text-ink">Signature Developments</h2>
            </div>
            <Link to="/projects" className="text-sm text-clay hover:text-brass uppercase tracking-widest">
              View all →
            </Link>
          </div>
        </Reveal>

        {loading ? (
          <p className="text-slate">Loading projects…</p>
        ) : featured.length === 0 ? (
          <p className="text-slate">
            No featured projects yet — add some from the admin dashboard and they'll appear here.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {featured.map((p, i) => (
              <Reveal key={p._id} delay={i * 0.1}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <ServicesSection />

      {/* Virtual Experience */}
      <section className="bg-ink text-stone py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-brass uppercase tracking-widest text-xs font-mono mb-2">Virtual Experience</p>
            <h2 className="font-display text-3xl md:text-4xl mb-10">Watch Construction Progress</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop"
              afterImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
              beforeLabel="Foundation — 2023"
              afterLabel="Present Day"
            />
          </Reveal>
          <p className="text-stone/50 text-sm mt-4 font-mono">
            Drag the slider to compare. Swap in real site photos from the admin gallery for each project.
          </p>
        </div>
      </section>

      {/* EMI Calculator */}
      {/* <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-start">
        <Reveal>
          <p className="text-clay uppercase tracking-widest text-xs font-mono mb-2">Smart Tools</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">Plan Your Investment</h2>
          <p className="text-slate leading-relaxed max-w-md">
            Use our calculator to estimate monthly installments based on your down payment and
            preferred tenure — then schedule a site visit to see it in person.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <EMICalculator />
        </Reveal>
      </section> */}


      {/* Trust Section */}
      <section className="bg-ink text-stone py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-brass uppercase tracking-widest text-xs font-mono mb-2 text-center">Trust</p>
            <h2 className="font-display text-3xl md:text-4xl mb-14 text-center">What Our Clients Say</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <TestimonialSlider />
          </Reveal>

          {/* 
           */}

          <Reveal delay={0.25}>
            <div className="mt-14 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {awards.map((a) => (
                <div
                  key={a}
                  className="border border-brass/20 rounded-xl px-4 py-4 text-center text-xs text-stone/70 uppercase tracking-wide"
                >
                  🏆 {a}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <MarqueeBanner />

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">
            Ready to see it in person?
          </h2>
          <p className="text-slate mb-8">Schedule a guided tour of Marjan Classic Mall &amp; Residency today.</p>
          <Link
            to="/contact"
            className="inline-block bg-ink text-stone px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-brass hover:text-ink transition-colors"
          >
            Book a Visit
          </Link>
        </Reveal>
      </section>



      {/* Interactive Map */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <Reveal>
          <p className="text-brass uppercase tracking-widest text-xs font-mono mb-2">Location</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-8">Find Us in Karachi</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <MapEmbed />
        </Reveal>
      </section>
    </div>
  );
};

export default Home;

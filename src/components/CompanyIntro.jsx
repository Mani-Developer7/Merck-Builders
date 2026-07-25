import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const CompanyIntro = () => (
  <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-14 items-center">
    <Reveal>
      <div className="relative">
        <img
          src="/CompanyIntro.jpeg"
          alt="Marjan Classic Mall & Residency"
          className="rounded-2xl w-full h-[430px] object-cover"
        />
        <div className="absolute -bottom-6 -right-6 bg-ink text-stone rounded-2xl px-7 py-6 shadow-xl hidden sm:block">
          <div className="font-display text-3xl text-brass">10+</div>
          <div className="text-xs uppercase tracking-widest text-stone/60 mt-1">Years Building Karachi</div>
        </div>
      </div>
    </Reveal>

    <Reveal delay={0.1}>
      <p className="text-brass uppercase tracking-widest text-xs font-mono mb-3">Merck &amp; Builders</p>
      <h2 className="font-display text-3xl md:text-4xl text-ink mb-6">Company Introduction</h2>
      <p className="text-slate leading-relaxed mb-4">
        Merck Group of Builders is a trusted real estate and construction company committed to delivering high-quality residential and commercial developments in Karachi. With a strong presence in Shah Latif Town we focus on developing modern projects that combine quality construction, strategic locations, and long-term value for homeowners and investors.

        Our experienced team is dedicated to maintaining the highest standards of construction, transparency, and customer satisfaction. From planning and design to project completion, we ensure every development is executed with professionalism, attention to detail, and a commitment to timely delivery.

        At Merck Group of Builders, we believe in building more than just properties we create communities where families can live comfortably and investors can invest with confidence. Our mission is to deliver reliable, value-driven developments through integrity, innovation, and quality craftsmanship. Our vision is to become one of Pakistan's most trusted real estate developers by creating sustainable projects that stand the test of time.

        Merck Group of Builders – Building the Future with Trust & Excellence
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

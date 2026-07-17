import { useEffect, useState } from 'react';

const testimonials = [
  {
    name: 'Ahmed Raza',
    role: 'Homeowner, Residency Tower A',
    quote:
      'The handover process was transparent and the finishing quality exceeded what was promised in the brochure.',
    rating: 5,
  },
  {
    name: 'Sana Malik',
    role: 'Shop Owner, Marjan Classic Mall',
    quote:
      'Footfall at the mall has been strong since day one — the location and layout planning really paid off.',
    rating: 5,
  },
  {
    name: 'Bilal Hussain',
    role: 'Investor',
    quote:
      'Clear payment plans and regular construction updates made this the easiest property investment I have made.',
    rating: 4,
  },
];

const Stars = ({ count }) => (
  <div className="text-brass text-sm tracking-widest">{'★'.repeat(count)}{'☆'.repeat(5 - count)}</div>
);

const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const current = testimonials[index];

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-ink-2 border border-brass/20 rounded-2xl p-10 backdrop-blur">
        <Stars count={current.rating} />
        <p className="font-display text-xl md:text-2xl text-stone mt-5 leading-relaxed">
          &ldquo;{current.quote}&rdquo;
        </p>
        <div className="mt-6 text-sm text-stone/60 font-body">
          <span className="text-brass font-semibold">{current.name}</span> — {current.role}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Show testimonial ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-brass' : 'w-1.5 bg-stone/30'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;

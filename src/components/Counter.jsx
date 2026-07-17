import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Counter = ({ end, suffix = '', label }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: end,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate: () => {
          el.textContent = Math.floor(obj.val).toLocaleString() + suffix;
        },
      });
    });
    return () => ctx.revert();
  }, [end, suffix]);

  return (
    <div className="text-center">
      <div ref={ref} className="font-display text-4xl md:text-5xl text-brass">
        0{suffix}
      </div>
      <div className="mt-2 text-xs uppercase tracking-widest text-stone/60 font-body">{label}</div>
    </div>
  );
};

export default Counter;

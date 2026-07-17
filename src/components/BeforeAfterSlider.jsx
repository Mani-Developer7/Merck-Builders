import { useRef, useState } from 'react';

const BeforeAfterSlider = ({ beforeImage, afterImage, beforeLabel = 'Before', afterLabel = 'After' }) => {
  const [pos, setPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const updatePos = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-brass/20"
      onMouseDown={(e) => {
        dragging.current = true;
        updatePos(e.clientX);
      }}
      onMouseMove={(e) => dragging.current && updatePos(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchMove={(e) => updatePos(e.touches[0].clientX)}
    >
      <img src={afterImage} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="h-full object-cover"
          style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%', maxWidth: 'none' }}
        />
      </div>

      <div className="absolute top-0 bottom-0 w-0.5 bg-brass" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brass text-ink flex items-center justify-center shadow-lg">
          ↔
        </div>
      </div>

      <span className="absolute bottom-4 left-4 text-xs uppercase tracking-widest bg-ink900/70 text-stone px-3 py-1 rounded-full">
        {beforeLabel}
      </span>
      <span className="absolute bottom-4 right-4 text-xs uppercase tracking-widest bg-ink900/70 text-stone px-3 py-1 rounded-full">
        {afterLabel}
      </span>
    </div>
  );
};

export default BeforeAfterSlider;

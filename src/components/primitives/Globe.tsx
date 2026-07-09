/* OG kmads.dev hero globe — outer text ring spins CCW (20s), inner globe
   static, exactly like the original site (git history: src/components/Hero.jsx). */
export default function Globe({ size = 380 }: { size?: number }) {
  return (
    <div className="globe" style={{ width: size }} aria-hidden="true">
      <img src="/assets/globe-text.svg" className="globe__outer" alt="" />
      <img src="/assets/globe.svg" className="globe__inner" alt="" />
    </div>
  );
}

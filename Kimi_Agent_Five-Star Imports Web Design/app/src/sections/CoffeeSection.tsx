import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CoffeeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoCardRef = useRef<HTMLDivElement>(null);
  const textCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bulletsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (!isDesktop) return;

    const section = sectionRef.current;
    const photoCard = photoCardRef.current;
    const textCard = textCardRef.current;
    const headline = headlineRef.current;
    const bullets = bulletsRef.current;

    if (!section || !photoCard || !textCard || !headline || !bullets) return;

    const ctx = gsap.context(() => {
      const bulletItems = bullets.querySelectorAll('li');

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      scrollTl
        .fromTo(
          photoCard,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          textCard,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          headline,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(
          bulletItems,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.1
        )
        .fromTo(
          photoCard,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          textCard,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="coffee"
      className="relative w-full min-h-screen md:h-screen bg-off-white overflow-hidden z-30"
    >
      {/* Mobile Layout */}
      <div className="md:hidden px-5 pt-24 pb-10 space-y-5">
        <div className="rounded-3xl overflow-hidden shadow-card">
          <img
            src="/coffee_cherries.jpg"
            alt="Coffee cherries"
            className="w-full h-[46vh] object-cover"
          />
        </div>

        <div className="rounded-3xl bg-navy shadow-card p-6 flex flex-col gap-6">
          <div>
            <span className="micro-label text-gold block mb-4">
              SPECIALTY & COMMERCIAL
            </span>

            <h2 className="text-white text-4xl leading-[1] font-heading font-bold mb-5">
              Coffee
            </h2>

            <p className="text-white/80 text-lg leading-relaxed mb-6">
              Ecuadorian arabica sourced from high-altitude farms—traceable lots with consistent cup profiles.
            </p>

            <ul className="space-y-3">
              {[
                'Washed & natural processes',
                'Micro-lots & blends',
                'Export-ready grading & packaging'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={scrollToContact}
            className="group bg-gold hover:bg-gold/90 text-navy px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-300"
          >
            Request coffee specs
            <ArrowRight className="w-4 h-4 transition-transform" />
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="absolute inset-0 hidden md:flex items-center justify-center px-[6vw]">
        {/* Photo Card - Left */}
        <div
          ref={photoCardRef}
          className="absolute left-[6vw] top-[10vh] w-[40vw] h-[80vh] rounded-3xl overflow-hidden shadow-card"
        >
          <img
            src="/coffee_cherries.jpg"
            alt="Coffee cherries"
            className="w-full h-full object-cover animate-slow-zoom"
          />
        </div>

        {/* Text Card - Right */}
        <div
          ref={textCardRef}
          className="absolute left-[50vw] top-[10vh] w-[44vw] h-[80vh] rounded-3xl bg-navy shadow-card p-[clamp(28px,3.2vw,56px)] flex flex-col justify-between"
        >
          <div>
            <span className="micro-label text-gold block mb-6">
              SPECIALTY & COMMERCIAL
            </span>

            <h2
              ref={headlineRef}
              className="text-white text-[clamp(42px,4.5vw,72px)] leading-[1] font-heading font-bold mb-6"
            >
              Coffee
            </h2>

            <p className="text-white/80 text-lg leading-relaxed max-w-md mb-8">
              Ecuadorian arabica sourced from high-altitude farms—traceable lots with consistent cup profiles.
            </p>

            <ul ref={bulletsRef} className="space-y-3">
              {[
                'Washed & natural processes',
                'Micro-lots & blends',
                'Export-ready grading & packaging'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={scrollToContact}
            className="group bg-gold hover:bg-gold/90 text-navy px-6 py-3 rounded-full font-medium flex items-center gap-2 w-fit transition-all duration-300 hover:-translate-y-0.5"
          >
            Request coffee specs
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

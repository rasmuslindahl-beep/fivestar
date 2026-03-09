import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoCardRef = useRef<HTMLDivElement>(null);
  const textCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const microLabelRef = useRef<HTMLSpanElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (!isDesktop) return;

    const section = sectionRef.current;
    const photoCard = photoCardRef.current;
    const textCard = textCardRef.current;
    const headline = headlineRef.current;
    const microLabel = microLabelRef.current;
    const subhead = subheadRef.current;
    const cta = ctaRef.current;
    const trust = trustRef.current;

    if (!section || !photoCard || !textCard || !headline) return;

    const ctx = gsap.context(() => {
      gsap.set([photoCard, textCard], { opacity: 0 });
      gsap.set(photoCard, { x: '-60vw' });
      gsap.set(textCard, { x: '60vw' });
      gsap.set([microLabel, subhead, cta, trust], { opacity: 0, y: 18 });

      const originalText = headline.innerText;
      const words = originalText.split(' ');
      headline.innerHTML = words
        .map(
          (word) =>
            `<span class="inline-block overflow-hidden"><span class="word inline-block">${word}</span></span>`
        )
        .join(' ');
      const wordElements = headline.querySelectorAll('.word');
      gsap.set(wordElements, { opacity: 0, y: 40 });

      const entranceTl = gsap.timeline({ delay: 0.2 });

      entranceTl
        .to(photoCard, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' })
        .to(textCard, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '<')
        .to(wordElements, { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power3.out' }, '-=0.6')
        .to(microLabel, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.5')
        .to(subhead, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .to(cta, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .to(trust, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.2');

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([photoCard, textCard], { opacity: 1, x: 0, scale: 1 });
            gsap.set(wordElements, { opacity: 1, y: 0 });
            gsap.set([microLabel, subhead, cta, trust], { opacity: 1, y: 0 });
          }
        }
      });

      scrollTl
        .fromTo(
          photoCard,
          { x: 0, scale: 1, opacity: 1 },
          { x: '-18vw', scale: 0.96, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          textCard,
          { x: 0, scale: 1, opacity: 1 },
          { x: '18vw', scale: 0.96, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          wordElements,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, stagger: 0.02, ease: 'power2.in' },
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
      id="hero"
      className="relative w-full min-h-screen md:h-screen bg-off-white overflow-hidden z-10"
    >
      {/* Mobile Hero */}
      <div className="md:hidden px-5 pt-24 pb-10 space-y-5">
        <div className="rounded-3xl overflow-hidden shadow-card">
          <img
            src="/hero_cacao_pods.jpg"
            alt="Cacao pods on branch"
            className="w-full h-[46vh] object-cover"
          />
        </div>

        <div className="rounded-3xl bg-navy shadow-card p-6 flex flex-col gap-6">
          <div>
            <span className="micro-label text-gold block mb-4">
              ECUADOR → EUROPE
            </span>

            <h1 className="text-white text-4xl leading-[0.95] font-heading font-bold mb-5">
              Traceable cacao, coffee & panela
            </h1>

            <p className="text-white/80 text-lg leading-relaxed">
              Direct-from-producer supply for European chocolate makers, roasters, and food manufacturers.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <button
              onClick={scrollToContact}
              className="group bg-gold hover:bg-gold/90 text-navy px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-300"
            >
              Request a quote
              <ArrowRight className="w-4 h-4 transition-transform" />
            </button>

            <p className="text-white/50 text-sm font-mono">
              EUDR-ready documentation • Farm-level traceability
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Hero */}
      <div className="absolute inset-0 hidden md:flex items-center justify-center px-[6vw]">
        <div
          ref={photoCardRef}
          className="absolute left-[6vw] top-[10vh] w-[40vw] h-[80vh] rounded-3xl overflow-hidden shadow-card"
        >
          <img
            src="/hero_cacao_pods.jpg"
            alt="Cacao pods on branch"
            className="w-full h-full object-cover"
          />
        </div>

        <div
          ref={textCardRef}
          className="absolute left-[50vw] top-[10vh] w-[44vw] h-[80vh] rounded-3xl bg-navy shadow-card p-[clamp(28px,3.2vw,56px)] flex flex-col justify-between"
        >
          <div>
            <span
              ref={microLabelRef}
              className="micro-label text-gold block mb-6"
            >
              ECUADOR → EUROPE
            </span>

            <h1
              ref={headlineRef}
              className="text-white text-[clamp(36px,4vw,64px)] leading-[0.95] font-heading font-bold mb-6"
            >
              Traceable cacao, coffee & panela
            </h1>

            <p
              ref={subheadRef}
              className="text-white/80 text-lg leading-relaxed max-w-md"
            >
              Direct-from-producer supply for European chocolate makers, roasters, and food manufacturers.
            </p>
          </div>

          <div>
            <div ref={ctaRef} className="flex items-center gap-6 mb-8">
              <button
                onClick={scrollToContact}
                className="group bg-gold hover:bg-gold/90 text-navy px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
              >
                Request a quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <p
              ref={trustRef}
              className="text-white/50 text-sm font-mono"
            >
              EUDR-ready documentation • Farm-level traceability
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

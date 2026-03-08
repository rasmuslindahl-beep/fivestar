import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Download } from 'lucide-react';

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
      // Initial state (hidden)
      gsap.set([photoCard, textCard], { opacity: 0 });
      gsap.set(photoCard, { x: '-60vw' });
      gsap.set(textCard, { x: '60vw' });
      gsap.set([microLabel, subhead, cta, trust], { opacity: 0, y: 18 });
      
      // Split headline into words
      const words = headline.innerText.split(' ');
      headline.innerHTML = words.map(word => `<span class="inline-block overflow-hidden"><span class="word inline-block">${word}</span></span>`).join(' ');
      const wordElements = headline.querySelectorAll('.word');
      gsap.set(wordElements, { opacity: 0, y: 40 });

      // Auto-play entrance animation
      const entranceTl = gsap.timeline({ delay: 0.2 });
      
      entranceTl
        .to(photoCard, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' })
        .to(textCard, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '<')
        .to(wordElements, { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power3.out' }, '-=0.6')
        .to(microLabel, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.5')
        .to(subhead, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .to(cta, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .to(trust, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.2');

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([photoCard, textCard], { opacity: 1, x: 0, scale: 1 });
            gsap.set(wordElements, { opacity: 1, y: 0 });
            gsap.set([microLabel, subhead, cta, trust], { opacity: 1, y: 0 });
          }
        }
      });

      // Exit phase (70% - 100%)
      scrollTl
        .fromTo(photoCard, 
          { x: 0, scale: 1, opacity: 1 },
          { x: '-18vw', scale: 0.96, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(textCard,
          { x: 0, scale: 1, opacity: 1 },
          { x: '18vw', scale: 0.96, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(wordElements,
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
      className="relative w-full h-screen bg-off-white overflow-hidden z-10"
    >
      <div className="absolute inset-0 flex items-center justify-center px-[6vw]">
        {/* Photo Card - Left */}
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

        {/* Text Card - Right */}
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

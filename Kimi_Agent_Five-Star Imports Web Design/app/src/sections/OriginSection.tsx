import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function OriginSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardARef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cardA = cardARef.current;
    const cardB = cardBRef.current;

    if (!section || !heading || !cardA || !cardB) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Card A animation
      const cardAImage = cardA.querySelector('.card-image');
      const cardAText = cardA.querySelector('.card-text');
      const proofPoints = cardA.querySelectorAll('.proof-point');

      gsap.fromTo(cardAImage,
        { x: '-10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardA,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(cardAText,
        { x: '10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardA,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(proofPoints,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardA,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Card B animation
      const cardBImage = cardB.querySelector('.card-image');
      const cardBText = cardB.querySelector('.card-text');

      gsap.fromTo(cardBImage,
        { x: '10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardB,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(cardBText,
        { x: '-10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardB,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
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
      id="origin"
      className="relative w-full bg-off-white py-24 z-50"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading Block */}
        <div ref={headingRef} className="text-center mb-20">
          <span className="micro-label text-gold block mb-4">ORIGIN</span>
          <h2 className="text-navy text-[clamp(36px,4vw,56px)] font-heading font-bold mb-4">
            From Ecuador. For Europe.
          </h2>
          <p className="text-gray text-lg max-w-2xl mx-auto">
            We work directly with producers and exporters who know their farms—and can prove it.
          </p>
        </div>

        {/* Card A - Image Left, Text Right */}
        <div ref={cardARef} className="flex flex-col lg:flex-row gap-0 mb-12 rounded-3xl overflow-hidden shadow-card">
          <div className="card-image w-full lg:w-1/2 h-[40vh] lg:h-[52vh]">
            <img 
              src="/origin_farm.jpg" 
              alt="Ecuadorian farm landscape"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="card-text w-full lg:w-1/2 bg-navy p-8 lg:p-12 flex flex-col justify-center">
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              Every lot is traceable to the farm or cooperative level, with documentation ready for European compliance.
            </p>
            <div className="space-y-4">
              {[
                'Legal production verification',
                'Responsible sourcing practices',
                'Clear chain of custody'
              ].map((item, i) => (
                <div key={i} className="proof-point flex items-center gap-3 text-white/70">
                  <Check className="w-5 h-5 text-gold flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card B - Text Left, Image Right */}
        <div ref={cardBRef} className="flex flex-col lg:flex-row-reverse gap-0 rounded-3xl overflow-hidden shadow-card">
          <div className="card-image w-full lg:w-1/2 h-[40vh] lg:h-[52vh]">
            <img 
              src="/founder_hands.jpg" 
              alt="Hands holding coffee beans"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="card-text w-full lg:w-1/2 bg-navy p-8 lg:p-12 flex flex-col justify-center">
            <p className="text-white/90 text-lg leading-relaxed mb-6">
              Founded by Rasmus Lindahl after years working in Ecuador on sustainability and environmental projects.
            </p>
            <p className="text-white/70 leading-relaxed mb-8">
              Today, we connect those relationships with European buyers who value transparency.
            </p>
            <button 
              onClick={scrollToContact}
              className="group text-gold hover:text-white flex items-center gap-2 transition-colors w-fit"
            >
              Have a question? Reach out directly
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

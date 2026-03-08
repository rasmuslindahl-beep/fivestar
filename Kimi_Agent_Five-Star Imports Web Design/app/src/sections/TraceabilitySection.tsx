import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, FileCheck, Scale } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: MapPin,
    title: 'Farm-level traceability',
    description: 'Know the region, farm, or cooperative behind every lot.'
  },
  {
    icon: FileCheck,
    title: 'EUDR-ready supply chains',
    description: 'Documentation for legal production and responsible sourcing.'
  },
  {
    icon: Scale,
    title: 'Transparent pricing',
    description: 'Clear terms, direct relationships, no hidden layers.'
  }
];

export default function TraceabilitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;

    if (!section || !heading || !cards) return;

    const ctx = gsap.context(() => {
      const cardElements = cards.querySelectorAll('.feature-card');

      // Heading animation
      gsap.fromTo(heading,
        { y: 30, opacity: 0 },
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

      // Cards animation
      gsap.fromTo(cardElements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="traceability"
      className="relative w-full bg-off-white py-24 z-50"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading Block */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="micro-label text-gold block mb-4">TRACEABILITY</span>
          <h2 className="text-navy text-[clamp(36px,4vw,56px)] font-heading font-bold mb-4">
            Documentation that holds up.
          </h2>
          <p className="text-gray text-lg max-w-2xl mx-auto">
            We source from suppliers prepared for the EU Deforestation-Free Regulation—so you can focus on product development, not paperwork.
          </p>
        </div>

        {/* Feature Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div 
              key={i}
              className="feature-card bg-white rounded-2xl p-8 shadow-card hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-navy text-xl font-heading font-bold mb-3">
                {feature.title}
              </h3>
              <p className="text-gray leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

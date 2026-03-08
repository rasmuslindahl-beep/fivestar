import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    product: '',
    message: ''
  });

  useEffect(() => {
    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const formCard = formCardRef.current;

    if (!section || !leftCol || !formCard) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(leftCol,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(formCard,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Inquiry sent! We will respond within two business days.');
    setFormData({ name: '', company: '', email: '', product: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-navy py-24 z-50"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div ref={leftColRef} className="lg:w-2/5">
            <span className="micro-label text-gold block mb-4">CONTACT</span>
            <h2 className="text-white text-[clamp(36px,4vw,56px)] font-heading font-bold mb-6">
              Request a quote
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              Tell us what you're looking for—origin, volume, specs—and we'll respond within two business days.
            </p>
            
            <div className="space-y-5">
              <a 
                href="tel:+46702329484" 
                className="flex items-center gap-4 text-white/80 hover:text-gold transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-mono">+46 70 232 94 84</span>
              </a>
              
              <a 
                href="mailto:rasmus.lindahl@gmail.com" 
                className="flex items-center gap-4 text-white/80 hover:text-gold transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-mono">rasmus.lindahl@gmail.com</span>
              </a>
              
              <div className="flex items-center gap-4 text-white/80">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="font-mono">Sund 124, 873 96 Docksta, Sweden</span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div ref={formCardRef} className="lg:w-3/5">
            <form 
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 lg:p-10 shadow-card"
            >
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-navy text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-navy/10 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-navy text-sm font-medium mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-navy/10 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-navy text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-navy/10 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-navy text-sm font-medium mb-2">
                    Product interest
                  </label>
                  <select
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-navy/10 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-white"
                  >
                    <option value="">Select a product</option>
                    <option value="cacao">Cacao</option>
                    <option value="coffee">Coffee</option>
                    <option value="panela">Panela</option>
                    <option value="multiple">Multiple products</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-navy text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-navy/10 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all resize-none"
                  placeholder="Tell us about your needs—volume, specs, timeline..."
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  className="group bg-gold hover:bg-gold/90 text-navy px-8 py-3 rounded-full font-medium flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Send inquiry
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-gray text-sm">
                  Prefer email? You can also attach your brief.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-6 mt-20 pt-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Five-Star Imports" className="h-10 w-auto" />
            <span className="text-white/60 text-sm">Five-Star Imports</span>
          </div>
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Five-Star Imports. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}

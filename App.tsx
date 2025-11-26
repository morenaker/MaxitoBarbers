import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { VARIANTS, BENEFITS } from './constants';
import { Icon } from './components/Icon';
import { Booking } from './components/Booking';
import { AIChat } from './components/AIChat';
import { Hero } from './components/Hero';

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      // Použijeme jinou šablonu pro kontaktní formulář, např. VITE_EMAILJS_CONTACT_TEMPLATE_ID
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID; 

      if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
        throw new Error('EmailJS pro kontaktní formulář není správně nakonfigurován. Zkontrolujte .env.local soubor.');
      }

      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        message: formData.message,
      };

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      setFormStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', message: '' }); // Vyčistit formulář
    } catch (error) {
      console.error('Chyba při odesílání kontaktního formuláře:', error);
      setFormStatus('error');
    }
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-primary-100 selection:text-primary-900">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-serif font-bold tracking-tighter flex items-center gap-1 group">
            MAXITO<span className="text-primary-600 group-hover:text-primary-500 transition-colors">BARBERS</span>
          </a>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold tracking-wide text-gray-800">
            <a href="#vyhody" className="hover:text-primary-600 transition-colors">VÝHODY</a>
            <a href="#nabidka" className="hover:text-primary-600 transition-colors">VARIANTY</a>
            <a href="#portfolio" className="hover:text-primary-600 transition-colors">PORTFOLIO</a>
            <a href="#kontakt" className="hover:text-primary-600 transition-colors">KONTAKT</a>
            <a href="#booking" className="px-5 py-2.5 bg-gray-900 text-white hover:bg-primary-600 transition-all rounded-lg shadow-lg shadow-gray-900/10">
              REZERVACE
            </a>
          </div>

          <button 
            className="md:hidden text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? 'x' : 'menu'} size={28} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl py-6 px-6 flex flex-col space-y-4 animate-fade-in">
            <a href="#vyhody" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-lg font-medium text-gray-800 hover:text-primary-600">Výhody</a>
            <a href="#nabidka" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-lg font-medium text-gray-800 hover:text-primary-600">Varianty</a>
            <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-lg font-medium text-gray-800 hover:text-primary-600">Portfolio</a>
            <a href="#kontakt" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-lg font-medium text-gray-800 hover:text-primary-600">Kontakt</a>
            <a href="#booking" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-center bg-primary-600 text-white rounded-lg font-bold">Rezervovat Termín</a>
          </div>
        )}
      </nav>

      <Hero />

      {/* Benefits Section */}
      <section id="vyhody" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Proč si vybrat nás</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-2 mb-6">Řešení bez kompromisů</h2>
            <p className="text-gray-600">Zapomeňte na nepovedené transplantace. Nabízíme okamžitý výsledek s garancí spokojenosti.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((benefit, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <Icon name={benefit.icon} size={26} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-500 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Variants Section */}
      <section id="nabidka" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
                <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Produkty</span>
                <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mt-2">Dostupné Varianty</h2>
            </div>
            <a href="#booking" className="hidden md:flex items-center gap-2 text-gray-900 font-bold hover:text-primary-600 transition-colors mt-4 md:mt-0 border-b-2 border-transparent hover:border-primary-600 pb-1">
                Poradit s výběrem <Icon name="chevron" size={16} />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {VARIANTS.map((variant) => (
              <div key={variant.id} className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300">
                <div className="h-72 overflow-hidden relative">
                    <img src={variant.image} alt={variant.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                        {variant.durability}
                    </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">{variant.title}</h3>
                  <p className="text-gray-600 text-sm mb-8 leading-relaxed">{variant.description}</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                     <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Realismus</span>
                        <span className="text-gray-900 font-bold">{variant.realism}</span>
                     </div>
                     <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary-600 group-hover:text-white transition-all">
                        <Icon name="chevron" size={20} />
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-serif mb-4">Proměny Klientů</h2>
                <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

                {/* Fotka 1 */}
                <div className="relative aspect-[3/4] group overflow-hidden rounded-xl cursor-pointer">
                    <img 
                        src="/photo/modeld1.jpg"
                        alt="Proměna 1"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <span className="text-white font-serif font-bold text-xl">Klient #101</span>
                        <span className="text-primary-400 text-sm">Thin Skin System</span>
                    </div>
                </div>

                {/* Fotka 2 */}
                <div className="relative aspect-[3/4] group overflow-hidden rounded-xl cursor-pointer">
                    <img 
                        src="/photo/modeld2.jpg"
                        alt="Proměna 2"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <span className="text-white font-serif font-bold text-xl">Klient #102</span>
                        <span className="text-primary-400 text-sm">Thin Skin System</span>
                    </div>
                </div>

                {/* Fotka 3 */}
                <div className="relative aspect-[3/4] group overflow-hidden rounded-xl cursor-pointer">
                    <img 
                        src="/photo/modeld3.jpg"
                        alt="Proměna 3"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <span className="text-white font-serif font-bold text-xl">Klient #103</span>
                        <span className="text-primary-400 text-sm">Thin Skin System</span>
                    </div>
                </div>

                {/* Fotka 4 */}
                <div className="relative aspect-[3/4] group overflow-hidden rounded-xl cursor-pointer">
                    <img 
                        src="/public/photo/modeld4.jpg"
                        alt="Proměna 4"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <span className="text-white font-serif font-bold text-xl">Klient #104</span>
                        <span className="text-primary-400 text-sm">Thin Skin System</span>
                    </div>
                </div>

            </div>

            
            {/* <div className="text-center mt-12">
                 <a href="#" className="inline-flex items-center gap-2 text-white border border-white/20 hover:bg-white hover:text-gray-900 px-6 py-3 rounded-full transition-all">
                    Zobrazit celé portfolio
                 </a>
            </div> */}
        </div>
      </section>

      {/* Booking Component (includes ID #booking) */}
      <Booking />

      {/* Contact Section */}
      <section id="kontakt" className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-start">
                <div>
                    <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Kontakt</span>
                    <h2 className="text-4xl font-serif text-gray-900 mt-2 mb-6">Kde nás najdete?</h2>
                    <p className="text-gray-600 mb-10 text-lg">
                        Sídlíme v centru Prahy. Pro osobní návštěvu je nutná předchozí rezervace.
                    </p>
                    
                    <div className="space-y-8">
                        <div className="flex items-start gap-5 group">
                            <div className="bg-primary-50 p-4 rounded-xl text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                <Icon name="map" size={24} />
                            </div>
                            <div>
                                <h4 className="text-gray-900 font-bold text-lg">Maxito Barbers</h4>
                                <p className="text-gray-500">Mánesova 925 <br/> 500 02 Hradec Králové</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-5 group">
                            <div className="bg-primary-50 p-4 rounded-xl text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                <Icon name="phone" size={24} />
                            </div>
                            <div>
                                <h4 className="text-gray-900 font-bold text-lg">Telefon</h4>
                                <a href="tel:+420 739 264 226" className="text-gray-500 hover:text-primary-600 transition-colors">+420 739 264 226</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-5 group">
                            <div className="bg-primary-50 p-4 rounded-xl text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                <Icon name="mail" size={24} />
                            </div>
                            <div>
                                <h4 className="text-gray-900 font-bold text-lg">Email</h4>
                                <a href="mailto:maxim.schejbal@seznam.cz" className="text-gray-500 hover:text-primary-600 transition-colors">maxim.schejbal@seznam.cz</a>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleFormSubmit} className="bg-gray-50 p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Napište nám</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
<label className="block text-xs text-gray-500 uppercase font-bold mb-2">Jméno</label>
	                            <input type="text" name="firstName" value={formData.firstName} onChange={handleFormChange} required className="w-full bg-white border border-gray-200 rounded-lg p-3 text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-all" />
                        </div>
                        <div>
<label className="block text-xs text-gray-500 uppercase font-bold mb-2">Příjmení</label>
	                            <input type="text" name="lastName" value={formData.lastName} onChange={handleFormChange} required className="w-full bg-white border border-gray-200 rounded-lg p-3 text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-all" />
                        </div>
                    </div>
                    <div className="mb-4">
<label className="block text-xs text-gray-500 uppercase font-bold mb-2">Email</label>
	                        <input type="email" name="email" value={formData.email} onChange={handleFormChange} required className="w-full bg-white border border-gray-200 rounded-lg p-3 text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-all" />
                    </div>
                    <div className="mb-6">
<label className="block text-xs text-gray-500 uppercase font-bold mb-2">Zpráva</label>
	                        <textarea rows={4} name="message" value={formData.message} onChange={handleFormChange} required className="w-full bg-white border border-gray-200 rounded-lg p-3 text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-all"></textarea>
                    </div>
{formStatus === 'success' && (
	                        <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
	                            Zpráva byla úspěšně odeslána! Brzy se vám ozveme.
	                        </div>
	                    )}
	                    {formStatus === 'error' && (
	                        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
	                            Chyba při odesílání zprávy. Zkuste to prosím znovu.
	                        </div>
	                    )}
	                    <button 
	                        type="submit" 
	                        disabled={formStatus === 'submitting'}
	                        className="w-full bg-gray-900 text-white font-bold py-4 rounded-lg hover:bg-primary-600 transition-all shadow-lg shadow-gray-900/10 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
	                    >
	                        {formStatus === 'submitting' ? 'Odesílám...' : 'Odeslat Zprávu'}
	                    </button>
                </form>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-serif font-bold tracking-tighter">
                MAXITO<span className="text-primary-600">BARBERS</span>
            </div>
            <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Maxim Schejbal. Všechna práva vyhrazena.
            </p>
            <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all">IG</a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all">FB</a>
            </div>
        </div>
      </footer>

      <AIChat />

    </div>
  );
};

export default App;
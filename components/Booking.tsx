import React, { useState } from 'react';
import { Icon } from './Icon';
import emailjs from '@emailjs/browser';

export const Booking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock dates (next 5 days)
  const dates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });

  const times = ['10:00', '11:00', '13:00', '14:30', '16:00', '17:30'];

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    if (selectedDate === null || !selectedTime) {
      setError('Prosím vyberte datum a čas');
      setIsSubmitting(false);
      return;
    }

    const bookingDate = dates[selectedDate].toLocaleDateString('cs-CZ');

    // Parametry pro EmailJS šablonu
    const templateParams = {
      user_email: email,
      user_name: name || 'Neuvedeno',
      booking_date: bookingDate,
      booking_time: selectedTime,
    };

    try {
      // Načtení konfigurace z environment variables
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      // Kontrola, zda jsou klíče nastavené
      if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
        throw new Error('EmailJS není správně nakonfigurován. Zkontrolujte .env.local soubor.');
      }

      // Odeslání emailu přes EmailJS
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      // Úspěch - přejdi na potvrzovací obrazovku
      setIsSubmitting(false);
      setStep(3);
    } catch (err) {
      console.error('Chyba při odesílání emailu:', err);
      setError('Nepodařilo se odeslat rezervaci. Zkuste to prosím znovu nebo nás kontaktujte telefonicky.');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-24 bg-gray-50 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Online Schůzka</span>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mt-2 mb-4">Konzultace z Domova</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            15 minut na Teams. Diskrétně, zdarma a nezávazně. Zjistěte, jaké máte možnosti.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
            {/* Info Side */}
            <div className="md:w-1/3 bg-gray-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-primary-600 rounded-lg">
                            <Icon name="video" className="text-white" size={24} />
                        </div>
                        <span className="font-bold text-lg">Microsoft Teams</span>
                    </div>
                    <h3 className="text-3xl font-serif mb-6 leading-tight">Co vás čeká?</h3>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start gap-3">
                            <Icon name="check" size={20} className="text-primary-500 mt-1 shrink-0"/> 
                            <span>Ukázka materiálů a vzorníků</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Icon name="check" size={20} className="text-primary-500 mt-1 shrink-0"/> 
                            <span>Analýza tvaru obličeje</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Icon name="check" size={20} className="text-primary-500 mt-1 shrink-0"/> 
                            <span>Přesná cenová kalkulace</span>
                        </li>
                    </ul>
                </div>
                <div className="mt-12 relative z-10 pt-8 border-t border-gray-700">
                    <p className="text-sm text-gray-400 uppercase tracking-wider font-bold mb-1">Volné termíny</p>
                    <p className="text-white text-lg">Aktualizováno právě teď</p>
                </div>
            </div>

            {/* Selection Side */}
            <div className="md:w-2/3 p-8 md:p-12">
                {step === 1 && (
                    <div className="animate-fade-in">
                        <div className="flex justify-between items-center mb-6">
                             <h4 className="text-gray-900 font-bold text-xl">1. Výběr data</h4>
                             <span className="text-xs font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded">Krok 1/2</span>
                        </div>
                        
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-8">
                            {dates.map((d, i) => (
                                <button 
                                    key={i}
                                    onClick={() => setSelectedDate(i)}
                                    className={`p-3 rounded-xl text-center transition-all border-2 ${
                                        selectedDate === i 
                                        ? 'border-primary-600 bg-primary-50 text-primary-700' 
                                        : 'border-gray-100 bg-white text-gray-600 hover:border-primary-200'
                                    }`}
                                >
                                    <span className="block text-xs uppercase font-semibold mb-1">
                                        {d.toLocaleDateString('cs-CZ', { weekday: 'short' })}
                                    </span>
                                    <span className="block text-xl font-bold">
                                        {d.getDate()}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <h4 className="text-gray-900 font-bold text-xl mb-6">2. Výběr času</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                             {times.map((t, i) => (
                                <button 
                                    key={i}
                                    onClick={() => { setSelectedTime(t); setStep(2); }}
                                    disabled={selectedDate === null}
                                    className={`py-3 px-4 rounded-lg text-sm font-medium transition-all border ${
                                        selectedTime === t
                                        ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-500/30'
                                        : 'bg-white border-gray-200 text-gray-700 hover:border-primary-600 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed'
                                    }`}
                                >
                                    {t}
                                </button>
                             ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <form onSubmit={handleBooking} className="animate-fade-in h-full flex flex-col justify-center max-w-sm mx-auto">
                        <button onClick={() => setStep(1)} type="button" className="text-gray-400 text-sm mb-6 hover:text-gray-900 flex items-center gap-1 self-start">
                             &larr; Změnit termín
                        </button>
                        
                        <h4 className="text-gray-900 font-bold text-2xl mb-2">Doplňte údaje</h4>
                        <p className="text-gray-500 text-sm mb-6">Odkaz na Teams zašleme na váš email.</p>
                        
                        <div className="bg-primary-50 p-4 rounded-lg border border-primary-100 mb-6 flex justify-between items-center">
                            <div>
                                <span className="text-gray-500 text-xs uppercase font-bold block">Termín</span>
                                <span className="text-primary-700 font-bold">
                                    {selectedDate !== null && dates[selectedDate].toLocaleDateString('cs-CZ')} — {selectedTime}
                                </span>
                            </div>
                            <Icon name="calendar" className="text-primary-400" />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Jméno (volitelné)</label>
                            <input 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all"
                                placeholder="Jan Novák"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email *</label>
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all"
                                placeholder="vzor@email.cz"
                            />
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-lg transition-all shadow-lg shadow-primary-600/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Odesílám...
                                </>
                            ) : (
                                "Dokončit rezervaci"
                            )}
                        </button>
                    </form>
                )}

                {step === 3 && (
                     <div className="animate-fade-in h-full flex flex-col items-center justify-center text-center py-10">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-fade-in-up">
                            <Icon name="check" size={40} />
                        </div>
                        <h3 className="text-3xl text-gray-900 font-serif font-bold mb-3">Hotovo!</h3>
                        <p className="text-gray-500 mb-8 max-w-md">
                            Potvrzení a odkaz na Teams schůzku jsme odeslali na <strong>{email}</strong>. Těším se na vás.
                        </p>
                        <button onClick={() => { setStep(1); setSelectedDate(null); setSelectedTime(null); setEmail(''); setName(''); setError(null); }} className="text-primary-600 font-bold hover:text-primary-800 underline decoration-2 underline-offset-4">
                            Vytvořit další rezervaci
                        </button>
                     </div>
                )}
            </div>
        </div>
      </div>
    </section>
  );
};

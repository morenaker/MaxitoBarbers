import React from 'react';
import { Icon } from './Icon';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-white pt-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Text Content */}
        <div className="md:w-1/2 space-y-8 animate-fade-in-up z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 border-l-4 border-primary-600 bg-gray-50">
                <span className="text-gray-900 text-xs font-bold uppercase tracking-widest">Maxim Schejbal</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif text-gray-900 leading-[1.1]">
                Nové vlasy. <br/>
                <span className="text-primary-600">Nové sebevědomí.</span>
            </h1>
            
            <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                Specializované studio Maxito Barbers. Nechirurgické řešení pánské pleše s výsledkem, který je k nerozeznání od vašich vlastních vlasů.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <a href="#booking" className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg shadow-lg shadow-primary-500/30 transition-all flex items-center justify-center gap-2 group transform hover:-translate-y-1">
                    Konzultace Zdarma
                    <Icon name="chevron" className="group-hover:translate-x-1 transition-transform" size={20} />
                </a>
                <a href="#nabidka" className="px-8 py-4 bg-white border-2 border-gray-200 hover:border-primary-600 text-gray-800 hover:text-primary-600 font-bold rounded-lg transition-all flex items-center justify-center">
                    Prohlédnout Varianty
                </a>
            </div>
            
            <div className="flex items-center gap-6 pt-4 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                    <Icon name="check" className="text-primary-600" size={18} />
                    <span>Bez operace</span>
                </div>
                <div className="flex items-center gap-2">
                    <Icon name="check" className="text-primary-600" size={18} />
                    <span>Okamžitý efekt</span>
                </div>
            </div>
        </div>
        
        {/* Image Content */}
        <div className="md:w-1/2 relative md:h-[600px] w-full flex justify-center md:justify-end animate-fade-in">
            <div className="relative w-full max-w-md aspect-[3/4] md:aspect-auto md:h-full">
                 {/* Decorative background shape */}
                 <div className="absolute top-10 -right-6 w-full h-full bg-gray-100 rounded-2xl -z-10"></div>
                 <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-50 rounded-full -z-10"></div>
                 
                 <img 
                    src="/public/photo/photo_cover.jpg" 
                    alt="Maxim Schejbal Hair System"
                    className="w-full h-full object-cover rounded-2xl shadow-2xl"
                 />
                 
                 {/* Floating Badge */}
                 <div className="absolute bottom-8 -left-8 bg-white p-4 rounded-xl shadow-xl border border-gray-100 max-w-[200px] hidden md:block">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="flex text-primary-500">
                            {[1,2,3,4,5].map(i => <Icon key={i} name="check" size={12} className="fill-current" />)}
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">"Nejlepší rozhodnutí mého života."</p>
                    <p className="text-xs font-bold text-gray-900 mt-1">- Petr K., Klient</p>
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
};
import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto py-12 px-6 border-t border-white/5 bg-slate-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500/50" />
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 shadow-glow">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <span className="text-white font-black text-xl">A</span>
            </div>
          </div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/50" />
        </div>

        <div className="text-center space-y-2">
          <p className="text-slate-400 font-medium tracking-wide flex items-center justify-center gap-2">
            © {year} — <span className="text-white font-bold">Mustapha Laaraari</span>
          </p>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-600">
            {t('footer.rights', 'Tous droits réservés')}
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">
          {t('footer.made_with')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

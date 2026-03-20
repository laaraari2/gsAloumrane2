import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBook } from '../../hooks/useBook';
import { useTranslation } from 'react-i18next';
import { PenSquare, Send, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import type { Database } from '../../lib/supabaseClient';

type Submission = Database['public']['Tables']['submissions']['Row'];

const Ecrits: React.FC = () => {
  const { t } = useBook();
  
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      setIsFetching(true);
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching submissions:', error);
      } else {
        setSubmissions(data);
      }
      setIsFetching(false);
    };

    fetchSubmissions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !title || !content) {
      setFormMessage({ type: 'error', text: 'Veuillez remplir tous les champs.' });
      return;
    }
    setIsLoading(true);
    setFormMessage(null);

    const { error } = await supabase
      .from('submissions')
      .insert([{ name, title, content }]);

    setIsLoading(false);

    if (error) {
      setFormMessage({ type: 'error', text: 'Une erreur est survenue. Veuillez réessayer.' });
      console.error('Error inserting submission:', error);
    } else {
      setFormMessage({ type: 'success', text: 'Votre contribution a été envoyée pour modération.' });
      setName('');
      setTitle('');
      setContent('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {t('ecrits.title')}
        </h2>
        <p className="text-slate-400">{t('ecrits.subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Form Section */}
        <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20">
          <h3 className="text-2xl font-serif font-bold text-purple-300 mb-6 flex items-center gap-3">
            <PenSquare />
            {t('ecrits.form_title')}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="name">{t('ecrits.name_label')}</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-purple-500 focus:border-purple-500 transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="title">{t('ecrits.title_label')}</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-purple-500 focus:border-purple-500 transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1" htmlFor="content">{t('ecrits.content_label')}</label>
              <textarea id="content" rows={5} value={content} onChange={(e) => setContent(e.target.value)} className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-purple-500 focus:border-purple-500 transition"></textarea>
            </div>
            {formMessage && (
              <div className={`flex items-center gap-3 p-3 rounded-md text-sm ${formMessage.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                {formMessage.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                <span>{formMessage.text}</span>
              </div>
            )}
            <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg shadow-purple-500/30 transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              {isLoading ? 'Envoi en cours...' : t('ecrits.submit_button')}
            </button>
          </form>
        </div>

        {/* Submissions Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-serif font-bold text-purple-300 mb-6">{t('ecrits.submissions_title')}</h3>
          {isFetching ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
          ) : submissions.length > 0 ? (
            submissions.map((submission) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-800/40 rounded-lg p-5 border border-slate-700"
              >
                <h4 className="font-bold text-lg text-pink-400 font-serif">{submission.title}</h4>
                <p className="text-sm text-slate-400 mb-3">par {submission.name}</p>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{submission.content}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-slate-400 text-center py-10">Aucune contribution pour le moment. Soyez le premier à partager votre travail !</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Ecrits;

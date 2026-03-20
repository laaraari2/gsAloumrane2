import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBook } from '../../hooks/useBook';
import { useTranslation } from 'react-i18next';
import { Bookmark, Trash2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getBookmarks, removeBookmark, Bookmark as BookmarkType } from '../../lib/storage';

const Bookmarks: React.FC = () => {
  const { t } = useBook();
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>(getBookmarks());

  useEffect(() => {
    // Refresh bookmarks every second
    const interval = setInterval(() => {
      setBookmarks(getBookmarks());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRemove = (id: string) => {
    removeBookmark(id);
    setBookmarks(getBookmarks());
  };

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {t('bookmarks.title')}
        </h2>
        <p className="text-slate-400">{t('bookmarks.subtitle')}</p>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {bookmarks.length > 0 ? (
            bookmarks.map((bookmark, index) => (
              <motion.div
                key={bookmark.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-yellow-500/20 p-3 rounded-lg">
                      <Bookmark className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-purple-300 mb-2">{bookmark.title}</h3>
                      <p className="text-sm text-slate-400 mb-3">{bookmark.section}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(bookmark.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleNavigate(bookmark.url)}
                      className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition"
                      title={t('bookmarks.visit')}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleRemove(bookmark.id)}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition"
                      title={t('bookmarks.remove')}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <Bookmark className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">{t('bookmarks.no_bookmarks')}</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Bookmarks;


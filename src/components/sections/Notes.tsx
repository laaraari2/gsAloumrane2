import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBook } from '../../hooks/useBook';
import { useTranslation } from 'react-i18next';
import { StickyNote, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { getNotes, saveNote, deleteNote, Note } from '../../lib/storage';

const Notes: React.FC = () => {
  const { t } = useBook();
  const [notes, setNotes] = useState<Note[]>(getNotes());
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ section: '', content: '' });

  const sections = [
    { key: 'characters', label: t('navigation.characters') },
    { key: 'themes', label: t('navigation.themes') },
    { key: 'quotes', label: t('navigation.quotes') },
    { key: 'oeuvre', label: t('navigation.oeuvre') },
    { key: 'comparison', label: t('navigation.comparison') },
    { key: 'other', label: t('notes.other') },
  ];

  const handleSave = () => {
    if (!formData.section || !formData.content.trim()) return;

    const note: Note = editingNote
      ? {
          ...editingNote,
          content: formData.content,
          updatedAt: new Date().toISOString(),
        }
      : {
          id: Date.now().toString(),
          section: formData.section,
          content: formData.content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

    saveNote(note);
    setNotes(getNotes());
    setFormData({ section: '', content: '' });
    setShowForm(false);
    setEditingNote(null);
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setFormData({ section: note.section, content: note.content });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm(t('notes.confirm_delete'))) {
      deleteNote(id);
      setNotes(getNotes());
    }
  };

  const handleCancel = () => {
    setFormData({ section: '', content: '' });
    setShowForm(false);
    setEditingNote(null);
  };

  const filteredNotes = notes.filter((note) => {
    if (!formData.section) return true;
    return note.section === formData.section;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            {t('notes.title')}
          </h2>
          <p className="text-slate-400">{t('notes.subtitle')}</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg shadow-purple-500/30 hover:opacity-90 transition"
        >
          <Plus className="w-5 h-5" />
          {t('notes.add_note')}
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <select
          value={formData.section}
          onChange={(e) => setFormData({ ...formData, section: e.target.value })}
          className="bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="">{t('notes.all_sections')}</option>
          {sections.map((section) => (
            <option key={section.key} value={section.key}>
              {section.label}
            </option>
          ))}
        </select>
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('notes.section')}
              </label>
              <select
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">{t('notes.select_section')}</option>
                {sections.map((section) => (
                  <option key={section.key} value={section.key}>
                    {section.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t('notes.content')}
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-purple-500 focus:border-purple-500"
                placeholder={t('notes.content_placeholder')}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                <Save className="w-4 h-4" />
                {t('notes.save')}
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition"
              >
                <X className="w-4 h-4" />
                {t('notes.cancel')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes List */}
      <div className="grid md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note, index) => {
              const sectionLabel = sections.find((s) => s.key === note.section)?.label || note.section;
              return (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <StickyNote className="w-5 h-5 text-yellow-400" />
                      <span className="text-sm text-purple-300 font-medium">{sectionLabel}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(note)}
                        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(note.id)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-300 whitespace-pre-wrap mb-3">{note.content}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </p>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-2 text-center py-12">
              <StickyNote className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">{t('notes.no_notes')}</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Notes;


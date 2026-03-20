import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { markSectionVisited } from './lib/storage';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/sections/Login';
import Hub from './components/sections/Hub';
import Home from './components/sections/Home';
import Search from './components/sections/Search';
import QuickReview from './components/sections/QuickReview';
import Progress from './components/sections/Progress';
import Characters from './components/sections/Characters';
import Oeuvre from './components/sections/Oeuvre';
import Themes from './components/sections/Themes';
import Quotes from './components/sections/Quotes';
import Fiche from './components/sections/Fiche';
import Comparison from './components/sections/Comparison';
import Glossary from './components/sections/Glossary';
import MindMaps from './components/sections/MindMaps';
import HowToAnswer from './components/sections/HowToAnswer';
import SampleAnswers from './components/sections/SampleAnswers';
import Quiz from './components/sections/Quiz';
import FiguresStyle from './components/sections/FiguresStyle';
import Timeline from './components/sections/Timeline';
import Notes from './components/sections/Notes';
import Bookmarks from './components/sections/Bookmarks';
import Ecrits from './components/sections/Ecrits';
import Audio from './components/sections/Audio';
import Examen from './components/sections/Examen';
import ExamSimulator from './components/sections/ExamSimulator';
import About from './components/sections/About';
import Guide from './components/sections/Guide';
import Scenes from './components/sections/Scenes';

function App() {
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const { loading } = useAuth();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir(i18n.language);
    document.body.className = i18n.language === 'ar' ? 'font-arabic' : 'font-sans';
    
    // Update document title dynamically
    const pathParts = location.pathname.split('/').filter(Boolean);
    const bookId = pathParts[0];

    if (!bookId || bookId === 'login') {
      document.title = t('app.hub_title');
    } else if (['antigone', 'boite', 'condamne'].includes(bookId)) {
      document.title = t(`hub.works.${bookId}.title`);
    } else {
      document.title = t('app.title');
    }
  }, [i18n.language, location.pathname, t]);

  // Track section visits
  useEffect(() => {
    const sectionMap: { [key: string]: string } = {
      '/': 'home',
      '/personnages': 'characters',
      '/oeuvre': 'oeuvre',
      '/themes': 'themes',
      '/citations': 'quotes',
      '/fiche': 'fiche',
      '/comparison': 'comparison',
      '/glossary': 'glossary',
      '/mindmaps': 'mindmaps',
      '/howto': 'howto',
      '/sample-answers': 'sample_answers',
      '/quiz': 'quiz_rapide',
      '/notes': 'notes',
      '/bookmarks': 'bookmarks',
      '/ecrits': 'ecrits',
      '/audio': 'audio',
      '/examen': 'examen',
      '/search': 'search',
      '/quick-review': 'quick_review',
      '/progress': 'progress',
      '/about': 'about',
      '/guide': 'guide',
      '/scenes': 'scenes',
    };
    const sectionKey = sectionMap[location.pathname];
    if (sectionKey) {
      // Use translation key, will be translated when displayed
      markSectionVisited(sectionKey);
    }
  }, [location.pathname]);

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-slate-400">{i18n.language === 'ar' ? 'جاري التحميل...' : 'Chargement...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-8 bg-slate-900">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<Login />} />
          <Route
            path="/guide"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48 pb-20">
                    <Guide />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <Hub />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-20 md:pt-48 pb-12">
                    <Home />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/personnages"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-20 md:pt-48">
                    <Characters />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/search"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-24 md:pt-72">
                    <Search />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/quick-review"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-24 md:pt-72">
                    <QuickReview />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/progress"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-24 md:pt-72">
                    <Progress />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/personnages"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-24 md:pt-72">
                    <Characters />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/oeuvre"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-24 md:pt-72">
                    <Oeuvre />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/themes"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-24 md:pt-72">
                    <Themes />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/citations"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-24 md:pt-72">
                    <Quotes />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/fiche"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-24 md:pt-72">
                    <Fiche />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/comparison"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-24 md:pt-72">
                    <Comparison />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/glossary"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-24 md:pt-72">
                    <Glossary />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/mindmaps"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-24 md:pt-72">
                    <MindMaps />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/howto"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-24 md:pt-72">
                    <HowToAnswer />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/sample-answers"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-24 md:pt-72">
                    <SampleAnswers />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/quiz"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-24 md:pt-72">
                    <Quiz />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/figures-style"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-24 md:pt-72">
                    <FiguresStyle />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/timeline"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-24 md:pt-72">
                    <Timeline />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/notes"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-24 md:pt-72">
                    <Notes />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/bookmarks"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-24 md:pt-72">
                    <Bookmarks />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/ecrits"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-24 md:pt-72">
                    <Ecrits />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/audio"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-24 md:pt-72">
                    <Audio />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/examen"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-24 md:pt-72">
                    <Examen />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/exam-simulator"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-24 md:pt-72">
                    <ExamSimulator />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/about"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48">
                    <About />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/guide"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-48 pb-20">
                    <Guide />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:bookId/scenes"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <main className="container mx-auto px-4 pt-20 md:pt-48">
                    <Scenes />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home/HomePage';
import SearchPage from './pages/Search/SearchPage';
import AboutPage from './pages/About/AboutPage';
import PrivacyPage from './pages/Privacy/PrivacyPage';
import TermsPage from './pages/Terms/TermsPage';
import ContactPage from './pages/Contact/ContactPage';
import FAQPage from './pages/FAQ/FAQPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/visa" element={<Navigate to="/search?type=visa" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

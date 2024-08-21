import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import './index.css';

// Sample components for routes
const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;

const App: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <h1>{t('welcome')}</h1>
        <button onClick={() => changeLanguage('en')}>{t('language.english')}</button>
        <button onClick={() => changeLanguage('vi')}>{t('language.vietnamese')}</button>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* Add more routes as needed */}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;

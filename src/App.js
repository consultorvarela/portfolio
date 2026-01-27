import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Portfolio from './Portfolio';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import { ThemeProvider } from './ThemeContext';
import { LanguageProvider } from './LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;

import React from 'react';
import './App.css';
import Portfolio from './Portfolio';
import { ThemeProvider } from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { StoryProvider } from './context/StoryContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <StoryProvider>
        <App />
      </StoryProvider>
    </AuthProvider>
  </React.StrictMode>
);

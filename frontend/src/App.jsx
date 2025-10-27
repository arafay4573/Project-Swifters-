import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import StoryFormPage from './pages/StoryFormPage';
import VideoPage from './pages/VideoPage';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Pricing from './pages/Pricing';
import StoryPlayer from './pages/StoryPlayer';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/story-form" element={<StoryFormPage />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/story/:id" element={<StoryPlayer />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

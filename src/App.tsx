import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FormBuilder from './pages/FormBuilder';
import FormFiller from './pages/FormFiller';
import Dashboard from './pages/Dashboard';
import Header from './components/layout/Header';
import { Toaster } from './components/ui/Toaster';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/builder/:formId?" element={<FormBuilder />} />
          <Route path="/form/:formId" element={<FormFiller />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
}

export default App;
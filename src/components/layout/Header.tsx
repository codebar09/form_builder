import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Github } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white bg-opacity-80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
          <FileText size={24} />
          <span>FormCraft</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors duration-200"
          >
            Dashboard
          </Link>
          <Link 
            to="/builder" 
            className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors duration-200"
          >
            Create Form
          </Link>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <Github size={20} />
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header
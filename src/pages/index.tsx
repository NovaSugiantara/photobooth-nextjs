import React from 'react';
import PhotoBooth from '@/components/PhotoBooth';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="py-4 px-6 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                <circle cx="12" cy="13" r="3"></circle>
              </svg>
            </div>
            <span className="font-medium text-lg">PhotoBooth</span>
          </div>
          
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-primary transition-colors">About</a>
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-primary transition-colors">Features</a>
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-primary transition-colors">Help</a>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow py-6 px-4">
        <PhotoBooth />
      </main>
      
      <footer className="py-4 px-6 border-t bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto text-center text-sm text-gray-500">
          <p>Designed with attention to detail and focus on user experience</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

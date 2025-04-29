
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              URL
            </span>
            <span className="text-2xl font-bold">Forge</span>
          </div>
        </Link>
        <nav className="flex items-center space-x-4 md:space-x-6">
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link to="/urls">
            <Button variant="ghost">My URLs</Button>
          </Link>
          <Link to="/api-docs">
            <Button variant="outline">API Docs</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

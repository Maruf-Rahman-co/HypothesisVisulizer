import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';
import { Button } from './ui/button';
import { BookOpen, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b border-white/5 bg-black/40 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
            Hypothesis Bhai
          </Link>
          
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <Link to="/documentation">
              <Button variant="ghost" size="sm" className="text-xs sm:text-sm flex items-center">
                <BookOpen size={14} className="mr-1.5" />
                Docs
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" size="sm" className="text-xs sm:text-sm flex items-center">
                <User size={14} className="mr-1.5" />
                About
              </Button>
            </Link>
            <a
              href="https://github.com/yourusername/hypothesis-bhai-visualizer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Github className="h-4 w-4" />
              </Button>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

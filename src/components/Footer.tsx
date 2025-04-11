
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-6 px-4 border-t border-white/10">
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-muted-foreground mb-4 md:mb-0">
          © {new Date().getFullYear()} Hypothesis Testing Simulator
        </div>
        
        <div className="flex gap-4 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <Link to="/documentation" className="text-muted-foreground hover:text-foreground">
            Documentation
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

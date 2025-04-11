import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[80vh] flex flex-col items-center justify-center p-4"
    >
      <div className="glass-card max-w-2xl w-full p-6 rounded-xl text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5" />
        
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="mb-6"
          >
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text mb-2">
              404
            </h1>
            <div className="text-xl md:text-2xl text-muted-foreground">
              Oops! Looks like this hypothesis got rejected 🤔
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground mb-8 max-w-md mx-auto"
          >
            The page you're looking for seems to have wandered off into a parallel universe. 
            Let's get you back to a statistically significant location!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild variant="default" size="lg" className="w-full sm:w-auto">
              <Link to="/" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link to="/documentation" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                View Documentation
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound;

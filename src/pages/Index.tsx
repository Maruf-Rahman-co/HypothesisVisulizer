import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Simulator from '@/components/Simulator';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-4 sm:py-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full overflow-hidden"
        >
          <Simulator />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

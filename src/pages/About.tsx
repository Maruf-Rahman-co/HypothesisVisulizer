import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code2, Cpu, Sparkles, Rocket, Coffee, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 max-w-6xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Profile Card */}
        <motion.div 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="glass-card col-span-1 md:col-span-2 lg:col-span-3 p-6 rounded-xl text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 opacity-50" />
          <div className="relative z-10">
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-20 blur-xl" />
              <img 
                src="/profile.jpg" 
                alt="Developer"
                className="w-full h-full rounded-full object-cover border-4 border-white/10 relative z-10"
              />
            </div>
            <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
              Maruf Rahman Tangin
            </h1>
            <p className="text-muted-foreground mb-4">UAE-based CS Graduate & Full-Stack Developer</p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="icon" className="bg-black/20 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors" asChild>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="bg-black/20 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors" asChild>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="bg-black/20 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors" asChild>
                <a href="mailto:your.email@example.com">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Fun Bio */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 rounded-xl col-span-1 md:col-span-2 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Coffee className="mr-2 text-purple-400" /> The Story
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Hey there! 👋 When I'm not turning coffee into code, I'm probably debugging my life choices 
              or trying to convince my computer that my code is not as bad as it thinks. I specialize in 
              making computers do the math I'm too lazy to do myself, and occasionally I succeed! 
              My greatest achievement? Creating this hypothesis testing visualizer without having an 
              existential crisis... well, maybe just a small one! 🎯
            </p>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 rounded-xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Code2 className="mr-2 text-blue-400" /> Tech Stack
            </h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center group/item hover:text-purple-400 transition-colors">
                <Sparkles className="mr-2 h-4 w-4 group-hover/item:text-purple-400" /> React + TypeScript
              </li>
              <li className="flex items-center group/item hover:text-blue-400 transition-colors">
                <Cpu className="mr-2 h-4 w-4 group-hover/item:text-blue-400" /> D3.js for Visualizations
              </li>
              <li className="flex items-center group/item hover:text-purple-400 transition-colors">
                <Rocket className="mr-2 h-4 w-4 group-hover/item:text-purple-400" /> Tailwind CSS + Shadcn/ui
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Fun Facts */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 rounded-xl col-span-1 md:col-span-2 lg:col-span-3 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Heart className="mr-2 text-purple-400" /> Why This Project?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Because explaining hypothesis testing without visuals is like trying to teach a cat calculus 
              - theoretically possible, but why make life harder? 🐱 This project combines my love for 
              statistics (yes, that's a thing) with my passion for making complex concepts digestible. 
              Plus, it gave me an excuse to use all those fancy animations I've been dying to try out! 
              Remember: In statistics, we don't make mistakes, we just discover new ways to interpret the data! 📊✨
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About; 
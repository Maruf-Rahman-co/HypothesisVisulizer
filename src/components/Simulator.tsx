import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HypothesisForm, { SimulationParams } from './HypothesisForm';
import DistributionPlot from './DistributionPlot';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Simulator = () => {
  const [simulationParams, setSimulationParams] = useState<SimulationParams | null>(null);
  const [animate, setAnimate] = useState(false);
  const [key, setKey] = useState(0); // Key for forcing re-render
  const { toast } = useToast();

  const handleSimulate = useCallback((params: SimulationParams) => {
    setSimulationParams(params);
    setAnimate(true);
    setKey(prev => prev + 1);
    
    toast({
      title: "Simulation Running",
      description: "Generating sampling distribution and calculating test results.",
    });
  }, [toast]);

  const resetSimulation = useCallback(() => {
    setAnimate(true);
    setKey(prev => prev + 1);
    
    toast({
      title: "Animation Reset",
      description: "Re-running the simulation with the same parameters.",
    });
  }, [toast]);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-full">
        <div className="w-full overflow-hidden lg:min-h-[600px] flex">
          <div className="w-full flex flex-col">
            <HypothesisForm onSimulate={handleSimulate} />
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {simulationParams ? (
            <motion.div
              key={`results-${key}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col w-full overflow-hidden min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]"
            >
              <div className="glass-card rounded-xl p-3 sm:p-4 flex-grow">
                <DistributionPlot params={simulationParams} animate={animate} key={key} />
                <div className="mt-4 flex justify-center ">
                <Button 
                  onClick={resetSimulation} 
                  variant="outline" 
                  size="sm"
                  className="flex items-center text-black w-full md:w-auto px-8 py-2 lg:py-3 lg:text-lg bg-gradient-to-r from-highlight-purple to-highlight-blue hover:opacity-90 transition-opacity"
                >
                  <RefreshCw size={14} className="mr-2" />
                  Re-run Animation
                </Button>
              </div>
              </div>
              
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card rounded-xl p-3 sm:p-4 md:p-6 flex items-center justify-center w-full overflow-hidden min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]"
            >
              <div className="text-center text-muted-foreground">
                <p className="mb-2">Configure your hypothesis test parameters</p>
                <p className="text-sm">Set up your test on the left and click "Run Simulation"</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Simulator;

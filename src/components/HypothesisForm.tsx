import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Tooltip from './Tooltip';
import { Check, ArrowRight, ArrowUp, ArrowDown, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Link } from 'react-router-dom';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { useToast } from '@/hooks/use-toast';

interface HypothesisFormProps {
  onSimulate: (params: SimulationParams) => void;
}

export interface SimulationParams {
  nullMean: number;
  sampleMean: number;
  stdDev: number;
  sampleSize: number;
  alpha: number;
  testType: 'less' | 'greater' | 'two-tailed';
}

const HypothesisForm: React.FC<HypothesisFormProps> = ({ onSimulate }) => {
  const [nullMean, setNullMean] = useState<string>('0');
  const [sampleMean, setSampleMean] = useState<string>('1');
  const [stdDev, setStdDev] = useState<string>('1');
  const [sampleSize, setSampleSize] = useState<number>(30);
  const [significanceLevel, setSignificanceLevel] = useState<number>(0.05);
  const [testType, setTestType] = useState<'less' | 'greater' | 'two-tailed'>('two-tailed');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const parsedStdDev = parseFloat(stdDev);
    // Validate inputs
    if (parsedStdDev <= 0) {
      toast({
        title: "Invalid Input",
        description: "Standard deviation must be positive",
        variant: "destructive"
      });
      return;
    }

    onSimulate({
      nullMean: parseFloat(nullMean),
      sampleMean: parseFloat(sampleMean),
      stdDev: parsedStdDev,
      sampleSize: sampleSize,
      alpha: significanceLevel,
      testType
    });
    
    toast({
      title: "Simulation Started",
      description: "Calculating results with your parameters"
    });
  };

  const getHypothesisSymbol = useCallback(() => {
    switch(testType) {
      case 'less': return '\\mu < \\mu_0';
      case 'greater': return '\\mu > \\mu_0';
      case 'two-tailed': return '\\mu \\neq \\mu_0';
      default: return '\\mu \\neq \\mu_0';
    }
  }, [testType]);

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-xl p-4 md:p-6 h-full flex flex-col">
      <div className="mb-4 lg:mb-6">
        <div className="flex items-center justify-between mb-2 lg:mb-4">
          <h2 className="text-xl lg:text-2xl font-semibold flex items-center">
            Hypothesis Setup
            <Tooltip content="Choose your null hypothesis (H₀) and alternative hypothesis (H₁)">
              <span className="ml-2 text-muted-foreground">ⓘ</span>
            </Tooltip>
          </h2>
        </div>
        
        <div className="mb-3 lg:mb-5 p-4 lg:p-6 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10">
          <div className="mb-3 lg:mb-5 flex flex-col md:flex-row gap-2 lg:gap-4">
            <div className="p-2 lg:p-4 bg-white/5 rounded-md border border-white/10 flex-1">
              <span className="font-medium text-highlight-purple mr-2">H₀:</span>
              <InlineMath math={'\\mu = \\mu_0'} />
            </div>
            <div className="p-2 lg:p-4 bg-white/5 rounded-md border border-white/10 flex-1">
              <span className="font-medium text-highlight-blue mr-2">H₁:</span>
              <InlineMath math={getHypothesisSymbol()} />
            </div>
          </div>

          <div className="mb-1">
            <div className="font-medium mb-2 lg:mb-3 flex items-center text-base lg:text-lg">
              Test Type
              <Tooltip content="One-tailed tests (less or greater) look for effects in only one direction. Two-tailed tests look for effects in either direction.">
                <span className="ml-2 text-muted-foreground">ⓘ</span>
              </Tooltip>
            </div>
            <div className="grid grid-cols-3 gap-1 sm:gap-2 lg:gap-4">
              <Button
                type="button"
                variant={testType === 'less' ? 'default' : 'outline'}
                onClick={() => setTestType('less')}
                className="flex items-center justify-center h-9 lg:h-11 px-2 sm:px-3 text-xs sm:text-sm lg:text-base"
              >
                <ArrowDown size={14} className="mr-1 hidden sm:inline" />
                Less
              </Button>
              <Button
                type="button" 
                variant={testType === 'two-tailed' ? 'default' : 'outline'}
                onClick={() => setTestType('two-tailed')}
                className="flex items-center justify-center h-9 lg:h-11 px-2 sm:px-3 text-xs sm:text-sm lg:text-base"
              >
                <ArrowRight size={14} className="mr-1 hidden sm:inline" />
                Two-tailed
              </Button>
              <Button
                type="button"
                variant={testType === 'greater' ? 'default' : 'outline'}
                onClick={() => setTestType('greater')}
                className="flex items-center justify-center h-9 lg:h-11 px-2 sm:px-3 text-xs sm:text-sm lg:text-base"
              >
                <ArrowUp size={14} className="mr-1 hidden sm:inline" />
                Greater
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        <div>
          <Label htmlFor="nullMean" className="flex items-center text-sm lg:text-base">
            <InlineMath math={'\\mu_0'} /> (Null Hypothesis Mean)
            <Tooltip content="The hypothesized population mean under the null hypothesis">
              <span className="ml-2 text-muted-foreground">ⓘ</span>
            </Tooltip>
          </Label>
          <div className="mt-1 lg:mt-2">
            <Input
              id="nullMean"
              type="number"
              value={nullMean}
              onChange={(e) => setNullMean(e.target.value)}
              className="input-field w-full lg:h-11"
              step="0.1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="sampleMean" className="flex items-center text-sm lg:text-base">
            <InlineMath math={'\\bar{x}'} /> (Sample Mean)
            <Tooltip content="The observed mean of your sample">
              <span className="ml-2 text-muted-foreground">ⓘ</span>
            </Tooltip>
          </Label>
          <div className="mt-1 lg:mt-2">
            <Input
              id="sampleMean"
              type="number"
              value={sampleMean}
              onChange={(e) => setSampleMean(e.target.value)}
              className="input-field w-full lg:h-11"
              step="0.1"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4 lg:mt-6">
        <Label htmlFor="stdDev" className="flex items-center text-sm lg:text-base">
          <InlineMath math={'\\sigma'} /> (Standard Deviation)
          <Tooltip content="Population standard deviation, a measure of variability">
            <span className="ml-2 text-muted-foreground">ⓘ</span>
          </Tooltip>
        </Label>
        <div className="mt-1 lg:mt-2">
          <Input
            id="stdDev"
            type="number"
            value={stdDev}
            onChange={(e) => setStdDev(e.target.value)}
            className="input-field w-full lg:h-11"
            step="0.1"
            min="0.1"
          />
        </div>
      </div>

      <div className="mt-4 lg:mt-6">
        <Label htmlFor="sampleSize" className="flex items-center text-sm lg:text-base">
          n (Sample Size): {sampleSize}
          <Tooltip content="Number of observations in your sample">
            <span className="ml-2 text-muted-foreground">ⓘ</span>
          </Tooltip>
        </Label>
        <div className="mt-2 lg:mt-3">
          <Slider
            id="sampleSize"
            value={[sampleSize]}
            onValueChange={(value) => setSampleSize(value[0])}
            min={5}
            max={100}
            step={1}
            className="lg:py-2"
          />
        </div>
      </div>

      <div className="mt-4 lg:mt-6">
        <Label htmlFor="significanceLevel" className="flex items-center text-sm lg:text-base">
          <InlineMath math={'\\alpha'} /> (Significance Level): {significanceLevel}
          <Tooltip content="Probability of rejecting H₀ when it's true (Type I error rate)">
            <span className="ml-2 text-muted-foreground">ⓘ</span>
          </Tooltip>
        </Label>
        <div className="mt-2 lg:mt-3">
          <Slider
            id="significanceLevel"
            value={[significanceLevel]}
            onValueChange={(value) => setSignificanceLevel(value[0])}
            min={0.01}
            max={0.1}
            step={0.01}
            className="lg:py-2"
          />
        </div>
      </div>
      
      <motion.div 
        className="mt-6 lg:mt-auto text-center pt-4 lg:pt-6"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Button 
          type="submit" 
          className="w-full md:w-auto px-8 py-2 lg:py-3 lg:text-lg bg-gradient-to-r from-highlight-purple to-highlight-blue hover:opacity-90 transition-opacity"
        >
          Run Simulation
          <Check size={16} className="ml-2" />
        </Button>
      </motion.div>
    </form>
  );
};

export default HypothesisForm;

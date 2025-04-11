import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { normalCDF, normalQuantile, normalPDF } from '@/utils/statistics';
import { SimulationParams } from './HypothesisForm';

interface DistributionPlotProps {
  params: SimulationParams;
  animate: boolean;
}

interface DistributionData {
  mean: number;
  stdError: number;
  criticalValue: number | number[];
  pValue: number;
  testStatistic: number;
  rejectNull: boolean;
}

const DistributionPlot: React.FC<DistributionPlotProps> = ({ params, animate }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState<DistributionData | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });
  
  // Add resize observer to update dimensions
  useEffect(() => {
    if (!svgRef.current) return;

    const updateDimensions = () => {
      if (svgRef.current) {
        setDimensions({
          width: svgRef.current.clientWidth || 100,
          height: svgRef.current.clientHeight || 100
        });
      }
    };

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(svgRef.current);
    updateDimensions(); // Initial dimensions

    return () => {
      if (svgRef.current) {
        resizeObserver.unobserve(svgRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!params) return;

    // Calculate test statistics and distribution data
    const stdError = params.stdDev / Math.sqrt(params.sampleSize);
    const testStatistic = (params.sampleMean - params.nullMean) / stdError;
    
    let criticalValue;
    let pValue;
    
    // Calculate critical values based on test type
    if (params.testType === 'two-tailed') {
      criticalValue = [
        -Math.abs(normalQuantile(1 - params.alpha / 2, 0, 1)),
        normalQuantile(1 - params.alpha / 2, 0, 1)
      ];
      pValue = 2 * (1 - normalCDF(Math.abs(testStatistic), 0, 1));
    } else if (params.testType === 'less') {
      criticalValue = normalQuantile(params.alpha, 0, 1);
      pValue = normalCDF(testStatistic, 0, 1);
    } else { // greater
      criticalValue = normalQuantile(1 - params.alpha, 0, 1);
      pValue = 1 - normalCDF(testStatistic, 0, 1);
    }
    
    // Determine if null hypothesis should be rejected
    let rejectNull;
    if (params.testType === 'two-tailed') {
      rejectNull = Math.abs(testStatistic) > Math.abs(criticalValue[0]);
    } else if (params.testType === 'less') {
      rejectNull = testStatistic < criticalValue;
    } else { // greater
      rejectNull = testStatistic > criticalValue;
    }
    
    setData({
      mean: params.nullMean,
      stdError,
      criticalValue,
      pValue,
      testStatistic,
      rejectNull,
    });
    
    // Reset animation
    if (animate) {
      setAnimationProgress(0);
      const timer = setTimeout(() => {
        setAnimationProgress(1);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimationProgress(1);
    }
  }, [params, animate]);
  
  useEffect(() => {
    if (!svgRef.current || !data) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    // Set up dimensions
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    
    // Calculate responsive margins based on container size and screen width
    const margin = {
      top: Math.max(10, Math.min(20, height * 0.05)),
      right: Math.max(5, Math.min(15, width * 0.03)),
      bottom: Math.max(20, Math.min(30, height * 0.1)),
      left: Math.max(20, Math.min(30, width * 0.06))
    };
    
    const innerWidth = Math.max(50, width - margin.left - margin.right);
    const innerHeight = Math.max(50, height - margin.top - margin.bottom);
    
    // Set SVG viewBox for better scaling
    svg.attr("viewBox", `0 0 ${width} ${height}`)
       .attr("preserveAspectRatio", "xMidYMid meet");
    
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Set up scales with constrained domain
    const stdError = data.stdError;
    
    // Create x-scale with proper domain
    const xMin = data.mean - 4 * stdError;
    const xMax = data.mean + 4 * stdError;
    const xScale = d3.scaleLinear()
      .domain([xMin, xMax])
      .range([0, innerWidth]);
    
    // Set up normal distribution function
    const normalDist = (x: number) => {
      return normalPDF(x, data.mean, stdError);
    };
    
    // Calculate y-scale based on the normal distribution
    const yMax = normalDist(data.mean);
    const yScale = d3.scaleLinear()
      .domain([0, yMax * 1.1])
      .range([innerHeight, 0]);

    // Add y-axis gridlines with fewer lines on mobile
    const yTicks = width < 400 ? 3 : 5;
    g.append("g")
      .attr("class", "grid")
      .selectAll("line")
      .data(yScale.ticks(yTicks))
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", d => yScale(d))
      .attr("y2", d => yScale(d))
      .attr("stroke", "rgba(255, 255, 255, 0.1)")
      .attr("stroke-dasharray", "2,2");

    // Add x-axis gridlines with fewer lines on mobile
    const xTicks = width < 400 ? 3 : 5;
    g.append("g")
      .attr("class", "grid")
      .selectAll("line")
      .data(xScale.ticks(xTicks))
      .enter()
      .append("line")
      .attr("x1", d => xScale(d))
      .attr("x2", d => xScale(d))
      .attr("y1", 0)
      .attr("y2", innerHeight)
      .attr("stroke", "rgba(255, 255, 255, 0.1)")
      .attr("stroke-dasharray", "2,2");
    
    // Create area generator for the distribution curve
    const areaGenerator = d3.area<number>()
      .x(d => xScale(d))
      .y0(innerHeight)
      .y1(d => yScale(normalDist(d)))
      .curve(d3.curveBasis);
    
    // Generate data points for the curve
    const curvePoints = d3.range(xMin, xMax, (xMax - xMin) / 100);
    
    // Draw the main distribution curve
    g.append("path")
      .datum(curvePoints)
      .attr("fill", "url(#gradient)")
      .attr("opacity", 0.5)
      .attr("d", areaGenerator);
    
    // Create gradient
    const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", innerHeight);
      
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#8B5CF6");
      
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "rgba(139, 92, 246, 0.1)");
    
    // Draw the outline of the curve
    const lineGenerator = d3.line<number>()
      .x(d => xScale(d))
      .y(d => yScale(normalDist(d)))
      .curve(d3.curveBasis);
      
    g.append("path")
      .datum(curvePoints)
      .attr("fill", "none")
      .attr("stroke", "#D3E4FD")
      .attr("stroke-width", 1.5)
      .attr("d", lineGenerator);
    
    // Shade critical regions based on test type
    if (params.testType === 'two-tailed') {
      const criticalValue = data.criticalValue as number[];
      
      // Left critical region
      const leftCriticalPoints = curvePoints.filter(d => d <= params.nullMean + criticalValue[0] * stdError);
      
      if (leftCriticalPoints.length > 0) {
        g.append("path")
          .datum(leftCriticalPoints)
          .attr("fill", "#F2FCE2")
          .attr("opacity", 0.5)
          .attr("d", areaGenerator);
      }
      
      // Right critical region
      const rightCriticalPoints = curvePoints.filter(d => d >= params.nullMean + criticalValue[1] * stdError);
      
      if (rightCriticalPoints.length > 0) {
        g.append("path")
          .datum(rightCriticalPoints)
          .attr("fill", "#F2FCE2")
          .attr("opacity", 0.5)
          .attr("d", areaGenerator);
      }
    } else if (params.testType === 'less') {
      // Left critical region for 'less than' test
      const criticalValue = data.criticalValue as number;
      const criticalPoints = curvePoints.filter(d => d <= params.nullMean + criticalValue * stdError);
      
      if (criticalPoints.length > 0) {
        g.append("path")
          .datum(criticalPoints)
          .attr("fill", "#F2FCE2")
          .attr("opacity", 0.5)
          .attr("d", areaGenerator);
      }
    } else { // greater
      // Right critical region for 'greater than' test
      const criticalValue = data.criticalValue as number;
      const criticalPoints = curvePoints.filter(d => d >= params.nullMean + criticalValue * stdError);
      
      if (criticalPoints.length > 0) {
        g.append("path")
          .datum(criticalPoints)
          .attr("fill", "#F2FCE2")
          .attr("opacity", 0.5)
          .attr("d", areaGenerator);
      }
    }
    
    // Adjust font sizes for mobile
    const fontSize = width < 400 ? 8 : Math.max(10, Math.min(12, width * 0.03));
    
    // Add x-axis with responsive font size
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(
        d3.axisBottom(xScale)
          .ticks(width < 400 ? 3 : 5)
          .tickFormat((d: number) => d.toFixed(1))
      )
      .attr("color", "#999")
      .attr("font-size", `${fontSize}px`)
      .select(".domain")
      .attr("stroke", "#666");
      
    // Add y-axis with responsive sizing
    g.append("g")
      .call(
        d3.axisLeft(yScale)
          .ticks(height < 300 ? 3 : 5)
          .tickFormat(() => "")
      )
      .attr("color", "#999")
      .attr("font-size", `${fontSize}px`)
      .select(".domain")
      .attr("stroke", "#666");
      
    // Add center line at null hypothesis mean
    g.append("line")
      .attr("x1", xScale(data.mean))
      .attr("x2", xScale(data.mean))
      .attr("y1", 0)
      .attr("y2", innerHeight)
      .attr("stroke", "#D3E4FD")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "3,3");
      
    // If we have animation progress and a test statistic, draw the test statistic line
    if (animationProgress > 0 && data.testStatistic !== undefined) {
      const testStatX = params.nullMean + data.testStatistic * stdError * animationProgress;
      
      g.append("line")
        .attr("x1", xScale(testStatX))
        .attr("x2", xScale(testStatX))
        .attr("y1", 0)
        .attr("y2", innerHeight)
        .attr("stroke", data.rejectNull ? "#F97316" : "#10B981")
        .attr("stroke-width", 2);
        
      g.append("circle")
        .attr("cx", xScale(testStatX))
        .attr("cy", yScale(normalDist(testStatX)))
        .attr("r", 5)
        .attr("fill", data.rejectNull ? "#F97316" : "#10B981");
    }
  }, [svgRef, data, animationProgress, params]);

  if (!data) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-xl p-1 sm:p-4 md:p-6 max-w-[1200px] mx-auto overflow-hidden"
    >
      <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2 md:mb-4">Sampling Distribution</h2>
      
      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-1.5 sm:p-3 mb-2 sm:mb-4">
        <div className="text-xs sm:text-sm md:text-base grid grid-cols-3 gap-1 sm:gap-3">
          <div className="glass-card rounded-lg p-2 sm:p-3">
            <div className="text-muted-foreground mb-0.5">Test Statistic</div>
            <div className="font-mono">z = {data.testStatistic.toFixed(3)}</div>
          </div>
          <div className="glass-card rounded-lg p-2 sm:p-3">
            <div className="text-muted-foreground mb-0.5">p-value</div>
            <div className="font-mono">{data.pValue.toFixed(2)}</div>
          </div>
          <div className="glass-card rounded-lg p-2 sm:p-3">
            <div className="text-muted-foreground mb-0.5">Decision</div>
            <div className="text-blue-400">
              {data.pValue < params.alpha ? "Reject H₀" : "Fail to Reject H₀"}
            </div>
          </div>
        </div>
      </div>
      
      <div className="distribution-container relative w-full aspect-[16/9] sm:aspect-[2/1] lg:aspect-[2.5/1] min-h-[200px] sm:min-h-[300px] lg:min-h-[400px]">
        <svg 
          ref={svgRef} 
          width="100%" 
          height="100%" 
          className="overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        ></svg>
      </div>
      
      <div className="mt-2 sm:mt-4 p-1.5 sm:p-2 text-center formula-container bg-black/20 rounded-lg backdrop-blur-sm text-[20px] sm:text-sm md:text-base">
        <InlineMath math={`z = \\frac{\\bar{x} - \\mu_0}{\\sigma/\\sqrt{n}} = \\frac{${params.sampleMean} - ${params.nullMean}}{${params.stdDev}/\\sqrt{${params.sampleSize}}} = ${data.testStatistic.toFixed(3)}`} />
      </div>
    </motion.div>
  );
};

export default DistributionPlot;

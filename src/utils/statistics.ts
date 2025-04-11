
/**
 * Statistics utility functions for hypothesis testing
 */

// Normal distribution functions
export const normalPDF = (x: number, mean = 0, stdDev = 1): number => {
  const variance = Math.pow(stdDev, 2);
  return (1 / (Math.sqrt(2 * Math.PI * variance))) * 
    Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
};

// Cumulative Distribution Function for normal distribution
// Using numerical approximation
export const normalCDF = (x: number, mean = 0, stdDev = 1): number => {
  const z = (x - mean) / stdDev;
  // Using numerical approximation for standard normal CDF
  if (z < -8.0) return 0;
  if (z > 8.0) return 1;
  
  let sum = 0.0;
  let term = z;
  for (let i = 3; sum + term !== sum; i += 2) {
    sum += term;
    term = term * z * z / i;
  }
  
  return 0.5 + sum * normalPDF(0, 0, 1);
};

// Inverse of the normal CDF (quantile function)
// Using numerical approximation
export const normalQuantile = (p: number, mean = 0, stdDev = 1): number => {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  
  // Approximation for standard normal quantile
  let q = p - 0.5;
  let r;
  
  if (Math.abs(q) <= 0.425) {
    // Central region
    r = 0.180625 - q * q;
    return mean + stdDev * q * (((((((2.50908092 * r + 3.34305577) * r + 4.38131359) * r + 2.93858421) * r + 1.33027442) * r + 0.24178072) * r + 0.04686313) * r + 2.50662827) / ((((((0.39894228 * r + 3.3308519) * r + 6.6880964) * r + 5.3778891) * r + 1.75566716) * r + 0.12885356) * r + 1.0);
  } else {
    // Tail regions
    r = q < 0 ? p : 1 - p;
    r = Math.sqrt(-Math.log(r));
    
    if (r <= 5.0) {
      r -= 1.6;
      const val = (((((((0.00077454501 * r + 0.022723844) * r + 0.24178072) * r + 1.33027442) * r + 2.93858421) * r + 4.38131359) * r + 3.34305577) * r + 2.50908092) / ((((((0.00337287 * r + 0.0168641189) * r + 0.078327243) * r + 0.207022578) * r + 0.40931975) * r + 0.0883883476) * r + 1.0);
      return mean + stdDev * (q < 0 ? -val : val);
    } else {
      r -= 5.0;
      const val = (((((((2.01033439e-7 * r + 2.71155556e-5) * r + 0.00124818987) * r + 0.0113302723) * r + 0.0389922834) * r + 0.059383632) * r + 0.0506142681) * r + 0.0244188476) / (((((((3.82467434e-7 * r + 6.46775701e-5) * r + 0.00379632426) * r + 0.0367879441) * r + 0.10314224) * r + 0.169827114) * r + 0.125935004) * r + 1.0);
      return mean + stdDev * (q < 0 ? -val : val);
    }
  }
};

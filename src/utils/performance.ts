export const measurePerformance = (metric: string) => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    performance.mark(metric + '-start');
    
    return () => {
      performance.mark(metric + '-end');
      performance.measure(metric, metric + '-start', metric + '-end');
      
      const measurements = performance.getEntriesByName(metric);
      console.log(`${metric} took ${measurements[0].duration}ms`);
    };
  }
  return () => {};
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

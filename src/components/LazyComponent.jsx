import { memo, Suspense, lazy } from 'react';

// Higher-order component để lazy load components
export const withLazyLoading = (importFunc, fallback = <div>Loading...</div>) => {
  const LazyComponent = lazy(importFunc);
  
  return memo((props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  ));
};

// Loading component với skeleton
export const LoadingSkeleton = memo(() => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
  </div>
));

// Performance optimized wrapper
export const PerformanceWrapper = memo(({ children, className = "" }) => (
  <div className={`will-change-transform ${className}`}>
    {children}
  </div>
));

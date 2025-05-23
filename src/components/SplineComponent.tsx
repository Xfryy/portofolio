"use client";

import { useEffect, useRef, useState } from 'react';

interface SplineSceneProps {
  scene: string;
  onLoad?: () => void;
  onError?: () => void;
}

const SplineScene: React.FC<SplineSceneProps> = ({ scene, onLoad, onError }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let splineApp: any = null;

    const loadSpline = async () => {
      try {
        // Dynamic import Spline
        const { Application } = await import('@splinetool/runtime');
        
        if (canvasRef.current) {
          splineApp = new Application(canvasRef.current);
          await splineApp.load(scene);
          
          setIsLoading(false);
          onLoad?.();
        }
      } catch (error) {
        console.error('Spline loading error:', error);
        setHasError(true);
        setIsLoading(false);
        onError?.();
      }
    };

    loadSpline();

    return () => {
      if (splineApp) {
        splineApp.dispose();
      }
    };
  }, [scene, onLoad, onError]);

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
        <div className="text-center">
          <div className="text-6xl mb-4">🎨</div>
          <p className="text-gray-600 dark:text-gray-400">3D Scene temporarily unavailable</p>
          <button 
            onClick={() => {
              setHasError(false);
              setIsLoading(true);
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: isLoading ? 'none' : 'block' }}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading 3D Scene...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplineScene;
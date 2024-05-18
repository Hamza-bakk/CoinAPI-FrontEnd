import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AwaitPage = ({ timeout = 120000 }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/logout');
    }, timeout);

    return () => clearTimeout(timer);

  }, [navigate, timeout]);

  return (
    <div className="flex gradient-background items-center justify-center h-screen">
      <div className="relative">
        <div className="animate-spin rounded-full h-40 w-40 border-t-6 border-b-8 border-blue-500"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <span className="text-blue-500 font-bold">Chargement</span>
        </div>
      </div>
    </div>
  );
};

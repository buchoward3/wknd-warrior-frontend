// Backend Status Indicator - Shows if your backend is online 🚀
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const BackendStatus = () => {
  const [status, setStatus] = useState('checking');
  
  useEffect(() => {
    checkBackend();
    // Check every 30 seconds
    const interval = setInterval(checkBackend, 30000);
    return () => clearInterval(interval);
  }, []);
  
  const checkBackend = async () => {
    try {
      await api.healthCheck();
      setStatus('connected');
    } catch (error) {
      setStatus('disconnected');
    }
  };
  
  const statusColors = {
    checking: 'bg-yellow-500',
    connected: 'bg-green-500',
    disconnected: 'bg-red-500'
  };
  
  const statusTexts = {
    checking: 'Checking...',
    connected: 'Backend Online',
    disconnected: 'Backend Offline'
  };
  
  return (
    <div className="flex items-center space-x-2 text-xs">
      <div className={`w-2 h-2 rounded-full ${statusColors[status]} animate-pulse`}></div>
      <span className="text-gray-400">{statusTexts[status]}</span>
    </div>
  );
};

export default BackendStatus;
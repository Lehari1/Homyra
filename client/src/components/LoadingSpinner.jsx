// src/components/LoadingSpinner.jsx
import React from 'react';

export default function LoadingSpinner({ size = 8, color = 'border-blue-500' }) {
  return (
    <div className={`w-${size} h-${size} border-4 border-gray-200 border-t-${color} rounded-full animate-spin`}></div>
  );
}

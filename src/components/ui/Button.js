// src/components/Button.js
import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function Button({ children, className = '', ...props }) {
  const baseClasses = "bg-accent-primary text-dark-text py-2 px-4 rounded-lg font-semibold hover:bg-accent-hover transition-colors";
  const mergedClasses = twMerge(baseClasses, className);

  return (
    <button className={mergedClasses} {...props}>
      {children}
    </button>
  );
}
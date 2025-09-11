// src/components/Input.js
import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function Input({ className = '', ...props }) {
  const baseClasses = "bg-dark-background text-dark-text px-4 py-3 rounded-lg flex-1 ring-2 ring-white-border focus:outline-none focus:ring-2 focus:ring-accent-primary";
  const mergedClasses = twMerge(baseClasses, className);

  return (
    <input className={mergedClasses} {...props} />
  );
}
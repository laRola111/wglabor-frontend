// src/components/Label.js
import React from 'react';

export default function Label({ children, htmlFor, className = '', ...props }) {
  return (
    <label htmlFor={htmlFor} className={`text-dark-text-muted ${className}`} {...props}>
      {children}
    </label>
  );
}
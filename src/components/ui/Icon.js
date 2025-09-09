// src/components/Icon.js
import React from 'react';

// Este componente es un placeholder.
// La implementación final usará una librería como react-icons.
export default function Icon({ name, size = 20, color = 'currentColor', className = '', ...props }) {
  return (
    <svg className={className} width={size} height={size} fill={color} {...props}>
      {/* Aquí iría la lógica para renderizar el ícono */}
    </svg>
  );
}
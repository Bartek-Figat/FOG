import React from 'react';

export const Button = ({ children, ...res }) => {
  return (
    <button {...res} >
      {children}
    </button>
  );
};

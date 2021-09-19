import React from 'react';

export const Button = ({ children, ...res }) => {
  return (
    <button className="rounded p-3 bg-black text-white " {...res}>
      Continue with GitHub
      {children}
    </button>
  );
};

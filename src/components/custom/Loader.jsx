import React from 'react';

const Loader = () => {
  const pulseStyle = {
    width: '70.4px',
    height: '70.4px',
    position: 'relative',
    transform: 'rotate(45deg)',
  };

  const beforeAfterStyle = {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '50% 50% 0 50%',
    background: '#474bff',
    WebkitMask: 'radial-gradient(circle 17.6px at 50% 50%,#0000 94%,#000)',
  };

  const afterStyle = {
    ...beforeAfterStyle,
    animation: 'pulse-ytk0dhhg 0.8s infinite',
    transform: 'perspective(528px) translateZ(0px)',
  };

  const keyframesStyle = `@keyframes pulse-ytk0dhhg {
    to {
      transform: perspective(528px) translateZ(264px);
      opacity: 0;
    }
  }`;

  return (
    <div>
      <style>
        {keyframesStyle}
      </style>
      <div className="pulse" style={pulseStyle}>
        <div style={beforeAfterStyle}></div>
        <div style={afterStyle}></div>
      </div>
    </div>
  );
}

export default Loader;
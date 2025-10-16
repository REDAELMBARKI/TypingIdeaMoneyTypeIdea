import React from 'react';
import useThemeHook from '../customHooks/useThemeHook';

interface AuthButtonProps {
  size?: 'sm' | 'md' | 'lg';
}

const AuthButton = ({ size = 'md' }: AuthButtonProps) => {
  const { currentTheme } = useThemeHook();
  
  // Size configurations
  const sizeConfig = {
    sm: {
      outer: { width: '100px', height: '36px', borderRadius: '12px' },
      inner: { width: '96px', height: '32px', borderRadius: '10px', gap: '10px' },
      svg: { width: '20px', height: '20px' },
      fontSize: '11px'
    },
    md: {
      outer: { width: '131px', height: '43px', borderRadius: '15px' },
      inner: { width: '127px', height: '38px', borderRadius: '13px', gap: '15px' },
      svg: { width: '19px', height: '19px' },
      fontSize: '14px'
    },
    lg: {
      outer: { width: '160px', height: '60px', borderRadius: '18px' },
      inner: { width: '156px', height: '56px', borderRadius: '16px', gap: '18px' },
      svg: { width: '32px', height: '32px' },
      fontSize: '16px'
    }
  };

  const config = sizeConfig[size];

  // Helper function to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div
      aria-label="User Login Button"
      tabIndex={0}
      role="button"
      style={{
        width: config.outer.width,
        height: config.outer.height,
        borderRadius: config.outer.borderRadius,
        cursor: 'pointer',
        transition: '0.3s ease',
        background: `linear-gradient(to bottom right, ${currentTheme.buttonPrimary} 0%, ${hexToRgba(currentTheme.buttonPrimary, 0)} 30%)`,
        backgroundColor: hexToRgba(currentTheme.buttonPrimary, 0.2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = hexToRgba(currentTheme.buttonPrimary, 0.7);
        e.currentTarget.style.boxShadow = `0 0 10px ${hexToRgba(currentTheme.buttonPrimary, 0.5)}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = hexToRgba(currentTheme.buttonPrimary, 0.2);
        e.currentTarget.style.boxShadow = 'none';
      }}
      onFocus={(e) => {
        e.currentTarget.style.backgroundColor = hexToRgba(currentTheme.buttonPrimary, 0.7);
        e.currentTarget.style.boxShadow = `0 0 10px ${hexToRgba(currentTheme.buttonPrimary, 0.5)}`;
        e.currentTarget.style.outline = 'none';
      }}
      onBlur={(e) => {
        e.currentTarget.style.backgroundColor = hexToRgba(currentTheme.buttonPrimary, 0.2);
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div
        style={{
          width: config.inner.width,
          height: config.inner.height,
          borderRadius: config.inner.borderRadius,
          backgroundColor: currentTheme.page_bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: config.inner.gap,
          color: currentTheme.white,
          fontWeight: 600,
        }}
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style={{
            width: config.svg.width,
            height: config.svg.height,
            fill: currentTheme.white,
          }}
        >
          <g data-name="Layer 2" id="Layer_2">
            <path d="m15.626 11.769a6 6 0 1 0 -7.252 0 9.008 9.008 0 0 0 -5.374 8.231 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 9.008 9.008 0 0 0 -5.374-8.231zm-7.626-4.769a4 4 0 1 1 4 4 4 4 0 0 1 -4-4zm10 14h-12a1 1 0 0 1 -1-1 7 7 0 0 1 14 0 1 1 0 0 1 -1 1z" />
          </g>
        </svg>
        <p style={{ fontSize: config.fontSize, margin: 0 }}>Log In</p>
      </div>
    </div>
  );
};

export default AuthButton;

const WordOrTimeDropdown = () => {
  const styles = {
    menu: {
      fontSize: '16px',
      lineHeight: '1.6',
      color: '#000000',
      width: 'fit-content',
      display: 'flex',
      listStyle: 'none',
    },
    link: {
      position: 'relative' as const,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      padding: '12px 36px',
      borderRadius: '16px',
      overflow: 'hidden',
      transition: 'all 0.48s cubic-bezier(0.23, 1, 0.32, 1)',
      textDecoration: 'none',
      color: 'inherit',
    },
    svg: {
      width: '14px',
      height: '14px',
      fill: '#000000',
      transition: 'all 0.48s cubic-bezier(0.23, 1, 0.32, 1)',
    },
    item: {
      position: 'relative' as const,
    },
    submenu: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      position: 'absolute' as const,
      top: '100%',
      borderRadius: '0 0 16px 16px',
      left: '0',
      width: '100%',
      overflow: 'hidden',
      border: '1px solid #cccccc',
      opacity: 0,
      visibility: 'hidden' as const,
      transform: 'translateY(-12px)',
      transition: 'all 0.48s cubic-bezier(0.23, 1, 0.32, 1)',
      zIndex: 1,
      pointerEvents: 'none' as const,
      listStyle: 'none',
      backgroundColor: '#fff',
    },
    submenuItem: {
      width: '100%',
      transition: 'all 0.48s cubic-bezier(0.23, 1, 0.32, 1)',
    },
    submenuLink: {
      display: 'block',
      padding: '12px 24px',
      width: '100%',
      position: 'relative' as const,
      textAlign: 'center' as const,
      transition: 'all 0.48s cubic-bezier(0.23, 1, 0.32, 1)',
      textDecoration: 'none',
      color: 'inherit',
    },
  };

  return (
    <>
      <style>{`
        .menu-link::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #0a3cff;
          z-index: -1;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.48s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .menu-item:hover .submenu {
          opacity: 1 !important;
          visibility: visible !important;
          transform: translateY(0) !important;
          pointer-events: auto !important;
          border-top: transparent;
          border-color: #0a3cff;
        }
        .menu-item:hover .menu-link {
          color: #ffffff;
          border-radius: 16px 16px 0 0;
        }
        .menu-item:hover .menu-link::after {
          transform: scaleX(1);
          transform-origin: right;
        }
        .menu-item:hover .menu-link svg {
          fill: #ffffff;
          transform: rotate(-180deg);
        }
        .submenu-link::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          transform: scaleX(0);
          width: 100%;
          height: 100%;
          background-color: #0a3cff;
          z-index: -1;
          transform-origin: left;
          transition: transform 0.48s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .submenu-link:hover::before {
          transform: scaleX(1);
          transform-origin: right;
        }
        .submenu-link:hover {
          color: #ffffff;
        }
      `}</style>
      
      <div style={styles.menu} className="menu">
        <div style={styles.item} className="menu-item">
          <a href="#" style={styles.link} className="menu-link">
            <span> Our Services </span>
            <svg viewBox="0 0 360 360" xmlSpace="preserve" style={styles.svg}>
              <g id="SVGRepo_iconCarrier">
                <path
                  id="XMLID_225_"
                  d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                ></path>
              </g>
            </svg>
          </a>
          <div style={styles.submenu} className="submenu">
            <div style={styles.submenuItem}>
              <a href="#" style={styles.submenuLink} className="submenu-link"> Development </a>
            </div>
            <div style={styles.submenuItem}>
              <a href="#" style={styles.submenuLink} className="submenu-link"> Design </a>
            </div>
            <div style={styles.submenuItem}>
              <a href="#" style={styles.submenuLink} className="submenu-link"> Marketing </a>
            </div>
            <div style={styles.submenuItem}>
              <a href="#" style={styles.submenuLink} className="submenu-link"> SEO </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WordOrTimeDropdown;
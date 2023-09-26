import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  React.useEffect(() => {
    setActiveLink(location.pathname);
    
  }, [location]);

  
  return (
    <div className="container mx-auto">
      
    </div>
  );
};

export default Header;

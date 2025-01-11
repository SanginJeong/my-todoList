import React, { useState } from 'react';
import './Dropdown.style.css';

const Dropdown = ({ children }) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const handleDropdown = () => {
    setIsOpenDropdown((prev) => !prev);
  };

  return (
    <ul className="dropdown">
      <li>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { isOpenDropdown, handleDropdown })
        )}
      </li>
    </ul>
  );
};
export default Dropdown;

Dropdown.menu = ({ children, handleDropdown }) => {
  return (
    <div className="dropdown-menu" onClick={handleDropdown}>
      {children}
    </div>
  );
};

Dropdown.item = ({ children, isOpenDropdown }) => {
  return <ul className={`dropdown-item ${isOpenDropdown ? 'active' : ''}`}>{children}</ul>;
};


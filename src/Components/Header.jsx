import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css'
const Header = ({ grouping, ordering, handleGroupingChange, handleOrderingChange }) => {
  const [isDisplayOptionsVisible, setDisplayOptionsVisible] = useState(false);

  const toggleDisplayOptions = () => {
    setDisplayOptionsVisible(!isDisplayOptionsVisible);
  };

  return (
    <div className="header">
      <div className="left-section">
      <button className="display-options-btn" onClick={toggleDisplayOptions}>
        <img src="/src/assets/Display.png"  className="display-icon" />
        Display  <img src="/src/assets/down.png"  />
        </button>
        {isDisplayOptionsVisible && (
          <div className="dropdown display-options-dropdown">
            <div className="dropdown-option">
              <label htmlFor="grouping">Grouping:</label>
              <select id="grouping" value={grouping} onChange={handleGroupingChange}>
              <option value="status">Status</option>
              <option value="userId">User</option>
             <option value="priority">Priority </option>
              </select>
            </div>
            <div className="dropdown-option">
              <label htmlFor="ordering">Ordering:</label>
              <select id="ordering" value={ordering} onChange={handleOrderingChange}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>

 
    </div>
  );
};

Header.propTypes = {
  grouping: PropTypes.string.isRequired,
  ordering: PropTypes.string.isRequired,
  handleGroupingChange: PropTypes.func.isRequired,
  handleOrderingChange: PropTypes.func.isRequired,
};

export default Header;

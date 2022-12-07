import React from "react";

const Switch = ({ isOn, handleToggle, onColor }) => {
  return (
    <label style={{ background: isOn && onColor }} className="react-switch">
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        type="checkbox"
      />
      <div className="react-switch-button" />
      <div className="react-switch-labels">
        <span>
          <p>F</p>
        </span>
        <span>
          <p>C</p>
        </span>
      </div>
    </label>
  );
};

export default Switch;

import { useState } from 'react';
import './accordion.css';
import ToggleIcon from '../../../assets/img/toggle-icon.svg';

export default function Accordion({ title, children, isActive, onToggle }) {
  return (
    <div className="accordion">
      <div className="dropdown-title">
        <h4>{title}</h4>
        <button type="button" onClick={onToggle}>
          <img src={ToggleIcon} alt="toggle" />
        </button>
      </div>

      {isActive && (
        <div className="detailsInfoMenu">
          {children}
        </div>
      )}
    </div>
  );
}

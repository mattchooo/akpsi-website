// Button.js
import React from "react";
import '../stylesheets/Button.css';
import classNames from "classnames";

const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  className
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = STYLES.includes(buttonSize)
    ? buttonSize
    : SIZES[0];

  const buttonClasses = classNames(
    'btn',
    checkButtonStyle,
    checkButtonSize,
    className
  );

  return (
    <div className="btn-mobile">
      <button
        className={buttonClasses}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </div>
  );
};

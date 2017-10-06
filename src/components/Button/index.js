import React from "react";
import { PropTypes as T } from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames";

import "./Button.css";

export default function Button(props) {
  const buttonClass = classnames(
    props.className,
    "Button",
    `Button-${props.display}`,
    {
      "Button-small": props.isSmall,
      "Button-secondary": props.isSecondary
    }
  );
  const iconClass = classnames("fa", `fa-${props.icon}`, {
    "fa-lg": !props.isSmall
  });
  const isIcon = props.display === "icon";

  const button = (
    <button
      className={buttonClass}
      title={isIcon ? props.text : props.title || ""}
      type={props.type}
      onClick={props.action}
      disabled={props.disabled}
    >
      <i className={iconClass} aria-hidden="true" />
      {!isIcon && ` ${props.text}`}
    </button>
  );
  return props.link ? <Link to={props.link}>{button}</Link> : button;
}

Button.defaultProps = {
  type: "button",
  display: "fullwidth",
  icon: "font-awesome",
  text: "Button"
};

Button.propTypes = {
  type: T.oneOf([
    // Button Type https://developer.mozilla.org/en/docs/Web/HTML/Element/button
    "submit",
    "reset",
    "button",
    "menu"
  ]),
  display: T.oneOf([
    // Button Display
    "fullwidth", // Full Width
    "content", // Content Width
    "icon" // Icon Only
  ]).isRequired,
  icon: T.string.isRequired, // Icon ID in Font Awesome
  text: T.string.isRequired, // Button Text
  action: T.func, // Action Function
  link: T.string, // Link Button
  isSmall: T.bool, // Size: Large (default) vs Small
  isSecondary: T.bool, // Role: Primary (default) vs Secondary
  disabled: T.bool, // Button is disabled
  title: T.string // Title (if any)
};

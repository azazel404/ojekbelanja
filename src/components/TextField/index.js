import React, { Component } from "react";
import { PropTypes as T } from "prop-types";
import classnames from "classnames";

import "./TextField.css";

export default class TextField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPristine: true,
      isFocused: false
    };
  }

  /*** Methods ***/

  onFocus = (name, value) => {
    this.setState({
      isFocused: true // Set Focused
    });
  };

  onBlur = (name, value) => {
    this.setState({
      isPristine: false, // Set Dirty
      isFocused: false // Set Blur
    });
    if (this.props.onBlur) {
      this.props.onBlur(name, value); // Call onBlur props function
    }
  };

  isInvalid = () =>
    !this.state.isPristine && !this.state.isFocused && this.props.message;

  /*** Render ***/

  render() {
    const {
      className,
      type,
      display,
      name,
      label,
      placeholder,
      value,
      message,
      required,
      onChange,
      min,
      max,
      step
    } = this.props;

    const textFieldClass = classnames(className, "TextField");
    const labelClass = classnames("TextField-label");
    const inputClass = classnames(
      "TextField-input",
      `TextField-input-${display}`,
      {
        "TextField-input-is-error": this.isInvalid()
      }
    );

    return (
      <div className={textFieldClass}>
        {label && (
          <label className={labelClass} htmlFor={name}>
            {label}
            {!required && (
              <span className="TextField-label-span"> - Opsional</span>
            )}
          </label>
        )}
        <input
          className={inputClass}
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onFocus={e => this.onFocus(name, e.target.value)}
          onChange={e => onChange(name, e.target.value)}
          onBlur={e => this.onBlur(name, e.target.value)}
          required={required}
          min={min}
          max={max}
          step={step}
        />
        {this.isInvalid() && (
          <span className="TextField-message">{`* ${message}`}</span>
        )}
      </div>
    );
  }
}

TextField.defaultProps = {
  type: "text",
  display: "fullwidth",
  value: "",
  message: "",
  min: 0,
  max: 100,
  step: 1
};

TextField.propTypes = {
  type: T.oneOf([
    // Input Type https://developer.mozilla.org/en/docs/Web/HTML/Element/input
    "date",
    "email",
    "file",
    "month",
    "number",
    "password",
    "search",
    "tel",
    "text",
    "time",
    "url",
    "week"
  ]),
  display: T.oneOf([
    // TextField Display
    "fullwidth", // Full Width
    "content", // Content Width
    "fixed" // Fixed Width
  ]),
  name: T.string, // Name
  label: T.string, // Label
  placeholder: T.string, // Placeholder
  value: T.any.isRequired, // Value
  onChange: T.func.isRequired, // onChange Function
  onBlur: T.func, // onBlur Function
  message: T.any, // Error Message
  required: T.bool, // is Required
  min: T.number, // Minimum Value for Number/Range Type
  max: T.number, // Maximum Value for Number/Range Type
  step: T.number // Step for Range Number/Type
};

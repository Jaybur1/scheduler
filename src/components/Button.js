import React from "react";
import classnames from "classnames";

import "components/Button.scss";

export default function Button({
  children,
  confirm,
  danger,
  disabled,
  onClick
}) {
  let buttonClass = classnames("button", {
    "button--confirm": confirm,
    "button--danger": danger
  });

  return (
    <button disabled={disabled} className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
}

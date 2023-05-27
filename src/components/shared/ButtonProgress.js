import React from "react";

function ButtonProgress(props) {

const {onClick,pendingApiCall,disabled,text,className} = props;
  return (
    <button
      onClick={onClick}
      type="button"
      className={className || "btn btn-primary btn-lg"}
      disabled={disabled}
    >
      {pendingApiCall && (
        <span className="spinner-border spinner-border-sm"></span>
      )}
      {text}
    </button>
  );
}

export default ButtonProgress;
import React from "react";

function Input(props) {
    const {iname,type,error,holder,onChange,defaultValue} = props;

    let className = 'form-control';
  
    if (type === 'file') {
      className += '-file';
    }
  
    if (error !== undefined) {
      className += ' is-invalid';
    }
  
    return (
      <div className="d-flex flex-row align-items-center mb-4">
        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
        <div className="form-outline flex-fill mb-0">
          <input
            name={iname}
            type={type}
            id="form3Example1c"
            className={className}
            placeholder={holder}
            onChange={onChange}
            defaultValue={defaultValue}
          />
          <div className="invalid-feedback">{props.error}</div>
        </div>
      </div>
    );
}

export default Input;

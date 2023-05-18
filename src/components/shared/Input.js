import React from "react";

function Input(props) {
    const {iname,type,error,holder,onChange} = props
    return (
      <div className="d-flex flex-row align-items-center mb-4">
        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
        <div className="form-outline flex-fill mb-0">
          <input
            name={iname}
            type={type}
            id="form3Example1c"
            className={error ? "form-control is-invalid" : "form-control"}
            placeholder={holder}
            onChange={onChange}
          />
          <div className="invalid-feedback">{error}</div>
        </div>
      </div>
    );
}

export default Input;

import React from "react";

const FormErrors = ({formErrors}) =>
  <section>
    <div className="form-messages">
        <h4>{formErrors}</h4>
    </div>
  </section>


export default FormErrors;

import React from "react";
import { withTranslation } from "react-i18next";
import { changeLanguage } from "../shared/apiCalls";

function LanugageSelector(props) {
  const onChangeLanguage = (language) => {
    const { i18n } = props;
    i18n.changeLanguage(language);
    changeLanguage(language);
  };

  return (
    <div className="container">
      <img
        src="./Images/tr.png"
        alt="Turkish Flag"
        onClick={() => onChangeLanguage("tr")}
        style={{ cursor: "pointer" }}
      ></img>
      <img
        src="./Images/uk.png"
        alt="British Flag"
        onClick={() => onChangeLanguage("en")}
        style={{ cursor: "pointer" }}
      ></img>
    </div>
  );
}

export default withTranslation()(LanugageSelector);

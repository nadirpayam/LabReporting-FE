import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useTranslation } from "react-i18next";


function OneReport() {

  const [loader, setLoader] = useState(false);
  const { t } = useTranslation();

  const downloadPDF = () => {
    const capture = document.querySelector(".pdf");
  
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF("p", "mm", "a4");
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const aspectRatio = canvas.width / canvas.height;
      const imgWidth = pageWidth;
      const imgHeight = imgWidth / aspectRatio;
  
      doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      doc.save("sayfa.pdf");
    });
  };


  return (
    <div className="pdf">
        <div className="input-group mb-3" style={{ marginTop: "40px" }}>
        <label
          htmlFor="basic-url"
          className="form-label"
          style={{ marginLeft: "150px" }}
        >
          <b>{t("DNo")}:</b>
          {localStorage.getItem("reportId")}
        </label>
      </div>
      <div className="input-group mb-3" >
        <label
          htmlFor="basic-url"
          className="form-label"
          style={{ marginLeft: "150px" }}
        >
          <b>{t("PName")}: </b>
          {localStorage.getItem("name")}
        </label>
      </div>
    

      <div className="input-group mb-3">
        <label
          htmlFor="basic-url"
          className="form-label"
          style={{ marginLeft: "150px" }}
        >
          <b>{t("REPORT DATE")}:</b>
          {localStorage.getItem("date")}
        </label>
      </div>

      <div className="input-group mb-3">
        <label
          htmlFor="basic-url"
          className="form-label"
          style={{ marginLeft: "150px" }}
        >
          <b>{t("PSurName")}:</b>
          {localStorage.getItem("surname")}
        </label>
      </div>

      <div className="input-group mb-3">
        <label
          htmlFor="basic-url"
          className="form-label"
          style={{ marginLeft: "150px" }}
        >
          <b>{t("TC")}:</b>
          {localStorage.getItem("identity")}
        </label>
      </div>

      <div className="input-group mb-3">
        <label
          htmlFor="basic-url"
          className="form-label"
          style={{ marginLeft: "150px" }}
        >
          <b>{t("EmailH")}:</b>
          {localStorage.getItem("emailH")}
        </label>
      </div>

      <div className="input-group mb-3">
        <label
          htmlFor="basic-url"
          className="form-label"
          style={{ marginLeft: "150px" }}
        >
          <b>{t("DIAGNOSIS")}:</b>
          {localStorage.getItem("diagnosis")}
        </label>
      </div>

      <div className="input-group mb-3">
        <label
          htmlFor="basic-url"
          className="form-label"
          style={{ marginLeft: "150px" }}
        >
          <b>{t("DIAGNOSIS DETAILS")}:</b>
          {localStorage.getItem("details")}
        </label>
      </div>

      <div className="input-group mb-3">
        <label
          htmlFor="basic-url"
          className="form-label"
          style={{ marginLeft: "150px" }}
        >
          <b>{t("labad")}:</b>
          {localStorage.getItem("labAd")}
        </label>
      </div>

      <div className="input-group mb-3">
        <label
          htmlFor="basic-url"
          className="form-label"
          style={{ marginLeft: "150px" }}
        >
          <b>{t("labsad")}:</b>
          {localStorage.getItem("labSoyad")}
        </label>
      </div>

      <div className="input-group mb-3">
        <label
          htmlFor="basic-url"
          className="form-label"
          style={{ marginLeft: "150px" }}
        >
          <b>{t("labno")}:</b>
          {localStorage.getItem("hospitalNo")}
        </label>
      </div>

<div className="input-group mb-3">
        <label
          htmlFor="basic-url"
          className="form-label"
          style={{ marginLeft: "150px" }}
        >
          <b>{t("labemail")}:</b>
          {localStorage.getItem("labMail")}
        </label>
      </div>

      <button
                className="receipt-modal-download-button"
                onClick={downloadPDF}
                disabled={!(loader === false)}
              >
                {loader ? <span>Downloading</span> : <span>Download</span>}
              </button>
    </div>
  );
}

export default OneReport;
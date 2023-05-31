import React, { useState, useEffect } from "react";
import { getReports } from "../shared/apiCalls";
import { useTranslation } from "react-i18next";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function MyReports() {
  const [product, setProduct] = useState([]);
  const { t } = useTranslation();

  const [loader, setLoader] = useState(false);
  const [name, setName] = useState();

  useEffect(() => {
    console.log(name);
    const url = "/api/reports?userId=" + localStorage.getItem("currentUser");
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const json = await response.json();
          setProduct(json);
        } else {
          throw new Error("Error fetching data");
        }
      } catch (e) {
        console.log("Error fetching data:", e);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="burdanitibaren">
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">Tanı</th>
            <th scope="col">Tanı Detayları</th>
            <th scope="col">Rapor Tarihi</th>
            <th scope="col">Laborant Hastane Numarası</th>
            <th scope="col"></th> {/* İndirme butonunun hücresi */}
          </tr>
        </thead>
        <tbody>
          {product.map((product) => (
            <tr>
              <td>{product.diagnosis}</td>
              <td>{product.details}</td>
              <td>{product.date}</td>
              <td>{product.hospitalNo}</td>
              <td>
              </td>{" "}
              <Link className="dropdown-item d-flex p-2" to={`/onereport`}>
                <button
                  onClick={() => {
                    localStorage.setItem("surname", product.surname);
                    localStorage.setItem("identity", product.identity);
                
                    localStorage.setItem("diagnosis", product.diagnosis);
                    localStorage.setItem("details", product.details);
                    localStorage.setItem("date", product.date);
                
                    localStorage.setItem("hospitalNo", product.hospitalNo);
                    localStorage.setItem("emailH", product.emailH);
                    localStorage.setItem("labAd", product.labAd);
                
                    localStorage.setItem("labSoyad", product.labSoyad);
                    localStorage.setItem("labMail", product.labMail);
                    localStorage.setItem("reportId", product.reportId);
                  }}
                > {t("GoRapor")}
                  
                </button>{" "}
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyReports;

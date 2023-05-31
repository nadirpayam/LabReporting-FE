import React, { useState, useEffect } from "react";
import { getReports, updateReports,deleteReports} from "../shared/apiCalls";
import { useTranslation } from "react-i18next";


function EditReports() {
  const [product, setProduct] = useState([]);
  const [diagnosis, setDiagnosis] = useState();
  const [details, setDetails] = useState();
  const [currentDate, setCurrentDate] = useState("");
  const [reportId, setReportId] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    const url = "/api/reports";
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

  const onClickUpdate = async (event) => {
    event.preventDefault();

    const body = {
      diagnosis: diagnosis,
      details: details,
      date: currentDate,
    };

    try {
      await updateReports(reportId, body);
    } catch (error) {}
  };

  const onClickDelete = async (event) => {
    event.preventDefault();

    try {
      await deleteReports(reportId);
    } catch (error) {}
  };


  return (
    <div>
      <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col">{t("PName")}</th>
            <th scope="col">{t("PSurName")}</th>
            <th scope="col">{t("DIAGNOSIS")}</th>
            <th scope="col">{t("DIAGNOSIS DETAILS")}</th>
            <th scope="col">{t("REPORT DATE")}</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {product.map((product) => (
            <tr>
              <td>{product.name}</td>
              <td>{product.surname}</td>
              <td>
                <input
                  type="text"
                  defaultValue={product.diagnosis}
                  onChange={(event) => setDiagnosis(event.target.value)}
                />
              </td>
              <td>
                <textarea
                  type="text"
                  defaultValue={product.details}
                  onChange={(event) => {
                    setDetails(event.target.value);
                    setReportId(product.reportId);
                  }}
                />{" "}
              </td>
              <td>
                {product.date}
              </td>
              <td>
                <button onClick={onClickUpdate}> {t("update")}</button>
                <button onClick={onClickDelete}> {t("delete")}</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EditReports;

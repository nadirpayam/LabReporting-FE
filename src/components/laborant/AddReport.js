import React, { Component, useState } from "react";
import ProfilCard from "../user/ProfilCard";
import Input from "../shared/Input";
import { postReport } from "../shared/apiCalls";
import ButtonProgress from "../shared/ButtonProgress";
import { useApiProgress } from "../shared/apiProgress";
import { useTranslation } from "react-i18next";


const AddReport = (props) => {
  const { history } = props;
  const { push } = history;
  const [diagnosis,setDiagnosis] = useState();
  const [details,setDetails] = useState();
  const [error, setError] = useState({});
  const { t } = useTranslation();

  
  const onClickReport = async (event) => {
    event.preventDefault();
   
    const body = {
      details,
      diagnosis,
      labId:localStorage.getItem("laborant"),
      userId: localStorage.getItem("currentPatient")
    };

    try {
      await (postReport(body))
      push("/register");
    } catch (error) {
      if (error.response.data.validationErrors) {
        setError( error.response.data.validationErrors);
      }
    }
  };

  const {diagnosis:diagnosisError,details:detailsError} = error;
  const pendingApiCall = useApiProgress("post", "/api/auth");

  return (

    <section class="vh-75 gradient-custom">
      <div class="container py-5 h-75">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              class="card bg-dark text-white"
              style={{ borderRadius: "30px" }}
            >
              <div class="card-body p-5 text-center">
                <div class="mb-md-5 mt-md-4 pb-5">
                  <h2 class="fw-bold mb-2 text-uppercase mb-4">
                    Raporu Oluştur
                  </h2>

                  <div class="form-outline form-white mb-5">
                    <Input
                      type="text"
                      holder="Hastalığın tanısını giriniz!"
                      width="200"
                      heigth="200"
                      error={diagnosisError}
                      onChange={(event) => {
                        setDiagnosis(event.target.value);
                      }}
                    />
                    <Input
                      type="text"
                      holder="Hastalığın detaylarını giriniz!"
                      width="200"
                      heigth="200"
                      error={detailsError}
                      onChange={(event) => {
                        setDetails(event.target.value);
                      }}
                    />
                  </div>
                  <ButtonProgress
                            onClick={onClickReport}
                            disabled={pendingApiCall}
                            pendingApiCall={pendingApiCall}
                            text={t("Login")}
                          />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddReport;

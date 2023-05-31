import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const UserListItem = (props) => {
  const { t } = useTranslation();
  const { user } = props;
  const history = useHistory();
  const { push } = history;

  const { username, name, email, identity, surname, userId ,image} = user;

  const onClickButton = () => {
    push("/addreport");
    localStorage.setItem("currentPatient", userId);
  };

  return (
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">{t("Name")}</th>
          <th scope="col">{t("Soyad")}</th>
          <th scope="col">{t("TC")}</th>
          <th scope="col">{t("EMAİL")}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td scope="row">
            <ProfileImageWithDefault
              className="rounded-circle"
              width="32"
              height="32"
              image={image}
              alt={`${username} profile `}
            />
          </td>
          <td>{name}</td>
          <td>{surname}</td>
          <td>{identity}</td>
          <td>{email}</td>
          <button className="btn btn-success text-dark" onClick={onClickButton}>
            {t("Add report")}
          </button>
        </tr>
      </tbody>
    </table>
  );
};

export default UserListItem;

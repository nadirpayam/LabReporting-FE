import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import UserListItem from "./UserListItem";
import { getAllUsers } from "../shared/apiCalls";
import { useApiProgress } from "../shared/apiProgress";

const UserList = () => {
  const [page, setPage] = useState({
    content: [],
    size: 3,
    number: 0,
  });

  const [loadFailure, setLoadFailure] = useState(false);
  const pendingApiCall = useApiProgress("/api/users?page");

  useEffect(() => {
    loadUsers();
  }, []);

  const onClickNext = () => {
    const nextPage = page.number + 1;
    loadUsers(nextPage);
  };

  const onClickPrevious = () => {
    const previousPage = page.number - 1;
    loadUsers(previousPage);
  };

  const loadUsers = async (page) => {
    setLoadFailure(false);
    try {
      const response = await getAllUsers(page);
      setPage(response.data);
    } catch (error) {
      setLoadFailure(true);
    }
  };

  const { t } = useTranslation();
  const { content: users, last, first } = page;
  let actionDiv = (
    <div>
      {first === false && (
        <button
          className="btn btn-sm btn-light float-left"
          onClick={onClickPrevious}
        >
          {t("previous")}
        </button>
      )}
      {last === false && (
        <button
          className="btn btn-sm btn-light float-right"
          onClick={onClickNext}
        >
          {t("next")}
        </button>
      )}
    </div>
  );

  if (pendingApiCall) {
    actionDiv = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-black-50">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="card-header text-center">{t("Patients")}</h3>
      <div className="list-group-flush">
        {users.map((user) => (
          <UserListItem key={user.username} user={user} />
        ))}
      </div>
      {actionDiv}
      {loadFailure && (
        <div className="text-center text-danger">{t('Load Failure')}</div>
      )}
    </div>
  );
};

export default UserList;

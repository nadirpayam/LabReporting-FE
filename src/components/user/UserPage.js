import React, { useState, useEffect } from "react";
import ProfilCard from "./ProfilCard";
import { getOneUser } from "../shared/apiCalls";
import {useParams} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {useApiProgress} from "../shared/apiProgress"
import Spinner from "../shared/Spinner";

const UserPage = () => {
  const [user, setUser] = useState({});
  const [notFound, setNotFound] = useState(false);

  const { username } = useParams();

   const pendingApiCall = useApiProgress();

  const { t } = useTranslation("/api/users/"+username);

  useEffect(() => {
    setNotFound(false);
  }, [user]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getOneUser(username);
        setUser(response.data);
      } catch (error) {
        setNotFound(true);
      }
    };
    loadUser();
  }, [username]);


  if (pendingApiCall) {
    return (
      <Spinner/>
    );
  }

  if (notFound) {
    return (
      <div className="container">
        <div className="alert alert-danger text-center">
          <div>
            <i className="material-icons" style={{ fontSize: '48px' }}>
              error
            </i>
          </div>
          {t('User not found!')}
        </div>
      </div>
    );
  }
  return (
    <div>
      <ProfilCard user={user} />
    </div>
  );
}; 

export default UserPage;

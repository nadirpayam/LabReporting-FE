import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { useTranslation } from "react-i18next";
import Input from "../shared/Input";
import { updateUser } from "../shared/apiCalls";
import { useApiProgress } from "../shared/apiProgress";
import ButtonProgress from "../shared/ButtonProgress";

const ProfileCard = (props) => {
  const [updatedEmail, setUpdatedEmail] = useState();
  const { username: loggedInUsername } = useSelector((store) => ({
    username: store.username,
  }));
  const routeParams = useParams();
  const pathUsername = routeParams.username;
  const [inEditMode, setInEditMode] = useState(false);
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const { username, name, image, email } = user;
  const [editable,setEditable] = useState(false);

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  useEffect(()=>{
    setEditable(pathUsername === loggedInUsername)
  },[pathUsername,loggedInUsername])

  useEffect(() => {
    if (!inEditMode) {
      setUpdatedEmail(undefined);
    } else {
      setUpdatedEmail(email);
    }
  }, [inEditMode, email]);

  const onClickSave = async () => {
    const body = {
      email: updatedEmail,
    };
    try {
      const response = await updateUser(username, body);
      setInEditMode(false);
      setUser(response.data);
    } catch (error) {}
  };

  const pendingApiCall = useApiProgress("put", "/api/users/" + username);

  

  return (
    <div className="card text-center">
      <div className="card-header">
        <ProfileImageWithDefault
          width="200"
          height="200"
          className="rounded-circle shadow"
          alt={`${username} profile`}
          image={image}
        />
      </div>
      <div className="card-body">
        {!inEditMode && (
          <>
            <h3>
              {name} {"        "}
              {username} {"     "}
              {email}
            </h3>
           {editable && <button
              className="btn btn-success d-inline-flex"
              onClick={() => setInEditMode(true)}
            >
              <i className="material-icons">edit</i>
              {t("Edit")}
            </button> }
          </>
        )}
        {inEditMode && (
          <div>
            <Input
              holder={t("EmailUp")}
              defaultValue={email}
              onChange={(event) => {
                setUpdatedEmail(event.target.value);
              }}
            />
            <div>
              <ButtonProgress
                className="btn btn-primary d-inline-flex"
                onClick={onClickSave}
                disabled={pendingApiCall}
                pendingApiCall={pendingApiCall}
                text={
                  <>
                    <i className="material-icons">save</i> {t("Save")}
                  </>
                }
              />
              <button
                className="btn btn-danger d-inline-flex ml-2"
                onClick={() => setInEditMode(false)}
                disabled={pendingApiCall}
              >
                <i className="material-icons">close</i> {t("Cancel")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;

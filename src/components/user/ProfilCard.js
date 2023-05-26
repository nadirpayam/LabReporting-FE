import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfilCard = (props) => {
  const { username: loggedInUsername } = useSelector((store) => ({
    username: store.username,
  }));

  const routeParams = useParams();

  const pathUsername = routeParams.username;
  let message = "we cannot edit";
  if (pathUsername === loggedInUsername) {
    message = "we can edit";
  }

  return <div>ne bu: {message}</div>;
};

export default ProfilCard;

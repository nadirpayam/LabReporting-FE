import React from "react";
import defaultPicture from "../assets/profile.png"
import {Link} from "react-router-dom";

const UserListItem = (props) => {
  const { user } = props;
  const {username,name,email,image} = user;

  let imageSource = defaultPicture;
  if(image) {
    imageSource = user.image
  }

  return (
    <Link to={`/user/${username}`} className="list-group-item list-group-item-action">
        <img  className="rounded-circle"
        width="28"
        height="28"
        alt={`${username} profile `} src={imageSource}/>
      <span className="pl-4">{name} {"   "}{username}{"   "}{email}</span>
    </Link>
  );
};

export default UserListItem;

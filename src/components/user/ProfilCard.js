import React from "react";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
//import { Authentication } from "../components/shared/AuthenticationContext";

const ProfilCard = (props) => {
        const pathUsername = props.match.params.username;
        let message = "we cannot edit";
        if (pathUsername === props.loggedInUsername) {
          message = "we can edit";
        }

        return <div>ne bu: {message}</div>;
     
};

/*class ProfilCardContextWrapper extends React.Component {
 // static contextType = Authentication;
  render() {
    return (
      <ProfilCard {...this.props} username={this.context.state.username}/>
    )
  }
}*/
const mapStateToProps = (store) => {
  return {
    loggedInUsername: store.username
    };
};

export default connect(mapStateToProps)(withRouter(ProfilCard));

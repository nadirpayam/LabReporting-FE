import React, { Component } from 'react';

export const Authentication = React.createContext();

class AuthenticationContext extends Component {

    state = {
        isLoggedIn: false,
        username:undefined,
        role:undefined,
        image:undefined,
        password:undefined,
        email:undefined,
        name:undefined,
        surname:undefined
       };
    
       onLogins = authState => {
        this.setState({
          ... authState,
          isLoggedIn:true
        })
       }
    
       onLogouts = () => {
          this.setState({
            isLoggedIn:false,
            username:undefined
          })
       }

       
    render() {
        return (
            <Authentication.Provider value={{
                state:{... this.state},
                onLogins: this.onLogins,
               onLogouts:this.onLogouts
            }}>
                {this.props.children}
            </Authentication.Provider>
        );
    }
}

export default AuthenticationContext;
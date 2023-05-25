import React, { Component } from "react";
import axios from "axios";

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export function withApiProgress(WrappedComponent, apiPath) {
  return class extends Component {
    
    static displayName = `Api Progress(${getDisplayName(WrappedComponent)})`;


    state = {
      pendingApiCall: false,
    };

    componentDidMount() {
    this.requestInterceptor =  axios.interceptors.request.use((request) => {
        this.updateApicallFor(request.url, true);
        return request;
      });
     this.responseInterceptor = axios.interceptors.response.use(
        (response) => {
          this.updateApicallFor(response.config.url, false);
          return response;
        },
        (error) => {
          this.updateApicallFor(error.config.url, false);
          throw error;
        }
      );
    }

    componentWillUnmount(){
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    updateApicallFor = (url, inProgress) => {
      if (url === apiPath) {
        this.setState({ pendingApiCall: inProgress });
      }
    };

    render() {
      const pendingApiCall  = this.state.pendingApiCall || this.props.pendingApiCall;
      return <WrappedComponent  {... this.props}  pendingApiCall={pendingApiCall}/>;
    }
  };
}
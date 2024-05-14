import "./App.css";
import React, { Component } from "react";
import DashboardDevices from "./components/DashboardDevices";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddDevice from "./components/Device/AddDevice";
import UpdateDevice from "./components/Device/UpdateDevice";
import UpdateUser from "./components/User/UpdateUser";
import { Provider } from "react-redux";
import store from "./store";
import DeviceBoard from "./components/DeviceBoard/DeviceBoard";
import AddConsumption from "./components/DeviceBoard/Consumptions/AddConsumption";
import DashboardUsers from "./components/DashboardUsers";
import AddUser from "./components/User/AddUser";
import UserBoard from "./components/User/UserBoard";
import AddMaping from "./components/Mapper/AddMaping";
import Landing from "./components/Layout/Landing";
import Login from "./components/UserManagement/Login";
import DashboardDevicesUsers from "./components/DashboardDevicesUsers";
import HomeAdmin from "./components/HomeRoute/HomeAdmin";
import HomeUser from "./components/HomeRoute/HomeUser";
import ConsumptionGraphForm from "./components/DeviceBoard/Consumptions/ConsumptionGraphForm";
import ConsumptionGraph from "./components/DeviceBoard/Consumptions/ConsumptionGraph";
import SecuredRouteUser from "./securityUtils/SecuredRouteUser";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import SecuredRouteAdmin from "./securityUtils/SecuredRouteAdmin";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LandingAuth from "./components/Layout/LandingAuth";
import WebSocketLanding from "./components/WebSocketPages/WebSocketLanding";
import WebSocketLandingCritical from "./components/WebSocketPages/WebSocketLandingCritical";
import WebSocketConn from "./components/WebSocket/WebSocketConn";
import ChatWebSocketConn from "./components/WebChat/ChatWebSocketConn";

const jwtToken = sessionStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: jwtToken,
  });
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      websocket: null,
      notifications: [],
    };
    // this.handleIncomingMessages = this.handleIncomingMessages.bind(this);
    // this.initializeWebSocket = this.initializeWebSocket.bind(this);
  }

  // handleIncomingMessages(message) {
  //   const deviceDetails = JSON.parse(message.body);
  //   console.log("Device: " + JSON.stringify(deviceDetails));
  // }

  // async initializeWebSocket() {
  //   this.websocket = QueueWebSocketUtil(
  //     "/app",
  //     "/secured/sensors/critical",
  //     "secured/sensors/user/queue/critical/owner",
  //     this.handleIncomingMessages
  //   );
  //   this.websocket.connect(() => {});
  // }

  // componentDidMount() {
  //   this.initializeWebSocket();
  // }

  render() {
    console.log("jwt " + jwtToken);
    const role =
      jwtToken === undefined
        ? role
        : JSON.parse(atob(jwtToken.split(".")[1]))["scope"].toString();
    const userId =
      jwtToken === undefined
        ? userId
        : JSON.parse(atob(jwtToken.split(".")[1]))["id"].toString();
    console.log(role);
    console.log(userId);

    // console.log(this.props.security.jwtToken);

    return (
      <div>
        <Provider store={store}>
          <Router>
            <div className="App">
              <WebSocketConn />

              <Header />

              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/home" component={LandingAuth} />
              <Route exact path="/sensors" component={WebSocketLanding} />
              <Route exact path="/chat" component={ChatWebSocketConn} />
              <Route
                exact
                path="/sensors/critical"
                component={WebSocketLandingCritical}
              />

              <Switch>
                <SecuredRouteAdmin
                  exact
                  path="/home-admin/"
                  component={HomeAdmin}
                  role={role}
                />
                <SecuredRouteAdmin
                  exact
                  path="/dashboard-devices"
                  component={DashboardDevices}
                  role={role}
                />
                <SecuredRouteAdmin
                  exact
                  path="/dashboard-users"
                  component={DashboardUsers}
                  role={role}
                />
                <SecuredRouteAdmin
                  exact
                  path="/addDevice"
                  component={AddDevice}
                  role={role}
                />
                <SecuredRouteAdmin
                  exact
                  path="/addUser"
                  component={AddUser}
                  role={role}
                />
                <SecuredRouteAdmin
                  exact
                  path="/updateDevice/:id"
                  component={UpdateDevice}
                  role={role}
                />
                <SecuredRouteAdmin
                  exact
                  path="/updateUser/:id"
                  component={UpdateUser}
                  role={role}
                />
                <SecuredRouteAdmin
                  exact
                  path="/deviceBoard/:id"
                  component={DeviceBoard}
                  role={role}
                />
                <SecuredRouteAdmin
                  exact
                  path="/userBoard/:id"
                  component={UserBoard}
                  role={role}
                />
                <SecuredRouteAdmin
                  exact
                  path="/addConsumption/:id"
                  component={AddConsumption}
                  role={role}
                />
                <SecuredRouteAdmin
                  exact
                  path="/addMapping/"
                  component={AddMaping}
                  role={role}
                />
                <SecuredRouteUser
                  exact
                  path="/home-user/"
                  component={HomeUser}
                  role={role}
                />
                <SecuredRouteUser
                  exact
                  path="/myDevices/"
                  component={DashboardDevicesUsers}
                  role={role}
                />
                <SecuredRouteUser
                  exact
                  path="/deviceBoard/consumption/:device_id"
                  component={ConsumptionGraphForm}
                  role={role}
                />
                <SecuredRouteUser
                  exact
                  path="/deviceBoard/consumption/:device_id/:date"
                  component={ConsumptionGraph}
                  role={role}
                />
              </Switch>
            </div>
          </Router>
        </Provider>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   security: state.security,
//   errors: state.errors,
// });

// export default connect(mapStateToProps, null)(App);

export default App;

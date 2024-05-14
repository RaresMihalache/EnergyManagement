import Snackbar from "@mui/material/Snackbar";

import MuiAlert from "@mui/material/Alert";

import SockJS from "sockjs-client";

import { Stomp } from "@stomp/stompjs";

import React, { useEffect } from "react";

const HeaderComponent = () => {
  const [open, setOpen] = React.useState(false);
  const [mess, setMess] = React.useState("");

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  async function connect() {
    var socket = new SockJS("http://localhost:8080/api/websocket");
    let stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
      stompClient.subscribe("/topic/events", function (messageOutput) {
        const msg = JSON.parse(messageOutput.body);

        const jwtToken = sessionStorage.getItem("jwtToken");
        const userId = JSON.parse(atob(jwtToken.split(".")[1]))[
          "id"
        ].toString();
        const userRole = JSON.parse(atob(jwtToken.split(".")[1]))[
          "scope"
        ].toString();
        console.log("User Id: " + userId);
        console.log("User Role: " + userRole);
        if (userRole === "ROLE_ADMIN") {
          setMess(
            "Client with ID: " +
              msg.userId +
              " (" +
              msg.username +
              ") - New consumption: " +
              msg.measurementConsumption +
              ". Consumption in"
          );
          setOpen(true);
        } else {
          if (
            msg.userId.toString() ===
            JSON.parse(atob(jwtToken.split(".")[1]))["id"].toString()
          ) {
            if (msg.difference <= 0)
              setMess(
                "You (" +
                  msg.username +
                  ") - Device with ID: " +
                  msg.deviceId +
                  " => New consumption: " +
                  msg.measurementConsumption
              );
            else
              setMess(
                "You (" +
                  msg.username +
                  ") - Device with ID: " +
                  msg.deviceId +
                  " => New consumption: " +
                  msg.measurementConsumption +
                  ". Max Consumption EXCEEDED by: " +
                  msg.difference
              );
            setOpen(true);
            // }
          }
        }
        console.log(msg.id_user);
        console.log(msg);
        // alert(msg);
      });
    });
  }

  useEffect(() => {
    connect();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          {mess}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default HeaderComponent;

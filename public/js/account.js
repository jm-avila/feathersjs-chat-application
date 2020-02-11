$(document).ready(function() {
  var serverurl = "http://localhost:3030";

  // feathers boilerplate code to connect to users service
  var socket = io(serverurl);
  // initialize our feathers client application through socket.io
  var client = feathers();
  client.configure(feathers.socketio(socket));
  // use localstorage to store jwt
  client.configure(
    feathers.authentication({
      storage: window.localStorage
    })
  );

  // obtain users service
  var userService = client.service("/users");

  // Get User Credentials
  function getCredentials() {
    var user = {
      username: $("#username").val(),
      email: $("#email").val(),
      password: $("#password").val()
    };

    return user;
  }

  // Handle form submittal
  $("#new-user-form").submit(function(e) {
    e.preventDefault();

    var userCredentials = getCredentials();
    // Create a user using feathers client

    userService
      .create(userCredentials)
      .then(res => {
        window.location.href = `${serverurl}/login.html`;
      })
      .catch(err => {
        $("#error-message")
          .text(`There was an error ${err.message}`)
          .show();
      });
  });
});

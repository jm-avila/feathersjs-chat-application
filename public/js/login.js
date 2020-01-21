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

  // Get User Credentials
  function getCredentials() {
    var user = {
      email: $("#email").val(),
      password: $("#password").val()
    };

    return user;
  }

  // Handle form submittal
  $("#login-user-form").submit(function(e) {
    e.preventDefault();

    var userCredentials = getCredentials();

    // Authenticate with feathers client:
    // success: redirect to app
    // error: error message

    client
      .authenticate({
        strategy: "local",
        email: userCredentials.email,
        password: userCredentials.password
      })
      .then(token => {
        window.location.href = serverurl;
      })
      .catch(err => {
        $("#error-message")
          .text(`There was an error ${err.message}.`)
          .show();
      });
  });
});

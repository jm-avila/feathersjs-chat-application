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

  client
    .authenticate()
    .then(response => {
      // Handle form submittal
      $("#logout-icon").on("click", function(e) {
        e.preventDefault();

        // Logout is clicked
        client.logout();
        window.location.href = `${serverurl}/login.html`;
      });
    })
    .catch(err => {
      window.location.href = `${serverurl}/login.html`;
    });
});

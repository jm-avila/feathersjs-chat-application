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

  // obtain message service

  var messageService = client.service("/messages");
  // Is user authenticated - run page code ELSE redirecto to login page
  client
    .authenticate()
    .then(response => {
      $("#logout-icon").on("click", function(e) {
        e.preventDefault();

        // Logout is clicked
        client.logout();
        window.location.href = `${serverurl}/login.html`;
      });

      // Handle form submittal
      $("#submit-message-form").submit(function(e) {
        e.preventDefault();
        var $msgText = $("#msg-text");
        var msgText = $msgText.val();
        $msgText.val("");

        if (msgText.trim().length) {
          messageService
            .create({
              text: msgText
            })
            .catch(err => {
              alert(`There was an error: ${err.message}`);
            });
        }
      });

      // Watch for new message events and handle
      messageService.on("created", message => {
        console.log(message);
      });
    })
    .catch(err => {
      window.location.href = `${serverurl}/login.html`;
    });
});

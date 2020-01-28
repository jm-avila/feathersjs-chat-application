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

  // Message class - Handle message production
  class Message {
    constructor(msgText) {
      this.msgText = msgText;
    }

    getMessageHtmlString() {
      var msgHtmlString = `<div class="media mt-3">
      <div class="media-left mr-3">
        <a href="#">
          <img
            src="https://img.favpng.com/23/0/3/computer-icons-user-profile-clip-art-portable-network-graphics-png-favpng-YEj6NsJygkt6nFTNgiXg9fg9w.jpg"
            alt="64x64 user image"
            class="media-object"
            style="width: 64px; height: 64px;"
          />
        </a>
      </div>
      <div class="media-body border-bottom">
        <div class="float-right">
          <span class="delete-comment" title="Delete Comment">
            <i class="fa fa-times" aria-hidden="true"></i>
          </span>
        </div>
        <h4 class="media-heading">${"CHemi"}</h4>
        <p class="mb-3">${"New"}</p>
        <p>
         ${this.msgText}
        </p>
      </div>
    </div>`;
      return msgHtmlString;
    }
  }

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

        // if message text contains more than whitespace, save the message to the database.
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
        var newMessage = new Message(message.text);

        $("#chat-area").append(newMessage.getMessageHtmlString());

        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
      });
    })
    .catch(err => {
      window.location.href = `${serverurl}/login.html`;
    });
});

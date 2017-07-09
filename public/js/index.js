var socket = io();

socket.on('connect', function(){
    console.log("Connected to server");

    // socket.emit('createMessage', {
    //     from: 'Petic',
    //     text: "Hello my friends!"
    // });

});

socket.on('disconnect', function(){
    console.log("Disconnected from server");
});


socket.on('newMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    $("#messages").append(li);

    socket.on("newLocationMessage", function (message) {
        var formattedTime = moment(message.createdAt).format('h:mm a');
        var li = $('<li></li>');
        var a = $('<a target="_blank"> My current location</a>');

        li.text(`${message.from}: ${formattedTime} `);
        a.attr('href', message.url)
        li.append(a);
        $("#messages").append(li);
    })

});

socket.on('welcomeMessage', function(message){
    console.log("New message comes ", message);
});

socket.emit('createMessage',{
    from: "Admin",
    text: "Welcome to the chart app"
}, function (data){
    console.log('Got it ', data);
});

$('#message-form').on('submit', function (e) {
   e.preventDefault();

   var messageTextbox = $('[name=message]');

    socket.emit('createMessage',{
        from: "User",
        text: messageTextbox.val()
    }, function (data){
        messageTextbox.val('')
    });
});

var locationButton =$('#send-location');
locationButton.on('click', function (e) {
    if(!navigator.geolocation){
        return alert('Geolocation not suported by your brauser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');
    
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        return alert('Unable to fetch location');
    })
    
});















































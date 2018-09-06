let socket = io();

function scrollToBottom() {
    //Selectors
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child');
    //Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    let params = jQuery.deparam(window.location.search);

    socket.emit('join',params, function (err) {
        if(err){
            alert(err);
            window.location.href = '/'
        } else {
            console.log('No Error');
        }
    });
});

socket.on('newMessage', function (message)  {
    let template = jQuery('#message-template').html();
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let html = Mustache.render(template,{
        text: message.text,
        createdAt: formattedTime,
        from: message.from
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('disconnect', function ()  {
    console.log('Disconnected from server');
});

socket.on('newLocationMessage', function(message) {
    let template = jQuery('#location-message-template').html();
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let html = Mustache.render(template, {
        url: message.url,
        createdAt: formattedTime,
        from: message.from
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});



jQuery('#message-form').on('submit', function(e)  {
    e.preventDefault();

    let messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('');
    });
});

let locationButton = jQuery('#sendLocation');
locationButton.on('click', function () {
    if( !navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled','diabled').text('Sending Location ...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

    }, function () {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
    })
})
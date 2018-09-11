let socket = io();

socket.on('onLoad', function(roomList) {
    roomList.forEach( function (room){
        jQuery('<option/>', {
            value:room, 
            text: room
        }).appendTo('#rooms-drop-down')
    });
});
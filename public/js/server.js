const arrUserInfo = [];
var chat = function(io,peerServer){
    io.on('connection',function(socket){
        socket.on('csUserRegister', function(user){
            const isExist = arrUserInfo.some(function(e){ e.username === user.username});
            socket.peerId = user.peerId;
            //console.log(user);
            if(isExist)return socket.emit('registerErr');
            arrUserInfo.push(user);
            socket.emit('ssListUserOnline', arrUserInfo);
            socket.broadcast.emit('ssNewUser', user);
        });

        socket.on('disconnect', function(){
            const index = arrUserInfo.findIndex(function(user){ user.peerId === socket.peerId});
            arrUserInfo.splice(index, 1);
            io.emit('userDisconnect', socket.peerId);
        });       
    });
    return io;
}

module.exports = chat;

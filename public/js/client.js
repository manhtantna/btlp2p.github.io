var socket = io.connect('http://localhost:3000');
var peer = new Peer({key : 'peerjs',host: 'localhost', port: 3000, path: '/peerjs'});
peer.on('open',function(id){
    // $('#mypeer').append(id)
    $('#btnSignUp').click(function(){
        const username=$("#txtUsername").val();
        socket.emit('csUserRegister',{username : username,peerId:id});
        $('#registerForm').hide();
    });
});
peer.on("call",function(call){
	//Lấy stream data của mình
    openStream().then(stream=>{
        //Trả lời 
        call.answer(stream);
        //Chạy stream của chúng ta trên local
        playStream("localStream",stream);
        //thực hiện trả lời và chạy video remote
        call.on("stream",function(remoteStream){
            playStream("remoteStream",remoteStream);
        });
    })
});
socket.on("ssListUserOnline",function(arrUserInfo){
    //console.log(arrUserInfo);    
    arrUserInfo.forEach(function(user){
        
        const {username,peerId}=user;
        $("#tblUser").append(`<tr><td><button id='${peerId}' class="btn btn-success">${username}</button></td></tr>`);
       
    });
    socket.on("ssNewUser",function(user){
        
        const {username,peerId}=user;
        $("#tblUser").append(`<tr><td><button id='${peerId}' class="btn btn-success">${username}</button></td></tr>`);
    });
    const {username,peerId}=arrUserInfo;
    arrUserInfo.forEach(function(user){
	    $("#"+user.peerId).on("click",function(){
	    //sự kiện click vào user trong list
		    //console.log($(this).attr('id'));
		    //lấy ra id chính là peerId của người dùng muốn gọi
		    const id=user.peerId;
		    // mở stream lấy stream
		    openStream().then(stream=>{
		        //chạy stream của mình trên localStream đây là id của thẻ tag
		        playStream("localStream",stream);         
		        const call=peer.call(id,stream);
		        //gọi tới cái id vừa nhận được
		        call.on("stream",remoteStream=>{
		        // chạy remoteStream
		            playStream("remoteStream",remoteStream);
		        });
		    });  
		});
    });
    
});

function openStream(){
    const config={
        audio:true,
        video:true
    }
   return navigator.mediaDevices.getUserMedia(config);
}
function playStream(idVideoTag,stream){
    const video=document.getElementById(idVideoTag);
    video.srcObject=stream;  
    video.play();
}
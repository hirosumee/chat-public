
var socketio=require('socket.io');
var list_user=[];
var express=require('express');
function allocate_name(ip)
{
  var name=ip.toString();
  list_user.forEach(elem => {
    // body...
    if(ip.toString()==elem.name)
    {
      name= 'bánh bao '+list_user.length;
      return;
    }
  });
  // var tmp='bánh bao'+(list_user.length==0?'':list_user.length);
  //..
  var tmp={name:name,ip:ip.toString()};
  list_user.push(tmp);
  return list_user.indexOf(tmp);
}
module.exports=function(server)
{
  io=socketio(server);
  io.on('connection',function(socket){
    console.log('IP: ',socket.handshake.address,'/ socket ID: ',socket.id);
    // cấp phát tên
    var name_index=allocate_name(socket.handshake.address);
    //
    express.list_user=list_user;
    //
    io.emit('new user',{name:list_user[name_index].name,user:list_user.length});
    socket.emit('allocate name',list_user[name_index].name);
    // thay đổi tên
    socket.on('change name',function(data)
    {
      console.log(data);
      var isExist=false;
      list_user.forEach(elem => {
        if(elem.name==data)
        {
          isExist=true;
        }
      });
      if(isExist)
      {
        socket.emit('allocate name','');
      }
      else {
        list_user[name_index].name=data;
        socket.emit('allocate name',data);
      }
    });
    // tin nhắn công cộng
    socket.on('emit msg',function(data){
      console.log(data);
        io.emit('new message',data);
    });
    //
    //disconnect
    socket.on('disconnect',function(){
      console.log('a user disconnected!!');
      list_user.splice(name_index,1);
      express.list_user=list_user;
      io.emit('user disconnected',list_user.length);
    });
    //
  });
}

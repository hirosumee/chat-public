var yourname="bánh bao";
var socket = io();
var change_name=false;
socket.on('allocate name',function(name){
  if(name!='')
  {
    yourname=name;
    document.cookie = 'name='+name;
  }
  else {
      document.getElementById('message').insertAdjacentHTML('beforeend','<div id="new_user"><span>'+'  Tên đã tồn tại'+'</span></div>');
  }
});
function send_msg_enter(event)
{
  if(event.which == 13 || event.keyCode == 13)
  {
    send_msg();
    return false;
  }
  return true;
}
function send_msg()
{
  if($('#inputlg').val()!='setup')
  {
    if(change_name)
    {
        socket.emit('change name',$('#inputlg').val());
        change_name=false;
        $('#inputlg').val('');
    }
    else {
      socket.emit('emit msg',{name:yourname,msg: $('#inputlg').val()});
      $('#inputlg').val('');
    }
  }
  else {
    $('#inputlg').val('');
    var help='<div><div><span id="new_user">Nhập tên của bạn vào ấn </span><span style="color:#ff6600;">Send</span></div></div>'
    document.getElementById('message').insertAdjacentHTML('beforeend',help);
    change_name=true;
  }

}
socket.on('new message',function(data){
    var message_you='<div class="message message_you"><span>'+data.name+': '+'</span><span>'+data.msg+'</span></div>';
    var message_other='<div class="message message_other"><span>'+data.name+': '+'</span><span>'+data.msg+'</span></div>';
   document.getElementById('message').insertAdjacentHTML('beforeend',data.name===yourname?message_you:message_other);
});
socket.on('new user',function(data){
  document.getElementById('message').insertAdjacentHTML('beforeend','<div id="new_user"><span>'+(data.name==yourname?'Bạn':data.name)+ '  đã tham gia phòng !!'+'</span></div>');
  document.getElementById('count_user').innerHTML=data.user+'  User online';
});
//
socket.on('user disconnected',function(data){
  document.getElementById('count_user').innerHTML=data+'  User online';
});
function LoadUser()
{
  $.post( "/getuserlist", function( data ) {
  loadListUser(data);
});
}

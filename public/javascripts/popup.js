// $(document).ready(function(){
    $(".btn-open-popup").click(function(even) {
        even.preventDefault(); // không truy cập đến link trong thẻ a
        loadPopup(); // function show popup
    });
    $("#btn-close").click(function(){
        disablePopup();
    });
    $(this).keydown(function(event) {
        if (event.which == 27) { // 27 is 'Ecs' in the keyboard
            disablePopup();  // function close pop up
        }
    });
    $("#background-popup").click(function() {
        disablePopup();  // function close pop up
    });
    var popupStatus = 0; // set value
    function loadPopup() {
        if(popupStatus == 0) { // if value is 0, show popup
            $("#to-popup").fadeIn(200); // fadein popup div
            $("#background-popup").css("opacity", "0.8"); // css opacity, supports IE7, IE8
            $("#background-popup").fadeIn(200);
            popupStatus = 1; // and set value to 1
        }
    }
    function disablePopup() {
        if(popupStatus == 1) { // if value is 1, close popup
            $("#to-popup").fadeOut(300);
            $("#background-popup").fadeOut(300);
            $('body,html').css("overflow","auto");//enable scroll bar
            popupStatus = 0;  // and set value to 0
        }
    }
    function loadListUser(data)
    {
      if(document.getElementById('to-popup').classList.contains('centerscreen'))
      {
        document.getElementById('to-popup').classList.remove('centerscreen');
      }
      if(!document.getElementById('to-popup').classList.contains('rightscreen'))
      {
        document.getElementById('to-popup').classList.add('rightscreen');
      }
      if(!document.getElementById('popup-content').classList.contains('rightscreen-content'))
      {
        document.getElementById('popup-content').classList.add('rightscreen-content');
      }
        document.getElementById('popup-content').innerHTML='';
      data.forEach(elem => {
        document.getElementById('popup-content').insertAdjacentHTML('beforeend','<div id="new_user"><a>'+elem+'</a></div>');
        loadPopup();
      });
    }
    function OnLoad()
    {
      if(document.getElementById('to-popup').classList.contains('rightscreen'))
      {
        document.getElementById('to-popup').classList.remove('rightscreen');
        document.getElementById('to-popup').classList.add('centerscreen');
      }
    //  document.getElementById('popup-content').innerHTML='';
      loadPopup();
    }
    function setname()
    {
      socket.emit('change name',$('.nameset').val());
      disablePopup();
    }
    function loadroom()
    {

    }
// });

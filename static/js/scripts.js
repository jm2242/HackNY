
$(document).ready(function(){/* google maps -----------------------------------------------------*/
google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {

  /* position Amsterdam */
  var latlng = new google.maps.LatLng(52.3731, 4.8922);

  var mapOptions = {
    center: latlng,
    scrollWheel: false,
    zoom: 13
  };
  
  var marker = new google.maps.Marker({
    position: latlng,
    url: '/',
    animation: google.maps.Animation.DROP
  });
  
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  marker.setMap(map);

};
/* end google maps -----------------------------------------------------*/
});


function pollTweets() {
  setTimeout(function(){
    requestTweets();
}, 5000);

};

function overlayTweets(tweetData) {

};


function requestTweets() {
  $.ajax({
    type: 'GET',
    url: '../getTweets',
    //contentType: 'application/json; charset=utf-8',
    success: function(data) {
        // Overlay function stuff happens here
    },
    //error: playSound,
    dataType: 'json'
  });



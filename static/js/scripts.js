    //var map;

    function pollTweets() {
      requestTweets();
    };

    tweetData = {};
    map = {};
    my_markers = [];
    info_windows = [];
    contentStringArray=[]
    locationArray = []
    to_delete_array = []
    google.maps.event.addDomListener(window, 'load', initialize);
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    function requestTweets() {
      $.ajax({
        type: 'GET',
        url: '../getTweets',
        //contentType: 'application/json; charset=utf-8',
        success: function(data) {
          console.log(data)

          //document.getElementById("demo").innerHTML = data[0]['locationx']
          tweetData = data;
          console.log("Map gonna be used")
          setMarkers(map, tweetData);
          
        }, 
            // Overlay function stuff happens here
        //error: playSound,
        dataType: 'json'
      });
    }
    

    function initialize() {
      var pos1 = new google.maps.LatLng(40.7427,-74.0059);
      var pos2 = new google.maps.LatLng(40.7127,-74.0259);

      var goldStar = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: "yellow",
        fillOpacity: 0.8,
        scale: 0.1,
        strokeColor: "red",
        strokeWeight: 14
      };

      var mapOptions = {
        zoom: 14,
        center: {lat: 40.8065, lng: -73.9609},
      }

      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      console.log("Map set")
      //pollTweets();
      setInterval(pollTweets, 10000);

      //var marker = new google.maps.Marker({
          //position: pos1,
          //icon: {
            //path: google.maps.SymbolPath.CIRCLE,
            //scale: 10,
          //},
          //map: map,
          //title: 'Hello World!'
      //});
      var marker2 = new google.maps.Marker({
          position: {lat: 40.8075, lng: -73.9619},
          icon: goldStar,
          map: map,
          title: 'Hello World!'
      });


      var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h4 id="firstHeading" class="firstHeading">Jennifer Breuer ‏@JenBreuer  3 mins ago</h4>'+
      'Checkout the Macintosh Original Icons at MoMa: http://www.fastcodesign.com/3043312/moma-recognizes-susan-kare-the-designer-      of-the-macintoshs-original-icons?partner=rss'+
      '</div>'+
      '</div>';

      var infowindow2 = new google.maps.InfoWindow2({
      content: contentString
      });
      google.maps.event.addListener(marker, 'click', function() {
      infowindow2.open(map,marker);
      });
    }

    function setMarkers(map, locations) {
      console.log(locations)
      for (var i = 0; i < locations.length; i++) {

          console.log("Inside setMarkers")
          console.log(locations[i])
          var keyword = locations[i];
          var myLatLng = new google.maps.LatLng(keyword['locationy'], keyword['locationx']);
          locationArray.push(myLatLng);
          contentStringArray.push(keyword['text'])
          var marker = new google.maps.Marker({
              position: myLatLng,
              map: map,
              animation: google.maps.Animation.BOUNCE,
              icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                },
              title: keyword['time'],
              
          }
          );



          marker.info = new google.maps.InfoWindow({
            content: contentStringArray[i],
            position: locationArray[i],
          });
          
          my_markers.push(marker);

          //setTimeout(function(){console.log(my_markers)}, 3000)
          

          google.maps.event.addListener(my_markers[i], 'click', function() {
          this.info.open(map,my_markers[i]);
          });

          setTimeout(function(){
          //requestTweets();
          setClear();
          }, 9960);

      }

      //myString = ""
      //for (var i = 0; i < contentStringArray.length; i++){
        //myString = myString + " " + contentStringArray[i];
      //}
        //$.ajax({
        //type: 'POST',
        //url: '../analyzeText',
        //data: {'data':myString},
        //contentType: 'application/json; charset=utf-8',
        //success: function(data) {
          //console.log(data)
          //document.getElementById("demo").innerHTML = data[0]['locationx']
          
        //}, 
            // Overlay function stuff happens here
        //error: playSound,
        //dataType: 'json'
      //});


    }

    function buttonFunct(){

      var query = document.getElementById("thatsearchbar");
      var queryVal = query.value;
      console.log(queryVal);
      for(i=0;i< my_markers.length;i++){
        //query = document.getElementsByName("thatsearchbar")[0].value;
        //console.log(contentStringArray[i])
        var content = contentStringArray[i].toLowerCase();
        if(content.indexOf(queryVal.toLowerCase())==-1){
          //my_markers[i].icon.path =  google.maps.SymbolPath.BACKWARD_OPEN_ARROW
          //my_markers[i].info
          my_markers[i].setMap(null);
          console.log("deleted one");

        }
        else{
            my_markers[i].setMap(map);
            console.log("set one");
        }
      }
    }



function arr_diff(a1, a2){
  var a=[], diff=[];
  for(var i=0;i<a1.length;i++)
    a[a1[i]]=true;
  for(var i=0;i<a2.length;i++)
    if(a[a2[i]]) delete a[a2[i]];
    else a[a2[i]]=true;
  for(var k in a)
    diff.push(k);
  return diff;
}

function setClear() {
  for (var i = 0; i < my_markers.length; i++) {
    my_markers[i].setMap(null);
  }
  my_markers = [];
  locationArray = [];
  contentStringArray = [];
}
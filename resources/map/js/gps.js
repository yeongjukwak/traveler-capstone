/* 여행 리스트 존재 여부 */
function tripListCheck(){
  if($('.menu_1_info').children().length == 0){
    alert('여행 리스트에 여행지를 추가해 주세요.');
    $("#car").css("background-color", "#fbfbfb");
    return;
  }

  myGPS();
}

/* 출발지 지정 */
function myGPS(){
  for(let i=0; i<markers.length; i++){
    markers[i].setMap(null);
  }
  markers = [];
  let check = confirm("현재 위치를 출발지로 설정하겠습니까?");
 
  if(check){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
  
        marker = new Tmapv2.Marker({
          position : new Tmapv2.LatLng(lat,lon),
          icon : "./resources/map/images/marker/locationPin.svg",
          iconSize : new Tmapv2.Size(30, 30),
          map : map
        });

        markers.unshift(marker);
        createPathMarker();
      }); 
    }
    else{
      alert("현재 위치를 설정하려면 GPS를 허용해주세요.");
      $("#car").css("background-color", "#fbfbfb");
      return;
    }
  }
  else{
    if($('.menu_1_info').children().length == 1){
      alert('여행 리스트에 여행지를 더 추가해 주세요.');
      $("#car").css("background-color", "#fbfbfb");
      return;
    }
    createPathMarker();
  }
}
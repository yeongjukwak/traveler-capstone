// 현재 내 위치 마커표시 (GPS)
$(document).ready(function(){
  let marker;

  if (navigator.geolocation) { 
    // 내 위치로 표시
    navigator.geolocation.getCurrentPosition(function(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let my_location = new Tmapv2.LatLng(lat,lon);  

      marker = new Tmapv2.Marker({
        position : my_location,
        icon : "./resources/images/marker/locationPin.svg",
        iconSize : new Tmapv2.Size(30, 30),
        map : map
      });
      markers.unshift(marker);

      map.setCenter(my_location);
    }); 
  }
  else{
    // 지도 초기 위치로 표시
    alert("geolocation to fail");

    marker = new Tmapv2.Marker({
      position : map.getCenter(),
      icon : "./resources/images/marker/locationPin.svg",
      iconSize : new Tmapv2.Size(30, 30),
      map : map
    });
    markers.unshift(marker);
  }
});
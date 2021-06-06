/* 마커 생성 */
function createMarker(trip_data, spot, check = false){
  let tdata;

  if(!check){
    if(marker){ marker.setMap(null); }
  }

  for(let i=0; i<trip_data.length; i++){
    tdata = trip_data[i];

    if(spot === tdata.spot){
      marker = new Tmapv2.Marker({
        position : new Tmapv2.LatLng(tdata.y, tdata.x),
        icon : "./resources/map/images/marker/locationPin.svg",
        iconSize : new Tmapv2.Size(30, 30),
        map : map,
        title : tdata.spot
      });

      if(check){
        markers.push(marker);
        markerClick(marker, trip_data, tdata.spot);
        return;
      }

      map.setCenter(new Tmapv2.LatLng(tdata.y, tdata.x));
      return;
    }
  }
}

/* 여행지 리스트 생성 */
function createTripList(trip_data){
  const search_input = $("#search_input").val();
  let tdata;

  if(search_input != ""){ 
    $(".container_trip_list").children().remove();

    for(let i=0; i<trip_data.length; i++){
      tdata = trip_data[i];

      if(tdata.spot.indexOf(search_input) > -1
          || tdata.description.indexOf(search_input) > -1
          || tdata.new_addr.indexOf(search_input) > -1
          || tdata.old_addr.indexOf(search_input) > -1){
        $(".container_trip_list").append(`<li class='container_list_li' name="${tdata.spot}">` +
                                          //`<div class="trip_list_img" style="background-image:url(${tdata.image})"></div>` +
                                          `<img src='${tdata.image}'>` +
                                          `<div class='container_list_li_name'>` +
                                            `<p>${tdata.spot}</p>` +
                                            `<p>${tdata.description}</p>` +
                                          `</div>` +
                                        `</li>`);
      }
    }
  }
  else{
    tripListRemove();
    //$(".container_trip_list").children().remove();
  }
}
/* 여행지 정보 생성 */
function createTripInformation(trip_data, spot){
  let tdata;
  for(let i=0; i<trip_data.length; i++){
    tdata = trip_data[i];
    
    if(spot === tdata.spot){
      $(".container_trip_list").children().remove();
      $(".container_trip_list").append(`<div class="trip_box">` +
                                        `<div class="trip_img_box" style="background-image:url(${tdata.image})"></div>` +
                                        `<div class="trip_info_box">` +
                                          `<p>${tdata.spot}</p>` +
                                          `<div class='trip_link'><a href='#' class="my_list_add" id = 'state_name' name='${tdata.spot}'>담기</a></div>` +
                                          `<div class='trip_link'><a href='#' target='_blank' id = "linkToView">View</a></div>` +
                                          `<ul class="trip_info">` +
                                            `<li class="trip_info_desc"><p>${tdata.description}</p></li>` +
                                            `<li class="trip_info_addr">` +
                                              `<p>${tdata.new_addr}</p>` +
                                              `<p>${tdata.old_addr}</p>` +
                                            `</li>` +
                                            `<li class="trip_info_tell"><p>${tdata.tell}</p></li>` +
                                          `</ul>` +
                                        `</div>` +
                                      `</div>`);
      return;
    }
  }
}

/* 검색 자동완성 리스트 생성 */
function createAutoSearchTripList(trip_data){
  const search_input = $("#search_input").val();
  let tdata;

  if(search_input != ""){ 
    $(".auto_search_output").children().remove();

    for(let i=0; i<trip_data.length; i++){
      tdata = trip_data[i];
      if(tdata.spot.indexOf(search_input) > -1
          || tdata.description.indexOf(search_input) > -1
          || tdata.new_addr.indexOf(search_input) > -1
          || tdata.old_addr.indexOf(search_input) > -1){
        $('.auto_search_output').css("display", "block");
        $(".auto_search_output").append(`<li class="auto_search_trip_list" name="${tdata.spot}">` +
                                          `<img src="./resources/map/images/marker/locationPin.svg">` +
                                          `<div>` +
                                            `<p style="font-size: 16px; font-weight: bold;">${tdata.spot}</p>` +
                                            `<p style="font-size: 12px;">${tdata.new_addr}</p>` +
                                          `</div>` +
                                        `</li>`);
      }
    }
  }
  else{
    $(".auto_search_output").children().remove();
    $('.auto_search_output').css("display", "none");
  }
}

/* 나의 여행지 리스트에 생성 */
function createMyTrip(spot){
  $(".menu_1_info").append(`<li class="my_trip_list_li" id="${spot}" name="${spot}">` +
                              `<span class="my_trip_span" name="${spot}">${spot}</span>` +
                              `<div class='trip_close' name='${spot}'>x</div>` +
                            `</li>`);
}

/* 경로 좌표 생성 */
function createPathMarker(){
  let spots = $('.menu_1_info').children('.my_trip_list_li');

  $.ajax({
    url : "./resources/map/json/trip_data.json",
    type : "GET",
    dataType : "json",
    success: function(response){
      spotLoop(response.data, spots);
    },
    error: function(){
      alert("Marker Error");
    }
  });
}

/* 경로 좌표 생성 보조 */
function spotLoop(trip_data, spots){
  let spot;

  for(let i=0; i<spots.length; i++){
    spot = spots[i].id;
    createMarker(trip_data, spot, true);
  }

  pathCar();
}

/* 자동차 경로 생성 */
function createPath(path_data){
  pathClose();
  
  let pointArray = [];
  let ar_line = [];
  let feature;
  let startPt;
  let polyline;
  let x = 0, y = 0;

  for (var i = 0; i < path_data.features.length; i++) {
      feature = path_data.features[i];
      if(feature.geometry.type == "LineString"){
          ar_line = [];
          for (var j = 0; j < feature.geometry.coordinates.length; j++) {
              startPt = new Tmapv2.LatLng(feature.geometry.coordinates[j][1],feature.geometry.coordinates[j][0]);
              ar_line.push(startPt);
              pointArray.push(feature.geometry.coordinates[j]);
          }

          polyline = new Tmapv2.Polyline({
              path: ar_line,
              strokeColor: "#0000ff", 
              strokeWeight: 5,
              strokeStyle: "solid",
              map: map
          });

          new_polyLine.push(polyline);
      }
  }

  for(let i=0; i<markers.length; i++){
    x += markers[i]._marker_data.options.position._lat;
    y += markers[i]._marker_data.options.position._lng;
  }
  x /= parseFloat(markers.length);
  y /= parseFloat(markers.length);

  map.setCenter(new Tmapv2.LatLng(x,y));
  map.setZoom(13);
  pathCheck = true;
}

/* 경로 정보 생성*/
function createPathData(path_data_features){
  const fdata = path_data_features;
  
  let distance = "총 거리: " + (fdata[0].properties.totalDistance / 1000).toFixed(1) + "km ";
  let time = " 총 시간: " + (fdata[0].properties.totalTime / 60).toFixed(0) + "분";

  $('#path_data').text(distance + time);
}

/* 빈 리스트 생성 */
function tripListRemove(){
  $(".container_trip_list").children().remove();
  $(".container_trip_list").append( `<div class="removeList_box">` +
                                      `<p>검색한 여행지가 없습니다.</p>` +
                                    `</div>`);
}
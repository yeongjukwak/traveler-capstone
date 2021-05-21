$(document).ready(function(){
  /* 여행지 리스트에서 선택 시 */
  $(document).on('click', '.container_list_li', function(){
    const spot = $(this).attr("name");

    $.ajax({
      url : "./resources/map/json/trip_data.json",
      type : "GET",
      dataType : "json",
      success: function(response){
        createMarker(response.data, spot);
        createTripInformation(response.data, spot);
      },
      error: function(){
        alert("click.js_1 Error");
      }
    });
  });

  /* 검색 자동완성 여행지 리스트에서 선택 시 */
  $(document).on('click', '.auto_search_trip_list', function(){
    $('.auto_search_output').css('display', 'none');
    const spot = $(this).attr("name");

    $.ajax({
      url : "./resources/map/json/trip_data.json",
      type : "GET",
      dataType : "json",
      success: function(response){
        createMarker(response.data, spot);
        createTripInformation(response.data, spot);
      },
      error: function(){
        alert("click.js_2 Error.");
      }
    });
  });

  /* 나의 여행지 리스트에서 선택 시 */
  $(document).on("click", ".my_trip_span", function(){
    const spot = $(this).attr("name");

    $.ajax({
      url : "./resources/map/json/trip_data.json",
      type : "GET",
      dataType : "json",
      success: function(response){
        createMarker(response.data, spot);
        createTripInformation(response.data, spot);
      },
      error: function(){
        alert("Marker Error");
      }
    });
  });

  /* 나의 여행지 리스트에 담기 */
  $(document).on("click", ".my_list_add", function(){
    

    createMyTrip($(this).attr("name"));
  });

  /* 선택한 여행지 삭제 */
  $(document).on("click", ".trip_close", function(){
    const spot = $(this).attr("name");
    $('.menu_1_info').children(`#${spot}`).remove();
  
    if(marker._marker_data.options.title === spot){
      marker.setMap(null);
    }

    if($(".menu_1_info").children().length == 0){
      $(".menu_1_info").css("display", "none");
    }
  });

  /* 나의 여행지 보기 */
  $(document).on("click", "#menu_1", function(){
    if($(".menu_1_info").children().length != 0){
      if($(".menu_1_info").css("display") === "none"){
        $(".menu_1_info").css("display", "block");
      }
      else{
        $(".menu_1_info").css("display", "none");
      }
    }
  });

  /* 자동차 경로 표시 */
  $(document).on("click", "#car", function(){
    tripListCheck();
  });

  /* 버스 경로 표시 */
  $(document).on("click", "#bus", function(){
    pathBus();
  });

  /* 자전거 경로 표시 */
  $(document).on("click", "#bicycle", function(){
    pathBicycle();
  });

  /* 검색 돋보기 클릭 */
  $(document).on("click", "#search_click", function(){
    $.ajax({
      url : "./resources/map/json/trip_data.json",
      type : "GET",
      dataType : "json",
      success: function(response){
        $('.auto_search_output').css("display", "none");
        createTripList(response.data);
      },
      error: function(){
        alert(" Error.");
      }
    });
  });
});

/* 마커 클릭 이벤트 */
function markerClick(marker, trip_data, spot){
  marker.addListener("click", function() {
    createTripInformation(trip_data, spot);
  });
}
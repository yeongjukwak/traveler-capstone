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
    if(pathCheck){
      let c = confirm("현재 경로를 취소하겠습니까?");
      if(c){
        for(let i=0; i<markers.length; i++){
          markers[i].setMap(null);
        }
        pathClose();
        pathCheck = false;  
      }
      else{
        return;
      }
    }

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

  /* 경로 클릭 */
  $(document).on("click", ".path_button", function(){
    let id = $(this).attr("id");

    if(id === "car"){
      $("#car").css("background-color", "#e6e6e6");
      $("#bus").css("background-color", "#fbfbfb");
      $("#bicycle").css("background-color", "#fbfbfb");
      tripListCheck();
    }
    else if(id === "bus"){
      $("#bus").css("background-color", "#e6e6e6");
      $("#car").css("background-color", "#fbfbfb");
      $("#bicycle").css("background-color", "#fbfbfb");
      pathBus();
    }
    else{
      $("#bicycle").css("background-color", "#e6e6e6");
      $("#bus").css("background-color", "#fbfbfb");
      $("#car").css("background-color", "#fbfbfb");
      pathBicycle();
    }
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
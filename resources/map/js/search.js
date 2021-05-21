$(document).ready(function(){
  /* main.html 검색 */
  const search_input = sessionStorage.getItem("search_input");
  $("#search_input").val(search_input);

  $.ajax({
    url : "./resources/map/json/trip_data.json",
    type : "GET",
    dataType : "json",
    success: function(response){

      createTripList(response.data);
    },
    error: function(error){
      alert("Trip List Error");
    }
  });

  /* 검색 자동완성 */
  $("#search_input").keyup(function(key){
    if(marker){ marker.setMap(null); }
    
    $.ajax({
      url : "./resources/map/json/trip_data.json",
      type : "GET",
      dataType : "json",
      success: function(response){
        if(key.keyCode == 13){
          $('.auto_search_output').css("display", "none");
          createTripList(response.data);
        }
        else{
          createAutoSearchTripList(response.data);
        }
      },
      error: function(){
        alert("search.js_1 Error.");
      }
    });
  });
});


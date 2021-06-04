$(document).ready(function(){

  /* 검색 자동완성 */
  $("#search_input").keyup(function(key){
    $.ajax({
      url : "./resources/main/json/trip_data.json",
      type : "GET",
      dataType : "json",
      success: function(response){
          createAutoSearchTripList(response.data);
        
      },
      error: function(){
        alert("search.js_1 Error.");
      }
    });
  });
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
                                          `<img id="astl_img" src="./resources/map/images/marker/locationPin.svg">` +
                                          `<div>` +
                                            `<p style="font-size: 16px; font-weight: bold;">${tdata.spot}</p>` +
                                            // `<p style="font-size: 12px;">${tdata.new_addr}</p>` +
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
});



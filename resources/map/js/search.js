$(document).ready(function(){
  
  // 메인페이지에서 넘어온 검색어로 여행지 리스트 생성
  let searchValue = sessionStorage.getItem("searchValue");
  $("#search").val(searchValue);
  
  $.ajax({
    url : "./resources/map/json/trip_data.json",
    type : "GET",
    dataType : "json",
    success: function(response){
      searchTripList(response.data);
    },
    error: function(error){
      alert("여행지 리스트 Error");
    }
  });

  // 검색어 자동완성으로 여행지 리스트 생성
  $("#search").keyup(function(){
    $.ajax({
      url : "./resources/map/json/trip_data.json",
      type : "GET",
      dataType : "json",
      success: function(response){
        searchTripList(response.data);
      },
      error: function(error){
        alert("여행지 검색 자동완성 Error.");
      }
    });
  });

  // 여행지 리스트 생성
  function searchTripList(resData){
    let searchValue = $("#search").val();
    let tripData;

    if(searchValue != ""){ 
      $("#list").children().remove();

      for(let i=0; i<resData.length; i++){
        tripData = resData[i];

        if(tripData.spot.indexOf(searchValue) > -1
            || tripData.description.indexOf(searchValue) > -1
            || tripData.new_addr.indexOf(searchValue) > -1
            || tripData.old_addr.indexOf(searchValue) > -1){
          $("#list").append(`<hr><div class='container_list_el'>` +
                              `<img src='${tripData.image}'>` +
                              `<div class='container_list_el_name'>` +
                                `<span class='container_list_el_name_check'>` +
                                  `<input type='checkbox' id='ckbox${i}' name='${tripData.spot}'>` +
                                `</span>` +
                                `<span>${tripData.spot}</span>` +
                                `<p>${tripData.description}</p>` +
                              `</div>` +
                            `</div>`);
        }
      }
    }
    else{
      $("#list").children().remove();
    }
  }
});


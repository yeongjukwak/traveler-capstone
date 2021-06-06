
let map, marker;
let markers = [];
let new_polyLine = [];

//받아올 파라메터값
let buildPath = "resources/view/Build/Downloads.json";
var gameInstance = UnityLoader.instantiate("gameContainer", buildPath, {onProgress: UnityProgress});
let point = new Tmapv2.LatLng(37.8863541, 127.73577569999999);
var stateName = "defalut";
var subDescription = "defalut";
var description = "description";
var new_addr = "address new";
var old_addr = "address old";
var tell = "tellnum";
$(document).ready(function(){
    //상단 info동작
    $('#wrapperInfo').click(function(e) { 
      var divTop = e.pageY+40;
      var divLeft = e.pageX+ 200;
      var idx = $(this).attr("idx"); 
      $('#divView').empty().append('<div id = "ViewInfoDiv"><span id="close" style="cursor:pointer;font-size:1.5em;float : right;padding-right : 65px; padding-top : 5px" title="닫기">X</span><p style = "font-size : 2em">'+stateName+'</p><br><div id = "infoscript">'+ description + '<br> <br>'+ subDescription +'<br><br> '+ old_addr +'<br><br>'+ new_addr +'<br><br>'+ tell +'</div></div>');
      $('#divView').css({ "top": divTop ,"left": divLeft , "position": "absolute" }).show();
      $('#close').click(function(){document.getElementById('divView').style.display='none'}); 
    });
    //상단 Map 동작
    $(document).on("click", "#wrapperMap", function(e) {
      $('#map_div').css("display","block");
      $('#map_close').append('<div id = "map_close" style="cursor:pointer; position:absolute; width : 10px; height: 10px;font-size: 1.5em; z-index: 3;top:10px;right:5px;padding-right: 10px; display="inline">X</div>');
      //미니맵 로더
      map = new Tmapv2.Map("map_div", {
      center : point,
      zoom : 15,
      zoomControl: false,
      scrollwheel: true
      });
      $('#map_close').click(function(){ map.destroy(); $('#map_close').empty(); $('#map_div').css("display","none")});
    });
    //상단 검색바

    //가져온 검색 값
    const path = sessionStorage.getItem("path");
    //$("#state_name").text( path + "경로");
    //console.log(sessionStorage.getItem("path"));

    $.ajax({
      url : "./resources/map/json/trip_data.json",
      type : "GET",
      dataType : "json",
      success: function(response){
        getViewPath(response.data , path);
      },
      error: function(error){
        alert("Trip view error");
      }
    });
    function getViewPath(trip_data, path){
      for(i = 0 ; i < trip_data.length ; i++){
        if(path == trip_data[i].spot){
          buildPath = trip_data[i].viewUrl;
          stateName = trip_data[i].spot;
          point = new Tmapv2.LatLng(trip_data[i].y, trip_data[i].x);
          subDescription = trip_data[i].subDescription;
          description = trip_data[i].description;
          new_addr = trip_data[i].new_addr;
          old_addr = trip_data[i].old_addr;
          tell = trip_data[i].tell;

        }
      }
      console.log("mapx" + point);
      console.log("paht" + buildPath);
      $('#state_name').text(stateName);
      $('#descript').text(description);
      var gameInstance = UnityLoader.instantiate("gameContainer", buildPath, {onProgress: UnityProgress});
      
    }
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
                stateName = tdata.spot;
                buildPath = tdata.viewUrl;
                point = new Tmapv2.LatLng(tdata.y, tdata.x);
                subDescription = tdata.subDescription;
                description = tdata.description;
                new_addr = tdata.new_addr;
                old_addr = tdata.old_addr;
                tell = tdata.tell;
                $('#state_name').text( "#" + stateName);
                $('#descript').text( "#" + description);
                var gameInstance = UnityLoader.instantiate("gameContainer", buildPath, {onProgress: UnityProgress});
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

    
function tripListRemove(){
    $(".container_trip_list").children().remove();
        $(".container_trip_list").append( `<div class="removeList_box">` +
                                `<p>검색한 여행지가 없습니다.</p>` +
                              `</div>`);
    }
/* 검색 자동완성 여행지 리스트에서 선택 시 */
$(document).on('click', '.auto_search_trip_list', function(){
$('.auto_search_output').css('display', 'none');
const spot = $(this).attr("name");
        $.ajax({
            url : "./resources/map/json/trip_data.json",
            type : "GET",
            dataType : "json",
            success: function(response){
                createTripInformation(response.data, spot);
                //map.destroy();
                $('#map_close').empty(); $('#map_div').css("display","none");
            },
            error: function(){
                alert("click.js_2 Error.");
            }
        });
    });
    //반응형 동작을 위한 크기별 화면 리로드
    $(window).resize(function(){
        location.reload();
    });
});
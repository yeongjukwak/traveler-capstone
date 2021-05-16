// 여행지 체크하면 마커 생성
$(document).ready(function(){
  $(document).on("click", "input[type='checkbox']", function () {
    let name = $(this).attr('name');

    if($(this).is(':checked')){
      // 체크
      $.ajax({
        url : "./resources/json/trip_data.json",
        type : "GET",
        dataType : "json",
        success: function(response){
          cm(response.data, name);
        },
        error: function(error){
          alert("마커 생성 Error");
        }
      });
    }
    else{
      // 체크 해제
      let marker;
      for(let i=1; i<markers.length; i++){
        marker = markers[i];
        
        if(name === marker._marker_data.options.title){
          marker.setMap(null);
          markers.splice(i, 1);
          
          
          popups.splice(i-1, 1);
          break;
        }
      }
    }
  });

  // 마커 생성
  function cm(resData, name){
    let marker, data, location;

    for(let i=0; i<resData.length; i++){
      data = resData[i];

      if(name === data.spot){
        location = new Tmapv2.LatLng(data.y, data.x)
        marker = new Tmapv2.Marker({
          position : location,
          icon : "./resources/images/marker/locationPin.svg",
          iconSize : new Tmapv2.Size(30, 30),
          map : map,
          title : data.spot
        });

        map.setCenter(location);
        ctp(data, marker);
        markers.push(marker);
        break;
      }
    }
  }

  // 팝업 생성
  function ctp(data, marker){
    let content = `<div class='m-pop'>`+
                    `<div class='img-box' style='background-image:url(${data.image})'></div>`+
                    `<div class='info-box'>`+
                        `<p class='p-info'>`+
                        `<span class='tit'>${data.spot}</span>`+
                        `<a href='${data.viewUrl}' target='_blank' class='link'><img src='./resources/images/popup/3d-view.svg' alt='3D뷰'> View</a>`+
                        `</p>`+
                        `<ul class='ul-info'>`+
                          `<li class='li-addr'>`+
                              `<p class='new-addr'>${data.new_addr}</p>`+
                              `<p class='old-addr'>${data.old_addr}</p>`+
                          `</li>`+
                          `<li class='li-tell'>`+
                              `<span class='tell'>${data.tell}</span>`+
                          `</li>`+
                        `</ul>`+
                    `</div>`+
                    `<a href='javascript:void(0)' id='close' name='${data.spot}' class='btn-close'></a>`+
                  `</div>`;
    
    marker.addListener("click", function(event) {

      // 중복 제거
      for(let i=0; i<popups.length; i++){
        
      }

      //팝업 생성.
      let infoWindow = new Tmapv2.InfoWindow({
          position: new Tmapv2.LatLng(data.y, data.x),
          content: content, //Popup 표시될 text
          type: 2, //Popup의 type 설정.
          map: map
      });

      $('.m-pop').parent().css("border", "none");
      $('.m-pop').parent().css("background", "none");

      popups.push(infoWindow);
      //popup[n] = infoWindow; /////////////////////////////////
    });
  }

  function pclose(){
    popups[i-1].setMap(null);
  }
});
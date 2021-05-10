// 마커 생성
function createMarker(trip_data){
    const t_data = trip_data;
    let marker, data;

    for(let i=0; i<t_data.length; i++){
        data = t_data[i];

        marker = new Tmapv2.Marker({
            position : new Tmapv2.LatLng(data.y, data.x),
                        icon : "",
                        map : map,
                        title : data.spot,
            visible: false
        });

        createPopup(marker, data, i); //팝업 생성하기
        markers.push(marker); ////////////////////
    }
}

// 팝업 생성
function createPopup(createMarker_marker, createMarker_data, n){
    const data = createMarker_data;
    const marker = createMarker_marker;
    let content = "<div class='m-pop'>"+
                    "<div class='img-box' style='background-image:url(" + data.image + ")'></div>"+
                    "<div class='info-box'>"+
                        "<p class='p-info'>"+
                        "<span class='tit'>" + data.spot + "</span>"+
                        "<a href='"+ data.viewUrl +"' target='_blank' class='link'><img src='image/popup/3d-view.svg' alt='3D뷰'> View</a>"+
                        "</p>"+
                        "<ul class='ul-info'>"+
                        "<li class='li-addr'>"+
                            "<p class='new-addr'>" + data.new_addr + "</p>"+
                            "<p class='old-addr'>" + data.old_addr + "</p>"+
                        "</li>"+
                        "<li class='li-tell'>"+
                            "<span class='tell'>" + data.tell + "</span>"+
                        "</li>"+
                        "</ul>"+
                    "</div>"+
                    "<a href='javascript:void(0)' onclick='popupClose(" + n + ")' class='btn-close'></a>"+
                    "</div>";

    //마커에 클릭이벤트 등록
    let infoWindow;
    marker.addListener("click", function(event) {
        
        // 중복 제거
        if(popup[n] != null){
            popupClose(n);
        }

        //Popup 객체 생성.
        infoWindow = new Tmapv2.InfoWindow({
            position: new Tmapv2.LatLng(data.y, data.x),
            content: content, //Popup 표시될 text
            type: 2, //Popup의 type 설정.
            map: map
        });

        $('.m-pop').parent().css("border", "none");
        $('.m-pop').parent().css("background", "none");

        popup[n] = infoWindow; /////////////////////////////////
    });
}

function popupClose(n){
    popup[n].setVisible(false); ////////////////////////////
}
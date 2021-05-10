// 경로 탐색
let headers = {};
headers["appKey"]= "";
function path(){
    const data = markerInOrder;
    let startX = data[0]._marker_data.options.position._lng;
    let startY = data[0]._marker_data.options.position._lat;
    let endX = data[data.length-1]._marker_data.options.position._lng;
    let endY = data[data.length-1]._marker_data.options.position._lat;
    let passList = "";
    for(var i=1; i<data.length-1; i++){
        if(passList != "")
            passList += "_"; 	
        passList += data[i]._marker_data.options.position._lng + "," + data[i]._marker_data.options.position._lat;
    }

    $.ajax({
        method: "POST", 
        headers: headers, 
        url: "https://apis.openapi.sk.com/tmap/routes?version=1&format=json",
        async: false,
        data: {
            startX: startX,
            startY: startY,
            endX: endX,
            endY: endY,
            passList: passList,
            reqCoordType : "WGS84GEO",
            resCoordType : "WGS84GEO",
            searchOption : "0",
            trafficInfo : "Y"
        },
        success: function(response){
            const path_data = response;
            drawPath(path_data);
        },
        error: function(error){
            alert("경로 데이터를 불러오지 못 했습니다.");
        }
    });
}

// 경로 그리기
function drawPath(data){
    if(routeCheck)
        resetMap();

    const routeData = data;
    let ar_line = [];
    let feature;
    let startPt;
    let polyline;

    for (var i = 0; i < routeData.features.length; i++) {
        feature = routeData.features[i];
        //배열에 경로 좌표 저장
        if(feature.geometry.type == "LineString"){
            ar_line = [];
            for (var j = 0; j < feature.geometry.coordinates.length; j++) {
                startPt = new Tmapv2.LatLng(feature.geometry.coordinates[j][1],feature.geometry.coordinates[j][0]);
                ar_line.push(startPt);
                pointArray.push(feature.geometry.coordinates[j]);
            }
            // 라인그리기
            polyline = new Tmapv2.Polyline({
                path: ar_line,
                strokeColor: "red", 
                strokeWeight: 6,
                strokeStyle: "solid",
                outline: true,
                map: map
            });
            new_polyLine.push(polyline);
        }
    }
    routeCheck = true;
}

// 경로 초기화
function resetMap(){
    if(confirm("새로운 경로를 표시하겠습니까?")){
        location.reload();
    }
}
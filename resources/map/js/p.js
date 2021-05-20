let headers = {};
headers["appKey"] = "l7xxf9565457f2b4447191f7d70c4c1790b4";

$(document).ready(function(){
    $(document).on("click", "#draw_path", function(){
        let startX = markers[0]._marker_data.options.position._lng;
        let startY = markers[0]._marker_data.options.position._lat;
        let endX = markers[markers.length-1]._marker_data.options.position._lng;
        let endY = markers[markers.length-1]._marker_data.options.position._lat;
        let passList = "";
        for(var i=1; i<markers.length-1; i++){
            if(passList != "")
                passList += "_"; 	
            passList += markers[i]._marker_data.options.position._lng + "," + markers[i]._marker_data.options.position._lat;
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
    });
});

function drawPath(data){

    // 경로 지우기
    //new_polyLine.setMap(null);

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
                strokeColor: "#0000ff", 
                strokeWeight: 5,
                strokeStyle: "solid",
                map: map
            });
            new_polyLine.push(polyline);
        }
    }
}

function test(){
    for(let i=0; i<new_polyLine.length; i++){
        new_polyLine[i].setMap(null);
    }
}
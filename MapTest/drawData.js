var new_polyLine = [];
var pointArray = [];

function drawData(data){
    // 지도위에 선은 다 지우기
    routeData = data;
    //var resultStr = "";
    //var distance = 0;
    //var idx = 1;
    var newData = [];
    var equalData = [];
    var pointId1 = "-1234567";
    var ar_line = [];
    
    for (var i = 0; i < data.features.length; i++) {
        var feature = data.features[i];
        //배열에 경로 좌표 저장
        if(feature.geometry.type == "LineString"){
            ar_line = [];
            for (var j = 0; j < feature.geometry.coordinates.length; j++) {
                var startPt = new Tmapv2.LatLng(feature.geometry.coordinates[j][1],feature.geometry.coordinates[j][0]);
                ar_line.push(startPt);
                pointArray.push(feature.geometry.coordinates[j]);
            }
            var polyline = new Tmapv2.Polyline({
                path: ar_line,
                strokeColor: "#0000ff", 
                strokeWeight: 6,
                strokeStyle: "solid",
                outline: true,
                map: map
            });
            new_polyLine.push(polyline);
        }
        var pointId2 = feature.properties.viaPointId;
        if (pointId1 != pointId2) {
            equalData = [];
            equalData.push(feature);
            newData.push(equalData);
            pointId1 = pointId2;
        }
        else {
            equalData.push(feature);
        }
    }
}
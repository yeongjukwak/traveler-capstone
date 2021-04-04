var trip_data = { // 임의의 데이터
    "s" : {"한림대학교" : [37.88728485257855, 127.73813767661932]},
   "p1" : {"스카이워크" : [37.89456032346465, 127.72355022313691]},
   "p2" : {"조각공원" : [37.872832813614394, 127.71347809617603]},
    "e" : {"소양강댐" : [37.93790474873468, 127.80192826024657]}
}

function path_2(){
    var drawInfoArr = [];
    for(marker_name in trip_data){
        
        var imgURL;
        // 마커 이미지
        if(marker_name == "s"){
            imgURL = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png';
        }
        else if(marker_name == "e"){
            imgURL = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png';
        }
        else{
            imgURL = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_p.png';
        }

        for(trip_name in trip_data[marker_name]){

            // 마커 생성
            new Tmapv2.Marker({
                position: new Tmapv2.LatLng(trip_data[marker_name][trip_name][0], trip_data[marker_name][trip_name][1]),
                icon: imgURL,
                map: map
            });
        }
    }

    
    var headers = {}; 
    headers["appKey"]="^^";
    $.ajax({
        type:"POST",
        headers : headers,
        url:"https://apis.openapi.sk.com/tmap/routes/routeOptimization30?version=1&format=json",//
        async:false,
        contentType: "application/json",
        data: JSON.stringify({
                "reqCoordType": "WGS84GEO",
                "resCoordType" : "EPSG3857", //WGS84GEO",
                "startName": "출발", // 한림대
                "startX": "127.73813767661932",
                "startY": "37.88728485257855",
                "startTime": "201711121314",
                "endName": "도착", // 소양강댐
                "endX": "127.80192826024657",
                "endY": "37.93790474873468",
                "searchOption" : "0",
                "viaPoints": [
                    {
                    "viaPointId": "test01",
                    "viaPointName": "test01", // 스카이워크
                    "viaX": "127.72355022313691",
                    "viaY": "37.89456032346465"
                    //"viaTime": 600
                    },
                    {
                    "viaPointId": "test02",
                    "viaPointName": "test02", // 조각공원
                    "viaX": "127.71347809617603",
                    "viaY": "37.872832813614394"
                    //"viaTime": 600
                    }
                ]
        }),
        success:function(response){
            var resultData = response.properties;
			var resultFeatures = response.features;

            for(var i in resultFeatures) {
				var geometry = resultFeatures[i].geometry;
				var properties = resultFeatures[i].properties;
				var polyline_;
				
				drawInfoArr = [];
				
				if(geometry.type == "LineString") {
					for(var j in geometry.coordinates){
						// 경로들의 결과값(구간)들을 포인트 객체로 변환 
						var latlng = new Tmapv2.Point(geometry.coordinates[j][0], geometry.coordinates[j][1]);
						// 포인트 객체를 받아 좌표값으로 변환
						var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
						// 포인트객체의 정보로 좌표값 변환 객체로 저장
						var convertChange = new Tmapv2.LatLng(convertPoint._lat, convertPoint._lng);
						
						drawInfoArr.push(convertChange);
					}

					polyline_ = new Tmapv2.Polyline({
						path : drawInfoArr,
						strokeColor : "#FF0000",
						strokeWeight: 6,
						map : map
					});
				}
			}
        },
        error:function(request,status,error){
            console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}
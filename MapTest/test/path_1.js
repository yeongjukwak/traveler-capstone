// 경로 안내_1
// 임의의 좌표 데이터
let posi_x = [127.73813767661932, 127.72355022313691, 127.80192826024657];
let posi_y = [37.88728485257855, 37.89456032346465, 37.93790474873468];
var posi_size = posi_x.length;

// 경로 안내 함수
function path_1(){

    var posi = new Map(); // 좌표 리스트
    var imgURL; // 마커 이미지

    // 좌표 리스트, 마커 생성
    for(var i=0; i<posi_size; i++){
        // 좌표 list
        posi.set(i, new Tmapv2.LatLng(posi_y[i], posi_x[i]));

        // 마커 이미지
        if(i == 0){
            imgURL = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png';
        }
        else if(i == posi_size-1){
            imgURL = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png';
        }else{
            imgURL = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_p.png';
        }

        // 마커 생성
        new Tmapv2.Marker({
            position: posi.get(i),
            icon: imgURL,
            map: map
        });

        // 경로 탐색
        var routeLayer;

        var headers = {}; 
        headers["appKey"]="^^";
        headers["Content-Type"]="application/json";

        var param = JSON.stringify({
            "startName" : "한림대학교",
            "startX" : "127.73813767661932",
            "startY" : "37.88728485257855",
            "endName" : "소양강댐",
            "endX" : "127.80192826024657",
            "endY" : "37.93790474873468",
            "viaPoints" : 
                [
                    {
                        "viaPointId" : "p1",
                        "viaPointName" : "스카이워크",
                        "viaX" : "127.72355022313691" ,
                        "viaY" : "37.89456032346465"
                    },
                    {
                        "viaPointId" : "p2",
                        "viaPointName" : "조각공원",
                        "viaX" : "127.71347809617603" ,
                        "viaY" : "37.872832813614394"
                    },
                ],
            "reqCoordType" : "WGS84GEO",
            "resCoordType" : "EPSG3857",
            "searchOption": 0
        });
    }
}
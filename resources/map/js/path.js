/* 경로 삭제 */
function pathClose(){
  
  for(let i=0; i<new_polyLine.length; i++){
    new_polyLine[i].setMap(null);
  }
  new_polyLine = [];
}

/* 자동차 경로 */
function pathCar(){
  let a = mm.length;
  for(let i=0; i<a; i++){
    mm[i].setMap(null);
  }
  

  let headers = {};
  headers["appKey"] = "l7xxf9565457f2b4447191f7d70c4c1790b4";

  let startX = markers[0]._marker_data.options.position._lng;
  let startY = markers[0]._marker_data.options.position._lat;
  let endX = markers[markers.length-1]._marker_data.options.position._lng;
  let endY = markers[markers.length-1]._marker_data.options.position._lat;
  let passList = "";
  for(var i=1; i<markers.length-1; i++){
    if(passList != ""){
      passList += "_"; 
    }
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
        createPath(response);
        createPathData(response.features);
    },
    error: function(){
      alert("경로 데이터를 불러오지 못 했습니다.");
    }
  });
}

/* 버스 경로 */
function pathBus(){
  let g = mm.length;
  for(let i=0; i<g; i++){
    mm[i].setMap(null);
  }
  pathClose();

  let m = [
    new Tmapv2.LatLng(37.8863541, 127.73577569999999),
    new Tmapv2.LatLng(37.87281030885807, 127.71347503775486),
    new Tmapv2.LatLng(37.894471737015586, 127.72367157078028)
  ];
  let m1 = ["한림대학교", "공지천조각공원", "소양강스카이워크"];
  let a;
  for(let i=0; i<3; i++){
    a = new Tmapv2.Marker({
      position : m[i],
      icon : "./resources/map/images/marker/locationPin.svg",
      iconSize : new Tmapv2.Size(30, 30),
      map : map,
      title : m1[i]
    });
    mm.push(a);
  }

  m = [
    new Tmapv2.LatLng(37.88351731808659, 127.73840129698783),
    new Tmapv2.LatLng(37.87411101342056, 127.71699958099465),
    new Tmapv2.LatLng(37.87458172611178, 127.71292383479054),
    new Tmapv2.LatLng(37.89326022093459, 127.72509784184162)
  ];
  m1 = ["승차","하차","승차","하차"];
  for(let i=0; i<4; i++){
    a = new Tmapv2.Marker({
      position : m[i],
      icon : "./resources/map/images/marker/bus-stop_red.png",
      iconSize : new Tmapv2.Size(30, 30),
      map : map,
      title : m1[i]
    });
    mm.push(a);
  }
  
  polyline = new Tmapv2.Polyline({
    path: [
      new Tmapv2.LatLng(37.8863541, 127.73577569999999), // 공대
      new Tmapv2.LatLng(37.88673998721666, 127.7395418216527), // 도보
      new Tmapv2.LatLng(37.88608941507719, 127.73840993065934),
      new Tmapv2.LatLng(37.8844589078771, 127.73838228115287),
      new Tmapv2.LatLng(37.88386775304488, 127.73783075388724),
      new Tmapv2.LatLng(37.88346179047672, 127.73791764023197),
      new Tmapv2.LatLng(37.88351731808659, 127.73840129698783)// 정류장 승차
    ],
    strokeColor: "#505050",
    strokeWeight: 5,
    strokeStyle:'solid',
    map: map
  });
  new_polyLine.push(polyline);

  polyline = new Tmapv2.Polyline({
    path: [
      new Tmapv2.LatLng(37.87411101342056, 127.71699958099465), // 정류장 하차
      new Tmapv2.LatLng(37.87443517143577, 127.71554790836063), // 도보
      new Tmapv2.LatLng(37.87384678065842, 127.7137805411852),
      new Tmapv2.LatLng(37.87353566739754, 127.71382868448559),
      new Tmapv2.LatLng(37.87337034831435, 127.71360546048625),
      new Tmapv2.LatLng(37.872772046824494, 127.71421342526094),
      new Tmapv2.LatLng(37.87255405393034, 127.71376238533314),
      new Tmapv2.LatLng(37.87281030885807, 127.71347503775486), // 조각공원
      new Tmapv2.LatLng(37.87270548048705, 127.71404798321694),
      new Tmapv2.LatLng(37.87409064389781, 127.71293615048799),
      new Tmapv2.LatLng(37.87421972253032, 127.71319312293802),
      new Tmapv2.LatLng(37.87458172611178, 127.71292383479054) // 정류장 승차
    ],
    strokeColor: "#505050",
    strokeWeight: 5,
    strokeStyle:'solid',
    map: map
  });
  new_polyLine.push(polyline);

  polyline = new Tmapv2.Polyline({
    path: [
      new Tmapv2.LatLng(37.89326022093459, 127.72509784184162), // 정류장 하차
      new Tmapv2.LatLng(37.8935758435142, 127.72651065358178), // 도보
      new Tmapv2.LatLng(37.893792509129014, 127.72643888640032),
      new Tmapv2.LatLng(37.893209605132434, 127.72380700694275),
      new Tmapv2.LatLng(37.89455965955911, 127.72365822050989) // 스카이워크
    ],
    strokeColor: "#505050",
    strokeWeight: 5,
    strokeStyle:'solid',
    map: map
  });
  new_polyLine.push(polyline);

  polyline = new Tmapv2.Polyline({
    path: [
      new Tmapv2.LatLng(37.88351731808659, 127.73840129698783), // 정류장 승차
      new Tmapv2.LatLng(37.88272186686768, 127.73630466811277), // 버스
      new Tmapv2.LatLng(37.88120241648185, 127.7343628729),
      new Tmapv2.LatLng(37.883011714705226, 127.72881667000327),
      new Tmapv2.LatLng(37.880486725964644, 127.72774605353496),
      new Tmapv2.LatLng(37.87671646540651, 127.72260558521566),
      new Tmapv2.LatLng(37.87450737985166, 127.71552587534023),
      new Tmapv2.LatLng(37.87411101342056, 127.71699958099465) // 정류장 하차
    ],
    strokeColor: "#0000ff",
    strokeWeight: 5,
    strokeStyle:'solid',
    map: map
  });
  new_polyLine.push(polyline);

  polyline = new Tmapv2.Polyline({
    path: [
      new Tmapv2.LatLng(37.87458172611178, 127.71292383479054), // 정류장 승차
      new Tmapv2.LatLng(37.877153595621664, 127.71148238867266), // 버스
      new Tmapv2.LatLng(37.889697151431875, 127.71846940771466),
      new Tmapv2.LatLng(37.892463753055765, 127.72129294837544),
      new Tmapv2.LatLng(37.89326022093459, 127.72509784184162)// 정류장 하차
    ],
    strokeColor: "#0000ff",
    strokeWeight: 5,
    strokeStyle:'solid',
    map: map
  });
  new_polyLine.push(polyline);

  // 중심 좌표 구하기
  let x = (37.8863541 + 37.87274012913739 + 37.89455965955911) / 3.0;
  let y = (127.73577569999999 + 127.71353402967831 + 127.72365822050989) / 3.0;

  map.setCenter(new Tmapv2.LatLng(x,y));
  map.setZoom(13);
  pathCheck = true;
}

/* 자전거 경로 */
function pathBicycle(){
  let g = mm.length;
  for(let i=0; i<g; i++){
    mm[i].setMap(null);
  }
  pathClose();

  let m = [
    new Tmapv2.LatLng(37.8863541, 127.73577569999999),
    new Tmapv2.LatLng(37.87281030885807, 127.71347503775486),
    new Tmapv2.LatLng(37.894471737015586, 127.72367157078028)
  ];
  let m1 = ["한림대학교", "공지천조각공원", "소양강스카이워크"];
  let a;
  for(let i=0; i<3; i++){
    a = new Tmapv2.Marker({
      position : m[i],
      icon : "./resources/map/images/marker/locationPin.svg",
      iconSize : new Tmapv2.Size(30, 30),
      map : map,
      title : m1[i]
    });
    mm.push(a);
  }

  m = [
    new Tmapv2.LatLng(37.884575398898875, 127.7294515988580),
    new Tmapv2.LatLng(37.87360888012837, 127.71289741061892),
    new Tmapv2.LatLng(37.87359041544871, 127.71185443780696),
    new Tmapv2.LatLng(37.89320293595578, 127.72379273086744)
  ];
  m1 = ["승차","하차","승차","하차"];
  for(let i=0; i<4; i++){
    a = new Tmapv2.Marker({
      position : m[i],
      icon : "./resources/map/images/marker/bicycle_red.png",
      iconSize : new Tmapv2.Size(30, 30),
      map : map,
      title : m1[i]
    });
    mm.push(a);
  }

  polyline = new Tmapv2.Polyline({
    path: [
      new Tmapv2.LatLng(37.8863541, 127.73577569999999), // 공대
      new Tmapv2.LatLng(37.887025230477654, 127.73751554727083), // 일반도로
      new Tmapv2.LatLng(37.887333235846825, 127.7372457945326),
      new Tmapv2.LatLng(37.88598023596997, 127.73498153882575),
      new Tmapv2.LatLng(37.88561720886975, 127.73504613504925),
      new Tmapv2.LatLng(37.88540804445338, 127.7328302518003),
      new Tmapv2.LatLng(37.88490499104565, 127.7318704098354),
      new Tmapv2.LatLng(37.8850700447474, 127.73140598153431),
      new Tmapv2.LatLng(37.88433172956631, 127.73060865481958),
      new Tmapv2.LatLng(37.88478974384533, 127.7293911930431),
      new Tmapv2.LatLng(37.88471135752503, 127.72931937415518),
      new Tmapv2.LatLng(37.884575398898875, 127.7294515988580)
    ],
    strokeColor: "#505050",
    strokeWeight: 5,
    strokeStyle:'solid',
    map: map
  });
  new_polyLine.push(polyline);

  polyline = new Tmapv2.Polyline({
    path: [
      new Tmapv2.LatLng(37.884575398898875, 127.7294515988580), // 자전거도로
      new Tmapv2.LatLng(37.88075195707139, 127.72783391374287),
      new Tmapv2.LatLng(37.880690757636216, 127.72753209407692),
      new Tmapv2.LatLng(37.88087377656912, 127.7270735422748),
      new Tmapv2.LatLng(37.88075715417079, 127.72699282880988),
      new Tmapv2.LatLng(37.88051934553131, 127.72757019117775),
      new Tmapv2.LatLng(37.88041553416235, 127.72760326985765),
      new Tmapv2.LatLng(37.87760330468669, 127.72416573846968),
      new Tmapv2.LatLng(37.87666377293235, 127.72238343193129),
      new Tmapv2.LatLng(37.873986451318224, 127.71377620603693),
      new Tmapv2.LatLng(37.874129152684326, 127.71327180959592),
      new Tmapv2.LatLng(37.87402734148734, 127.71297532027545),
      new Tmapv2.LatLng(37.87372616643856, 127.71287012682784),
      new Tmapv2.LatLng(37.87360888012837, 127.71289741061892)
    ],
    strokeColor: "#0000ff",
    strokeWeight: 5,
    strokeStyle:'solid',
    map: map
  });
  new_polyLine.push(polyline);

  polyline = new Tmapv2.Polyline({
    path: [
      new Tmapv2.LatLng(37.87360888012837, 127.71289741061892),
      new Tmapv2.LatLng(37.8736111129088, 127.713272497411), // 일반도로
      new Tmapv2.LatLng(37.87282405922816, 127.71380761104392),
      new Tmapv2.LatLng(37.87281030885807, 127.71347503775486), // 조각공원
      new Tmapv2.LatLng(37.87260749341177, 127.71312075244707),
      new Tmapv2.LatLng(37.87288828103813, 127.71250119784547 ),
      new Tmapv2.LatLng(37.87359041544871, 127.71185443780696)
    ],
    strokeColor: "#505050",
    strokeWeight: 5,
    strokeStyle:'solid',
    map: map
  });
  new_polyLine.push(polyline);

  polyline = new Tmapv2.Polyline({
    path: [
      new Tmapv2.LatLng(37.87359041544871, 127.71185443780696), // 자전거도로
      new Tmapv2.LatLng(37.87670547615966, 127.70773010937015),
      new Tmapv2.LatLng(37.878020896755025, 127.70771996338974),
      new Tmapv2.LatLng(37.885542766285866, 127.7123502974662),
      new Tmapv2.LatLng(37.88879747401371, 127.7178951095819),
      new Tmapv2.LatLng(37.892416021762685, 127.72136353578232),
      new Tmapv2.LatLng(37.89356463522156, 127.72650201692015),
      new Tmapv2.LatLng(37.893790204327686, 127.72644739028186),
      new Tmapv2.LatLng(37.89320293595578, 127.72379273086744)
    ],
    strokeColor: "#0000ff",
    strokeWeight: 5,
    strokeStyle:'solid',
    map: map
  });
  new_polyLine.push(polyline);

  polyline = new Tmapv2.Polyline({
    path: [
      new Tmapv2.LatLng(37.89320293595578, 127.72379273086744),
      new Tmapv2.LatLng(37.894471737015586, 127.72367157078028) // 스카이워크
    ],
    strokeColor: "#505050",
    strokeWeight: 5,
    strokeStyle:'solid',
    map: map
  });
  new_polyLine.push(polyline);

  // 중심 좌표 구하기
  let x = (37.8863541 + 37.87274012913739 + 37.89455965955911) / 3.0;
  let y = (127.73577569999999 + 127.71353402967831 + 127.72365822050989) / 3.0;

  map.setCenter(new Tmapv2.LatLng(x,y));
  map.setZoom(13);
  pathCheck = true;
}
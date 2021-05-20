// 삭제
// 여행 리스트
function tripList(trip_data){
    const t_data = trip_data;
    let data;

    for(let i=0; i<t_data.length; i++){
      data = t_data[i];
      $("#list").append("<hr><div class='container_list_el'>" +
                          "<img src='" + data.image + "'>" +
                          "<div class='container_list_el_name'>" +
                            "<span class='container_list_el_name_check'>" +
                              "<input type='checkbox' id='ckbox" + i + "' onclick='checkBoxMarker("+ i +")'>" +
                            "</span>" +
                            "<span>" + data.spot + "</span>" +
                            "<p>" + data.description + "</p>" +
                          "</div>" +
                        "</div>");
    }
}

// 체크박스
function checkBoxMarker(id_number){
  const check = $("input:checkbox[id='ckbox" + id_number + "']").is(":checked");
  let marker = markers[id_number];
  let title = marker._marker_data.options.title;
  
  if(routeCheck){
    resetMap();
    if(routeCheck){
      if(check){
        document.getElementById("ckbox" + id_number).checked = false;
        return;
      }
      else{
        document.getElementById("ckbox" + id_number).checked = true;
        return;
      }
    }
  }

  if(check == true){ // 체크박스 true
    let x = marker._marker_data.options.position._lng;
    let y = marker._marker_data.options.position._lat;
    
    marker.setVisible(true);
    marker.setIcon("./resources/images/marker/" + (markerInOrder.length+1) + ".svg");
    markerInOrder.push(marker);
  }
  else{ // 체크박스 false
    // markerInOrder 삭제
    for(var i=0; i<markerInOrder.length; i++){
      if(title == markerInOrder[i]._marker_data.options.title){
        markerInOrder.splice(i, 1);
      }
    }

    // 레이블 순서 재설정
    for(var i=0; i<markerInOrder.length; i++){
      markerInOrder[i].setIcon("./resources/images/marker/" + (i+1) + ".svg");
    }

    if(popup[id_number] != null){
      popupClose(id_number);
    }

    marker.setVisible(false);
  }
}
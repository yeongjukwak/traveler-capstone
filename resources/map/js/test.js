// tl
function tl(trip_data){
    const t_data = trip_data;
    let tripData;
  
    for(let i=0; i<t_data.length; i++){
      tripData = t_data[i];
      $("#triplist").append(`<hr><div class='container_list_el'>` +
                                `<img src='${tripData.image}'>` +
                                `<div class='container_list_el_name'>` +
                                  `<span class='container_list_el_name_check'>` +
                                    `<input type='checkbox' id='ckbox${i}' name='${tripData.spot}' checked>` +
                                  `</span>` +
                                  `<span>${tripData.spot}</span>` +
                                  `<p>${tripData.description}</p>` +
                                `</div>` +
                              `</div>`);
    }
  }

  $(document).ready(function(){
    $(document).on("click", "#ctl", function () {
        $('#list').css('display', 'none');
        $('#triplist').css('display', 'block');
    });
  });
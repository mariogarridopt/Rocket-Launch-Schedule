/**
 * Draw HTML contents from data object
 * 
 * @param {Object} data object with lsit of data to draw
 */
function drawAstronautHtml(data) {
    var size = 53;
    var html = "";

    document.getElementById("main-content").innerHTML += '<div id="ast-list"></div>';
    
    for (let i = 0; i < data.active_expeditions.length; i++) {
        const expedition = data.active_expeditions[i];
        for (let j = 0; j < expedition.crew.length; j++) {
            const obj_p_line = expedition.crew.length;
            if(obj_p_line > 6) {
                size = Math.floor((420 - (obj_p_line * 10) - 40) / obj_p_line);
            }

            const crew = expedition.crew[j].astronaut;

            html +=
                '<a href="https://www.google.com/search?q=' + encodeURI(crew.name + " ISS") + '" ' +
                'class="ast" id="ast-' + crew.id + '" '+
                'style="position: relative; ' +
                'width: ' + size + 'px; height: ' + size + 'px;" >' +
                '<span class="location">ISS</span>' +
                '<img src="' + crew.profile_image_thumbnail + '" ' +
                'class="horizontal"></img>' +
                '</a>';
        }        
    }

    document.getElementById("ast-list").innerHTML = html;
    document.getElementById("ast-list").style.display = "block";
}
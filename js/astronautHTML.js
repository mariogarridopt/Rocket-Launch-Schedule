/**
 * Draw HTML contents from data object
 * 
 * @param {Object} data object with lsit of data to draw
 */
function drawAstronautHtml(data) {
    var size = 53;
    var html = "";
    const list = data.results;

    for (let i = 0; i < list.length; i++) {
        const crew = list[i];
        const obj_p_line = list.length;

        if (obj_p_line > 6) {
            size = Math.floor((420 - (obj_p_line * 10) - 40) / obj_p_line);
        }

        let wiki = (crew.wiki != null) ? crew.wiki : "https://www.google.com/search?q=" + encodeURI("astronaut " + crew.name);
        html +=
            '<a href="' + wiki + '" ' +
            'class="ast" id="ast-' + crew.id + '" ' +
            'style="position: relative; ' +
            'width: ' + size + 'px; height: ' + size + 'px;" >' +
            '<!--span class="location">ISS</span-->' +
            '<img src="' + crew.profile_image_thumbnail + '" ' +
            'class="horizontal"></img>' +
            '</a>';
    }

    document.getElementById("ast-list").innerHTML = html;
    document.getElementById("ast-list").style.display = "block";
}

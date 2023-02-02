/**
 * Draw HTML contents from data object
 * 
 * @param {Object} data object with lsit of data to draw
 */
function drawLaunchHtml(data) {
    var itemNum = 0;

    if(!Array.isArray(data.results)) return;

    for (var i = 0; i < data.results.length && itemNum < 5; i++) {
        var elem = "<article" + ((itemNum != 0) ? ' class="gradient" ' : '') + ">";
        const item = data.results[i];

        const date_now = new Date();
        const end_window = new Date(Date.parse(item.window_end));
        if (end_window < date_now) {
            continue;
        }

        var imgSrc = 'img/default_rocket.png';
        if (item.image != null && item.image != "") {
            imgSrc = item.image;
        }

        var missionName = "";

        var arr = item.name.split("|");

        if (Array.isArray(arr) && arr.length > 1) {

            for (var k = 1; k < arr.length; k++) {
                missionName += arr[k].trim() + " "
            }

            missionName += " | " + arr[0].trim();
        } else {
            missionName = item.name;
        }

        elem += '<div class="imgwrapper"><img src="' + imgSrc + '" /></div>';
        elem += '<div class="launch-info">';
        elem += '<div class="missionTitle ellipsis">' + missionName + '</div>';
        elem += '<div class="launch-site ellipsis">From ' + item.pad.location.name + '</div>';
        elem += '<div class="rocket ellipsis">With ' + item.rocket.configuration.name + '</div>';

        if (itemNum != 0) {
            if (item.vidURLs && item.vidURLs.length > 0) {
                let videoText = item.webcast_live ? "LIVE" : "WATCH VIDEO";
                elem += '<a href="https://go4liftoff.com/launch/id/' + item.id + '"><span class="anounce more-info btn">+INFO</span></a>';
                elem += '<a href="' + item.vidURLs[Math.floor((Math.random() * item.vidURLs.length))] + '"><span class="anounce livestream btn">' + videoText + '</span></a>';
            } else {
                elem += '<a href="https://go4liftoff.com/launch/id/' + item.id + '"><span class="anounce more-info btn extended">+INFO</span></a>';
            }
        }

        const date = new Date(item.net);

        if (itemNum == 0) {
            var formatedTimeLeft = formatTimeLeft(date);
            if (formatedTimeLeft <= 0) {
                formatedTimeLeft = "GO for launch!";
            } else {
                formatedTimeLeft = "T - " + formatedTimeLeft;
            }
            elem += '<div class="timeleft">' + formatedTimeLeft + '</div>';
            elem += '<div class="datetime">' + formatDate(date) + ' at ' + formatTime(date) + '</div>';
        } else {
            elem += '<div class="datetime">' + formatDate(date) + ' at ' + formatTime(date) + ' |  <strong>' + formatTimeLeft(date).replace(" days", "D") + ' left</strong></div>';
        }

        elem += '</div>'; // close launch-info


        if (item.vidURLs && item.vidURLs.length > 0 && itemNum == 0) {
            let videoText = item.webcast_live ? "LIVE" : "WATCH VIDEO";
            elem += '<a href="' + item.vidURLs[Math.floor((Math.random() * item.vidURLs.length))]["url"] + '"><span class="anounce livestream">' + videoText + '</span></a>';
            elem += '<a href="https://go4liftoff.com/launch/id/' + item.id + '"><span class="anounce more-info">i</span></a>';
        }

        elem += "</article>";

        document.getElementById("main-content").innerHTML += elem;
        itemNum++;
    }

    stopLoading();
}

/**
 * Show the loading image
 */
function startLoading() {
    document.getElementById("loading").style.opacity = 1;
}

/**
 * Hide the loading image
 */
function stopLoading() {
    document.getElementById("loading").style.opacity = 0;
}

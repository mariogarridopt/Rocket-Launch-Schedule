/** BOOTSTRAP */
$(".loading").fadeIn(0);
$(".loading").css("margin-top", "200px");

var date_now = new Date();

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

function getCachedData() {
    var data = localStorage.getItem("launches_data");
    var stored_date = localStorage.getItem("launches_data_date");
    var data_date = new Date(stored_date);
    if (stored_date != "" && stored_date != null && addMinutes(data_date, 30) > data_date) {
        return JSON.parse(data);
    }
    return "";
}

// allow cached data so we wont hit the limit of requests
var data = getCachedData();
console.log(data);
if (data == "") {
    $.ajax({
        url: "https://ll.thespacedevs.com/2.0.0/launch/upcoming/?limit=6&mode=detailed"
    }).done(function (data) {
        $(".loading").css("margin-top", "0px");
        localStorage.setItem("launches_data", JSON.stringify(data));
        localStorage.setItem("launches_data_date", new Date());
        drawArticles(data);

        // Wait for the first image to load
        $('article:first-of-type .imgwrapper img').on('load', function () {
            $(".loading img").fadeOut(200, function () {
                $(".loading").slideUp(100);
                $("a").click(function () {
                    var url = $(this).attr('href');
                    chrome.tabs.create({ 'url': url });
                });
            });
        });
    }).fail(function (error) {
        $(".loading").css("margin-top", "0px");
        $(".wrapper").css({
            "display": "flex",
            "justify-content": "center",
            "align-items": "center",
            "height": "420px",
        });

        if (error.status === 429) {
            $(".wrapper").append(`
                  <div class=\"error\">Max number of checks exceeded 
                      <br />(This is not the extension, the API is throttled). 
                      <br />You can check upcoming launches <a href='https://go4liftoff.com/launches' target='_blank'>here</a>.
                  </div>`);
        } else {
            $(".wrapper").append("<div class=\"error\">Servers temporarily offline, please try again later.</div>");
        }


        $(".loading img").fadeOut(200, function () {
            $(".loading").slideUp(100, function () {
                $(".error").slideDown(200);
            });
        });
    });
} else {
    $(".loading").css("margin-top", "0px");
    drawArticles(data);

    // Wait for the first image to load
    $('article:first-of-type .imgwrapper img').on('load', function () {
        $(".loading img").fadeOut(200, function () {
            $(".loading").slideUp(100);
            $("a").click(function () {
                var url = $(this).attr('href');
                chrome.tabs.create({ 'url': url });
            });
        });
    });
}




function drawArticles(data) {
    var itemNum = 0;
    for (var i = 0; i < data.results.length; i++) {
        var elem = "<article" + ((itemNum != 0) ? ' class="gradient" ' : '') + ">";
        var item = data.results[i];

        var end_window = new Date(Date.parse(item.window_end));
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
                elem += '<a href="https://go4liftoff.com/launch/' + item.slug + '"><span class="anounce more-info btn">+INFO</span></a>';
                elem += '<a href="' + item.vidURLs[Math.floor((Math.random() * item.vidURLs.length))] + '"><span class="anounce livestream btn">WATCH LIVE</span></a>';
            } else {
                elem += '<a href="https://go4liftoff.com/launch/' + item.slug + '"><span class="anounce more-info btn extended">+INFO</span></a>';
            }
        }

        var date = new Date(item.net);

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
            elem += '<a href="' + item.vidURLs[Math.floor((Math.random() * item.vidURLs.length))]["url"] + '"><span class="anounce livestream">LIVE</span></a>';
            elem += '<a href="https://go4liftoff.com/launch/' + item.slug + '"><span class="anounce more-info">i</span></a>';
        }

        elem += "</article>";
        $(".wrapper").append(elem);
        itemNum++;
    }
    $(".wrapper").fadeIn(600, function () {
        $(".wrapper").append('<div id="ast-list">');
        getAstronauts();
    });
}

function checkNull(main, def) {
    return (main == null || main == "") ? def : main;
}

function formatTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function formatDate(date) {
    return ("0" + date.getDate()).slice(-2) + "/"
        + ("0" + (date.getMonth() + 1)).slice(-2)
        + "/" + date.getFullYear();
}

function formatTimeLeft(date) {
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = date - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    var text = "";

    if (days > 0) {
        text += days + " days ";
    }

    text += hours + "H "
        + minutes + "M";

    if (days < 1 && hours < 1 && minutes < 1) {
        text = 0;
    }

    return text;
}

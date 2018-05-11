var lastNotification = 0;
var refreshTimer = 10; // in minutes

function showNotification(uid, title, time) {
    chrome.notifications.create("_" + uid, {
        type: 'basic',
        iconUrl: 'img/icon_128.png',
        title: title,
        message: 'Will launch in ' + time + '!'
    }, function(notificationId) {});
}

function minutesLeft(date) {
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = date - now;

    return (distance/1000)/60;
}

function getData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText)['launches'][0];

            var date = new Date(data.isonet.substring(0, 4) + "-" + data.isonet.substring(4, 6) + "-" + data.isonet.substring(6, 11) + ":" + data.isonet.substring(11, 13) + ":" + data.isonet.substring(13, 17));
            var minutes = minutesLeft(date);

            if(minutes <= 15) {
                if(data['id'] != lastNotification) {
                    lastNotification = data.id;

                    showNotification(
                        data.id + Math.floor((Math.random() * 100000) + 1),
                        data.name,
                        parseInt(minutes) + " minutes"
                    );
                }
            }

        }
    };
    xhttp.open("GET", "https://launchlibrary.net/1.3/launch/next/1", true);
    xhttp.send();
}

getData();
setInterval(function(){
    getData();
}, refreshTimer * 60 * 1000);
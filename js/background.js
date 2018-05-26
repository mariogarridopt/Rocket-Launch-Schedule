var latestData = [];

function updateData(updateNotifications) {
    updateNotifications = updateNotifications || true;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            latestData = JSON.parse(this.responseText)['launches'];

            if(updateNotifications) {
                console.log("####### CLEAR NOTIFICATIONS #######");
                chrome.alarms.clearAll();
            }
            for(var i = 0; i < latestData.length; i++) {
                var data = latestData[i];

                var date = new Date(data.isonet.substring(0, 4) + "-" + data.isonet.substring(4, 6) + "-" + data.isonet.substring(6, 11) + ":" + data.isonet.substring(11, 13) + ":" + data.isonet.substring(13, 17));
                if(updateNotifications) {
                    chrome.alarms.create(data.id.toString(), { when:  (date - 900000) });
                    console.log("Alarm created: " + data.name + " at " + new Date(date - 900000).toLocaleString());
                }
            }
        }
    };
    xhttp.open("GET", "https://launchlibrary.net/1.4/launch/next/4", true);
    xhttp.send();
}

chrome.alarms.onAlarm.addListener(function(alarm) {
    var launch = latestData.find(o => o.id === parseInt(alarm.name));
    if(!launch) {
        updateData(false);
        launch = latestData.find(o => o.id === parseInt(alarm.name));
        if(!launch) {
            updateData();
            return;
        }
    }

    chrome.notifications.create("ROCKET" + alarm.name, {
        type: 'basic',
        iconUrl: 'img/icon_128.png',
        title: launch.name,
        message: 'Will launch in 15 minutes!'
    }, function(notificationId) {
        setTimeout(function () {
            updateData(false);
        }, 120000);

    });
});

// Bootstrap
updateData();
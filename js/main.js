// Draw upcoming launches
if (isDataInCache("launch")) {
    const launch = getCachedData("launch");
    drawLaunchHtml(launch);
} else {
    const launchesAPI =
    "https://ll.thespacedevs.com/2.0.0/launch/upcoming/?limit=10&mode=detailed";

    _ajaxrequest(launchesAPI, function (d) {
        if(d != false) {
            updateCachedData("launch", d);
            drawLaunchHtml(d);
        }
    },
    function (e) {
        console.error(e);
    });
}

// Draw Astronauts
if (isDataInCache("astronaut")) {
    const astronaut = getCachedData("astronaut");
    drawAstronautHtml(astronaut);
} else {
    const astronautsAPI =
    "https://ll.thespacedevs.com/2.2.0/astronaut/?in_space=true&is_human=true";

    _ajaxrequest(astronautsAPI, function (d) {
        if(d != false) {
            updateCachedData("astronaut", d);
            drawAstronautHtml(d);
        }
    },
    function (e) {
        console.error(e);
    });
}

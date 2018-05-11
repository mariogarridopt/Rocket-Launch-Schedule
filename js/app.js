/** BOOTSTRAP */
$(".loading").fadeIn( 0 );

$.ajax({
  url: "https://launchlibrary.net/1.3/launch/next/5"
}).done(function(data) {
    drawArticles(data);
    $(".loading img").fadeOut( 200, function(){
    	$(".loading").slideUp( 100, function(){
    		$( "article" ).each(function( index ) {
				$(this).fadeIn(200);
			});

			$("a").click(function() {
				var url = $(this).attr('href');
				chrome.tabs.create({'url': url});
			})
    	} );
    });
  })
  .fail(function() {
    $(".wrapper").append("<div class=\"error\">Servers temporarily offline, please try again later.</div>");
    $(".loading img").fadeOut( 200, function(){
    	$(".loading").slideUp( 100, function(){
    		$(".error").slideDown(200);
    	} );
    });
  });

function drawArticles(data) {
	for(var i = 0; i < data.launches.length; i++) {
		var elem = "<article>";
		var item = data.launches[i];

		if(	item.rocket.imageURL == null || item.rocket.imageURL == "" || item.rocket.imageURL == "Array") {
			var imgSrc = 'img/default_rocket.png';
		}else {
			var imgSrc = item.rocket.imageURL.replace("_1920.", "_" + item.rocket.imageSizes[0] + ".");
		}


		var missionName = "";

		var arr = item.name.split("|");

		if(Array.isArray(arr) && arr.length > 1) {
			
			for (var k = 1; k < arr.length; k++) {
                missionName += arr[k].trim() + " "
			}

            missionName += " | " + arr[0].trim();
		}else {
			missionName = item.name;
		}

		elem += '<div class="imgwrapper"><img src="' + imgSrc + '" /></div>';
		elem += '<div class="missionTitle ellipsis">' + missionName + '</div>';

        missTags = "";
		if (item.missions.length > 0) {
            for(var j = 0; j < item.missions.length; j++) {
                missTags += '<span>' + item.missions[j].typeName + '</span>, ';
            }

            elem += '<div class="tags ellipsis">Tags: ' + missTags.substring(0, missTags.length - 2) + '</div>';
		}

		elem += '<div class="launch_site ellipsis">From ' + item.location.name + '</div>';
		elem += '<div class="rocket">With ' + item.rocket.name + '</div>';

		var date = new Date(item.isonet.substring(0, 4) + "-" + item.isonet.substring(4, 6) + "-" + item.isonet.substring(6, 11) + ":" + item.isonet.substring(11, 13) + ":" + item.isonet.substring(13, 17));

		if(i == 0) {
		    elem += '<div class="timeleft">' + formatTimeLeft(date) + '</div>';
            elem += '<div class="datetime">' + formatDate(date) + ' at ' + formatTime(date) + '</div>';
        }else {
            elem += '<div class="datetime">' + formatDate(date) + ' at ' + formatTime(date) + ' | [ <strong>'  + formatTimeLeft(date) + '</strong> ]</div>';
        }

		
		if(item.vidURLs.length > 0) {
			elem += '<span class="anounce livestream"><a href="' + item.vidURLs[Math.floor((Math.random() * item.vidURLs.length))] + '"><strong>&#149;</strong>&nbsp; Watch Live</a></span>';
		}


		elem += "</article>";
		$(".wrapper").append(elem);
	}
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
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function formatDate(date) {
	return ("0" + date.getDate()).slice(-2) + "/"
		+ ("0" + (date.getMonth()+1)).slice(-2)
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

    if(days > 0) {
        text += days + "d ";
	}

    text += hours + "h "
        + minutes + "m left";

    if(days < 1 && hours < 1 && minutes < 1) {
        text = "now";
	}

    return text;
}
/** BOOTSTRAP */
$(".loading").fadeIn( 0 );

$.ajax({
  url: "https://launchlibrary.net/1.3/launch/next/4"
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
    $("body").append("<div class=\"error\">Servers temporarily offline, please try again later.</div>");
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

		elem += '<div class="imgwrapper"><img src="' + imgSrc + '" /></div>';
		elem += '<div class="missionTitle ellipsis">' + item.name + '</div>';

		if (item.missions.length > 0) {
			var missTags = '<span>' + item.missions[0].typeName + '</span>';
			for(var j = 1; j < item.missions.length; j++) {
				missTags += '<span>' + item.missions[j].typeName + '</span>';
			}
			elem += '<div class="tags">' + missTags + '</div>';
		}

		elem += '<div class="launch_site">From ' + item.location.name + '</div>';
		elem += '<div class="rocket">With ' + item.rocket.name + '</div>';
		var date = new Date(item.isonet.substring(0, 4) + "-" + item.isonet.substring(4, 6) + "-" + item.isonet.substring(6, 11) + ":" + item.isonet.substring(11, 13) + ":" + item.isonet.substring(13, 17));
		elem += '<div class="datetime">' +
		("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth()+1)).slice(-2) + "/" + date.getFullYear() + " at " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) +
		'h</div>';

		
		if(item.vidURLs.length > 0) {
			elem += '<span class="anounce livestream"><a href="' + item.vidURLs[Math.floor((Math.random() * item.vidURLs.length))] + '"><strong>&#149;</strong>&nbsp; Watch Live</a></span>';
		}


		elem += "<article>";
		$("body").append(elem);
	}
}

function checkNull(main, def) {
	return (main == null || main == "") ? def : main;
}

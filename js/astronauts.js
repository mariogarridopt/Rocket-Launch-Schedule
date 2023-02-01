var getAstronauts = function() {
	var data = [];
	$.ajax({
		method: "GET",
		url: "https://api.open-notify.org/astros.json"
	}).done(function( astronauts ) {
		var total = astronauts['people'].length;

		$.each(astronauts['people'], function(index, value) {
			$.ajax({
				method: "GET",
				url: "https://images-api.nasa.gov/search?media_type=image&keywords=portrait,press,official,astronaut,cosmonaut&q=" + value['name']
			}).done(function( images ) {
				data.push({
					name: value['name'],
					craft: value['craft'],
					photo: images['collection']['items'][0]['links'][0]['href']
				});
			}); // end second ajax
		}); // end foreach

		var waitforIt = setTimeout(function(){
			if(data.length == total) {
				drawAstronauts(data);
				clearTimeout(waitforIt);
			}
		}, 1000);
	}); // end first ajax
}

var drawAstronauts = function(data) {
	if(! data) { getAstronauts(); return; }
	var obj_p_line = data.length;//Math.floor(data.length / 2);
	if(data.length < 7) {
		var size = 53;
	}else {
		var size = Math.floor((420 - (obj_p_line * 10) - 40) / obj_p_line);
	}

	$("#ast-list").html('<p class="ast-title">There are ' + data.length + ' 	astronauts in space right now:</p>');
	for (var i = 0; i < data.length; i++) {
		var $elem = $("<a>");
		$elem.attr('href', 'https://www.google.com/search?q='+ data[i].name);
		$elem.attr('id', 'ast-' + i);
		$elem.addClass('ast');
		$elem.css('position', 'relative');
		$elem.css('width', size + 'px');
		$elem.css('height', size + 'px');
		$elem.on("click", function (e) {
			var url = $(this).attr('href');
            chrome.tabs.create({'url': url});
		});

		var $img = $('<img>');
		$img.attr("src", data[i].photo);
		$img.on("load", function (e) {
			this.className = (this.clientWidth > this.clientHeight) ? 'horizontal':'vertical';
		});

		var $location = $("<span>");
		$location.addClass("location");
		$location.html(data[i].craft);

		$elem.append($img);
		$elem.append($location);
		$("#ast-list").append($elem);
		$("#ast-list").slideDown( "slow" );
	}
}


var myLatlng;
var mapOptions;
var map;
var sampleAPI = "https://dl.dropboxusercontent.com/u/72466829/walmart.json";
var marker;
var contentString;
var infowindow;
var url = 'http://server-api.dquid.io/api/v1/data';

function retrieve(apiUrl, response){
  $.ajax({
    url: apiUrl,
    statusCode: {
      200: function (response) {
        var prettyPrintResponse = JSON.stringify(response,null,2);
        prettyPrintResponse = '200, OK \n\n' + prettyPrintResponse;

        $(idResponseDiv).text(prettyPrintResponse);
        $(idResponseDiv).css( "display", "block" );
      },
      400: function () {
        $(idResponseDiv).text('400, Bad Request');
        $(idResponseDiv).css( "display", "block" );
      },
      404: function () {
        $(idResponseDiv).text('404, Not Found');
        $(idResponseDiv).css( "display", "block" );
      }
    }
  });
}


function initialize() {
	myLatlng = new google.maps.LatLng(36.334145, -94.148036);
	console.log(myLatlng);
	mapOptions = {
		zoom: 5,
		center: myLatlng
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	$.getJSON( sampleAPI, {
		tags: "mount rainier",
		tagmode: "any",
		format: "json"
	})
	.done(function( data ) {
		for (var i = 0; i < data.length; i++) {
			myLatlng = new google.maps.LatLng(data[i].latitude, data[i].longitude);

			marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				title: data[i].storenum
			});
			
			infowindow = new google.maps.InfoWindow({
				content: contentString
			});

			google.maps.event.addListener(marker, 'click', (function(marker, streetaddr, strcity, strstate, zipcode, storenum){
				return function() {
					var sn;
					switch (storenum % 3) {
						case 0: sn = "115";
						break;
						case 1: sn = "116";
						break;
						case 2: sn = "117";
						break;
					}
					var serialNumber = "0000000000000" + sn;
					var url3 = url + '/' + serialNumber + '/latest';
					function callBack(message) {
						contentString = 
							'<div id="content">'+
								'<div id="siteNotice">'+ '</div>'+
								'<h1 id="firstHeading" class="firstHeading">Store' + storenum + '</h1>'+
								'<div id="bodyContent">'+
									'<p><b>Street Address:</b></br>' + 
									streetaddr + "</br>" + 
									strcity + ", " + strstate + " " + zipcode +
									'</p>'+
									'<p>' + message + '</p>' +
									'<p>Chart with us: <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
									'https:/baytekhackandplay.com</a>'+
								'</div>'+
							'</div>';

						infowindow.setContent(contentString);
						infowindow.open(map, marker);
					}

					$.ajax({
						url: url3,
						statusCode: {
							200: function(response) {
								var prettyPrintResponse = JSON.stringify(response,null,2);
								prettyPrintResponse = '200, OK \n\n' + prettyPrintResponse;
								callBack(prettyPrintResponse);
							},
							400: function() {
								callBack("400, Bad Request");
							},
							404: function() {
								callBack("404, Not Found");
							},
						}
					});
				};
			})(marker, data[i].streetaddr, data[i].strcity, data[i].strstate, data[i].zipcode,
				 data[i].storenum ));
		}
	});
}

google.maps.event.addDomListener(window, 'load', initialize);


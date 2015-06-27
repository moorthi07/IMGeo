//
//var myLatlng;
//var mapOptions;
//var map;
//var sampleAPI = "https://dl.dropboxusercontent.com/u/72466829/walmart.json";
//var marker;
//var contentString;
//var infowindow;
//var img12 ='../img/icons/flappybird.png';
//
//
//function initialize() {
//	myLatlng = new google.maps.LatLng(36.334145, -94.148036);
//	console.log(myLatlng);
//	mapOptions = {
//		zoom: 5,
//		center: myLatlng
//	};
//	map = new google.maps.Map(document.getElementById('map-canvas1'), mapOptions);
// 
//	$.getJSON( sampleAPI, {
//		tags: "mount rainier",
//		tagmode: "any",
//		format: "json"
//	})
//	.done(function( data ) {
//		for (var i = 0; i < data.length; i++) {
//			myLatlng = new google.maps.LatLng(data[i].latitude, data[i].longitude);
//
//			marker = new google.maps.Marker({
//				position: myLatlng,
//				map: map,
//				title: data[i].storenum,
//            
//
//			});
//			
//			infowindow = new google.maps.InfoWindow({
//				content: contentString
//			});
//
//			google.maps.event.addListener(marker, 'click', (function(marker, streetaddr, strcity, strstate, zipcode){
//				return function() {
//					contentString = 
//						'<div id="content">'+
//							'<div id="siteNotice">'+ '</div>'+
//							'<h1 id="firstHeading" class="firstHeading">Store</h1>'+
//							'<div id="bodyContent">'+
//								'<p><b>Street Address:</b></br>' + 
//								streetaddr + "</br>" + 
//								strcity + ", " + strstate + " " + zipcode +
//								'</p>'+
//								'<p>Chart with us: <a href="#chatwin" >'+
//								'Chat</a>';
//							'</div>'+
//						'</div>';
//
//					infowindow.setContent(contentString);
//					infowindow.open(map, marker);
//				}
//			})(marker, data[i].streetaddr, data[i].strcity, data[i].strstate, data[i].zipcode ));
//		}
//	});
//}
////target="_blank"
//google.maps.event.addDomListener(window, 'load', initialize);





var myLatlng1;
var mapOptions1;
var map1;
var sampleAPI1=  "assets/js/revenue.json"; 
var marker1;
var contentString;
var infowindow1;


function initialize1() {
	myLatlng1 = new google.maps.LatLng(36.334145, -94.148036);
	console.log(myLatlng1);
	mapOptions1 = {
		zoom: 5,
		center: myLatlng1
	};
	map1 = new google.maps.Map(document.getElementById('map-canvas1'), mapOptions1);

	$.getJSON( sampleAPI1, {
		tags: "mount rainier",
		tagmode: "any",
		format: "json"
	})
	.done(function( data ) {
		for (var i = 0; i < data.length; i++) {
			myLatlng1 = new google.maps.LatLng(data[i].latitude, data[i].longitude);

         marker1 =    new google.maps.Marker({
       position: myLatlng1,
       draggable: true,
       raiseOnDrag: true,
       map: map1,
             title: data[i].balance
     });
			infowindow1 = new google.maps.InfoWindow({
				content: contentString
			});

			google.maps.event.addListener(marker1, 'click', (function(marker1, streetaddr, strcity, strstate, zipcode){
				return function() {
					contentString = 
						'kk'; 
                    infowindow1.setContent(contentString);
					infowindow1.open(map1, marker1);
				}
			})(marker1, data[i].streetaddr, data[i].strcity, data[i].strstate, data[i].zipcode ));
		}
	});
}
//
google.maps.event.addDomListener(window, 'load', initialize1);


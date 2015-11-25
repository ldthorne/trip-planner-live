var markers = [];
var days = [];
$(function () {

    var map = initialize_gmaps();

    var createItineraryItem = function (placeName) {

        var $item = $('<li></li>');
        var $div = $('<div class="itinerary-item"></div>');

        $item.append($div);

        $div.append('<span class="title">'+ placeName +'</span>');
        $div.append('<button class="btn btn-xs btn-danger remove btn-circle">x</button>');

        return $item;

    };

    var getPlaceObject = function (typeOfPlace, nameOfPlace) {

        var placeCollection = window['all_' + typeOfPlace];

        return placeCollection.filter(function (place) {
            return place.name === nameOfPlace;
        })[0];

    };

    $(".add-day").on("click", function(){
    	$(".current-day").removeClass("current-day")
    	$(".add-day").before('<button class="btn btn-circle day-btn current-day">'+(days.length+1)+'</button>')
    	var dayObj = {
    		name: "day "+ (days.length+1),
    		hotels: [],
    		restaurants: [],
    		activities: []
    	};
    	days.push(dayObj);
    });


    $(".day-buttons").on('click', '.day-btn', function(){
    	$(".current-day").removeClass("current-day")
    	$(this).addClass("current-day");
    });


    $('.add-place-button').on('click', function () {

        var $this = $(this);
        var sectionName = $this.parent().attr('id').split('-')[0];
        console.log(sectionName)
        var $listToAppendTo = $('#' + sectionName + '-list').children('ul');
        var placeName = $this.siblings('select').val();
        var placeObj = getPlaceObject(sectionName, placeName);

        var resultMarker = drawLocation(map, placeObj.place[0].location);
        var markerObj = {
        	name: placeName,
        	marker: resultMarker
        }
       	markers.push(markerObj)
       	console.dir(markers)
        // markers.push({
        // 	name: placeName, 
        // 	position: {
        // 		lat: resultMarker.position.lat(), 
        // 		lng: resultMarker.position.lat()
        // 	}
        // });
        console.log(markers)
        var $element = createItineraryItem(placeName);
        var dayNum = $(".current-day").html()-1;
    	days[dayNum][sectionName].push($element);
        $listToAppendTo.append($element);
        addEventToButton($element);


    });


	function addEventToButton(element) {
		element.on('click','.remove', function(){
			console.dir(element[0]);
			var placeName = element[0].firstChild.innerText.slice(0, element[0].firstChild.innerText.length-1)
			element.remove();
			markers.indexOf()
			for(var i=0; i<markers.length; i++){
				if(markers[i].name === placeName){
					markers[i].marker.setMap(null);
					markers.splice(i,1)
					return;
				}
			}

	});

}
});
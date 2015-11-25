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
         $(".add-day").before('<button class="btn btn-circle day-btn num-btn current-day">'+(days.length+1)+'</button>')
        
        var dayObj = {
            name: "day "+ (days.length+1),
            hotels: [],
            restaurants: [],
            activities: []
        };
        days.push(dayObj);

        //switch to new itinerary:
        updateItinerary($(".current-day"));
    });


    $(".day-buttons").on('click', '.num-btn', function(){
        $(".current-day").removeClass("current-day");
        var $this = $(this);
        $this.addClass("current-day");
        //call updateItinerary
        updateItinerary($this);
    });


    $('.add-place-button').on('click', function () {

        var $this = $(this);
        var sectionName = $this.parent().attr('id').split('-')[0];
        //console.log(sectionName)
        var $listToAppendTo = $('#' + sectionName + '-list').children('ul');
        var placeName = $this.siblings('select').val();
        var placeObj = getPlaceObject(sectionName, placeName);

        var resultMarker = drawLocation(map, placeObj.place[0].location);
        var markerObj = {
            name: placeName,
            marker: resultMarker
        }
        markers.push(markerObj);
        ///console.dir(markers);

        var $element = createItineraryItem(placeName);
        var dayNum = $(".current-day").html()-1;
        //debugger;
        days[dayNum][sectionName].push($element);
        $listToAppendTo.append($element);
        addEventToButton($element);
    });

    function updateItinerary(dayBtn){
        //update Day label
        var dayNum = dayBtn.html();
        //console.log("text" + $('#day-title').children('span').text());
        $('#day-title').children('span').text('Day ' + dayNum);

        //clear current itinerary and replace with content from arrays
        //$('.list-group').append('<h1>hi</h1>');
        $('.list-group').empty();   //remove all children
        console.log(dayNum-1);
        //console.log("Act:" + days[dayNum-1].activities);
        for(var i = 0; i < days[dayNum-1].activities.length; i++) {
            var curAct = days[dayNum-1].activities[i][0].innerHTML;
            $("#activities-list").children('ul').append(curAct);

            //get current button!!! and attach delete event handler
            //get last li:
            var childLength = $("#activities-list").children('ul').length;
            var curLI = $("#activities-list").children('ul')[childLength-1];//.find('.btn');
            addEventToButton($(curLI));
            console.dir(curLI);
        }
        for(var i = 0; i < days[dayNum-1].restaurants.length; i++) {
            var curRest = days[dayNum-1].restaurants[i][0].innerHTML;
            $("#restaurants-list").children('ul').append(curRest);
            console.dir(curRest);
        }
        for(var i = 0; i < days[dayNum-1].hotels.length; i++) {
            var curHotel = days[dayNum-1].hotels[i][0].innerHTML;
            $("#hotels-list").children('ul').append(curHotel);
        }
    }

    function addEventToButton($btnParentElement) {
        console.log("delete");
        console.dir($btnParentElement);
        $btnParentElement.on('click','.remove', function(){
            console.dir($btnParentElement[0]);
            var placeName = $btnParentElement[0].firstChild.innerText.slice(0, $btnParentElement[0].firstChild.innerText.length-1)
            $btnParentElement.remove();
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
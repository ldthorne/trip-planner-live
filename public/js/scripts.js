$('.add-btn').on('click', function(){
	console.log(this.id);
	if(this.id === 'btn_addHotel') {
		$('#hotelList').append(createLI('#hotelSelect'));
	}
	else if(this.id === 'btn_addRestaurant') {
		$('#restaurantList').append(createLI('#restaurantSelect'));
	}
	else if(this.id === 'btn_addActivity') {
		$('#activityList').append(createLI('#activitySelect'));
	}
});

function createLI(btnId) {
	return $('<div class="itinerary-item"><span class="title">' + $(btnId + " option:selected").text() + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
}
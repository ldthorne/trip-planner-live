$('.add-btn').on('click', function(){
	//console.log(this.id);
	if(this.id === 'btn_addHotel') {
		var $newLi = createLI('#hotelSelect');
		$('#hotelList').append($newLi);
		addEventToButton($newLi);
	}
	else if(this.id === 'btn_addRestaurant') {
		var $newLi = createLI('#restaurantSelect');
		$('#restaurantList').append($newLi);
		addEventToButton($newLi);
	}
	else if(this.id === 'btn_addActivity') {
		var $newLi = createLI('#activitySelect');
		$('#activityList').append($newLi);
		addEventToButton($newLi);
	}
});

function createLI(btnId) {
	return $('<div class="itinerary-item"><span class="title">' + $(btnId + " option:selected").text() + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
}

function addEventToButton(element) {
	element.on('click','.remove', function(){
		console.dir(this);
		this.parentNode.remove();
	});
}

// $('#hotelList').on('click','.remove', function(){
// 	console.dir(this.parent);
// });
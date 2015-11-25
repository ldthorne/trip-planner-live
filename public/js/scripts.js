$('.add-btn').on('click', function(){
	var $this = $(this);
	console.dir($this);
	var sectionName = $this[0].id.slice(7).toLowerCase();
	var $newLi = $('#' + sectionName + 'List').append(createLI('#' + sectionName + 'Select'));
	addEventToButton($newLi);
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

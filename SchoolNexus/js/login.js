$(document).ready(function () {

	if ($("#messageBox span").is(":parent")) {
        $("#messageBox").fadeIn().delay(3000).fadeOut();
    }
	
	$("#messageBox span").on("change", function() {
		$("#messageBox").fadeIn().delay(3000).fadeOut();
	});

	/* 	----------------------
	 		POST Requests.
		 --------------------- */
	$("form").submit(function(event) {
		event.preventDefault();
		var formValues = $(this).serialize() + "&request=" + "login";

		$("#loadingScreen").prop("hidden", false);

		$.post("/", formValues, function(data) {
			$("#loadingScreen").prop("hidden", true);
			document.open();
            document.write(data);
            document.close();
		});
	});

});
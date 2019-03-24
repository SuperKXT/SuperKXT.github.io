var currentScreen = "home";

$(document).ready(function () {

	/*
	// Apply Datatables to Tables.
	$('#studentListTab table').DataTable( {
		"pageLength": 50,
		"order": [0, 'asc'],
		"lengthMenu": [ 10, 25, 50, 75, 100, 200, 1000 ]
	} );
	$('#studentAwTab table').DataTable( {
		"pageLength": 50,
		"order": [0, 'asc'],
		"lengthMenu": [ 10, 25, 50, 75, 100, 200, 1000 ]
	} );
	$('#staffListTab table').DataTable( {
		"pageLength": 50,
		"order": [0, 'asc'],
		"lengthMenu": [ 10, 25, 50, 75, 100, 200, 1000 ]
	} );
	$('#usersMain table').DataTable( {
		"pageLength": 50,
		"order": [0, 'asc'],
		"lengthMenu": [ 10, 25, 50, 75, 100, 200, 1000 ]
	} );
	$('#logsMain table').DataTable( {
		"pageLength": 50,
		"order": [0, 'asc'],
		"lengthMenu": [ 10, 25, 50, 75, 100, 200, 1000 ]
	} );*/

	// Checks if there is a status message.
	if ($("#messageBox span").is(":parent")) {
		$("#messageBox").fadeIn().delay(3000).fadeOut();
	}

	/* 	----------------------
	 		Search Functions.
		 --------------------- */
	$(".search-text").on("change keyup paste", function () {
		if ($(".search-text").val() == "") {
			$("#searchCancel").fadeOut();

			restoreAfterSearch();
		} else {
			$("#searchCancel").fadeIn().css("display", "block");
		}
	});

	$(".search-text").on("change", function () {
		if ($(".search-text").val() != "") {

			$("#studentListTab tbody tr").css("display", "none");

			//Implement Searching here.

			setBeforeSearch();

			for (var i = 0; i < $("#studentListTab tbody tr").length; i++) {
				var text = $(".search-text").val().toLowerCase();
				var row = $("#studentListTab tbody tr").eq(i);
				var value = row.children().eq(2).html().toLowerCase();
				if (value.includes(text)) {
					$("#studentListTab tbody tr").eq(i).css("display", "table-row");
				}
			}
		}
	});

	$("#searchCancel").click(function () {
		$(".search-text").val("");
		$("#searchCancel").fadeOut();
		$(".search-text").focus();

		restoreAfterSearch();
	});

	/* 	----------------------
	 	  HEADER RIGHT SIDE.
		 --------------------- */
	// Show the about Me Modal.
	$("#aboutMe").click(function () {
		$("#aboutScreenBG").fadeIn();
	});

	$("#aboutScreenClose").click(function() {
		$("#aboutScreenBG").fadeOut();
	});

	$("#aboutScreenBG").click(function(event) {
		if (event.target === $("#aboutScreenBG").get(0)) {
			$("#aboutScreenBG").fadeOut();
		}
	});


	$("#userArea").click(function () {
		$("#loginDiv").slideToggle(200);
	});

	// Log out the current User.
	$("#loginDiv").submit(function(e) {

		e.preventDefault();
		
		$("#loadingScreen").fadeIn(200);
		$.post("/", {request: "logOut"}, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	$(window).on("resize", function () {
		if (window.innerWidth < 900) {
			$("#collapseButton").addClass("collapsed");
		}
	});

	$("#collapseButton").click(function () {

		if ($("#collapseButton").hasClass("collapsed")) {
			$("#sideBar").animate({
				width: "16.5%"
			}, {
				"duration": 300,
				"queue": false
			});
			$("#collapseButton").removeClass("collapsed");
			$(".list-text").css("display", "inline-block");
			$("#header").animate({
				width: "83.5%"
			}, {
				"duration": 300,
				"queue": false
			});
			$("#mainArea").animate({
				width: "83.5%"
			}, {
				"duration": 300,
				"queue": false
			});
			$("#mainArea").animate({
				left: "16.5%"
			}, {
				"duration": 300,
				"queue": false
			});
		} else {
			$("#sideBar").animate({
				width: "40px"
			}, {
				"duration": 300,
				"queue": false
			});
			$("#collapseButton").addClass("collapsed");
			$(".list-text").css("display", "none");
			var rightWidth = $(window).width() - 40;
			$("#header").animate({
				width: rightWidth
			}, {
				"duration": 300,
				"queue": false
			});
			$("#mainArea").animate({
				width: rightWidth
			}, {
				"duration": 300,
				"queue": false
			});
			$("#mainArea").animate({
				left: "40px"
			}, {
				"duration": 300,
				"queue": false
			});
		}

	});

	$("#smallCollapseButton").click(function () {

		if ($("#smallCollapseButton").hasClass("collapsedDown")) {
			$("#smallCollapseButton").removeClass("collapsedDown");
			$("#sideBar").slideUp();
		} else {
			$("#smallCollapseButton").addClass("collapsedDown");
			$("#sideBar").slideDown();
		}

	});

	$(window).on("resize", function () {
		if (window.innerWidth > 900) {
			$("#sideBar").css("display", "block");
		}
	});

	$(".list-item").click(function () {

		if ($(this).attr("id") != "collapseButton" && !$(this).hasClass("disable")) {

			$("#sideBarList .active").removeClass("active");
			$(this).addClass("active");

			var id = $(this).attr("id").toString();
			id = id.substring(0, id.length - 6);
			$(".main").removeClass("current-page").css("display", "none");
			if (id === "home") {
				$("#" + id + "Main").fadeIn(function() {
					$("#" + id + "Main").css("display", "block");
				});
			}
			else {
				$("#" + id + "Main").fadeIn(function() {
					$("#" + id + "Main").addClass("current-page");
				});
			}
			
			currentScreen = id;

			var smallScreen = $("#sideBar").css("position");
			
			if (smallScreen === "fixed") {

				$("#sideBar").slideUp();
				$("#smallCollapseButton").removeClass("collapsedDown");

			}

		}

	});

	// Hide the Tabs Screen in Mobile Mode, Don't do anything in desktop mode.
	$(".tabs").click(function () {

		var smallScreen = $(this).css("position");

		if (smallScreen === "fixed") {

			$(this).animate({
				width: "0"
			}, {
				"duration": 300,
				"queue": false
			});
			$(this).delay(300).fadeOut(0);

		}

	});

	// Show the Tabs Screen in Mobile Mode.
	$(".tab-show-button").click(function () {

		var visible = $(this).siblings(".tabs").css("display");

		// Show
		if (visible === "none") {

			$(this).siblings(".tabs").css("display", "block");
			$(this).siblings(".tabs").animate({
				width: "90%"
			}, {
				"duration": 300,
				"queue": false
			});

		}
		// Hide
		else {

			$(this).siblings(".tabs").animate({
				width: "0"
			}, {
				"duration": 300,
				"queue": false
			});
			$(this).siblings(".tabs").delay(300).fadeOut(0);

		}

	});

	// Show the Tabs Screen in Desktop by Clearing the Inline Styles that are applied when tabs are hidden in mobile mode.
	let resizeTimer;
	$(window).resize(function() {
		// clear the timeout
		clearTimeout(resizeTimer);
	
		// execute breakpointChange() once the viewport 
		// has stopped changing in size for 400ms
		resizeTimer = setTimeout(breakpointChange(), 400);
	});

	function breakpointChange() {

		width = window.innerWidth;

		if (width > 900) {
			$(".tabs").removeAttr("style");
		}

	}

	// Handling Tab Buttons on Pages.
	$(".tab-button").click(function () {

		var id = $(this).attr('id');

		var smallScreen = $(this).parent().css("position");

		if (smallScreen === "fixed") {

			$(this).parent().animate({
				width: "0"
			}, {
				"duration": 300,
				"queue": false
			});
			$(this).parent().delay(300).fadeOut(0);

		}

		if (!$(this).hasClass("active")) {

			$(this).siblings().removeClass("active");
			$(this).addClass("active");

			id = id.substring(0, id.length - 6);
			// Hide current tab.
			$("#" + id + "Tab").siblings(".tab").css("display", "none").removeClass("current-tab");

			// Show the selected tab with slide down animation.
			$("#" + id + "Tab").addClass("current-tab").css("width", "0").animate({
				width: "100%"
			}, {
				"duration": 500,
				"queue": false
			});

		}
	});

	/* 	----------------------
	 		Students Functions.
		 --------------------- */
	$("#guardian_checkbox_add").click(function () {
		if ($("#guardian_checkbox_add").prop("checked")) {
			$(".student-add-guardian input:not(:first)").prop("disabled", true);
			for (var i = 0; i < $(".student-add-guardian input:not(:first)").length; i++) {
				var father = $(".student-add-father input").eq(i).val();

				if (i === $(".student-add-guardian input:not(:first)").length - 1) {
					$(".student-add-guardian input:not(:first)").eq(i).val("Father");
				} else {
					$(".student-add-guardian input:not(:first)").eq(i).val(father);
				}

			}
		} else {
			$(".student-add-guardian input").slice(2).prop("disabled", false);
			$(".student-add-guardian input:not(:first)").val("");
		}
	});

	// Copying values of Father to Guardian upon checkbox checked.
	$("#guardian_checkbox_edit").click(function () {
		if ($("#guardian_checkbox_edit").prop("checked")) {
			$(".student-edit-guardian input:not(:first)").prop("disabled", true);
			for (var i = 0; i < $(".student-edit-guardian input:not(:first)").length; i++) {
				var father = $(".student-edit-father input").eq(i).val();

				if (i === $(".student-edit-guardian input:not(:first)").length - 1) {
					$(".student-edit-guardian input:not(:first)").eq(i).val("Father");
				} else {
					$(".student-edit-guardian input:not(:first)").eq(i).val(father);
				}

			}
		} else {
			$(".student-edit-guardian input").slice(2).prop("disabled", false);
			$(".student-edit-guardian input:not(:first)").val("");
		}
	});

	// Copying values of Father to Guardian When values are changed and checkbox id checked.
	$(".student-add-father input").on("change", function () {
		if ($("#guardian_checkbox_add").prop("checked")) {
			for (var i = 0; i < $(".student-add-guardian input:not(:first)").length; i++) {
				var father = $(".student-add-father input").eq(i).val();

				if (i === $(".student-add-guardian input:not(:first)").length - 1) {
					$(".student-add-guardian input:not(:first)").eq(i).val("Father");
				} else {
					$(".student-add-guardian input:not(:first)").eq(i).val(father);
				}

			}
		}
	});

	$(".student-edit-father input").on("change", function () {
		if ($("#guardian_checkbox_edit").prop("checked")) {
			for (var i = 0; i < $(".student-edit-guardian input:not(:first)").length; i++) {
				var father = $(".student-edit-father input").eq(i).val();

				if (i === $(".student-edit-guardian input:not(:first)").length - 1) {
					$(".student-edit-guardian input:not(:first)").eq(i).val("Father");
				} else {
					$(".student-edit-guardian input:not(:first)").eq(i).val(father);
				}

			}
		}
	});

	// Checking the box on entering the label, needed because the actual checkbox is hidden for aesthetic purposes.
	$(document).on("keypress", "input[type=checkbox] + label", function (e) {
		if (e.which == 13) {
			$(this).prev().click();
		}
	});

	// Show or Hide the Select, Search, and Print Menus on List Tabs.
	$(".list-menu-title").click(function () {

		var visible = $(this).siblings(":first").css("display");

		if (visible === "none") {

			if ($(this).parent().attr("id").includes("messag")) {

				// Show the Menu with a slide down animation.
				$(this).siblings("div:first-of-type").slideDown(200, function() {
					$(this).fadeIn(200);
				});

				$(this).siblings("div:first-of-type").find("select").change();
				
				// Change the Arrow With Fade Animation.
				$(this).fadeTo(200, 0.30, function() {
					$(this).css("background-image", 'url("Images/up-arrow.png")');
				}).fadeTo(200, 1);

				$(this).css("margin-bottom", "5px");

			}
			else {

				// Show the Menu with a slide down animation.
				$(this).siblings().slideDown(200, function() {
					$(this).fadeIn(200);
				});
				
				// Change the Arrow With Fade Animation.
				$(this).fadeTo(200, 0.30, function() {
					$(this).css("background-image", 'url("Images/up-arrow.png")');
				}).fadeTo(200, 1);

				$(this).css("margin-bottom", "5px");

			}

		} else {

			// Hide the Menu with a slide down animation.
			$(this).siblings().slideUp(200, function() {
				$(this).fadeOut(200);
			});

			// Change the Arrow With Fade Animation.
			$(this).fadeTo(200, 0.30, function() {
				$(this).css("background-image", 'url("Images/down-arrow.png")');
			}).fadeTo(200, 1);

			$(this).css("margin-bottom", "0");

		}

	});

	// Hide and show different selection inputs on list tabs.
	$(".selection-method").on("change", function () {

		var selection = $(this).val();
		var id = $(this).attr("id");

		var page = id.split(/(?=[A-Z])/)[0];
		var tab;
		var middle = "";

		if (page === "attendance") {
			tab = id.split(/(?=[A-Z])/)[2];
			middle = id.split(/(?=[A-Z])/)[1];
			id = "#" + page + "" + middle + tab + "SelectionForm";
		} else {
			tab = id.split(/(?=[A-Z])/)[1];
			id = "#" + page + tab + "SelectionForm";
		}

		if (page === "student") {
			$(id + " select").not(":first").fadeOut(200);
			$(id + " label").not(":first").fadeOut(200);
		} else if (page === "fee") {
			$(id + " select").not(":first").not(":last").fadeOut(200);
			$(id + " label").not(":first").not(":last").not(":last").fadeOut(200);
		} else if (page === "attendance") {
			
			if (id.includes("Periods")) {
				$(id + " select").not(":first").not(":last").not(":last").fadeOut(200);
				$(id + " label").not(":first").not(":last").not(":last").not(":last").fadeOut(200);
			}
			else {
				$(id + " select").not(":first").not(":last").fadeOut(200);
				$(id + " label").not(":first").not(":last").not(":last").fadeOut(200);
			}

		} else if (page === "staff") {
			$(id + " select").not(":first").fadeOut(200);
			$(id + " label").not(":first").fadeOut(200);

			if (selection === "role") {
				$("#staff" + tab + "SelectRole").change();
			}

		} else if (page === "payroll") {
			$(id + " select").not(":first").not(":last").fadeOut(200);
			$(id + " label").not(":first").not(":last").not(":last").fadeOut(200);

			if (selection === "role") {
				$("#payroll" + tab + "SelectRole").change();
			}

		} else if (page === "messaging") {
			if ($(this).attr("id").includes("SMS")) {
				id = "#" + page + "SMSSelectionForm";
				page = page + "SMS";
			} else {
				id = "#" + page + "EmailSelectionForm";
				page = page + "Email";
			}
			$(id + " select").not(":first").not(":last").fadeOut(200);
			$(id + " label").not(":first").not(":last").fadeOut(200);
		} else if (page === "messagingstaff") {
			if ($(this).attr("id").includes("SMS")) {
				id = "#" + page + "SMSSelectionForm";
				page = page.slice(0, -5) + "SMSStaff";
			} else {
				id = "#" + page + "EmailSelectionForm";
				page = page.slice(0, -5) + "EmailStaff";
			}
			$(id + " select").not(":first").fadeOut(200);
			$(id + " label").not(":first").fadeOut(200);
		}

		if (selection == "class") {
			$(id + " select[name=class], " + id + " label[for=" + page + middle + tab + "SelectClass]").fadeIn(200);
		} else if (selection == "section") {
			$(id + " select[name=section], " + id + " label[for=" + page + middle + tab + "SelectSection]").fadeIn(200);
		} else if (selection == "classAndSection") {
			$(id + " select[name=class], " + id + " label[for=" + page + middle + tab + "SelectClass]").fadeIn(200);
			$(id + " select[name=section], " + id + " label[for=" + page + middle + tab + "SelectSection]").fadeIn(200);
		} else if (selection == "gender") {
			$(id + " select[name=gender], " + id + " label[for=" + page + middle + tab + "SelectGender]").fadeIn(200);
		} else if (selection == "family") {
			$(id + " select[name=father], " + id + " label[for=" + page + middle + tab + "SelectFather]").fadeIn(200);
		} else if (selection == "role") {
			$(id + " select[name=role], " + id + " label[for=" + page + middle + tab + "SelectRole]").fadeIn(200);
			$("#" + page + "SelectRole").change();
		}

		// Show or hide the generate button for Fee and Attendance Lists.
		if (selection == "class" || selection == "classAndSection") {

			if (id == "#feeListSelectionForm") {
				var year = $("#feeListSelectYear").val();
				if (year != "" && (year >= 1900 && year <= 2999) && ($("#feeListSelectClass").val() != 99)) {
					$("#feeGenerateList").fadeIn(200);
				}
			} else if (id == "#attendanceStudentsListSelectionForm") {
				var year = $("#attendanceStudentsListSelectYear").val();
				if (year != "" && (year >= 1900 && year <= 2999)) {
					$("#attendanceStudentsGenerateList").fadeIn(200);
				}
			}
			else if (id == "#attendancePeriodsListSelectionForm") {
				var year = $("#attendancePeriodsListSelectYear").val();
				if (year != "" && (year >= 1900 && year <= 2999)) {
					$("#attendancePeriodsGenerateList").fadeIn(200);
				}
			}
			else if (id == "#attendanceTimesListSelectionForm") {
				var year = $("#attendanceTimesListSelectYear").val();
				if (year != "" && (year >= 1900 && year <= 2999)) {
					$("#attendanceTimesGenerateList").fadeIn(200);
				}
			}

		} else {
			if (id == "#feeListSelectionForm") {
				$("#feeGenerateList").fadeOut(200);
			} else if (id == "#attendanceStudentsListSelectionForm") {
				$("#attendanceStudentsGenerateList").fadeOut(200);
			}
		}

		if (page === "attendance" && (selection != "role" && selection != "gender")) {
			var year = $("#attendanceStaffListSelectYear").val();
			if (year != "" && (year >= 1900 && year <= 2999)) {
				$("#attendanceStaffGenerateList").fadeIn(200);
			}
		} else {
			$("#attendanceStaffGenerateList").fadeOut(200);
		}

	});

	// Hide and Show different searching inputs on list tabs.
	$(".search-method").on("change", function () {

		var selection = $(this).val();
		var id = $(this).attr("id");

		var page = id.split(/(?=[A-Z])/)[0];
		var middle = "";

		if (page === "attendance") {
			tab = id.split(/(?=[A-Z])/)[2];
			middle = id.split(/(?=[A-Z])/)[1];
			id = "#" + page + "" + middle + tab + "SearchForm";
		} else {
			var tab = id.split(/(?=[A-Z])/)[1];
			id = "#" + page + tab + "SearchForm";
		}

		if (page === "student") {
			$(id + " select").not(":first").fadeOut(200);
			$(id + " input:not([type=submit]").fadeOut(200);
			$(id + " label").not(":first").fadeOut(200);
		} else if (page === "fee") {
			$(id + " select").not(":first").not(":last").fadeOut(200);
			$(id + " input:not([type=submit]").not(":last").fadeOut(200);
			$(id + " label").not(":first").not(":last").not(":last").fadeOut(200);
		} else if (page === "attendance") {

			if (id.includes("Periods")) {
				$(id + " select").not(":first").not(":last").not(":last").fadeOut(200);
				$(id + " input:not([type=submit]").not(":last").fadeOut(200);
				$(id + " label").not(":first").not(":last").not(":last").not(":last").fadeOut(200);
			}
			else {
				$(id + " select").not(":first").not(":last").fadeOut(200);
				$(id + " input:not([type=submit]").not(":last").fadeOut(200);
				$(id + " label").not(":first").not(":last").not(":last").fadeOut(200);
			}
			
		} else if (page === "messaging") {
			if ($(this).attr("id").includes("SMS")) {
				id = "#" + page + "SMSSearchForm";
				page = page + "SMS";
			} else {
				id = "#" + page + "EmailSearchForm";
				page = page + "Email";
			}

			$(id + " select").not(":first").not(":last").fadeOut(200);
			$(id + " input:not([type=submit]").fadeOut(200);
			$(id + " label").not(":first").not(":last").fadeOut(200);
		}

		if (selection == "registration") {
			$(id + " input[name=registration], " + id + " label[for=" + page + middle + tab + "SearchRegistrationNumber]").fadeIn(200);
		} else if (selection == "student") {
			$(id + " input[name=student], " + id + " label[for=" + page + middle + tab + "SearchStudent]").fadeIn(200);
		} else if (selection == "father") {
			$(id + " input[name=father], " + id + " label[for=" + page + middle + tab + "SearchFather]").fadeIn(200);
		}
	});

	// A new image is loaded for the picture, show a preview.
	$("#studentAddPicture").on("change", function () {

		var img = $("#studentAddImage")[0];
		var file = $("#studentAddPicture")[0].files[0];
		var imageType = /^image\//;

		if (imageType.test(file.type) && file.size <= 2000000) {

			var fileType = file.type.toString().split("/")[1];

			var reader = new FileReader();
			reader.onload = (function () {
				return function (e) {
					$("#studentAddImage").attr("src", e.target.result);
					$("#studentAddPictureData").val(e.target.result);
				};
			})();
			reader.readAsDataURL(file);
		} else if (imageType.test(file.type) && file.size > 2000000) {
			$("#messageBox span").html("The Selected File Is Larger than 2MBs.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
			$("#studentAddPicture")[0].files[0] = undefined;
		} else {
			$("#messageBox span").html("The Selected File Is Not An Image.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
			$("#studentAddPicture")[0].files[0] = undefined;
		}

	});

	// A new image is loaded for the picture, show a preview.
	$("#studentEditPicture").on("change", function () {

		var img = $("#studentEditImage")[0];
		var file = $("#studentEditPicture")[0].files[0];
		var imageType = /^image\//;

		if (imageType.test(file.type) && file.size <= 2000000) {

			var fileType = file.type.toString().split("/")[1];

			var reader = new FileReader();
			reader.onload = (function () {
				return function (e) {
					$("#studentEditImage").attr("src", e.target.result);
					$("#studentEditPictureData").val(e.target.result);
				};
			})();
			reader.readAsDataURL(file);

		} else if (imageType.test(file.type) && file.size > 2000000) {

			$("#messageBox span").html("The Selected File Is Larger than 2MBs.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
			$("#studentAddPicture")[0].files[0] = undefined;

		} else {

			$("#messageBox span").html("The Selected File Is Not An Image.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
			$("#studentEditPicture")[0].files[0] = undefined;

		}

	});

	// Hide the Hint for Student's Father, Mother or Guardian.
	$(".student-hint").on("click", ".student-hint-close", function () {
		var id = $(this).attr("id");
		id = id.substring(0, id.length - 5);
		$("#" + id).fadeOut(200);
	});

	$(".student-hint").on("keypress", ".student-hint-close", function (e) {
		if (e.which === 13) {
			var id = $(this).attr("id");
			id = id.substring(0, id.length - 5);
			$("#" + id).fadeOut(200);
		}
	});

	// Functions to show the warning modal if user tries changing the Registration Number on edit or add student tabs.
	var shownEdit = false;
	$("#studentEditRegistrationNumber").on("focus", function () {
		if (!shownEdit) {
			$("#studentIDWarningBG").fadeIn(200);
			$("#studentIDWarningButton").focus();
			shownEdit = true;
		}
	});

	// When Class is 99, Section can only be null.
	$("#studentAddClass").on("change", function () {
		if ($(this).val() === "99") {
			$("#studentAddSection").prop("disabled", true);
		} else {
			$("#studentAddSection").prop("disabled", false);
		}
	});
	$("#studentEditClass").on("change", function () {
		if ($(this).val() === "99") {
			$("#studentEditSection").prop("disabled", true);
		} else {
			$("#studentEditSection").prop("disabled", false);
		}
	});

	// Stop Form elements from being tabbed into focus while modal is displayed.
	$("#studentIDWarningBG").keydown(function (e) {
		if (e.which == 9) {
			e.preventDefault();
		}
	});

	// Hide the warning modal when the OK Button is clicked.
	$("#studentIDWarningButton").on("click", function () {
		if (shownEdit) {
			$("#studentIDWarningBG").fadeOut(200);
			$("#studentEditRegistrationNumber").focus();
			shownEdit = false;
		}
	});

	// Dsicard modal if No is pressed.
	$(".warning-no").on("click", function () {
		var id = $(this).attr("id");

		id = id.substring(0, id.length - 2) + "BG";
		$("#" + id).fadeOut(200);
	});

	// Handle tab when modal is shown.
	$(".warning-modal-bg").keydown(function (e) {
		var id = $(this).attr("id");

		id = id.substring(0, id.length - 2);
		if (e.which == 9) {
			e.preventDefault();
			if ($(document.activeElement).attr("id") == id + "No") {
				$("#" + id + "Yes").focus();
			} else {
				$("#" + id + "No").focus();
			}
		}
	});

	// Show or Hide the Generate Tab for Fees When Year value changes.
	$("#feeListSelectYear").on("change", function () {
		var year = $("#feeListSelectYear").val();
		$("#feeGenerateList").fadeOut(200);
		if ((year != "" && (year >= 1900 && year <= 2999)) &&
			($("#feeListSelectionMethod").val() == "class") &&
			($("#feeListSelectClass").val() != 99)) {

			$("#feeGenerateList").fadeIn(200);

		}
	});

	$("#feeListSelectClass").on("change", function () {
		var year = $("#feeListSelectYear").val();
		$("#feeGenerateList").fadeOut(200);
		if ((year != "" && (year >= 1900 && year <= 2999)) &&
			($("#feeListSelectionMethod").val() == "class") &&
			($("#feeListSelectClass").val() != 99)) {

			$("#feeGenerateList").fadeIn(200);

		}
	});

	// Show the Generate Attendance List Button if the year is valid, keep it hidden otherwise.
	$("#attendanceStudentsListSelectYear").on("change", function () {

		var year = $("#attendanceStudentsListSelectYear").val();
		if (year != "" && (year >= 1900 && year <= 2999)) {
			if ($("#attendanceStudentsListSelectionMethod").val() == "class" || $("#attendanceStudentsListSelectionMethod").val() == "classAndSection") {
				$("#attendanceStudentsGenerateList").fadeIn(200);
			} else {
				$("#attendanceStudentsGenerateList").fadeOut(200);
			}
		} else {
			$("#attendanceStudentsGenerateList").fadeOut(200);
		}

	});

	$("#attendanceStaffListSelectYear").on("change", function () {
		var year = $("#attendanceStaffListSelectYear").val();

		if (year != "" && (year >= 1900 && year <= 2999)) {
			if ($("#attendanceStaffListSelectionMethod").val() != "role" && $("#attendanceStaffListSelectionMethod").val() != "gender") {
				$("#attendanceStaffGenerateList").fadeIn(200);
			}
		} else {
			$("#attendanceStaffGenerateList").fadeOut(200);
		}
	});

	$("#attendancePeriodsListSelectYear").on("change", function () {
		var year = $("#attendancePeriodsListSelectYear").val();

		if (year != "" && (year >= 1900 && year <= 2999)) {
			if ($("#attendancePeriodsListSelectionMethod").val() != "role" && $("#attendancePeriodsListSelectionMethod").val() != "gender") {
				$("#attendancePeriodsGenerateList").fadeIn(200);
			}
		} else {
			$("#attendancePeriodsGenerateList").fadeOut(200);
		}
	});

	$("#attendanceTimesListSelectYear").on("change", function () {
		var year = $("#attendanceTimesListSelectYear").val();

		if (year != "" && (year >= 1900 && year <= 2999)) {
			if ($("#attendanceTimesListSelectionMethod").val() != "role" && $("#attendanceTimesListSelectionMethod").val() != "gender") {
				$("#attendanceTimesGenerateList").fadeIn(200);
			}
		} else {
			$("#attendanceTimesGenerateList").fadeOut(200);
		}
	});

	// Attendance Select Elements, Change All values in the given column.
	$("#attendanceStudentsTab thead").on("change", " tr:first-child th", function () {
		var index = $("#attendanceStudentsTab thead tr:first-child th").index($(this)) + 5;
		var bodyColumns = $("#attendanceStudentsTab tbody tr");
		for (var i = 0; i < bodyColumns.length; i++) {

			var currSelect = $("#attendanceStudentsTab tbody tr").eq(i).children("td").eq(index).children("select");
			if (currSelect.prop("disabled") === false) {
				currSelect.val($(this).children("select").val());
				currSelect.change();
			}

		}
	});

	$("#attendanceStaffTab thead").on("change", " tr:first-child th", function () {
		var index = $("#attendanceStaffTab thead tr:first-child th").index($(this)) + 3;
		var bodyColumns = $("#attendanceStaffTab tbody tr");
		for (var i = 0; i < bodyColumns.length; i++) {

			var currSelect = $("#attendanceStaffTab tbody tr").eq(i).children("td").eq(index).children("select");
			if (currSelect.prop("disabled") === false) {
				currSelect.val($(this).children("select").val());
				currSelect.change();
			}

		}
	});

	$("#attendancePeriodsTab thead").on("change", " tr:first-child th", function () {
		var index = $("#attendancePeriodsTab thead tr:first-child th").index($(this)) + 3;
		var bodyColumns = $("#attendancePeriodsTab tbody tr");
		for (var i = 0; i < bodyColumns.length; i++) {

			var currSelect = $("#attendancePeriodsTab tbody tr").eq(i).children("td").eq(index).children("select");
			if (currSelect.prop("disabled") === false) {
				currSelect.val($(this).children("select").val());
				currSelect.change();
			}

		}
	});

	// Color the background of the column based on attendance value.
	$("#attendanceStudentsTab tbody").on("change", "select", function () {
		if ($(this).val() === "null") {
			$(this).parent("td").removeClass("present absent").addClass("leave");
		} else if ($(this).val() === "true") {
			$(this).parent("td").removeClass("leave absent").addClass("present");
		} else if ($(this).val() === "false") {
			$(this).parent("td").removeClass("leave present").addClass("absent");
		}
	});

	$("#attendanceStaffTab tbody").on("change", "select", function () {
		if ($(this).val() === "null") {
			$(this).parent("td").removeClass("present absent").addClass("leave");
		} else if ($(this).val() === "true") {
			$(this).parent("td").removeClass("leave absent").addClass("present");
		} else if ($(this).val() === "false") {
			$(this).parent("td").removeClass("leave present").addClass("absent");
		}
	});

	$("#attendancePeriodsTab tbody").on("change", "select", function () {
		if ($(this).val() === "null") {
			$(this).parent("td").removeClass("present absent").addClass("leave");
		} else if ($(this).val() === "true") {
			$(this).parent("td").removeClass("leave absent").addClass("present");
		} else if ($(this).val() === "false") {
			$(this).parent("td").removeClass("leave present").addClass("absent");
		}
	});

	// Change the tab focus to change vertically.
	$("#attendanceStudentsTab").on("keydown", "th", function (e) {
		if (e.which === 9) {
			e.preventDefault();

			var index = $("#attendanceStudentsTab thead tr:first-child th").index($(this)) + 5;
			var bodyColumns = $("#attendanceStudentsTab tbody tr");

			if (bodyColumns.length === 0) {
				if (index - 5 === $("#attendanceStudentsTab thead tr:last-child").index()) {
					$(this).children("select").blur();
				}
				$("#attendanceStudentsTab thead tr:first-child th").eq(index - 4).children("select").focus();
			} else {
				if ($("#attendanceStudentsTab tbody tr:first-child").children("td").eq(index).children("select").prop("disabled")) {
					if (index - 5 === $("#attendanceStudentsTab thead tr:last-child").index()) {
						$(this).children("select").blur();
					}
					$("#attendanceStudentsTab thead tr:first-child th").eq(index - 4).children("select").focus();
				} else {
					$("#attendanceStudentsTab tbody tr:first-child").children("td").eq(index).children("select").focus();
				}
			}

		}
	});

	$("#attendanceStudentsTab").on("keydown", "td", function (e) {
		if (e.which === 9) {
			e.preventDefault();

			var rowIndex = $("#attendanceStudentsTab tbody tr").index($(this).parent("tr"));
			var columnIndex = $("#attendanceStudentsTab tbody tr").eq(rowIndex).children("td").index($(this));
			var lastRow = $("#attendanceStudentsTab tbody tr").last().index();
			var lastColumn = $("#attendanceStudentsTab tbody tr").children("td").last().last().index() - 1;

			if (lastRow === rowIndex) {
				if (lastColumn === columnIndex) {
					$(this).children("select").blur();
				} else {
					$("#attendanceStudentsTab thead tr").first().children("th").eq(columnIndex - 4).children("select").focus();
				}
			} else {
				$("#attendanceStudentsTab tbody tr").eq(rowIndex + 1).children("td").eq(columnIndex).children("select").focus();
			}

		}
	});

	$("#attendanceStaffTab").on("keydown", "th", function (e) {
		if (e.which === 9) {
			e.preventDefault();

			var index = $("#attendanceStaffTab thead tr:first-child th").index($(this)) + 3;
			var bodyColumns = $("#attendanceStaffTab tbody tr");

			if (bodyColumns.length === 0) {
				if (index - 3 === $("#attendanceStaffTab thead tr:last-child").index()) {
					$(this).children("select").blur();
				}
				$("#attendanceStaffTab thead tr:first-child th").eq(index - 2).children("select").focus();
			} else {
				if ($("#attendanceStaffTab tbody tr:first-child").children("td").eq(index).children("select").prop("disabled")) {
					if (index - 3 === $("#attendanceStaffTab thead tr:last-child").index()) {
						$(this).children("select").blur();
					}
					$("#attendanceStaffTab thead tr:first-child th").eq(index - 2).children("select").focus();
				} else {
					$("#attendanceStaffTab tbody tr:first-child").children("td").eq(index).children("select").focus();
				}
			}

		}
	});

	$("#attendanceStaffTab").on("keydown", "td", function (e) {
		if (e.which === 9) {
			e.preventDefault();

			var rowIndex = $("#attendanceStaffTab tbody tr").index($(this).parent("tr"));
			var columnIndex = $("#attendanceStaffTab tbody tr").eq(rowIndex).children("td").index($(this));
			var lastRow = $("#attendanceStaffTab tbody tr").last().index();
			var lastColumn = $("#attendanceStaffTab tbody tr").children("td").last().last().index() - 1;

			if (lastRow === rowIndex) {
				if (lastColumn === columnIndex) {
					$(this).children("select").blur();
				} else {
					$("#attendanceStaffTab thead tr").first().children("th").eq(columnIndex - 2).children("select").focus();
				}
			} else {
				$("#attendanceStaffTab tbody tr").eq(rowIndex + 1).children("td").eq(columnIndex).children("select").focus();
			}

		}
	});

	$("#attendancePeriodsTab").on("keydown", "th", function (e) {
		if (e.which === 9) {
			e.preventDefault();

			var index = $("#attendancePeriodsTab thead tr:first-child th").index($(this)) + 3;
			var bodyColumns = $("#attendancePeriodsTab tbody tr");

			if (bodyColumns.length === 0) {
				if (index - 3 === $("#attendancePeriodsTab thead tr:last-child").index()) {
					$(this).children("select").blur();
				}
				$("#attendancePeriodsTab thead tr:first-child th").eq(index - 2).children("select").focus();
			} else {
				if ($("#attendancePeriodsTab tbody tr:first-child").children("td").eq(index).children("select").prop("disabled")) {
					if (index - 3 === $("#attendancePeriodsTab thead tr:last-child").index()) {
						$(this).children("select").blur();
					}
					$("#attendancePeriodsTab thead tr:first-child th").eq(index - 2).children("select").focus();
				} else {
					$("#attendancePeriodsTab tbody tr:first-child").children("td").eq(index).children("select").focus();
				}
			}

		}
	});

	$("#attendancePeriodsTab").on("keydown", "td", function (e) {
		if (e.which === 9) {
			e.preventDefault();

			var rowIndex = $("#attendancePeriodsTab tbody tr").index($(this).parent("tr"));
			var columnIndex = $("#attendancePeriodsTab tbody tr").eq(rowIndex).children("td").index($(this));
			var lastRow = $("#attendancePeriodsTab tbody tr").last().index();
			var lastColumn = $("#attendancePeriodsTab tbody tr").children("td").last().last().index() - 1;

			if (lastRow === rowIndex) {
				if (lastColumn === columnIndex) {
					$(this).children("select").blur();
				} else {
					$("#attendancePeriodsTab thead tr").first().children("th").eq(columnIndex - 2).children("select").focus();
				}
			} else {
				$("#attendancePeriodsTab tbody tr").eq(rowIndex + 1).children("td").eq(columnIndex).children("select").focus();
			}

		}
	});

	$("#attendanceTimesTab").on("keydown", "td", function (e) {
		if (e.which === 9) {
			e.preventDefault();

			var rowIndex = $("#attendanceTimesTab tbody tr").index($(this).parent("tr"));
			var columnIndex = $("#attendanceTimesTab tbody tr").eq(rowIndex).children("td").index($(this));
			var lastRow = $("#attendanceTimesTab tbody tr").last().index();
			var lastColumn = $("#attendanceTimesTab tbody tr").children("td").last().last().index() - 1;

			if (lastRow === rowIndex) {
				if (lastColumn === columnIndex) {
					$(this).children("select").blur();
				} else {
					$("#attendanceTimesTab thead tr").first().children("th").eq(columnIndex - 2).children("select").focus();
				}
			} else {
				$("#attendanceTimesTab tbody tr").eq(rowIndex + 1).children("td").eq(columnIndex).children("select").focus();
			}

		}
	});

	// Lets the appropriate month of days on the attendance add tab, greys out extra days as well as sundays.
	$("#attendanceAddStudentsMonth").change();
	$("#attendanceAddStaffMonth").change();
	$("#attendanceAddPeriodsMonth").change();
	$("#attendanceAddTimesMonth").change();

	$("#attendanceAddStudentsYear").on("change", function () {

		$("#attendanceStudentsAddTab form select:gt(2)").prop("disabled", true).removeClass("leave present absent");
		$("#submitAddStudentsAttendance").prop("disabled", true);

		var year = $("#attendanceAddStudentsYear").val();
		var month = $("#attendanceAddStudentsMonth").val();

		if (year != "" && (year >= 1900 && year <= 2999)) {

			var monthDays = new Date(year, month, 0).getDate();

			for (var i = 1; i <= monthDays; i++) {
				var columnName = "attendanceAddStudentsDay" + i;

				$("#" + columnName).prop("disabled", false).change();
			}
			$("#submitAddStudentsAttendance").prop("disabled", false);

		}
	});

	$("#attendanceAddStudentsMonth").on("change", function () {

		$("#attendanceStudentsAddTab form select:gt(2)").prop("disabled", true).removeClass("leave present absent");
		$("#submitAddStudentsAttendance").prop("disabled", true);

		var year = $("#attendanceAddStudentsYear").val();
		var month = $("#attendanceAddStudentsMonth").val();

		if (year != "" && (year >= 1900 && year <= 2999)) {

			var monthDays = new Date(year, month, 0).getDate();
			for (var i = 1; i <= monthDays; i++) {
				var columnName = "attendanceAddStudentsDay" + i;

				$("#" + columnName).prop("disabled", false).change();
			}
			$("#submitAddStudentsAttendance").prop("disabled", false);

		}
	});

	$("#attendanceAddStaffYear").on("change", function () {

		$("#attendanceStaffAddTab form select:gt(2)").prop("disabled", true).removeClass("leave present absent");
		$("#submitAddStaffAttendance").prop("disabled", true);

		var year = $("#attendanceAddStaffYear").val();
		var month = $("#attendanceAddStaffMonth").val();

		if (year != "" && (year >= 1900 && year <= 2999)) {

			var monthDays = new Date(year, month, 0).getDate();
			for (var i = 1; i <= monthDays; i++) {
				var columnName = "attendanceAddStaffDay" + i;

				$("#" + columnName).prop("disabled", false).change();
			}
			$("#submitAddStaffAttendance").prop("disabled", false);

		}
	});

	$("#attendanceAddStaffMonth").on("change", function () {

		$("#attendanceStaffAddTab form select:gt(2)").prop("disabled", true).removeClass("leave present absent");
		$("#submitAddStaffAttendance").prop("disabled", true);

		var year = $("#attendanceAddStaffYear").val();
		var month = $("#attendanceAddStaffMonth").val();

		if (year != "" && (year >= 1900 && year <= 2999)) {

			var monthDays = new Date(year, month, 0).getDate();
			for (var i = 1; i <= monthDays; i++) {
				var columnName = "attendanceAddStaffDay" + i;

				$("#" + columnName).prop("disabled", false).change();
			}
			$("#submitAddStaffAttendance").prop("disabled", false);

		}
	});

	$("#attendancePeriodsListSearchYear").on("change", function () {

		var year = $("#attendancePeriodsListSearchYear").val();
		var month = $("#attendancePeriodsListSearchMonth").val();

		$(`#attendancePeriodsListSearchDay option`).prop("disabled", true);
		if (year != "" && (year >= 1900 && year <= 2999)) {

			var monthDays = new Date(year, month, 0).getDate();
			for (var i = 0; i < monthDays; i++) {
				
				$(`#attendancePeriodsListSearchDay option[value='${i+1}']`).prop("disabled", false);

			}

		}

	});

	$("#attendancePeriodsListSearchMonth").on("change", function () {

		var year = $("#attendancePeriodsListSearchYear").val();
		var month = $("#attendancePeriodsListSearchMonth").val();

		$(`#attendancePeriodsListSearchDay option`).prop("disabled", true);
		if (year != "" && (year >= 1900 && year <= 2999)) {

			var monthDays = new Date(year, month, 0).getDate();
			for (var i = 0; i < monthDays; i++) {
				
				$(`#attendancePeriodsListSearchDay option[value='${i+1}']`).prop("disabled", false);

			}

		}
		
	});

	$("#attendancePeriodsListSelectYear").on("change", function () {

		var year = $("#attendancePeriodsListSelectYear").val();
		var month = $("#attendancePeriodsListSelectMonth").val();

		$(`#attendancePeriodsListSelectDay option`).prop("disabled", true);
		if (year != "" && (year >= 1900 && year <= 2999)) {

			var monthDays = new Date(year, month, 0).getDate();
			for (var i = 0; i < monthDays; i++) {
				
				$(`#attendancePeriodsListSelectDay option[value='${i+1}']`).prop("disabled", false);

			}

		}

	});

	$("#attendancePeriodsListSelectMonth").on("change", function () {

		var year = $("#attendancePeriodsListSelectYear").val();
		var month = $("#attendancePeriodsListSelectMonth").val();

		$(`#attendancePeriodsListSelectDay option`).prop("disabled", true);
		if (year != "" && (year >= 1900 && year <= 2999)) {

			var monthDays = new Date(year, month, 0).getDate();
			for (var i = 0; i < monthDays; i++) {
				
				$(`#attendancePeriodsListSelectDay option[value='${i+1}']`).prop("disabled", false);

			}

		}
		
	});

	$("#attendancePeriodsPrintSelectYear").on("change", function () {

		var year = $("#attendancePeriodsPrintSelectYear").val();
		var month = $("#attendancePeriodsPrintSelectMonth").val();

		$(`#attendancePeriodsPrintSelectDay option`).prop("disabled", true);
		if (year != "" && (year >= 1900 && year <= 2999)) {

			var monthDays = new Date(year, month, 0).getDate();
			for (var i = 0; i < monthDays; i++) {
				
				$(`#attendancePeriodsPrintSelectDay option[value='${i+1}']`).prop("disabled", false);

			}

		}

	});

	$("#attendancePeriodsPrintSelectMonth").on("change", function () {

		var year = $("#attendancePeriodsPrintSelectYear").val();
		var month = $("#attendancePeriodsPrintSelectMonth").val();

		$(`#attendancePeriodsPrintSelectDay option`).prop("disabled", true);
		if (year != "" && (year >= 1900 && year <= 2999)) {

			var monthDays = new Date(year, month, 0).getDate();
			for (var i = 0; i < monthDays; i++) {
				
				$(`#attendancePeriodsPrintSelectDay option[value='${i+1}']`).prop("disabled", false);

			}

		}
		
	});

	$("#attendancePeriodsAddYear").on("change", function () {

		$("#submitAddAttendancePeriods").prop("disabled", true);

		var year = $("#attendancePeriodsAddYear").val();
		var month = $("#attendancePeriodsAddMonth").val();

		$(`#attendancePeriodsAddDay option`).prop("disabled", true);
		if (year != "" && (year >= 1900 && year <= 2999)) {

			var monthDays = new Date(year, month, 0).getDate();
			for (var i = 0; i < monthDays; i++) {
				
				$(`#attendancePeriodsAddDay option[value='${i+1}']`).prop("disabled", false);

			}
			$("#submitAddAttendancePeriods").prop("disabled", false);

		}
	});

	$("#attendancePeriodsAddMonth").on("change", function () {

		$("#submitAddAttendancePeriods").prop("disabled", true);

		var year = $("#attendancePeriodsAddYear").val();
		var month = $("#attendancePeriodsAddMonth").val();

		$(`#attendancePeriodsAddDay option`).prop("disabled", true);
		if (year != "" && (year >= 1900 && year <= 2999)) {

			var monthDays = new Date(year, month, 0).getDate();
			for (var i = 0; i < monthDays; i++) {
				
				$(`#attendancePeriodsAddDay option[value='${i+1}']`).prop("disabled", false);

			}
			$("#submitAddAttendancePeriods").prop("disabled", false);

		}
	});

	$("#attendanceAddTimesYear").on("change", function () {

		$("#attendanceTimesAddTab form input:gt(2)").prop("disabled", true);
		$("#submitAddTimesAttendance").prop("disabled", true);

		var year = $("#attendanceAddTimesYear").val();
		var month = $("#attendanceAddTimesMonth").val();

		if (year != "" && (year >= 1900 && year <= 2999)) {

			var monthDays = new Date(year, month, 0).getDate();
			for (var i = 1; i <= monthDays; i++) {
				var columnName = "attendanceAddTimesDay" + i;

				$("#" + columnName + "Entry").prop("disabled", false).change();
				$("#" + columnName + "Exit").prop("disabled", false).change();
			}
			$("#submitAddTimesAttendance").prop("disabled", false);

		}
	});

	$("#attendanceAddTimesMonth").on("change", function () {

		$("#attendanceTimesAddTab form input:gt(2)").prop("disabled", true);
		$("#submitAddTimesAttendance").prop("disabled", true);

		var year = $("#attendanceAddTimesYear").val();
		var month = $("#attendanceAddTimesMonth").val();

		if (year != "" && (year >= 1900 && year <= 2999)) {

			var monthDays = new Date(year, month, 0).getDate();
			for (var i = 1; i <= monthDays; i++) {
				var columnName = "attendanceAddTimesDay" + i;

				$("#" + columnName + "Entry").prop("disabled", false).change();
				$("#" + columnName + "Exit").prop("disabled", false).change();
			}
			$("#submitAddTimesAttendance").prop("disabled", false);

		}
	});

	// Color the background of the select element based on attendance value.
	$("#attendanceStudentsAddTab").on("change", "select", function () {
		if ($(this).val() === "null") {
			$(this).removeClass("present absent").addClass("leave");
		} else if ($(this).val() === "true") {
			$(this).removeClass("leave absent").addClass("present");
		} else if ($(this).val() === "false") {
			$(this).removeClass("leave present").addClass("absent");
		}
	});

	$("#attendanceStaffAddTab").on("change", "select", function () {
		if ($(this).val() === "null") {
			$(this).removeClass("present absent").addClass("leave");
		} else if ($(this).val() === "true") {
			$(this).removeClass("leave absent").addClass("present");
		} else if ($(this).val() === "false") {
			$(this).removeClass("leave present").addClass("absent");
		}
	});

	$("#attendancePeriodsAddTab").on("change", "select", function () {
		if ($(this).val() === "null") {
			$(this).removeClass("present absent").addClass("leave");
		} else if ($(this).val() === "true") {
			$(this).removeClass("leave absent").addClass("present");
		} else if ($(this).val() === "false") {
			$(this).removeClass("leave present").addClass("absent");
		}
	});

	$("#attendanceTimesAddTab").on("change", "select", function () {
		if ($(this).val() === "null") {
			$(this).removeClass("present absent").addClass("leave");
		} else if ($(this).val() === "true") {
			$(this).removeClass("leave absent").addClass("present");
		} else if ($(this).val() === "false") {
			$(this).removeClass("leave present").addClass("absent");
		}
	});

	// Enables Change Attendance Button If There are attendance records, disables otherwise.
	$("#attendanceStudentsTab tbody").on("change", function () {
		if ($("#attendanceStudentsTab tbody").html() != "") {
			$("#attendanceStudentsUpdateList").prop("disabled", false);
		} else {
			$("#attendanceStudentsUpdateList").prop("disabled", true);
		}
	});
	if ($("#attendanceStudentsTab tbody").html() != "") {
		$("#attendanceStudentsUpdateList").prop("disabled", false);
	} else {
		$("#attendancStudentsUpdateList").prop("disabled", true);
	}

	$("#attendanceStaffTab tbody").on("change", function () {
		if ($("#attendanceStaffTab tbody").html() != "") {
			$("#attendanceStaffUpdateList").prop("disabled", false);
		} else {
			$("#attendanceStaffUpdateList").prop("disabled", true);
		}
	});
	if ($("#attendanceStaffTab tbody").html() != "") {
		$("#attendanceStaffUpdateList").prop("disabled", false);
	} else {
		$("#attendanceStaffUpdateList").prop("disabled", true);
	}

	$("#attendancePeriodsTab tbody").on("change", function () {
		if ($("#attendancePeriodsTab tbody").html() != "") {
			$("#attendancePeriodsUpdateList").prop("disabled", false);
		} else {
			$("#attendancePeriodsUpdateList").prop("disabled", true);
		}
	});
	if ($("#attendancePeriodsTab tbody").html() != "") {
		$("#attendancePeriodsUpdateList").prop("disabled", false);
	} else {
		$("#attendancePeriodsUpdateList").prop("disabled", true);
	}

	$("#attendanceTimesTab tbody").on("change", function () {
		if ($("#attendanceTimesTab tbody").html() != "") {
			$("#attendanceTimesUpdateList").prop("disabled", false);
		} else {
			$("#attendanceTimesUpdateList").prop("disabled", true);
		}
	});
	if ($("#attendanceTimesTab tbody").html() != "") {
		$("#attendanceTimesUpdateList").prop("disabled", false);
	} else {
		$("#attendanceTimesUpdateList").prop("disabled", true);
	}

	// Show or Hide the Generate Button for Payroll when the selection method changes.
	// based on if there is a year and if the selection method is "-Select Method-" 
	$("#payrollListSelectionMethod").on("change", function () {

		var year = $("#payrollListSelectYear").val();
		var selectionMethod = $("#payrollListSelectionMethod").val();

		if (year != "" && (year >= 1900 && year <= 2999) && selectionMethod === "-Select Method-") {
			$("#payrollGenerateList").fadeIn(200);
		} else {
			$("#payrollGenerateList").fadeOut(200);
		}
	});

	// Shows the Subject Field in the Select Payroll Form if Staff Role is set to Teacher, Hides otherwise.
	$("#payrollListSelectRole").on("change", function () {
		if ($(this).val() == "teacher") {
			$("label[for=payrollListSelectSubject]").fadeIn(200);
			$("#payrollListSelectSubject").fadeIn(200);
		} else {
			$("label[for=payrollListSelectSubject]").fadeOut(200);
			$("#payrollListSelectSubject").fadeOut(200);
		}
	});

	// Show or Hide the Generate Button for Payroll When Year value changes.
	// based on if there is a year and if the selection method is "-Select Method-" 
	$("#payrollListSelectYear").on("change", function () {
		var year = $("#payrollListSelectYear").val();
		var selectionMethod = $("#payrollListSelectionMethod").val();

		if (year != "" && (year >= 1900 && year <= 2999) && selectionMethod === "-Select Method-") {
			$("#payrollGenerateList").fadeIn(200);
		} else {
			$("#payrollGenerateList").fadeOut(200);
		}
	});

	var year = $("#payrollListSelectYear").val();
	if (year != "" && (year >= 1900 && year <= 2999)) {
		$("#payrollGenerateList").fadeIn(200);
	} else {
		$("#payrollGenerateList").fadeOut(200);
	}

	// Shows the Subject Field in the Select Payroll Print Form if Staff Role is set to Teacher, Hides otherwise.
	$("#payrollPrintSelectRole").on("change", function () {
		if ($(this).val() == "teacher") {
			$("label[for=payrollPrintSelectSubject]").fadeIn(200);
			$("#payrollPrintSelectSubject").fadeIn(200);
		} else {
			$("label[for=payrollPrintSelectSubject]").fadeOut(200);
			$("#payrollPrintSelectSubject").fadeOut(200);
		}
	});

	// Shows the Subject Field in the Select Staff Form if Staff Role is set to Teacher, Hides otherwise.
	$("#staffListSelectRole").on("change", function () {
		if ($(this).val() == "teacher") {
			$("label[for=staffListSelectSubject]").fadeIn(200);
			$("#staffListSelectSubject").fadeIn(200);
		} else {
			$("label[for=staffListSelectSubject]").fadeOut(200);
			$("#staffListSelectSubject").fadeOut(200);
		}
	});

	// Shows the Subjects Select in the Add Staff Form if Staff Role is set to Teacher, Hides otherwise.
	$("#staffAddRole").on("change", function () {
		if ($(this).val() == "teacher") {
			$("#staffAddTeacher").fadeIn(200);
		} else {
			$("#staffAddTeacher").fadeOut(200);
		}
	});

	// Shows the Subjects Select in the Edit Staff Form if Staff Role is set to Teacher, Hides otherwise.
	$("#staffEditRole").on("change", function () {
		if ($(this).val() == "teacher") {
			$("#staffEditTeacher").fadeIn(200);
		} else {
			$("#staffEditTeacher").fadeOut(200);
		}
	});

	$("#staffPrintSelectRole").on("change", function () {
		if ($(this).val() == "teacher") {
			$("label[for=staffPrintSelectSubject]").fadeIn(200);
			$("#staffPrintSelectSubject").fadeIn(200);
		} else {
			$("label[for=staffPrintSelectSubject]").fadeOut(200);
			$("#staffPrintSelectSubject").fadeOut(200);
		}
	});

	// Expand the Messages for Reminder that is clicked.
	$(".reminders-list-tab tbody").on("click", "tr", function () {
		if ($(this).children("td:nth-child(2)").css("overflow") === "hidden") {
			$(this).children("td:nth-child(2)").css({
				"white-space": "normal",
				"overflow": "visible"
			});
		} else {
			$(this).children("td:nth-child(2)").css({
				"white-space": "nowrap",
				"overflow": "hidden"
			});
		}

	});

	// Show and Hide the appropriate selection inputs when the selection method changes.
	$("#logsSelectionMethod").on("change", function () {

		var selection = $(this).val();

		$("#logsSelectionForm input:lt(3)").fadeOut(200).prop("disabled", true);
		$("#logsSelectionForm label:lt(4)").not(":first").fadeOut(200);


		if (selection === "id") {
			$("#logsSelectID").fadeIn(200).prop("disabled", false);
			$("label[for=logsSelectID]").fadeIn(200);
		} else if (selection === "username") {
			$("#logsSelectUsername").fadeIn(200).prop("disabled", false);
			$("label[for=logsSelectUsername]").fadeIn(200);
		}
	});

	$("#logsSelectionDateMethod").on("change", function () {

		var selection = $(this).val();

		$("#logsSelectionForm input:gt(1)").not(":last").fadeOut(200).prop("disabled", true);
		$("#logsSelectionForm label").slice(3, 6).fadeOut(200);

		if (selection === "date") {
			$("#logsSelectDateFrom").fadeIn(200).prop("disabled", false);
			$("label[for=logsSelectDateFrom]").fadeIn(200).html("Date");
		} else if (selection === "date_range") {
			$("#logsSelectDateFrom").fadeIn(200).prop("disabled", false);
			$("label[for=logsSelectDateFrom]").fadeIn(200).html("Date From");
			$("#logsSelectDateTo").fadeIn(200).prop("disabled", false);
			$("label[for=logsSelectDateTo]").fadeIn(200);
		}
	});

	// When The Action Option for the Log Selection Form Changes, show the appropriate options for that Target.
	$("#logsSelectAction").on("change", function () {

		var val = $(this).val();

		$("#logsSelectTarget option").removeAttr("disabled");

		if (val === "Add") {
			$("#logsSelectTarget option[value=Class]").attr("disabled", "disabled");
			$("#logsSelectTarget option[value=Database]").attr("disabled", "disabled");
		} else if (val === "Edit") {
			$("#logsSelectTarget option[value=Database]").attr("disabled", "disabled");
		} else if (val === "Delete") {
			$("#logsSelectTarget option[value=General_Fee]").attr("disabled", "disabled");
			$("#logsSelectTarget option[value=Class]").attr("disabled", "disabled");
			$("#logsSelectTarget option[value=Database]").attr("disabled", "disabled");
		} else if (val === "Generate") {
			$("#logsSelectTarget option").not("[value=Fee]").not("[value=Attendance]").attr("disabled", "disabled");
		}

	});

	// Show or Hide the Print Sections in the Print Tabs of Pages.
	$(".print-section-header").on("click", function () {
		var id = $(this).attr("id");
		var sectionId = id.substring(0, id.indexOf("Header"));
		var header = $(this);

		$("#" + sectionId).slideToggle(300, function () {

			if ($("#" + sectionId).css("display") !== "none") {

				// Change the Arrow With Fade Animation.
				header.fadeTo(100, 0.8, function() {
					header.css("background-image", 'url("Images/up-arrow.png")');
				}).fadeTo(200, 1);
	
			} else {
		
				// Change the Arrow With Fade Animation.
				header.fadeTo(200, 0.8, function() {
					header.css("background-image", 'url("Images/down-arrow.png")');
				}).fadeTo(200, 1);
	
			}

		});

	});

	// Show or Hide the Settings Sections.
	$(".settings-section-header").on("click", function () {
		var id = $(this).attr("id");
		var sectionId = id.substring(0, id.indexOf("Header"));
		var header = $(this);

		$("#" + sectionId).slideToggle(1000, function () {

			if ($("#" + sectionId).css("display") !== "none") {

				// Change the Arrow With Fade Animation.
				header.fadeTo(200, 0.8, function() {
					header.css("background-image", 'url("Images/up-arrow.png")');
				}).fadeTo(200, 1);
	
			} else {
		
				// Change the Arrow With Fade Animation.
				header.fadeTo(200, 0.8, function() {
					header.css("background-image", 'url("Images/down-arrow.png")');
				}).fadeTo(200, 1);
	
			}

		});

	});

	// Adds a new Range to the leave edit settings.
	var dateRange = 1;
	$("#editLeavesDateRangeAdd").on("click", function () {
		var html = '<label for="editLeavesDateRangeAddFrom' + dateRange + '">From</label>' +
			'<input type="text" name="date_from_' + dateRange + '" id="editLeavesDateRangeAddFrom' + dateRange + '" placeholder="DD/MM/YYYY" title="Enter a valid date in the form DD/MM/YYYY"' +
			'pattern="^(?:(?:31(\\/)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\\1|(?:(?:29|30)(\\/)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/)(?:0?2|(?:Feb))\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$"' +
			'required />';
		html += '<label for="editLeavesDateRangeAddTo' + dateRange + '">To</label>' +
			'<input type="text" name="date_to_' + dateRange + '" id="editLeavesDateRangeAddTo' + dateRange + '" placeholder="DD/MM/YYYY" title="Enter a valid date in the form DD/MM/YYYY"' +
			'pattern="^(?:(?:31(\\/)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\\1|(?:(?:29|30)(\\/)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/)(?:0?2|(?:Feb))\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$"' +
			'required />'

		if (dateRange === 1) {
			$("#editLeavesDateRangeRemove").css("display", "inline-block");
		}
		dateRange++;

		$("#editLeavesDateRangesSection").append(html);
	});

	$("#editLeavesDateRangeRemove").on("click", function () {
		$("label[for=editLeavesDateRangeAddFrom" + (dateRange - 1) + "]").replaceWith("");
		$("#editLeavesDateRangeAddFrom" + (dateRange - 1)).replaceWith("");

		$("label[for=editLeavesDateRangeAddTo" + (dateRange - 1) + "]").replaceWith("");
		$("#editLeavesDateRangeAddTo" + (dateRange - 1)).replaceWith("");

		dateRange--;
		if (dateRange === 1) {
			$("#editLeavesDateRangeRemove").css("display", "none");
		}
	});

	// Adds a new Date to the leaves edit settings.
	var date = 1;
	$("#editLeavesDateAdd").on("click", function () {
		var html = '<label for="editLeavesDateAddDate' + date + '">Date</label>' +
			'<input type="text" name="date_' + date + '" id="editLeavesDateAddDate' + date + '" placeholder="DD/MM/YYYY" title="Enter a valid date in the form DD/MM/YYYY"' +
			'pattern="^(?:(?:31(\\/)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\\1|(?:(?:29|30)(\\/)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/)(?:0?2|(?:Feb))\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$"' +
			'required />';

		if (date === 1) {
			$("#editLeavesDateRemove").css("display", "inline-block");
		}
		date++;

		$("#editLeavesDatesSection").append(html);
	});

	$("#editLeavesDateRemove").on("click", function () {
		$("label[for=editLeavesDateAddDate" + (date - 1) + "]").replaceWith("");
		$("#editLeavesDateAddDate" + (date - 1)).replaceWith("");

		date--;
		if (date === 1) {
			$("#editLeavesDateRemove").css("display", "none");
		}
	});

	// Enable the break time and place input elements if the break checkbox is pressed, disable otherwise.
	$("#halftime_break_checkbox").on("change", function () {
		if ($(this).prop("checked")) {
			$("#editPeriodsHalftimeBreakPlace").prop("disabled", false);
			$("#editPeriodsHalftimeBreakStartTime").prop("disabled", false);
			$("#editPeriodsHalftimeBreakEndTime").prop("disabled", false);
		} else {
			$("#editPeriodsHalftimeBreakPlace").prop("disabled", true);
			$("#editPeriodsHalftimeBreakStartTime").prop("disabled", true);
			$("#editPeriodsHalftimeBreakEndTime").prop("disabled", true);
		}
	});

	// Hide or Show the Messaging menu
	$(".messaging-menu-title").on("click", function () {

		if ($(this).siblings(":first").css("display") === "none") {
			$("#messagingSMSDomainFrom").val("none");
			$(this).siblings(":first").fadeIn(200);
			$(this).children("img").attr("src", "Images/up-arrow.png");
		} else {
			$(this).siblings().fadeOut(200);
			$(this).children("img").attr("src", "Images/down-arrow.png");
		}
	});

	// Show the Teacher Search Forms or Student Based on Domain Choice.
	$("#messagingSMSDomainFrom").on("change", function () {
		var value = $(this).val();

		$("#messagingSMSDomainSubmit").fadeOut(300, function() {
			$(this).css("display", "none");
		}).prop("disabled", true);

		$("#messagingSMSMenu div:not(:first-of-type)").fadeOut(300, function() {
			$(this).css("display", "none");
		});

		if (value === "all") {
			$("#messagingSMSDomainSubmit").fadeIn(300, function() {
				$(this).css("display", "inline-block");
			}).prop("disabled", false);
		} else if (value === "students") {
			$("#messagingSMSSearchDiv").fadeIn(300);
			$("#messagingSMSSelectDiv").fadeIn(300);
		} else if (value === "staff") {
			$("#messagingSMSStaffSearchDiv").fadeIn(300);
			$("#messagingstaffSMSSelectDiv").fadeIn(300);
		}

	});

	// Add the current number to the sending list.
	$("#sendSMSMessageTo").on("keydown", function (e) {

		if (e.which === 13) {
			e.preventDefault();

			var value = $(this).val().trim();

			if (value !== "") {
				var number = '<span class="message-number"><span class="message-number-value">' + value + '</span><span class="message-number-close">x</span></span>';

				$("#sendSMSMessageNumbers").append(number);
			}

		}
	});

	// Removes the number when its close span is pressed.
	$("#sendSMSMessageNumbers").on("click", ".message-number-close", function () {
		$(this).parent().replaceWith("");
	});

	// Show the Teacher Search Forms or Student Based on Domain Choice.
	$("#messagingEmailDomainFrom").on("change", function () {
		var value = $(this).val();

		$("#messagingEmailDomainSubmit").fadeOut(300).prop("disabled", true);

		$("#messagingEmailMenu div:not(:first-of-type)").fadeOut(300);

		if (value === "all") {
			$("#messagingEmailDomainSubmit").fadeIn(300, function() {
				$(this).css("display", "inline-block");
			}).prop("disabled", false);
		} else if (value === "students") {
			$("#messagingEmailSearchDiv").fadeIn(300);
			$("#messagingEmailSelectDiv").fadeIn(300);
		} else if (value === "staff") {
			$("#messagingEmailStaffSearchDiv").fadeIn(300);
			$("#messagingstaffEmailSelectDiv").fadeIn(300);
		}

	});

	// Add the current email to the sending list.
	$("#sendEmailMessageTo").on("keydown", function (e) {

		if (e.which === 13) {
			e.preventDefault();

			$(this).css("border", "1px solid #006633");

			var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
			var value = $(this).val().trim();
			var valid = $.trim(value).match(pattern) ? true : false;

			if (value !== "" && valid) {
				var number = '<span class="message-email"><span class="message-email-value">' + value + '</span><span class="message-email-close">x</span></span>';

				$("#sendEmailMessageEmails").append(number);
			} else {
				$(this).css("border", "2px solid #661200");
			}

		}
	});

	// Removes the number when its close span is pressed.
	$("#sendEmailMessageEmails").on("click", ".message-email-close", function () {
		$(this).parent().replaceWith("");
	});

	$("#editSessionNumberTerms").on("change", function () {

		if ($(this).val() === "3") {
			$("label[for=editSessionTerm4Start]").css("display", "none");
			$("#editSessionTerm4Start").css("display", "none");
			$("label[for=editSessionTerm4End]").css("display", "none");
			$("#editSessionTerm4End").css("display", "none");
			$("label[for=editSessionTerm4Weight]").css("display", "none");
			$("#editSessionTerm4Weight").css("display", "none");
			$("label[for=editSessionTerm5Start]").css("display", "none");
			$("#editSessionTerm5Start").css("display", "none");
			$("label[for=editSessionTerm5End]").css("display", "none");
			$("#editSessionTerm5End").css("display", "none");
			$("label[for=editSessionTerm5Weight]").css("display", "none");
			$("#editSessionTerm5Weight").css("display", "none");
			$("label[for=editSessionTerm6Start]").css("display", "none");
			$("#editSessionTerm6Start").css("display", "none");
			$("label[for=editSessionTerm6End]").css("display", "none");
			$("#editSessionTerm6End").css("display", "none");
			$("label[for=editSessionTerm6Weight]").css("display", "none");
			$("#editSessionTerm6Weight").css("display", "none");
		} else {
			$("label[for=editSessionTerm4Start]").css("display", "inline-block");
			$("#editSessionTerm4Start").css("display", "inline-block");
			$("label[for=editSessionTerm4End]").css("display", "inline-block");
			$("#editSessionTerm4End").css("display", "inline-block");
			$("label[for=editSessionTerm4Weight]").css("display", "inline-block");
			$("#editSessionTerm4Weight").css("display", "inline-block");
			$("label[for=editSessionTerm5Start]").css("display", "inline-block");
			$("#editSessionTerm5Start").css("display", "inline-block");
			$("label[for=editSessionTerm5End]").css("display", "inline-block");
			$("#editSessionTerm5End").css("display", "inline-block");
			$("label[for=editSessionTerm5Weight]").css("display", "inline-block");
			$("#editSessionTerm5Weight").css("display", "inline-block");
			$("label[for=editSessionTerm6Start]").css("display", "inline-block");
			$("#editSessionTerm6Start").css("display", "inline-block");
			$("label[for=editSessionTerm6End]").css("display", "inline-block");
			$("#editSessionTerm6End").css("display", "inline-block");
			$("label[for=editSessionTerm6Weight]").css("display", "inline-block");
			$("#editSessionTerm6Weight").css("display", "inline-block");
		}

	});

	// A new image is loaded for the school big colored logo, show a preview.
	$("#settingsLogoBigPicture").on("change", function () {

		var img = $("#settingsLogoBigImage")[0];
		var file = $("#settingsLogoBigPicture")[0].files[0];
		var imageType = /^image\//;

		if (imageType.test(file.type) && file.size <= 2000000) {

			var fileType = file.type.toString().split("/")[1];

			var reader = new FileReader();
			reader.onload = (function () {
				return function (e) {
					$("#settingsLogoBigImage").attr("src", e.target.result);
					$("#settingsLogoBigData").val(e.target.result);
				};
			})();
			reader.readAsDataURL(file);

		} else if (imageType.test(file.type) && file.size > 2000000) {

			$("#messageBox span").html("The Selected File Is Larger than 2MBs.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
			$("#settingsLogoBigPicture")[0].files[0] = undefined;

		} else {

			$("#messageBox span").html("The Selected File Is Not An Image.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
			$("#settingsLogoBigPicture")[0].files[0] = undefined;

		}

	});

	// A new image is loaded for the school big black&white logo, show a preview.
	$("#settingsLogoBigBWPicture").on("change", function () {

		var img = $("#settingsLogoBigBWImage")[0];
		var file = $("#settingsLogoBigBWPicture")[0].files[0];
		var imageType = /^image\//;

		if (imageType.test(file.type) && file.size <= 2000000) {

			var fileType = file.type.toString().split("/")[1];

			var reader = new FileReader();
			reader.onload = (function () {
				return function (e) {
					$("#settingsLogoBigBWImage").attr("src", e.target.result);
					$("#settingsLogoBigBWData").val(e.target.result);
				};
			})();
			reader.readAsDataURL(file);

		} else if (imageType.test(file.type) && file.size > 2000000) {

			$("#messageBox span").html("The Selected File Is Larger than 2MBs.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
			$("#settingsLogoBigBWPicture")[0].files[0] = undefined;

		} else {

			$("#messageBox span").html("The Selected File Is Not An Image.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
			$("#settingsLogoBigBWPicture")[0].files[0] = undefined;

		}

	});

	// A new image is loaded for the school horizontal colored logo, show a preview.
	$("#settingsLogoHorizontalPicture").on("change", function () {

		var img = $("#settingsLogoHorizontalImage")[0];
		var file = $("#settingsLogoHorizontalPicture")[0].files[0];
		var imageType = /^image\//;

		if (imageType.test(file.type) && file.size <= 2000000) {

			var fileType = file.type.toString().split("/")[1];

			var reader = new FileReader();
			reader.onload = (function () {
				return function (e) {
					$("#settingsLogoHorizontalImage").attr("src", e.target.result);
					$("#settingsLogoHorizontalData").val(e.target.result);
				};
			})();
			reader.readAsDataURL(file);

		} else if (imageType.test(file.type) && file.size > 2000000) {

			$("#messageBox span").html("The Selected File Is Larger than 2MBs.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
			$("#settingsLogoHorizontalPicture")[0].files[0] = undefined;

		} else {

			$("#messageBox span").html("The Selected File Is Not An Image.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
			$("#settingsLogoHorizontalPicture")[0].files[0] = undefined;

		}

	});

	// A new image is loaded for the school horizontal black&white logo, show a preview.
	$("#settingsLogoHorizontalBWPicture").on("change", function () {

		var img = $("#settingsLogoHorizontalBWImage")[0];
		var file = $("#settingsLogoHorizontalBWPicture")[0].files[0];
		var imageType = /^image\//;

		if (imageType.test(file.type) && file.size <= 2000000) {

			var fileType = file.type.toString().split("/")[1];

			var reader = new FileReader();
			reader.onload = (function () {
				return function (e) {
					$("#settingsLogoHorizontalBWImage").attr("src", e.target.result);
					$("#settingsLogoHorizontalBWData").val(e.target.result);
				};
			})();
			reader.readAsDataURL(file);

		} else if (imageType.test(file.type) && file.size > 2000000) {

			$("#messageBox span").html("The Selected File Is Larger than 2MBs.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
			$("#settingsLogoHorizontalBWPicture")[0].files[0] = undefined;

		} else {

			$("#messageBox span").html("The Selected File Is Not An Image.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
			$("#settingsLogoHorizontalBWPicture")[0].files[0] = undefined;

		}

	});

	// A new location is set for the export file.

	// A new file is loaded for importing.
	$("#settingsImportData").on("change", function () {

		var img = $("#settingsImportData")[0];
		var file = $("#settingsImportData")[0].files[0];
		var fileName = file.name;
		var fileType = file.type.toString();

		var isExcel = (fileType.includes("spreadsheet"));

		if (isExcel && file.size <= 2000000) {

			var fileType = fileType.split("/")[1];

			var reader = new FileReader();
			reader.onload = (function () {
				return function (e) {
					$("#settingsImportFileName").html(fileName);
					$("#settingsImportDataSource").val(e.target.result);
				};
			})();
			reader.readAsDataURL(file);

		} else if (isExcel && file.size > 2000000) {

			$("#messageBox span").html("The Selected File Is Larger than 2MBs.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
			$("#settingsImportData")[0].files[0] = undefined;

		} else {

			$("#messageBox span").html("The Selected File Is Not A CSV or Excel File.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
			$("#settingsImportData")[0].files[0] = undefined;

		}

	});

	// Shows the Teacher Select Option in Add User Screen When the Role is set to teacher.
	$("#usersAddRole").on("change", function () {

		var role = $(this).val();

		if (role === "Teacher") {
			$("label[for=usersAddTeacher]").fadeIn(200, function() {
				$(this).css("display", "inline-block");
				$(this).removeAttr("hidden");
			});
			$("#usersAddTeacher").fadeIn(200, function() {
				$(this).css("display", "inline-block");
				$(this).removeAttr("hidden");
			});
		} else {
			$("label[for=usersAddTeacher]").fadeOut(200, function() {
				$(this).attr("hidden", "");
			});
			$("#usersAddTeacher").fadeOut(200, function() {
				$(this).attr("hidden", "");
			});
		}

	});

	// Shows the Teacher Select Option in Edit User Screen When the Role is set to teacher.
	$("#usersEditRole").on("change", function () {

		var role = $(this).val();

		if (role === "Teacher") {
			$("label[for=usersEditTeacher]").fadeIn(200, function() {
				$(this).css("display", "inline-block");
			})
			$("#usersEditTeacher").fadeIn(200);
		} else {
			$("label[for=usersEditTeacher]").fadeOut(200);
			$("#usersEditTeacher").fadeOut(200);
		}

	});


	/* -----------------------
			PRINTING
	----------------------- */
	// Gets the print data by the given criteria, opens it in new tab.

	// Student List, Details, and Admission/Withdrawal Printing
	$("#studentPrintList, #studentPrintDetails, #studentPrintAD").click(function (e) {
		e.preventDefault();

		var method = $(this).attr("id").substring(12);

		var formValues = $("form[name=studentPrintForm]").serialize() + "&method=" + method + "&request=" + "studentPrint";

		$("#loadingScreen").fadeIn(200);

		$.get("/", formValues, function (html) {

			$("#loadingScreen").fadeOut(200);

			// Show Error Message if not data found.
			if (html === "") {

				$("#messageBox span").html("No Student Data Found Matching the specified criteria.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			}
			// Open the Print Screen in a Pop up.
			else {

				var wnd = window.open("about:blank", "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no");
				wnd.document.write(html);
				wnd.document.close();

			}

		});
	});

	// Fee Slip Printing
	$("#feePrintSlips").click(function (e) {

		e.preventDefault();

		var formValues = $("form[name=feePrintForm]").serialize() + "&request=" + "feePrint";

		$("#loadingScreen").fadeIn(200);

		$.get("/", formValues, function (html) {

			$("#loadingScreen").fadeOut(200);

			// Show Error Message if not data found.
			if (html === "") {

				$("#messageBox span").html("No Fee Data Found Matching the specified criteria.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			}
			// Open the Print Screen in a Pop up.
			else {

				var wnd = window.open("about:blank", "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no");
				wnd.document.write(html);
				wnd.document.close();

			}

		});

	});

	// Student Attendance Printing
	$("#attendanceStudentsPrintList").click(function (e) {

		e.preventDefault();

		var formValues = $("form[name=attendanceStudentsPrintSelectionForm]").serialize() + "&request=" + "attendanceStudentsPrint";

		$("#loadingScreen").fadeIn(200);

		$.get("/", formValues, function (html) {

			$("#loadingScreen").fadeOut(200);

			// Show Error Message if not data found.
			if (html === "") {

				$("#messageBox span").html("No Attendance Data Found Matching the specified criteria.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			}
			// Show Error Message if User is Teacher.
			else if (html === "teacher") {

				$("#messageBox span").html("Problem Finding Attendance Records, Hint: Teachers Can Only Access Records For Classes They Are Incharge Of.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			}
			// Open the Print Screen in a Pop up.
			else {

				var wnd = window.open("about:blank", "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no");
				wnd.document.write(html);
				wnd.document.close();

			}

		});

	});

	// Staff Attendance Printing
	$("#attendanceStaffPrintList").click(function (e) {

		e.preventDefault();

		var formValues = $("form[name=attendanceStaffPrintSelectionForm]").serialize() + "&request=" + "attendanceStaffPrint";

		$("#loadingScreen").fadeIn(200);

		$.get("/", formValues, function (html) {

			$("#loadingScreen").fadeOut(200);

			// Show Error Message if not data found.
			if (html === "") {

				$("#messageBox span").html("No Attendance Data Found Matching the specified criteria.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			}
			// Open the Print Screen in a Pop up.
			else {

				var wnd = window.open("about:blank", "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no");
				wnd.document.write(html);
				wnd.document.close();

			}

		});

	});

	// Periods Attendance Printing
	$("#attendancePeriodsPrintList").click(function (e) {

		e.preventDefault();

		var formValues = $("form[name=attendancePeriodsPrintSelectionForm]").serialize() + "&request=" + "attendancePeriodsPrint";

		$("#loadingScreen").fadeIn(200);

		$.get("/", formValues, function (html) {

			$("#loadingScreen").fadeOut(200);

			// Show Error Message if not data found.
			if (html === "") {

				$("#messageBox span").html("No Period Attendance Data Found Matching the specified criteria.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			}
			// Open the Print Screen in a Pop up.
			else {

				var wnd = window.open("about:blank", "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no");
				wnd.document.write(html);
				wnd.document.close();

			}

		});

	});

	// Entry_Exit_Times Attendance Printing
	$("#attendanceTimesPrintList").click(function (e) {

		e.preventDefault();

		var formValues = $("form[name=attendanceTimesPrintSelectionForm]").serialize() + "&request=" + "attendanceTimesPrint";

		$("#loadingScreen").fadeIn(200);

		$.get("/", formValues, function (html) {

			$("#loadingScreen").fadeOut(200);

			// Show Error Message if not data found.
			if (html === "") {

				$("#messageBox span").html("No Time Attendance Data Found Matching the specified criteria.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			}
			// Open the Print Screen in a Pop up.
			else {

				var wnd = window.open("about:blank", "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no");
				wnd.document.write(html);
				wnd.document.close();

			}

		});

	});

	// Payroll Prinitng
	$("#payrollPrintList").click(function (e) {

		e.preventDefault();

		var formValues = $("form[name=payrollPrintSelectionForm]").serialize() + "&request=" + "payrollPrint";

		$("#loadingScreen").fadeIn(200);

		$.get("/", formValues, function (html) {

			$("#loadingScreen").fadeOut(200);

			// Show Error Message if not data found.
			if (html === "") {

				$("#messageBox span").html("No Payroll Data Found Matching the specified criteria.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			}
			// Open the Print Screen in a Pop up.
			else {

				var wnd = window.open("about:blank", "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no");
				wnd.document.write(html);
				wnd.document.close();

			}

		});

	});

	// Staff Prinitng
	$("#staffPrintList").click(function (e) {

		e.preventDefault();

		var formValues = $("form[name=staffPrintSelectionForm]").serialize() + "&request=" + "staffPrint";
		$("#loadingScreen").fadeIn(200);

		$.get("/", formValues, function (html) {

			$("#loadingScreen").fadeOut(200);

			// Show Error Message if not data found.
			if (html === "") {

				$("#messageBox span").html("No Staff Data Found Matching the specified criteria.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			}
			// Open the Print Screen in a Pop up.
			else {

				var wnd = window.open("about:blank", "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no");
				wnd.document.write(html);
				wnd.document.close();

			}

		});

	});

	// Time Table Printing
	$("#timeTableViewPrint").click(function (e) {

		e.preventDefault();

		var method = $("#timeTableViewSelectMethod").val();
		var day = $("#timeTableViewSelectDay").val();
		var teacher = $("#timeTableViewSelectTeacher").val();
		var teacherName = $("#timeTableViewSelectTeacher option[value=" + teacher + "]").text();
		var clas = $("#timeTableViewSelectClass").val();
		var section = $("#timeTableViewSelectSection").val();
		var methodBy = $("#timeTableViewSelectBy").val();

		if (method === "Class") {
			$("#loadingScreen").fadeIn(200);
			setTimeTableViewTableByClass("print", time_table, clas, section, leaveSunday, leaveFriday, leaveSaturday, methodBy, teachers);
		} else if (method === "Day") {
			$("#loadingScreen").fadeIn(200);
			setTimeTableViewTableByDay("print", time_table, students, day, methodBy, teachers);
		} else if (method === "Teacher") {
			$("#loadingScreen").fadeIn(200);
			setTimeTableViewTableByTeacher("print", time_table, students, teacher, teacherName, leaveSunday, leaveFriday, leaveSaturday, methodBy, teachers);
		}

	});

	// Time Table Printing
	$("#timeTableAbsentPrint").click(function (e) {

		e.preventDefault();

		var date = new Date();
		var day = date.getDate();
		var dayOfWeek = date.getDay();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();

		var methodBy = $("#timeTableAbsentSelectBy").val().trim();

		$("#loadingScreen").fadeIn(200);

		$.get("/", {
			request: "timeTableAbsences",
			month: month,
			year: year,
			date: date
		}, function (rows) {

			teacherAttendances = rows;

			if (teacherAttendances === "") {

				$("#messageBox span").html("There Was An Error With The Attendance Query. Try Again.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

				$("#loadingScreen").fadeOut(200);

			} else if (teacherAttendances === "leave") {

				$("#messageBox span").html("Today Is A Leave.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

				$("#loadingScreen").fadeOut(200);

			} else {

				setTimeTableAbsentPrint(time_table, students, teacherAttendances, dayOfWeek, methodBy, teachers, CSDetails, periods);

				$("#loadingScreen").fadeOut(200);

			}

		});



	});

	// Study Scheme Printing
	$("#studySchemeViewPrint").click(function (e) {

		e.preventDefault();

		var method = $("#studySchemeViewMethod").val().trim();
		var class_id = $("#studySchemeViewClass").val().trim();
		$("#loadingScreen").fadeIn(200);

		if (method === "weekly") {


			$.get("/", {
				request: "printStudySchemeWeeklyView",
				class_id: class_id
			}, function (html) {

				$("#loadingScreen").fadeOut(200);

				var wnd = window.open("about:blank", "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no");
				wnd.document.write(html);
				wnd.document.close();


			});

		} else if (method === "termwise") {

			$.get("/", {
				request: "printStudySchemeTermwiseView",
				class_id: class_id
			}, function (html) {

				$("#loadingScreen").fadeOut(200);

				var wnd = window.open("about:blank", "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no");
				wnd.document.write(html);
				wnd.document.close();

			});

		}

	});

	// Date Sheet Printing
	$("#dateSheetViewPrint").click(function (e) {

		e.preventDefault();

		var term = $("#dateSheetViewSelectTerm").val().trim();
		var by = $("#dateSheetViewSelectBy").val().trim();
		$("#loadingScreen").fadeIn(200);

		$.get("/", {
			request: "dateSheetPrint",
			term: term,
			by: by
		}, function (html) {

			$("#loadingScreen").fadeOut(200);

			if (html === "" || html == "null") {

				$("#messageBox span").html("Found no Date Sheet Data by Given Criteria.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			} else {

				var wnd = window.open("about:blank", "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no");
				wnd.document.write(html);
				wnd.document.close();

			}

		});

	});

	// Result Term List Printing
	$("#resultsViewPrint").click(function (e) {

		e.preventDefault();

		var formValues = $("form[name=resultsViewSelectionForm]").serialize() + "&request=" + "resultsTermPrint";
		$("#loadingScreen").fadeIn(200);

		$.get("/", formValues, function (html) {

			$("#loadingScreen").fadeOut(200);

			if (html === null || html == "") {

				$("#messageBox span").html("No Results Data Found by the Given Criteria.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			} else if (html === "teacher") {

				$("#messageBox span").html("No Results Data Found. Hint: Teachers Can Only Edit Results For Classes They Are Incharge Of.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			} else {
				
				var wnd = window.open("about:blank", "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no");
				wnd.document.write(html);
				wnd.document.close();

			}

		});

	});

	// Result Term DMC Printing
	$("#resultsViewPrintDMC").click(function (e) {

		e.preventDefault();

		var formValues = $("form[name=resultsViewSelectionForm]").serialize() + "&request=" + "resultsTermPrintDMC";

		$("#loadingScreen").fadeIn(200);

		$.get("/", formValues, function (html) {

			if (html === null || html == "") {

				$("#messageBox span").html("No Results Data Found by the Given Criteria.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			} else if (html === "teacher") {

				$("#messageBox span").html("No Results Data Found. Hint: Teachers Can Only Edit Results For Classes They Are Incharge Of.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			} else {

				$("#loadingScreen").fadeOut(200);
				var wnd = window.open("about:blank", "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no");
				wnd.document.write(html);
				wnd.document.close();

			}

		});

	});

	// Result Final Printing
	$("#resultsViewFinalPrint").click(function (e) {

		e.preventDefault();

		var formValues = $("form[name=resultsViewFinalSelectionForm]").serialize() + "&request=" + "resultsFinalPrint";
		$("#loadingScreen").fadeIn(200);

		$.get("/", formValues, function (html) {

			$("#loadingScreen").fadeOut(200);

			if (html === null || html == "") {

				$("#messageBox span").html("No Results Data Found by the Given Criteria.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			} else {

				var wnd = window.open("about:blank", "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no");
				wnd.document.write(html);
				wnd.document.close();

			}

		});

	});

	// Result Final Printing
	$("#resultsViewFinalPrintDMC").click(function (e) {

		e.preventDefault();

		var formValues = $("form[name=resultsViewFinalSelectionForm]").serialize() + "&request=" + "resultsFinalPrintDMC";
		$("#loadingScreen").fadeIn(200);

		$.get("/", formValues, function (html) {

			$("#loadingScreen").fadeOut(200);

			if (html === null || html == "") {

				$("#messageBox span").html("No Results Data Found by the Given Criteria.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			} else {

				var wnd = window.open("about:blank", "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no");
				wnd.document.write(html);
				wnd.document.close();

			}

		});

	});

	/* -----------------------
			NEW SESSION
	----------------------- */
	// Gets the Student Results and suggests the students to promote.
	$("#setupNewSessionButton").click(function () {

		$.get("/", {
			request: "setupNewSession"
		}, function (results) {

			if (results == "month") {
				$("#messageBox span").html("This Is Not The Last Month Of The Session.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			} else if (results === "year") {
				$("#messageBox span").html("The New Session Has Already Been Generated.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			} else if (results === "") {
				$("#messageBox span").html("Failed To Load Table Data. There Was An Error.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			} else {
				$("#newSessionStudentsTable tbody").html(results);
				$("#newSessionStudentsPromotionForm").fadeIn(200);
			}

		});

	});

	// Sets the staying checkbox to disabled and check if a second year student is being promoted, since he will leave the school/college.
	$("#newSessionStudentsTable").on("change", ".promoted-check", function () {

		var row = $(this).parents("tr");

		if (this.checked && row.children("td:nth-child(6)").html().trim() == "Second Year") {
			row.children("td:nth-child(4)").children(".staying-check").prop("disabled", true).prop("checked", false);
			row.children("td:nth-child(4)").children(".staying-check").change();
		} else if (!this.checked && row.children("td:nth-child(6)").html().trim() == "Second Year") {
			row.children("td:nth-child(4)").children(".staying-check").prop("disabled", false);
			row.children("td:nth-child(4)").children(".staying-check").change();
		}
	});

	// Sets the staying checkbox to disabled and check if a second year student is being promoted, since he will leave the school/college.
	$("#newSessionStudentsTable").on("change", ".staying-check", function () {

		var row = $(this).parents("tr");

		if (!this.checked) {
			row.children("td:nth-child(5)").children("input").prop("disabled", false);
		} else {
			row.children("td:nth-child(5)").children("input").prop("disabled", true);
		}
	});

	// Promote the Students, and Delete Study Scheme and Schedule Events if asked.
	$("form[name=newSessionStudentsPromotionForm]").submit(function (e) {

		e.preventDefault();

		$("#newSessionWarningBG").fadeIn(200);
		$("#newSessionWarningNo").focus();

	});
	$("#newSessionWarningYes").click(function () {

		var formValues = $("form[name=newSessionStudentsPromotionForm]").serialize() + "&request=" + "newSessionPromoteStudents";

		$("#loadingScreen").fadeIn(200);
		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	/* 	----------------------
	 		GET Requests.
		 --------------------- */

	// Get Student Details.
	var studentId;

	$("tbody").on("click", ".student-list-link", function () {

		var id = $(this).attr("id").toString();
		studentId = id.substring(id.indexOf('[') + 1, id.indexOf(']'));

		if (id.includes("studentDetails")) {

			$.get("/", {
				request: "studentDetails",
				id: studentId
			}, function (details) {

				$("#studentDetailsTab h2").html(details.Name);

				if (!(details.Image === "")) {
					$("#studentDetailsImage").attr("src", "data:image/png;base64," + details.Image);
				} else {
					$("#studentEditImage").attr("src", "Images/student-default.png");
				}

				$("#studentDetailsID").html(details.ID);
				$("#studentDetailsRegistrationNumber").html(details.Registration_Number);
				$("#studentDetailsName").html(details.Name);
				$("#studentDetailsClass").html(details.Class.Name);
				$("#studentDetailsSection").html(details.Section.Name);
				$("#studentDetailsGender").html(details.Gender);
				if (details.Admission_date != null) {
					$("#studentDetailsAdmissionDate").html(new Date(details.Admission_Date).getDate() + "/" + (new Date(details.Admission_Date).getMonth() + 1) + "/" + new Date(details.Admission_Date).getFullYear());
				}
				if (details.Date_Of_Birth != null) {
					$("#studentDetailsDateOfBirth").html(new Date(details.Date_Of_Birth).getDate() + "/" + (new Date(details.Date_Of_Birth).getMonth() + 1) + "/" + new Date(details.Date_Of_Birth).getFullYear());
				}
				$("#studentDetailsPhoneNumber").html(details.Phone_Number);
				$("#studentDetailsEmail").html(details.Email);
				$("#studentDetailsAddress").html(details.Address);
				$("#studentDetailsFeeConcession").html(details.Fee_Concession);
				if (details.Withdrawal_Date != null) {
					$("#studentDetailsWithdrawalDate").html(new Date(details.Withdrawal_Date).getDate() + "/" + (new Date(details.Withdrawal_Date).getMonth() + 1) + "/" + new Date(details.Withdrawal_Date).getFullYear());
				}
				$("#studentDetailsLastPassedClass").html(details.Last_Passed_Class);

				$("#studentDetailsFatherID").html(details.Father.ID);
				$("#studentDetailsFatherName").html(details.Father.Name);
				$("#studentDetailsFatherNIC").html(details.Father.NIC);
				$("#studentDetailsFatherQualification").html(details.Father.Qualification);
				$("#studentDetailsFatherField").html(details.Father.Field);
				$("#studentDetailsFatherIncome").html(details.Father.Income);
				$("#studentDetailsFatherEmail").html(details.Father.Email);
				$("#studentDetailsFatherOfficePhone").html(details.Father.Office_Phone);
				$("#studentDetailsFatherMobilePhone").html(details.Father.Mobile_Phone);

				$("#studentDetailsMotherID").html(details.Mother.ID);
				$("#studentDetailsMotherName").html(details.Mother.Name);
				$("#studentDetailsMotherNIC").html(details.Mother.NIC);
				$("#studentDetailsMotherQualification").html(details.Mother.Qualification);
				$("#studentDetailsMotherField").html(details.Mother.Field);
				$("#studentDetailsMotherIncome").html(details.Mother.Income);
				$("#studentDetailsMotherEmail").html(details.Mother.Email);
				$("#studentDetailsMotherHomePhone").html(details.Mother.Home_Phone);
				$("#studentDetailsMotherMobilePhone").html(details.Mother.Mobile_Phone);

				$("#studentDetailsGuardianID").html(details.Guardian.ID);
				$("#studentDetailsGuardianName").html(details.Guardian.Name);
				$("#studentDetailsGuardianNIC").html(details.Guardian.NIC);
				$("#studentDetailsGuardianQualification").html(details.Guardian.Qualification);
				$("#studentDetailsGuardianField").html(details.Guardian.Field);
				$("#studentDetailsGuardianIncome").html(details.Guardian.Income);
				$("#studentDetailsGuardianEmail").html(details.Guardian.Email);
				$("#studentDetailsGuardianOfficePhone").html(details.Guardian.Office_Phone);
				$("#studentDetailsGuardianMobilePhone").html(details.Guardian.Mobile_Phone);
				$("#studentDetailsGuardianRelation").html(details.Guardian.Relation);

			});

			$("#studentDetailsButton").click();

		} else if (id.includes("studentEdit")) {

			$.get("/", {
				request: "studentEdit",
				id: studentId
			}, function (details) {

				if (!(details.Image === "")) {
					$("#studentEditImage").attr("src", "data:image/png;base64," + details.Image);
				} else {
					$("#studentEditImage").attr("src", "Images/student-default.png");
				}

				$("#studentEditID").val(details.ID);
				$("#studentEditIDHidden").val(details.ID);
				$("#studentEditRegistrationNumber").val(details.Registration_Number);
				$("#studentEditName").val(details.Name);
				$("#studentEditClass option[value='" + details.Class_ID + "']").attr("selected", "selected");
				$("#studentEditSection option[value='" + details.Section_ID + "']").attr("selected", "selected");
				$("#studentEditGender option[value='" + details.Gender + "']").attr("selected", "selected");
				if (details.Admission_Date != null) {
					$("#studentEditAdmissionDate").val(new Date(details.Admission_Date).getDate() + "/" + (new Date(details.Admission_Date).getMonth() + 1) + "/" + new Date(details.Admission_Date).getFullYear());
				}
				if (details.Date_Of_Birth != null) {
					$("#studentEditDateOfBirth").val(new Date(details.Date_Of_Birth).getDate() + "/" + (new Date(details.Date_Of_Birth).getMonth() + 1) + "/" + new Date(details.Date_Of_Birth).getFullYear());
				}
				$("#studentEditPhoneNumber").val(details.Phone_Number);
				$("#studentEditEmail").val(details.Email);
				$("#studentEditAddress").val(details.Address);
				$("#studentEditFeeConcession").val(details.Fee_Concession);
				$("#studentEditAdmissionClass option[value='" + details.Admission_Class + "']").attr("selected", "selected");
				if (details.Withdrawal_Date != null) {
					$("#studentEditWithdrawalDate").val(new Date(details.Withdrawal_Date).getDate() + "/" + (new Date(details.Withdrawal_Date).getMonth() + 1) + "/" + new Date(details.Withdrawal_Date).getFullYear());
				}
				$("#studentEditWithdrawalClass option[value='" + details.Withdrawal_Class + "']").attr("selected", "selected");
				$("#studentEditFatherID").val(details.Father.ID);
				$("#studentEditFatherIDHidden").val(details.Father.ID);
				$("#studentEditFatherName").val(details.Father.Name);
				$("#studentEditFatherNIC").val(details.Father.NIC);
				$("#studentEditFatherQualification").val(details.Father.Qualification);
				$("#studentEditFatherField").val(details.Father.Field);
				$("#studentEditFatherIncome").val(details.Father.Income);
				$("#studentEditFatherEmail").val(details.Father.Email);
				$("#studentEditFatherOfficePhone").val(details.Father.Office_Phone);
				$("#studentEditFatherMobilePhone").val(details.Father.Mobile_Phone);

				$("#studentEditMotherID").val(details.Mother.ID);
				$("#studentEditMotherIDHidden").val(details.Mother.ID);
				$("#studentEditMotherName").val(details.Mother.Name);
				$("#studentEditMotherNIC").val(details.Mother.NIC);
				$("#studentEditMotherQualification").val(details.Mother.Qualification);
				$("#studentEditMotherField").val(details.Mother.Field);
				$("#studentEditMotherIncome").val(details.Mother.Income);
				$("#studentEditMotherEmail").val(details.Mother.Email);
				$("#studentEditMotherHomePhone").val(details.Mother.Home_Phone);
				$("#studentEditMotherMobilePhone").val(details.Mother.Mobile_Phone);

				if (details.Father.Name === details.Guardian.Name) {
					$("#guardian_checkbox_edit").prop("checked", true);
					$(".student-edit-guardian input:not(:first)").prop("disabled", true);
				}

				$("#studentEditGuardianID").val(details.Guardian.ID);
				$("#studentEditGuardianIDHidden").val(details.Guardian.ID);
				$("#studentEditGuardianName").val(details.Guardian.Name);
				$("#studentEditGuardianNIC").val(details.Guardian.NIC);
				$("#studentEditGuardianQualification").val(details.Guardian.Qualification);
				$("#studentEditGuardianField").val(details.Guardian.Field);
				$("#studentEditGuardianIncome").val(details.Guardian.Income);
				$("#studentEditGuardianEmail").val(details.Guardian.Email);
				$("#studentEditGuardianOfficePhone").val(details.Guardian.Office_Phone);
				$("#studentEditGuardianMobilePhone").val(details.Guardian.Mobile_Phone);
				$("#studentEditGuardianRelation").val(details.Guardian.Relation);

			});

			$("#studentEditButton").click();

		} else if (id.includes("studentDelete")) {

			$("#studentDeleteWarningBG").fadeIn(200);
			$("#studentDeleteWarningNo").focus();

		}
	});

	// Continue with deleting when Yes is pressed.
	$("#studentDeleteWarningYes").on("click", function () {

		$("#loadingScreen").fadeIn(200);
		$.post("/", {
			request: "studentDelete",
			id: studentId
		}, function (data) {

			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// Action Buttons on FEE List Page, Details, Edit and Delete.
	var feeId;

	$("tbody").on("click", ".fee-list-link", function () {

		var id = $(this).attr("id").toString();
		feeId = id.substring(id.indexOf('[') + 1, id.indexOf(']'));

		if (id.includes("feeDetails")) {

			$.get("/", {
				request: "feeDetails",
				id: feeId
			}, function (details) {

				$("#feeDetailsTab h2").html(details.Name);

				$("#feeDetailsID").html(details.ID);
				$("#feeDetailsRegistrationNumber").html(details.Student.Registration_Number);
				$("#feeDetailsName").html(details.Student.Name);
				$("#feeDetailsMonth").html(details.Month);
				$("#feeDetailsYear").html(details.Year);
				$("#feeDetailsBalance").html(details.Balance);
				$("#feeDetailsTuition").html(details.Tuition);
				$("#feeDetailsAdmission").html(details.Admission);
				$("#feeDetailsSecurity").html(details.Security);
				$("#feeDetailsComputerLab").html(details.Computer_Lab);
				$("#feeDetailsScienceLab").html(details.Science_Lab);
				$("#feeDetailsSports").html(details.Sports);
				$("#feeDetailsLibrary").html(details.Library);
				$("#feeDetailsExam").html(details.Exam);
				$("#feeDetailsAdditional").html(details.Additional);
				$("#feeDetailsFine").html(details.Fine);
				$("#feeDetailsLate").html(details.Late);
				$("#feeDetailsConcession").html(details.Concession);
				$("#feeDetailsSiblingConcession").html(details.Sibling_Concession);
				$("#feeDetailsPaid").html(details.Paid);

			});

			$("#feeDetailsButton").click();

		} else if (id.includes("feeEdit")) {

			$.get("/", {
				request: "feeEdit",
				id: feeId
			}, function (details) {

				var month = details.Month;
				var monthName = month == 1 ? "January" : (month == 2 ? "February" : (month == 3 ? "March" :
					(month == 4 ? "April" : (month == 5 ? "May" : (month == 6 ? "June" : (month == 7 ? "July" :
						(month == 8 ? "August" : (month == 9 ? "September" : (month == 10 ? "October" : (month == 11 ? "November" :
							(month == 12 ? "December" : "ERROR!")))))))))));

				$("#feeEditID").val(details.ID);
				$("#feeEditIDHidden").val(details.ID);
				$("#feeEditStudentRegistrationNumber").val(details.Student.Registration_Number);
				$("#feeEditStudentName").val(details.Student.Name);
				$("#feeEditMonth").val(monthName);
				$("#feeEditYear").val(details.Year);
				$("#feeEditYearHidden").val(details.Year);
				$("#feeEditClass").val(details.Class);
				$("#feeEditSection").val(details.Section);
				$("#feeEditBalance").val(details.Balance);
				$("#feeEditTuition").val(details.Tuition);
				$("#feeEditAdmission").val(details.Admission);
				$("#feeEditSecurity").val(details.Security);
				$("#feeEditComputerLab").val(details.Computer_Lab);
				$("#feeEditScienceLab").val(details.Science_Lab);
				$("#feeEditSports").val(details.Sports);
				$("#feeEditLibrary").val(details.Library);
				$("#feeEditExam").val(details.Exam);
				$("#feeEditFine").val(details.Fine);
				$("#feeEditLate").val(details.Late);
				$("#feeEditConcession").val(details.Concession);
				$("#feeEditSiblingConcession").val(details.Sibling_Concession);
				$("#feeEditPaid").val(details.Paid);

			});

			$("#feeEditButton").click();

		} else if (id.includes("feeDelete")) {
			$("#feeDeleteWarningBG").fadeIn(200);
			$("#feeDeleteWarningNo").focus();
		}
	});

	// Continue with deleting when Yes is pressed.
	$("#feeDeleteWarningYes").on("click", function () {

		$("#loadingScreen").fadeIn(200);
		$.post("/", {
			request: "feeDelete",
			id: feeId
		}, function (data) {

			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});
	});

	// Action Buttons on STUDENT ATTENDANCE List Page: The only available action is Delete.
	var attendanceStudentsId;

	$("tbody").on("click", ".attendance-student-list-link", function () {

		var id = $(this).attr("id").toString();
		attendanceStudentsId = id.substring(id.indexOf('[') + 1, id.indexOf(']'));

		if (id.includes("attendanceStudentsDelete")) {
			$("#attendanceStudentsDeleteWarningBG").fadeIn(200);
			$("#attendanceStudentsDeleteWarningNo").focus();
		}
	});

	// Continue with deleting when Yes is pressed.
	$("#attendanceStudentsDeleteWarningYes").on("click", function () {

		$("#loadingScreen").fadeIn(200);
		$.post("/", {
			request: "attendanceStudentsDelete",
			id: attendanceStudentsId
		}, function (data) {

			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});
	});

	// Action Buttons on STAFF ATTENDANCE List Page: The only available action is Delete.
	var attendanceStaffId;

	$("tbody").on("click", ".attendance-staff-list-link", function () {

		var id = $(this).attr("id").toString();
		attendanceStaffId = id.substring(id.indexOf('[') + 1, id.indexOf(']'));

		if (id.includes("attendanceStaffDelete")) {
			$("#attendanceStaffDeleteWarningBG").fadeIn(200);
			$("#attendanceStaffDeleteWarningNo").focus();
		}
	});

	// Continue with deleting when Yes is pressed.
	$("#attendanceStaffDeleteWarningYes").on("click", function () {

		$("#loadingScreen").fadeIn(200);
		$.post("/", {
			request: "attendanceStaffDelete",
			id: attendanceStaffId
		}, function (data) {

			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});
	});

	// Action Buttons on STUDENT PERIODS ATTENDANCE List Page: The only available action is Delete.
	var attendancePeriodsId;

	$("tbody").on("click", ".attendance-period-list-link", function () {

		var id = $(this).attr("id").toString();
		attendancePeriodsId = id.substring(id.indexOf('[') + 1, id.indexOf(']'));

		if (id.includes("attendancePeriodsDelete")) {
			$("#attendancePeriodsDeleteWarningBG").fadeIn(200);
			$("#attendancePeriodsDeleteWarningNo").focus();
		}
	});

	// Continue with deleting when Yes is pressed.
	$("#attendancePeriodsDeleteWarningYes").on("click", function () {

		$("#loadingScreen").fadeIn(200);
		$.post("/", {
			request: "attendancePeriodsDelete",
			id: attendancePeriodsId
		}, function (data) {

			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});
	});

	// Action Buttons on STUDENT ENTRY_EXIT_TIMES ATTENDANCE List Page: The only available action is Delete.
	var attendanceTimesId;

	$("tbody").on("click", ".attendance-time-list-link", function () {

		var id = $(this).attr("id").toString();
		attendanceTimesId = id.substring(id.indexOf('[') + 1, id.indexOf(']'));

		if (id.includes("attendanceTimesDelete")) {
			$("#attendanceTimesDeleteWarningBG").fadeIn(200);
			$("#attendanceTimesDeleteWarningNo").focus();
		}
	});

	// Continue with deleting when Yes is pressed.
	$("#attendanceTimesDeleteWarningYes").on("click", function () {

		$("#loadingScreen").fadeIn(200);
		$.post("/", {
			request: "attendanceTimesDelete",
			id: attendanceTimesId
		}, function (data) {

			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});
	});

	// Select Specific students.
	$("form[name=studentListSearchForm]").submit(function (e) {

		e.preventDefault();
		var method = $("#studentListSearchMethod").val().trim();
		var registration = $("#studentListSearchRegistrationNumber").val().trim();
		var father = $("#studentListSearchFather").val().trim();
		var student = $("#studentListSearchStudent").val().trim();

		$.get("/", {
			request: "studentSearch",
			method: method,
			registration: registration,
			father: father,
			student: student
		}, function (table) {
			$("#studentListTab tbody").html("");
			$("#studentListTab tbody").html(table);

		});
	});

	$("form[name=studentListSelectionForm]").submit(function (e) {

		e.preventDefault();
		var method = $("#studentListSelectionMethod").val().trim();
		var clas = $("#studentListSelectClass").val().trim();
		var section = $("#studentListSelectSection").val().trim();
		var gender = $("#studentListSelectGender").val().trim();
		var father = $("#studentListSelectFather").val().trim();

		$.get("/", {
			request: "studentSelect",
			method: method,
			class: clas,
			section: section,
			gender: gender,
			father: father
		}, function (table) {
			$("#studentListTab tbody").html("");
			$("#studentListTab tbody").html(table);

		});
	});

	// Select Specific Admission/Withdrawal Records.
	$("form[name=studentAwSearchForm]").submit(function (e) {

		e.preventDefault();
		var method = $("#studentAwSearchMethod").val().trim();
		var registration = $("#studentAwSearchRegistrationNumber").val().trim();
		var father = $("#studentAwSearchFather").val().trim();
		var student = $("#studentAwSearchStudent").val().trim();

		$.get("/", {
			request: "studentAwSearch",
			method: method,
			registration: registration,
			father: father,
			student: student
		}, function (table) {
			$("#studentAwTab tbody").html("");
			$("#studentAwTab tbody").html(table);

		});
	});

	$("form[name=studentAwSelectionForm]").submit(function (e) {

		e.preventDefault();
		var method = $("#studentAwSelectionMethod").val().trim();
		var clas = $("#studentAwSelectClass").val().trim();
		var section = $("#studentAwSelectSection").val().trim();
		var gender = $("#studentAwSelectGender").val().trim();
		var father = $("#studentAwSelectFather").val().trim();

		$.get("/", {
			request: "studentAwSelect",
			method: method,
			class: clas,
			section: section,
			gender: gender,
			father: father
		}, function (table) {
			$("#studentAwTab tbody").html("");
			$("#studentAwTab tbody").html(table);

		});
	});

	// Select Specific Fee Records.
	$("form[name=feeListSearchForm]").submit(function (e) {

		e.preventDefault();
		var method = $("#feeSearchMethod").val().trim();
		var registration = $("#feeSearchRegistrationNumber").val().trim();
		var father = $("#feeSearchFather").val().trim();
		var student = $("#feeSearchStudent").val().trim();
		var month = $("#feeSearchMonth").val().trim();
		var year = $("#feeSearchYear").val().trim();

		$.get("/", {
			request: "feeSearch",
			method: method,
			registration: registration,
			father: father,
			student: student,
			month: month,
			year: year
		}, function (table) {

			var monthName = month == 1 ? "January" : (month == 2 ? "February" : (month == 3 ? "March" :
				(month == 4 ? "April" : (month == 5 ? "May" : (month == 6 ? "June" : (month == 7 ? "July" :
					(month == 8 ? "August" : (month == 9 ? "September" : (month == 10 ? "October" : (month == 11 ? "November" :
						(month == 12 ? "December" : "ERROR!")))))))))));

			$("#feeListTab h1").html("Fee Records: " + monthName + ", " + year);

			if (table === "") {
				$("#messageBox span").html("Problem Finding Fees. Add General Fee for the Month to Generate Automatically.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
				table = "";
			} else if (table === "no result") {
				$("#messageBox span").html("Can not find any Students with the given properties.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
				table = "";
			}

			$("#feeListTab tbody").html("");
			$("#feeListTab tbody").html(table);

		});
	});

	$("form[name=feeListSelectionForm]").submit(function (e) {
		e.preventDefault();
		var method = $("#feeListSelectionMethod").val().trim();
		var clas = $("#feeListSelectClass").val().trim();
		var section = $("#feeListSelectSection").val().trim();
		var gender = $("#feeListSelectGender").val().trim();
		var father = $("#feeListSelectFather").val().trim();
		var month = $("#feeListSelectMonth").val().trim();
		var year = $("#feeListSelectYear").val().trim();

		$.get("/", {
			request: "feeSelect",
			method: method,
			class: clas,
			section: section,
			gender: gender,
			father: father,
			month: month,
			year: year
		}, function (table) {
			var monthName = month == 1 ? "January" : (month == 2 ? "February" : (month == 3 ? "March" :
				(month == 4 ? "April" : (month == 5 ? "May" : (month == 6 ? "June" : (month == 7 ? "July" :
					(month == 8 ? "August" : (month == 9 ? "September" : (month == 10 ? "October" : (month == 11 ? "November" :
						(month == 12 ? "December" : "ERROR!")))))))))));

			$("#feeListTab h1").html("Fee Records: " + monthName + ", " + year);

			if (table === "") {
				$("#messageBox span").html("Problem Finding Fees. Add General Fee for the Month to Generate Automatically.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
				table = "";
			} else if (table === "no result") {
				$("#messageBox span").html("Can not find any Students with the given properties.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
				table = "";
			}

			$("#feetListTab tbody").html("");
			$("#feeListTab tbody").html(table);

		});
	});

	// Select Specific Student Attendance Records.
	$("form[name=attendanceStudentsListSearchForm]").submit(function (e) {

		e.preventDefault();
		var method = $("#attendanceStudentsListSearchMethod").val().trim();
		var registration = $("#attendanceStudentsListSearchRegistrationNumber").val().trim();
		var father = $("#attendanceStudentsListSearchFather").val().trim();
		var student = $("#attendanceStudentsListSearchStudent").val().trim();
		var month = $("#attendanceStudentsListSearchMonth").val().trim();
		var year = $("#attendanceStudentsListSearchYear").val().trim();

		$.get("/", {
			request: "attendanceStudentsSearch",
			method: method,
			registration: registration,
			father: father,
			student: student,
			month: month,
			year: year
		}, function (table) {

			var monthName = month == 1 ? "January" : (month == 2 ? "February" : (month == 3 ? "March" :
				(month == 4 ? "April" : (month == 5 ? "May" : (month == 6 ? "June" : (month == 7 ? "July" :
					(month == 8 ? "August" : (month == 9 ? "September" : (month == 10 ? "October" : (month == 11 ? "November" :
						(month == 12 ? "December" : "ERROR!")))))))))));

			$("#attendanceStudentsTab h1").html("Student Attendance: " + monthName + ", " + year);

			if (table === "") {

				$("#messageBox span").html("Problem Finding Attendance Records, Hint: New Attendance Records Will Not Generate for Students Who Have Left School.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			} else if (table === "no result") {

				$("#messageBox span").html("Can not find any Students with the given properties.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
				table = "";

			} else if (table === "teacher") {

				$("#messageBox span").html("Problem Finding Attendance Records, Hint: Teachers Can Only Access Records For Classes They Are Incharge Of.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
				table = "";

			}

			$("#attendanceStudentsTab thead").html("");
			$("#attendanceStudentsTab thead").html(table.tableHeader);

			$("#attendanceStudentsTab tbody").html("");
			$("#attendanceStudentsTab tbody").html(table.tableBody).change();

		});

	});

	$("form[name=attendanceStudentsListSelectionForm]").submit(function (e) {

		e.preventDefault();
		var method = $("#attendanceStudentsListSelectionMethod").val().trim();
		var clas = $("#attendanceStudentsListSelectClass").val().trim();
		var section = $("#attendanceStudentsListSelectSection").val().trim();
		var gender = $("#attendanceStudentsListSelectGender").val().trim();
		var father = $("#attendanceStudentsListSelectFather").val().trim();
		var month = $("#attendanceStudentsListSelectMonth").val().trim();
		var year = $("#attendanceStudentsListSelectYear").val().trim();

		$.get("/", {
			request: "attendanceStudentsSelect",
			method: method,
			class: clas,
			section: section,
			gender: gender,
			father: father,
			month: month,
			year: year
		}, function (table) {
			var monthName = month == 1 ? "January" : (month == 2 ? "February" : (month == 3 ? "March" :
				(month == 4 ? "April" : (month == 5 ? "May" : (month == 6 ? "June" : (month == 7 ? "July" :
					(month == 8 ? "August" : (month == 9 ? "September" : (month == 10 ? "October" : (month == 11 ? "November" :
						(month == 12 ? "December" : "ERROR!")))))))))));

			$("#attendanceStudentsTab h1").html("Student Attendance: " + monthName + ", " + year);

			if (table === "") {
				$("#messageBox span").html("Problem Finding Attendance Records, Hint: New Attendance Records Will Not Generate for Students Who Have Left School.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			} else if (table === "no result") {
				$("#messageBox span").html("Can not find any Students with the given properties.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
				table = "";
			} else if (table === "teacher") {

				$("#messageBox span").html("Problem Finding Attendance Records, Hint: Teachers Can Only Access Records For Classes They Are Incharge Of.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
				table = "";

			}

			$("#attendanceStudentsTab thead").html("");
			$("#attendanceStudentsTab thead").html(table.tableHeader);

			$("#attendanceStudentsTab tbody").html("");
			$("#attendanceStudentsTab tbody").html(table.tableBody).change();

		});

	});

	// Select Specific Staff Attendance Records.
	$("form[name=attendanceStaffListSearchForm]").submit(function (e) {

		e.preventDefault();
		var staff = $("#attendanceStaffListSearchName").val().trim();
		var month = $("#attendanceStaffListSearchMonth").val().trim();
		var year = $("#attendanceStaffListSearchYear").val().trim();

		$.get("/", {
			request: "attendanceStaffSearch",
			staff: staff,
			month: month,
			year: year
		}, function (table) {
			var monthName = month == 1 ? "January" : (month == 2 ? "February" : (month == 3 ? "March" :
				(month == 4 ? "April" : (month == 5 ? "May" : (month == 6 ? "June" : (month == 7 ? "July" :
					(month == 8 ? "August" : (month == 9 ? "September" : (month == 10 ? "October" : (month == 11 ? "November" :
						(month == 12 ? "December" : "ERROR!")))))))))));

			$("#attendanceStaffTab h1").html("Staff Attendance: " + monthName + ", " + year);

			if (table === "") {
				$("#messageBox span").html("Problem Finding Attendance Records.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			} else if (table === "no result") {
				$("#messageBox span").html("Can not find any Staff with the given properties.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
				table = "";
			}

			$("#attendanceStaffTab thead").html("");
			$("#attendanceStaffTab thead").html(table.tableHeader);

			$("#attendanceStaffTab tbody").html("");
			$("#attendanceStaffTab tbody").html(table.tableBody).change();

		});
	});

	$("form[name=attendanceStaffListSelectionForm]").submit(function (e) {

		e.preventDefault();

		var formValues = $(this).serialize() + "&request=" + "attendanceStaffSelect";
		var month = $("#attendanceStaffListSelectMonth").val();
		var year = $("#attendanceStaffListSelectYear").val();

		$.get("/", formValues, function (table) {

			var monthName = month == 1 ? "January" : (month == 2 ? "February" : (month == 3 ? "March" :
				(month == 4 ? "April" : (month == 5 ? "May" : (month == 6 ? "June" : (month == 7 ? "July" :
					(month == 8 ? "August" : (month == 9 ? "September" : (month == 10 ? "October" : (month == 11 ? "November" :
						(month == 12 ? "December" : "ERROR!")))))))))));

			$("#attendanceStaffTab h1").html("Staff Attendance: " + monthName + ", " + year);

			if (table === "") {
				$("#messageBox span").html("Problem Finding Attendance Records.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			} else if (table === "no result") {
				$("#messageBox span").html("Can not find any Staff with the given properties.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
				table = "";
			}

			$("#attendanceStaffTab thead").html("");
			$("#attendanceStaffTab thead").html(table.tableHeader);

			$("#attendanceStaffTab tbody").html("");
			$("#attendanceStaffTab tbody").html(table.tableBody).change();

		});
	});

	// Select Specific Student Periods Attendance Records.
	$("form[name=attendancePeriodsListSearchForm]").submit(function (e) {

		e.preventDefault();
		var method = $("#attendancePeriodsListSearchMethod").val().trim();
		var registration = $("#attendancePeriodsListSearchRegistrationNumber").val().trim();
		var father = $("#attendancePeriodsListSearchFather").val().trim();
		var student = $("#attendancePeriodsListSearchStudent").val().trim();
		var month = $("#attendancePeriodsListSearchMonth").val().trim();
		var year = $("#attendancePeriodsListSearchYear").val().trim();
		var day = $("#attendancePeriodsListSearchDay").val().trim();

		$.get("/", {
			request: "attendancePeriodsSearch",
			method: method,
			registration: registration,
			father: father,
			student: student,
			month: month,
			year: year,
			day: day
		}, function (table) {

			var monthName = month == 1 ? "January" : (month == 2 ? "February" : (month == 3 ? "March" :
				(month == 4 ? "April" : (month == 5 ? "May" : (month == 6 ? "June" : (month == 7 ? "July" :
					(month == 8 ? "August" : (month == 9 ? "September" : (month == 10 ? "October" : (month == 11 ? "November" :
						(month == 12 ? "December" : "ERROR!")))))))))));

			$("#attendancePeriodsTab h1").html("Periods Attendance: " + day + " " + monthName + ", " + year);

			if (table === "") {

				$("#messageBox span").html("Problem Finding Periods Attendance Records, Hint: New Attendance Records Will Not Generate for Students Who Have Left School.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			} else if (table === "no result") {

				$("#messageBox span").html("Can not find any Students with the given properties.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
				table = "";

			} else if (table === "teacher") {

				$("#messageBox span").html("Problem Finding Periods Attendance Records, Hint: Teachers Can Only Access Records For Classes They Are Incharge Of.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
				table = "";

			} else if (table === "leave") {

				$("#messageBox span").html("The Selected Day is a Leave.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
				table = "";

			}

			$("#attendancePeriodsTab thead").html("");
			$("#attendancePeriodsTab thead").html(table.tableHeader);

			$("#attendancePeriodsTab tbody").html("");
			$("#attendancePeriodsTab tbody").html(table.tableBody).change();

		});

	});

	$("form[name=attendancePeriodsListSelectionForm]").submit(function (e) {

		e.preventDefault();
		var method = $("#attendancePeriodsListSelectionMethod").val().trim();
		var clas = $("#attendancePeriodsListSelectClass").val().trim();
		var section = $("#attendancePeriodsListSelectSection").val().trim();
		var gender = $("#attendancePeriodsListSelectGender").val().trim();
		var father = $("#attendancePeriodsListSelectFather").val().trim();
		var month = $("#attendancePeriodsListSelectMonth").val().trim();
		var year = $("#attendancePeriodsListSelectYear").val().trim();
		var day = $("#attendancePeriodsListSelectDay").val().trim();

		$.get("/", {
			request: "attendancePeriodsSelect",
			method: method,
			class: clas,
			section: section,
			gender: gender,
			father: father,
			month: month,
			year: year,
			day: day
		}, function (table) {
			var monthName = month == 1 ? "January" : (month == 2 ? "February" : (month == 3 ? "March" :
				(month == 4 ? "April" : (month == 5 ? "May" : (month == 6 ? "June" : (month == 7 ? "July" :
					(month == 8 ? "August" : (month == 9 ? "September" : (month == 10 ? "October" : (month == 11 ? "November" :
						(month == 12 ? "December" : "ERROR!")))))))))));

			$("#attendancePeriodsTab h1").html("Periods Attendance: " + day + " " + monthName + ", " + year);

			if (table === "") {
				$("#messageBox span").html("Problem Finding Periods Attendance Records, Hint: New Attendance Records Will Not Generate for Students Who Have Left School.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			} else if (table === "no result") {
				$("#messageBox span").html("Can not find any Students with the given properties.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
				table = "";
			} else if (table === "teacher") {

				$("#messageBox span").html("Problem Finding Periods Attendance Records, Hint: Teachers Can Only Access Records For Classes They Are Incharge Of.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
				table = "";

			} else if (table === "leave") {

				$("#messageBox span").html("The Selected Day is a Leave.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
				table = "";

			}

			$("#attendancePeriodsTab thead").html("");
			$("#attendancePeriodsTab thead").html(table.tableHeader);

			$("#attendancePeriodsTab tbody").html("");
			$("#attendancePeriodsTab tbody").html(table.tableBody).change();

		});

	});

	// Select Specific Student Entry Exit Times Attendance Records.
	$("form[name=attendanceTimesListSearchForm]").submit(function (e) {

		e.preventDefault();
		var method = $("#attendanceTimesListSearchMethod").val().trim();
		var registration = $("#attendanceTimesListSearchRegistrationNumber").val().trim();
		var father = $("#attendanceTimesListSearchFather").val().trim();
		var student = $("#attendanceTimesListSearchStudent").val().trim();
		var month = $("#attendanceTimesListSearchMonth").val().trim();
		var year = $("#attendanceTimesListSearchYear").val().trim();

		$.get("/", {
			request: "attendanceTimesSearch",
			method: method,
			registration: registration,
			father: father,
			student: student,
			month: month,
			year: year
		}, function (table) {

			var monthName = month == 1 ? "January" : (month == 2 ? "February" : (month == 3 ? "March" :
				(month == 4 ? "April" : (month == 5 ? "May" : (month == 6 ? "June" : (month == 7 ? "July" :
					(month == 8 ? "August" : (month == 9 ? "September" : (month == 10 ? "October" : (month == 11 ? "November" :
						(month == 12 ? "December" : "ERROR!")))))))))));

			$("#attendanceTimesTab h1").html("Entry Exit Times: " + monthName + ", " + year);

			if (table === "") {

				$("#messageBox span").html("Problem Finding Times Records, Hint: New Tims Records Will Not Generate for Times Who Have Left School.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			} else if (table === "no result") {

				$("#messageBox span").html("Can not find any Students with the given properties.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
				table = "";

			} else if (table === "teacher") {

				$("#messageBox span").html("Problem Finding Times Records, Hint: Teachers Can Only Access Records For Classes They Are Incharge Of.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
				table = "";

			}

			$("#attendanceTimesTab thead").html("");
			$("#attendanceTimesTab thead").html(table.tableHeader);

			$("#attendanceTimesTab tbody").html("");
			$("#attendanceTimesTab tbody").html(table.tableBody).change();

		});

	});

	$("form[name=attendanceTimesListSelectionForm]").submit(function (e) {

		e.preventDefault();
		var method = $("#attendanceTimesListSelectionMethod").val().trim();
		var clas = $("#attendanceTimesListSelectClass").val().trim();
		var section = $("#attendanceTimesListSelectSection").val().trim();
		var gender = $("#attendanceTimesListSelectGender").val().trim();
		var father = $("#attendanceTimesListSelectFather").val().trim();
		var month = $("#attendanceTimesListSelectMonth").val().trim();
		var year = $("#attendanceTimesListSelectYear").val().trim();

		$.get("/", {
			request: "attendanceTimesSelect",
			method: method,
			class: clas,
			section: section,
			gender: gender,
			father: father,
			month: month,
			year: year
		}, function (table) {
			var monthName = month == 1 ? "January" : (month == 2 ? "February" : (month == 3 ? "March" :
				(month == 4 ? "April" : (month == 5 ? "May" : (month == 6 ? "June" : (month == 7 ? "July" :
					(month == 8 ? "August" : (month == 9 ? "September" : (month == 10 ? "October" : (month == 11 ? "November" :
						(month == 12 ? "December" : "ERROR!")))))))))));

			$("#attendanceTimesTab h1").html("Entry Exit Times: " + monthName + ", " + year);

			if (table === "") {
				$("#messageBox span").html("Problem Finding Times Records, Hint: New Times Records Will Not Generate for Times Who Have Left School.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			} else if (table === "no result") {
				$("#messageBox span").html("Can not find any Students with the given properties.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
				table = "";
			} else if (table === "teacher") {

				$("#messageBox span").html("Problem Finding Times Records, Hint: Teachers Can Only Access Records For Classes They Are Incharge Of.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
				table = "";

			}

			$("#attendanceTimesTab thead").html("");
			$("#attendanceTimesTab thead").html(table.tableHeader);

			$("#attendanceTimesTab tbody").html("");
			$("#attendanceTimesTab tbody").html(table.tableBody).change();

		});

	});

	// Get Hints for father, mother and guardian
	$("#studentAddFatherName").on("keyup", getHint);
	$("#studentAddMotherName").on("keyup", getHint);
	$("#studentAddGuardianName").on("keyup", getHint);
	$("#studentEditFatherName").on("keyup", getHint);
	$("#studentEditMotherName").on("keyup", getHint);
	$("#studentEditGuardianName").on("keyup", getHint);

	// Get the values for the selected hint.
	$("#studentAddTab").on("click", ".student-hint-option", getHintOptionData);
	$("#studentAddTab").on("keypress", ".student-hint-option", function (e) {
		if (e.which === 13) {
			$(this).trigger("click");
		}
	});
	$("#studentEditTab").on("click", ".student-hint-option", getHintOptionData);
	$("#studentEditTab").on("keypress", ".student-hint-option", function (e) {
		if (e.which === 13) {
			$(this).trigger("click");
		}
	});

	// Load the General Fees Data.
	$("#feeGeneralLoad").click(function (e) {
		e.preventDefault();

		if ($("#feeGeneralYear").val() !== "") {

			var clas = $("#feeGeneralClass").val();
			var month = $("#feeGeneralmonth").val();
			var year = $("#feeGeneralYear").val();

			$.get("/", {
				request: "loadGeneralFee",
				clas: clas,
				year: year,
				month: month
			}, function (data) {

				if (data == "") {
					$("#messageBox span").html("Problem Finding General Fee Data. The Data for these Settings may not Exist Yet.");
					$("#messageBox").fadeIn().delay(3000).fadeOut();
					$("#feeGeneralTuition").val("");
					$("#feeGeneralAdmission").val("");
					$("#feeGeneralSecurity").val("");
					$("#feeGeneralComputerLab").val("");
					$("#feeGeneralScienceLab").val("");
					$("#feeGeneralSports").val("");
					$("#feeGeneralLibrary").val("");
					$("#feeGeneralExam").val("");
					$("#feeGeneralAdditional").val("");
				} else {

					$("#feeGeneralTuition").val(data.Tuition);
					$("#feeGeneralAdmission").val(data.Admission);
					$("#feeGeneralSecurity").val(data.Security);
					$("#feeGeneralComputerLab").val(data.Computer_Lab);
					$("#feeGeneralScienceLab").val(data.Science_Lab);
					$("#feeGeneralSports").val(data.Sports);
					$("#feeGeneralLibrary").val(data.Library);
					$("#feeGeneralExam").val(data.Exam);
					$("#feeGeneralAdditional").val(data.Additional);

				}

			});

		} else {
			$("#messageBox span").html("Please Enter the Year, and Select the Month and Class before Trying to Load Data.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
		}
	});

	// Payroll Search Form, Get Search by Name.
	$("form[name=payrollListSearchForm]").submit(function (e) {
		e.preventDefault();
		var name = $("#payrollListSearchName").val().trim();
		var year = $("#payrollListSearchYear").val().trim();
		var month = $("#payrollListSearchMonth").val().trim();

		$.get("/", {
			request: "payrollSearch",
			name: name,
			year: year,
			month: month
		}, function (table) {

			if (table === "") {
				$("#messageBox span").html("No Payroll Data Found by that Name.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			}

			var monthName = month == 1 ? "January" : (month == 2 ? "February" : (month == 3 ? "March" :
				(month == 4 ? "April" : (month == 5 ? "May" : (month == 6 ? "June" : (month == 7 ? "July" :
					(month == 8 ? "August" : (month == 9 ? "September" : (month == 10 ? "October" : (month == 11 ? "November" :
						(month == 12 ? "December" : "ERROR!")))))))))));

			$("#payrollListTab h1").html("Payroll Records: " + monthName + ", " + year);

			$("#payrollListTab tbody").html("");
			$("#payrollListTab tbody").html(table);

		});
	});

	// Payroll Select Form.
	$("form[name=payrollListSelectionForm]").submit(function (e) {

		e.preventDefault();
		var year = $("#payrollListSelectYear").val().trim();
		var month = $("#payrollListSelectMonth").val().trim();
		var formValues = $(this).serialize() + "&request=" + "payrollSelect";

		$.get("/", formValues, function (table) {

			if (table === "") {
				$("#messageBox span").html("No Payroll Data Found Matching the specified criteria.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			}

			var monthName = month == 1 ? "January" : (month == 2 ? "February" : (month == 3 ? "March" :
				(month == 4 ? "April" : (month == 5 ? "May" : (month == 6 ? "June" : (month == 7 ? "July" :
					(month == 8 ? "August" : (month == 9 ? "September" : (month == 10 ? "October" : (month == 11 ? "November" :
						(month == 12 ? "December" : "ERROR!")))))))))));

			$("#payrollListTab h1").html("Payroll Records: " + monthName + ", " + year);

			$("#payrollListTab tbody").html("");
			$("#payrollListTab tbody").html(table);

		});
	});

	// Staff Search Form, Get Search by Name.
	$("form[name=staffListSearchForm]").submit(function (e) {
		e.preventDefault();
		var name = $("#staffListSearchName").val().trim();

		$.get("/", {
			request: "staffSearch",
			name: name
		}, function (table) {

			if (table === "") {
				$("#messageBox span").html("No Staff Member Found by that Name.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			}

			$("#staffListTab tbody").html("");
			$("#staffListTab tbody").html(table);

		});
	});

	// Staff Select Form.
	$("form[name=staffListSelectionForm]").submit(function (e) {
		e.preventDefault();
		var method = $("#staffListSelectionMethod").val().trim();
		var gender = $("#staffListSelectGender").val().trim();
		var role = $("#staffListSelectRole").val().trim();
		var subject = $("#staffListSelectSubject").val().trim();

		$.get("/", {
			request: "staffSelect",
			method: method,
			gender: gender,
			role: role,
			subject: subject
		}, function (table) {

			if (table === "") {
				$("#messageBox span").html("No Staff Member Found Matching the specified criteria.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			}

			$("#staffListTab tbody").html("");
			$("#staffListTab tbody").html(table);

		});
	});

	// Settings Classes Select Form.
	$("form[name=settingsCSDetailsSelectionForm]").submit(function (e) {
		e.preventDefault();
		var class_id = $("#settingsCSDetailsSelectClass").val().trim();
		var section_id = $("#settingsCSDetailsSelectSection").val().trim();

		$.get("/", {
			request: "classSectionDetailsSelect",
			class_id: class_id,
			section_id: section_id
		}, function (data) {

			for (var i = 1; i < 9; i++) {
				data["Subject_" + i] = data["Subject_" + i] === null ? "null" : data["Subject_" + i];
			}
			data.Incharge = data.Incharge === null ? "null" : data.Incharge;

			$("#settingsCSDetailsEditIDHidden").val(data.ID);
			$("#settingsCSDetailsEditClassName").val(data.Class.Name);
			$("#settingsCSDetailsEditSectionName").val(data.Section.Name);
			$("#settingsCSDetailsEditSubject1").val(data.Subject_1);
			$("#settingsCSDetailsEditSubject2").val(data.Subject_2);
			$("#settingsCSDetailsEditSubject3").val(data.Subject_3);
			$("#settingsCSDetailsEditSubject4").val(data.Subject_4);
			$("#settingsCSDetailsEditSubject5").val(data.Subject_5);
			$("#settingsCSDetailsEditSubject6").val(data.Subject_6);
			$("#settingsCSDetailsEditSubject7").val(data.Subject_7);
			$("#settingsCSDetailsEditSubject8").val(data.Subject_8);
			$("#settingsCSDetailsEditIncharge").val(data.Incharge);

			$("#submitEditClassSectionDetails").prop("disabled", false);
		});

	});

	// Users Search Form, Get Search by Name, Select by Roles, or Both.
	$("form[name=usersListSearchForm]").submit(function (e) {
		e.preventDefault();
		var username = $("#usersSearchUsername").val().trim();
		var role = $("#usersSearchRole").val().trim();

		$.get("/", {
			request: "usersSearch",
			username: username,
			role: role
		}, function (table) {

			if (table === "") {
				$("#messageBox span").html("No User Found by that Username.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			}

			$("#usersListTab tbody").html("");
			$("#usersListTab tbody").html(table);

		});
	});

	// Perform Payroll Actions, one of Details, Edit, or Delete.
	var payrollId;

	$("tbody").on("click", ".payroll-list-link", function () {

		var id = $(this).attr("id").toString();
		payrollId = id.substring(id.indexOf('[') + 1, id.indexOf(']'));

		if (id.includes("payrollDetails")) {

			$.get("/", {
				request: "payrollDetails",
				id: payrollId
			}, function (details) {

				$("#payrollDetailsTab h2").html(details.Name);

				$("#payrollDetailsID").html(details.ID);
				$("#payrollDetailsName").html(details.Staff.Name);
				$("#payrollDetailsRole").html(details.Staff.Role);
				$("#payrollDetailsGender").html(details.Staff.Gender);
				$("#payrollDetailsYear").html(details.Year);
				$("#payrollDetailsMonth").html(details.Month);
				$("#payrollDetailsBalance").html(details.Balance);
				$("#payrollDetailsSalary").html(details.Salary);
				$("#payrollDetailsBonus").html(details.Bonus);
				$("#payrollDetailsOvertime").html(details.Overtime);
				$("#payrollDetailsTotal").html(details.Total);
				$("#payrollDetailsPaid").html(details.Paid);

			});

			$("#payrollDetailsButton").click();

		} else if (id.includes("payrollEdit")) {

			$.get("/", {
				request: "payrollEdit",
				id: payrollId
			}, function (details) {

				var month = details.Month;
				var monthName = month == 1 ? "January" : (month == 2 ? "February" : (month == 3 ? "March" :
					(month == 4 ? "April" : (month == 5 ? "May" : (month == 6 ? "June" : (month == 7 ? "July" :
						(month == 8 ? "August" : (month == 9 ? "September" : (month == 10 ? "October" : (month == 11 ? "November" :
							(month == 12 ? "December" : "ERROR!")))))))))));

				$("#payrollEditID").val(details.ID);
				$("#payrollEditIDHidden").val(details.ID);
				$("#payrollEditName").val(details.Staff.Name);
				$("#payrollEditYear").val(details.Year);
				$("#payrollEditMonth").val(monthName);
				$("#payrollEditBalance").val(details.Balance);
				$("#payrollEditSalary").val(details.Salary);
				$("#payrollEditBonus").val(details.Bonus);
				$("#payrollEditOvertime").val(details.Overtime);
				$("#payrollEditTotal").val(details.Total);
				$("#payrollEditPaid").val(details.Paid);

			});

			$("#payrollEditButton").click();

		} else if (id.includes("payrollDelete")) {
			$("#payrollDeleteWarningBG").fadeIn(200);
			$("#payrollDeleteWarningNo").focus();
		}
	});

	// Continue with deleting when Yes is pressed.
	$("#payrollDeleteWarningYes").on("click", function () {

		$("#loadingScreen").fadeIn(200);
		$.post("/", {
			request: "payrollDelete",
			id: payrollId
		}, function (data) {

			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// Perform Staff Actions, one of Details, Edit, or Delete.
	var staffId;

	$("tbody").on("click", ".staff-list-link", function () {

		var id = $(this).attr("id").toString();
		staffId = id.substring(id.indexOf('[') + 1, id.indexOf(']'));

		if (id.includes("staffDetails")) {

			$.get("/", {
				request: "staffDetails",
				id: staffId
			}, function (details) {

				$("#staffDetailsTab h2").html(details.Name);

				$("#staffDetailsID").html(details.ID);
				$("#staffDetailsName").html(details.Name);
				$("#staffDetailsRole").html(details.Role);
				$("#staffDetailsSalary").html(details.Salary);
				$("#staffDetailsGender").html(details.Gender);

				if (details.Role == "teacher") {
					$("#staffDetailsTeacher").fadeIn(200);
					$("#staffDetailsQualification").html(details.Teacher.Qualification);
					$("#staffDetailsField").html(details.Teacher.Field);
					$("#staffDetailsSubject1").html(details.Teacher.Subject_1_Name);
					$("#staffDetailsSubject2").html(details.Teacher.Subject_2_Name);
					$("#staffDetailsSubject3").html(details.Teacher.Subject_3_Name);
					$("#staffDetailsSubject4").html(details.Teacher.Subject_4_Name);
					$("#staffDetailsSubject5").html(details.Teacher.Subject_5_Name);
					$("#staffDetailsSubject6").html(details.Teacher.Subject_6_Name);
					$("#staffDetailsSubject7").html(details.Teacher.Subject_7_Name);
					$("#staffDetailsSubject8").html(details.Teacher.Subject_8_Name);
				} else {
					$("#staffDetailsTeacher").fadeOut(200);
				}
			});

			$("#staffDetailsButton").click();

		} else if (id.includes("staffEdit")) {

			$.get("/", {
				request: "staffEdit",
				id: staffId
			}, function (details) {

				$("#staffEditID").val(details.ID);
				$("#staffEditIDHidden").val(details.ID);
				$("#staffEditName").val(details.Name);
				$("#staffEditRole").val(details.Role);
				$("#staffEditSalary").val(details.Salary);
				$("#staffEditGender").val(details.Gender);

				if (details.Role == "teacher") {
					$("#staffEditTeacher").fadeIn(200);
					$("#staffEditQualification").val(details.Teacher.Qualification);
					$("#staffEditField").val(details.Teacher.Field);
					$("#staffEditSubject1").val(details.Teacher.Subject_1);
					$("#staffEditSubject2").val(details.Teacher.Subject_2);
					$("#staffEditSubject3").val(details.Teacher.Subject_3);
					$("#staffEditSubject4").val(details.Teacher.Subject_4);
					$("#staffEditSubject5").val(details.Teacher.Subject_5);
					$("#staffEditSubject6").val(details.Teacher.Subject_6);
					$("#staffEditSubject7").val(details.Teacher.Subject_7);
					$("#staffEditSubject8").val(details.Teacher.Subject_8);
				} else {
					$("#staffEditTeacher").fadeOut(200);
				}

			});

			$("#staffEditButton").click();

		} else if (id.includes("staffDelete")) {
			$("#staffDeleteWarningBG").fadeIn(200);
			$("#staffDeleteWarningNo").focus();
		}
	});

	// Continue with deleting when Yes is pressed.
	$("#staffDeleteWarningYes").on("click", function () {

		$("#loadingScreen").fadeIn(200);
		$.post("/", {
			request: "staffDelete",
			id: staffId
		}, function (data) {

			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// Perform Reminder Actions, one of Edit, or Delete.
	var reminderId;

	$("tbody").on("click", ".reminders-list-link", function () {

		var id = $(this).attr("id").toString();
		reminderId = id.substring(id.indexOf('[') + 1, id.indexOf(']'));

		if (id.includes("remindersEdit")) {

			$.get("/", {
				request: "reminderEdit",
				id: reminderId
			}, function (details) {

				var month = details.Month;
				var monthName = month == 1 ? "January" : (month == 2 ? "February" : (month == 3 ? "March" :
					(month == 4 ? "April" : (month == 5 ? "May" : (month == 6 ? "June" : (month == 7 ? "July" :
						(month == 8 ? "August" : (month == 9 ? "September" : (month == 10 ? "October" : (month == 11 ? "November" :
							(month == 12 ? "December" : "ERROR!")))))))))));

				$("#remindersEditIDHidden").val(details.ID);
				$("#remindersEditMessage").val(details.Message);
				$("#remindersEditStartDate").val(new Date(details.Start_Date).getDate() + "/" + (new Date(details.Start_Date).getMonth() + 1) + "/" + new Date(details.Start_Date).getFullYear());
				$("#remindersEditEndDate").val(new Date(details.End_Date).getDate() + "/" + (new Date(details.End_Date).getMonth() + 1) + "/" + new Date(details.End_Date).getFullYear());
				$("#remindersEditTarget").val(details.Target);

			});

			$("#remindersEditButton").click();

		} else if (id.includes("remindersDelete")) {
			$("#remindersDeleteWarningBG").fadeIn(200);
			$("#remindersDeleteWarningNo").focus();
		}
	});

	// Continue with deleting when Yes is pressed.
	$("#remindersDeleteWarningYes").on("click", function () {

		$("#loadingScreen").fadeIn(200);
		$.post("/", {
			request: "reminderDelete",
			id: reminderId
		}, function (data) {

			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// Perform Users Actions, one of Edit, or Delete.
	var usersId;

	$("tbody").on("click", ".users-list-link", function () {

		var id = $(this).attr("id").toString();
		usersId = id.substring(id.indexOf('[') + 1, id.indexOf(']'));

		if (id.includes("usersEdit")) {

			$.get("/", {
				request: "usersEdit",
				username: usersId
			}, function (details) {

				$("#usersEditUsername").val(details.Username);
				$("#usersEditUsernameHidden").val(details.Username);
				$("#usersEditRole").val(details.Role).change();
				if (details.Role === "Teacher") {
					$("#usersEditTeacher").val(details.Teacher_ID);
				}

			});

			$("#usersEditButton").click();

		} else if (id.includes("usersDelete")) {
			$("#usersDeleteWarningBG").fadeIn(200);
			$("#usersDeleteWarningNo").focus();
		}
	});

	// Continue with deleting when Yes is pressed.
	$("#usersDeleteWarningYes").on("click", function () {

		$("#loadingScreen").fadeIn(200);
		$.post("/", {
			request: "userDelete",
			username: usersId
		}, function (data) {

			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// Logs Select Form.
	$("form[name=logsSelectionForm]").submit(function (e) {
		e.preventDefault();
		var selection_method = $("#logsSelectionMethod").val().trim();
		var id = $("#logsSelectID").val().trim();
		var username = $("#logsSelectUsername").val().trim();
		var selection_date = $("#logsSelectionDateMethod").val().trim();
		var date_from = $("#logsSelectDateFrom").val().trim();
		var date_to = $("#logsSelectDateTo").val().trim();
		var action = $("#logsSelectAction").val().trim();
		var target = $("#logsSelectTarget").val().trim();

		$.get("/", {
			request: "logsSelect",
			selection_method: selection_method,
			id: id,
			username: username,
			selection_date: selection_date,
			date_from: date_from,
			date_to: date_to,
			action: action,
			target: target
		}, function (table) {

			if (table === "") {
				$("#messageBox span").html("No Logs Found Matching the specified criteria.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			}

			$("#logsMain tbody").html("");
			$("#logsMain tbody").html(table);

		});
	});

	// Load All the staff and student numbers.
	$("form[name=messagingSMSDomain]").submit(function (e) {
		e.preventDefault();

		var from = $("#messagingSMSDomainFrom").val();

		if (from === "all") {

			$.get("/", {
				request: "phoneNumbersSelect",
				from: from
			}, function (numbers) {

				addPhoneNumbersList(numbers);

			});

		}
	});

	// Search for Students, Load the numbers data for the searched students.
	$("form[name=messagingSMSSearchForm]").submit(function (e) {
		e.preventDefault();

		var method = $("#messagingSMSSearchMethod").val().trim();
		var registration = $("#messagingSMSSearchRegistrationNumber").val().trim();
		var father = $("#messagingSMSSearchFather").val().trim();
		var student = $("#messagingSMSSearchStudent").val().trim();
		var numbers = $("#messagingSMSSearchNumbers").val().trim();

		$.get("/", {
			request: "messagingSMSStudentSearch",
			method: method,
			registration: registration,
			father: father,
			student: student,
			numbers: numbers
		}, function (numbers) {

			addPhoneNumbersList(numbers);

		});
	});

	// Select Students, Load the numbers data for selected students.
	$("form[name=messagingSMSSelectionForm]").submit(function (e) {

		e.preventDefault();
		var method = $("#messagingSMSSelectionMethod").val().trim();
		var clas = $("#messagingSMSSelectClass").val().trim();
		var section = $("#messagingSMSSelectSection").val().trim();
		var gender = $("#messagingSMSSelectGender").val().trim();
		var father = $("#messagingSMSSelectFather").val().trim();
		var numbers = $("#messagingSMSSelectNumbers").val().trim();

		$.get("/", {
			request: "messagingSMSStudentSelect",
			method: method,
			class: clas,
			section: section,
			gender: gender,
			father: father,
			numbers: numbers
		}, function (numbers) {

			addPhoneNumbersList(numbers);

		});
	});

	// Search Staff, Load the numbers data for selected staff.
	$("form[name=messagingSMSStaffSearchForm]").submit(function (e) {
		e.preventDefault();
		var name = $("#messagingSMSStaffSearchName").val().trim();

		$.get("/", {
			request: "messagingSMSStaffSearch",
			name: name
		}, function (numbers) {

			addPhoneNumbersList(numbers);

		});
	});

	// Select Staff, Load the numbers data for selected Staff.
	$("form[name=messagingstaffSMSSelectionForm]").submit(function (e) {
		e.preventDefault();
		var method = $("#messagingstaffSMSStaffSelectionMethod").val().trim();
		var gender = $("#messagingSMSStaffSelectGender").val().trim();
		var role = $("#messagingSMSStaffSelectRole").val().trim();
		var subject = $("#messagingSMSStaffSelectSubject").val().trim();

		$.get("/", {
			request: "messagingSMSStaffSelect",
			method: method,
			gender: gender,
			role: role,
			subject: subject
		}, function (numbers) {

			addPhoneNumbersList(numbers);

		});
	});

	// Send the SMS Messages.
	$("form[name=sendSMSMessage]").submit(function (e) {
		e.preventDefault();
		var numbersList = [];
		$("#sendSMSMessageNumbers .message-number-value").each(function (i, $this) {
			numbersList.push($(this).html().trim());
		});
		for (var i = 0; i < numbersList.length; i++) {
			var tempNumber = numbersList[i].split("(");
			if (tempNumber.length > 1) {
				numbersList[i] = tempNumber[1].split(")")[0];
			}

			numbersList[i] = numbersList[i].replace(/ /g, "").replace(/-/g, "");
			numbersList[i].replace()

		}

		var message = $("#sendSMSMessageBody").val().trim();

		if (numbersList.length > 0) {
			$("#messagingSMSDeliveryStatus").fadeIn(200);
			$("#messagingSMSDeliveryStatus").html("Sending, Please Wait...");
			$.get("/", {
				request: "sendSMSMessages",
				numbersList: numbersList,
				message: message
			}, function (status) {

				$("#messagingSMSDeliveryStatus").html("The Messages Have Been Added to the Queue.");

			});
		} else {
			$("#messageBox span").html("Pleave Enter a Phone Number.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
		}

	});

	// Load All the staff and student numbers.
	$("form[name=messagingEmailDomain]").submit(function (e) {
		e.preventDefault();

		var from = $("#messagingEmailDomainFrom").val();

		if (from === "all") {

			$.get("/", {
				request: "emailsSelect",
				from: from
			}, function (emails) {

				addEmailList(emails);

			});

		}
	});

	// Search for Students, Load the numbers data for the searched students.
	$("form[name=messagingEmailSearchForm]").submit(function (e) {
		e.preventDefault();

		var method = $("#messagingEmailSearchMethod").val().trim();
		var registration = $("#messagingEmailSearchRegistrationNumber").val().trim();
		var father = $("#messagingEmailSearchFather").val().trim();
		var student = $("#messagingEmailSearchStudent").val().trim();
		var emails = $("#messagingEmailSearchEmails").val().trim();

		$.get("/", {
			request: "messagingEmailsStudentSearch",
			method: method,
			registration: registration,
			father: father,
			student: student,
			emails: emails
		}, function (emails) {

			addEmailList(emails);

		});
	});

	// Select Students, Load the numbers data for selected students.
	$("form[name=messagingEmailSelectionForm]").submit(function (e) {

		e.preventDefault();
		var method = $("#messagingEmailSelectionMethod").val().trim();
		var clas = $("#messagingEmailSelectClass").val().trim();
		var section = $("#messagingEmailSelectSection").val().trim();
		var gender = $("#messagingEmailSelectGender").val().trim();
		var father = $("#messagingEmailSelectFather").val().trim();
		var emails = $("#messagingEmailSelectEmails").val().trim();

		$.get("/", {
			request: "messagingEmailsStudentSelect",
			method: method,
			class: clas,
			section: section,
			gender: gender,
			father: father,
			emails: emails
		}, function (emails) {

			addEmailList(emails);

		});
	});

	// Search Staff, Load the numbers data for selected staff.
	$("form[name=messagingEmailStaffSearchForm]").submit(function (e) {
		e.preventDefault();
		var name = $("#messagingEmailStaffSearchName").val().trim();

		$.get("/", {
			request: "messagingEmailsStaffSearch",
			name: name
		}, function (emails) {

			addEmailList(emails);

		});
	});

	// Select Staff, Load the numbers data for selected Staff.
	$("form[name=messagingstaffEmailSelectionForm]").submit(function (e) {
		e.preventDefault();
		var method = $("#messagingstaffEmailStaffSelectionMethod").val().trim();
		var gender = $("#messagingEmailStaffSelectGender").val().trim();
		var role = $("#messagingEmailStaffSelectRole").val().trim();
		var subject = $("#messagingEmailStaffSelectSubject").val().trim();

		$.get("/", {
			request: "messagingEmailsStaffSelect",
			method: method,
			gender: gender,
			role: role,
			subject: subject
		}, function (emails) {

			addEmailList(emails);

		});
	});

	// Send the Email Messages.
	$("form[name=sendEmailMessage]").submit(function (e) {
		e.preventDefault();
		var emailsList = [];

		$("#sendEmailMessageEmails .message-email-value").each(function (i, $this) {
			emailsList.push($(this).html().trim());
		});
		for (var i = 0; i < emailsList.length; i++) {
			var tempEmail = emailsList[i].split("(");
			if (tempEmail.length > 1) {
				emailsList[i] = tempEmail[1].split(")")[0];
			}

		}

		var subject = $("#sendEmailMessageSubject").val().trim();
		var message = $("#sendEmailMessageBody").val().trim();

		if (emailsList.length > 0) {
			$("#messagingEmailDeliveryStatus").fadeIn(200);
			$("#messagingEmailDeliveryStatus").html("Sending, Please Wait...");

			$.get("/", {
				request: "sendEmailMessages",
				emailsList: emailsList,
				subject: subject,
				message: message
			}, function (status) {

				$("#messagingEmailDeliveryStatus").html(status);

			});
		} else {
			$("#messageBox span").html("Pleave Enter an Email Address.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
		}

	});

	// Change the month for Academic Schedule.
	$("form[name=remindersScheduleChangeMonth]").submit(function (e) {
		e.preventDefault();

		var month = $("#remindersScheduleSelectMonth").val().trim();

		$.get("/", {
			request: "loadAcademicScheduleData"
		}, function (data) {

			var leaveSunday = data.leaves.leaveSunday;
			var leaveFriday = data.leaves.leaveFriday;
			var leaveSaturday = data.leaves.leaveSaturday;
			var leavesRange = data.leaves.leavesRange;
			var leavesDate = data.leaves.leavesDate;
			var settings = data.leaves.settings;

			// Sets the year to the current year if the selected month falls in the session start month or after it.
			// Sets the year to the next year if the month is before the session's start, since it must be for the next year.
			var currYear = new Date().getFullYear();
			var currMonth = new Date().getMonth() + 1;
			var year = ((month < settings.session.session_start_month) &&
				(currMonth >= settings.session.session_start_month)) ? (currYear + 1) : (currYear);

			var monthDays = new Date(year, month, 0).getDate();
			var row = 1;

			$("#remindersScheduleDiv tbody tr:nth-child(6)").fadeIn(200);
			$("#remindersScheduleTab h1").html("Academic Schedule: " + getMonth(month) + ", " + year);
			$("#reminderScheduleMonth").val(month);

			$("#remindersScheduleTab tbody td").html("").removeAttr("class");

			for (var i = 1; i <= monthDays; i++) {

				var currDate = new Date(year, month - 1, i);
				var currDay = currDate.getDay();

				if (currDay === 0 && leaveSunday.length > 0) {
					$("#remindersScheduleSunday" + row).addClass("calendar-leave").html(i);
					row = (i !== monthDays) ? ++row : row;
				} else if (currDay === 5 && leaveFriday.length > 0) {
					$("#remindersScheduleFriday" + row).addClass("calendar-leave").html(i);
				} else if (currDay === 6 && leaveSaturday.length > 0) {
					$("#remindersScheduleSaturday" + row).addClass("calendar-leave").html(i);
				} else {

					var range = leavesRange.filter(function (leave) {
						return (leave.Date_From <= currDate && leave.Date_To >= currDate);
					});
					var date = leavesDate.filter(function (leave) {
						return (new Date(leave.Date).getTime() == currDate.getTime());
					});

					if (range.length > 0 || date.length > 0) {
						$("#remindersSchedule" + getDayName(currDay) + row).addClass("calendar-leave").html(i);
					} else {
						if (parseInt(settings.periods["day_" + currDay]) <= 5) {
							$("#remindersSchedule" + getDayName(currDay) + row).addClass("calendar-half-day").html(i);
						} else {
							$("#remindersSchedule" + getDayName(currDay) + row).addClass("calendar-full-day").html(i);
						}

						var currEvent = data.events.filter(function (e) {
							return (e.Month === month && e.Day === i);
						});
						if (currEvent.length > 0) {
							$("#remindersSchedule" + getDayName(currDay) + row).append(
								"<div class='schedule-event'>" + currEvent[0].Event +
								"<div id='scheduleRemoveEventDay" + i + "' class='schedule-event-remove' hidden>X</div></div>"
							);
						} else {
							$("#remindersSchedule" + getDayName(currDay) + row).append(
								"<div id='scheduleAddEventDay'" + i + "' class='schedule-add-event' hidden><div>+</div></div>"
							);
						}

						var currDateSheet = data.dateSheet.filter(function (ds) {
							for (var it = 1; it <= 8; it++) {
								if (ds["Date_" + it] != null) {
									var dsDate = new Date(ds[`Date_${it}`]);
									if (dsDate.toString() == currDate.toString()) {
										return (true);
									}
								}

							}
						});

						if (currDateSheet.length > 0) {
							$("#remindersSchedule" + getDayName(currDay) + row).append(
								"<div class='calendar-exam-container'><span class='calendar-exam'></span></div>"
							);
						}
					}

					row = (currDay === 0 && i != monthDays) ? ++row : row;
				}

			}

			if (row < 6) {
				$("#remindersScheduleDiv tbody tr:nth-child(6)").fadeOut(200);
			}

		});
	});

	// Show the add event box for full and half days without events.
	$(".schedule-day").hover(function () {

			$(this).children(".schedule-add-event").fadeIn();
		},
		function () {
			$(this).children(".schedule-add-event").fadeOut();
		});

	// On hover on the event bookmark on the bottom of the day, maximizes the event to the day and shows the remove button.
	$(".schedule-day").on("focusin", ".schedule-event", function () {

		$(this).children(".schedule-event-remove").show();
		$(this).children(".schedule-event-save").show();
		$(this).children(".schedule-event-text").show();
		$(this).animate({
			"width": '100%',
			"height": '100%',
			"border-top-left-radius": 0,
			"border-top-right-radius": 0,
			"left": 0
		}, {
			"duration": 300,
			"queue": false
		});
	})
	.on("focusout", ".schedule-event, .schedule-event-save, .schedule-event-remove, .schedule-event-text", function () {
		
		var $elem = $(this);

		setTimeout(function() {

			var hasFocus = !! ($elem.find(':focus').length > 0);

			if (!hasFocus &&
				!($(document.activeElement).hasClass("schedule-event") || $(document.activeElement).hasClass("schedule-event-save") || 
				$(document.activeElement).hasClass("schedule-event-remove") || $(document.activeElement).hasClass("schedule-event-text"))) {
				
				if (!$elem.hasClass("schedule-event")) {
					$elem = $elem.parent();
				}
				
				// Handle blur here.
				$elem.children(".schedule-event-remove").hide();
				$elem.children(".schedule-event-save").hide();
				$elem.children(".schedule-event-text").hide();
				$elem.animate({
					"width": '90%',
					"height": '15px',
					"border-top-left-radius": '5px',
					"border-top-right-radius": '5px',
					"left": '5%'
				}, {
					"duration": 300,
					"queue": false
				});

			}

		}, 10);

	});

	
	$(".schedule-day").on("click", ".schedule-add-event", function () {
		var id = $(this).attr("id");
		var day = id.substring(19);

		var addString = '<div id="scheduleEventDay' + day + '"class="schedule-event" tabindex="0"><div class="schedule-event-save disabled" hidden>Save</div><div class="schedule-event-remove" hidden>Remove</div><textarea class="schedule-event-text" hidden></textarea></div>';

		$(this).parent(".schedule-day").append(addString);
		$(this).remove();

	});

	// Make the Event Form div editable on click. Also enable the save button
	$(".schedule-day").on("focus", ".schedule-event-text", function () {
		$(this).attr("contentEditable", "true");
		$(this).siblings(".schedule-event-save").removeClass("disabled");
	});

	// Disable the save button when the text is no longer selected.
	$(".schedule-day").on("blur", ".schedule-event-text", function () {
		$(this).attr("contentEditable", "false");
		$(this).siblings(".schedule-event-save").addClass("disabled");
	});

	// Save the Event Text for the given day.
	$(".schedule-day").on("click", ".schedule-event-save", function () {
		var id = $(this).parent().attr("id");
		var day = parseInt(id.substring(16));
		var month = parseInt($("#reminderScheduleMonth").val());
		var event = $(this).parent(".schedule-event").children(".schedule-event-text").val().trim();

		$.get("/", {
			request: "saveScheduleEvent",
			day: day,
			month: month,
			event: event
		}, function (err) {
			if (err == "ERROR!") {
				$("#messageBox span").html("Failed to Save the Event. There was a problem");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			} else {
				$("#messageBox span").html("Event Saved Successfully");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			}

		});
	});

	// Remove the Event Text for the given day.
	$(".schedule-day").on("click", ".schedule-event-remove", function () {
		var id = $(this).parent().attr("id");
		var day = parseInt(id.substring(16));
		var month = parseInt($("#reminderScheduleMonth").val());

		$.get("/", {
			request: "removeScheduleEvent",
			day: day,
			month: month
		}, function (err) {
			if (err == "ERROR!") {
				$("#messageBox span").html("Failed to Remove the Event. There was a problem");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			} else {
				$("#messageBox span").html("Event Removed Successfully");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

				var addString = '<div id="scheduleAddEventDay' + day + '" class="schedule-add-event" hidden><div>+</div></div>';

				$("#" + id).parent(".schedule-day").append(addString);
				$("#" + id).remove();

			}
		});
	});

	// Change between the two edit study scheme edit tables.
	$("form[name=studySchemeEditMethodChange]").submit(function (e) {

		e.preventDefault();

		$("#studySchemeTermwiseEdit").fadeOut(200);
		$("#studySchemeWeeklyEdit").fadeOut(200);

		var method = $("#studySchemeEditMethod").val().trim();
		var class_id = $("#studySchemeEditClass").val().trim();

		if (method === "weekly") {

			$.get("/", {
				request: "loadStudySchemeWeeklyEdit",
				class_id: class_id
			}, function (table) {

				$("#studySchemeWeeklyEdit").fadeIn(200);
				$("#studySchemeWeeklyEdit table").html(table);

			});

		} else if (method === "termwise") {

			$.get("/", {
				request: "loadStudySchemeTermwiseEdit",
				class_id: class_id
			}, function (table) {

				$("#studySchemeTermwiseEdit").fadeIn(200);
				$("#studySchemeTermwiseEdit table").html(table);


			});

		}

	});

	// Change between the two view study scheme edit tables.
	$("form[name=studySchemeViewMethodChange]").submit(function (e) {

		e.preventDefault();

		$("#studySchemeTermwiseViewTable").fadeOut(200);
		$("#studySchemeWeeklyViewTable").fadeOut(200);

		var method = $("#studySchemeViewMethod").val().trim();
		var class_id = $("#studySchemeViewClass").val().trim();

		if (method === "weekly") {

			$.get("/", {
				request: "loadStudySchemeWeeklyView",
				class_id: class_id
			}, function (table) {

				$("#studySchemeWeeklyViewTable").fadeIn(200);
				$("#studySchemeWeeklyViewTable").html(table);

			});

		} else if (method === "termwise") {

			$.get("/", {
				request: "loadStudySchemeTermwiseView",
				class_id: class_id
			}, function (table) {

				$("#studySchemeTermwiseViewTable").fadeIn(200);
				$("#studySchemeTermwiseViewTable").html(table);


			});

		}

	});


	/* 	----------------------
			POST Requests.
		 --------------------- */

	// Post Edit Student Data.
	$("form[name=editStudent]").submit(function (e) {

		e.preventDefault();

		$("#studentEditWarningBG").fadeIn(200);
		$("#studentEditWarningNo").focus();

	});

	// Continue with Adding when Yes is pressed.
	$("#studentEditWarningYes").on("click", function () {

		var formValues = $("form[name=editStudent]").serialize() + "&request=" + "editStudent";

		$("#studentEditWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// Post Add Student Data.
	$("form[name=addStudent]").submit(function (e) {

		e.preventDefault();

		$("#studentAddWarningBG").fadeIn(200);
		$("#studentAddWarningNo").focus();

	});

	// Continue with Adding when Yes is pressed.
	$("#studentAddWarningYes").on("click", function () {

		var formValues = $("form[name=addStudent]").serialize() + "&request=" + "addStudent";

		$("#studentAddWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// Post Regenerate Fee Request.
	$("#feeGenerateList").click(function (e) {
		e.preventDefault();

		$("#feeGenerateWarningBG").fadeIn(200);
		$("#feeGenerateWarningNo").focus();
	});

	$("#feeGenerateWarningYes").on("click", function () {

		var formValues = "class=" + $("#feeListSelectClass").val() + "&month=" + $("#feeListSelectMonth").val() +
			"&year=" + $("#feeListSelectYear").val() + "&request=" + "generateFees";

		$("#feeGenerateWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});
	});

	// Add or Change the General Fees Data.
	$("form[name=generalFee]").submit(function (e) {

		e.preventDefault();

		$("#feeGeneralWarningBG").fadeIn(200);
		$("#feeGeneralWarningNo").focus();

	});

	$("#feeGeneralWarningYes").on("click", function () {

		var formValues = $("form[name=generalFee]").serialize() + "&request=" + "addOrUpdateGeneralFees";

		$("#feeGeneralWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});
	});

	$("form[name=addFee]").submit(function (e) {

		e.preventDefault();

		$("#feeAddWarningBG").fadeIn(200);
		$("#feeAddWarningNo").focus();

	});

	$("#feeAddWarningYes").on("click", function () {

		var formValues = $("form[name=addFee]").serialize() + "&request=" + "addFee";

		$("#feeAddWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});
	});

	$("form[name=editFee]").submit(function (e) {

		e.preventDefault();

		$("#feeEditWarningBG").fadeIn(200);
		$("#feeEditWarningNo").focus();

	});

	$("#feeEditWarningYes").on("click", function () {

		var formValues = $("form[name=editFee]").serialize() + "&request=" + "editFee";

		$("#feeEditWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});
	});

	// Generate / Regenerate the Student Attendance for the given month and year.
	$("#attendanceStudentsGenerateList").click(function (e) {

		e.preventDefault();

		$("#attendanceStudentsGenerateWarningBG").fadeIn(200);
		$("#attendanceStudentsGenerateWarningNo").focus();

	});

	$("#attendanceStudentsGenerateWarningYes").on("click", function () {

		var formValues = $("form[name=attendanceStudentsListSelectionForm]").serialize() + "&request=" + "generateAttendanceStudents";

		$("#attendanceStudentsGenerateWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {

			$("#loadingScreen").fadeOut(200);

			if (data === "teacher") {
				$("#messageBox span").html("Problem Generating Attendance Records, Hint: Teachers Can Only Generate Records For Classes They Are Incharge Of.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			} else {
				document.open();
				document.write(data);
				document.close();
			}

		});

	});

	// Update the Student Attendance.
	$("#attendanceStudentsUpdateList").click(function (e) {

		e.preventDefault();

		$("#attendanceStudentsUpdateWarningBG").fadeIn(200);
		$("#attendanceStudentsUpdateWarningNo").focus();

	});

	$("#attendanceStudentsUpdateWarningYes").on("click", function () {

		var formValues = $("form[name=attendanceStudentsList]").serialize() + "&request=" + "updateAttendanceStudents";

		$("#attendanceStudentsUpdateWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// Post Add Student Attendance Data.
	$("form[name=addAttendanceStudents]").submit(function (e) {

		e.preventDefault();

		$("#attendanceStudentsAddWarningBG").fadeIn(200);
		$("#attendanceStudentsAddWarningNo").focus();

	});

	// Continue with Adding when Yes is pressed.
	$("#attendanceStudentsAddWarningYes").on("click", function () {

		var formValues = $("form[name=addAttendanceStudents]").serialize() + "&request=" + "addAttendanceStudents";

		$("#attendanceStudentsAddWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {

			$("#loadingScreen").fadeOut(200);
			if (data === "teacher") {
				$("#messageBox span").html("Problem Adding Attendance Records, Hint: Teachers Can Only Add Records For Classes They Are Incharge Of.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			} else {
				document.open();
				document.write(data);
				document.close();
			}

		});

	});

	// Generate / Regenerate the Staff Attendance for the given month and year.
	$("#attendanceStaffGenerateList").click(function (e) {

		e.preventDefault();

		$("#attendanceStaffGenerateWarningBG").fadeIn(200);
		$("#attendanceStaffGenerateWarningNo").focus();

	});

	$("#attendanceStaffGenerateWarningYes").on("click", function () {

		var formValues = $("form[name=attendanceStaffListSelectionForm]").serialize() + "&request=" + "generateAttendanceStaff";

		$("#attendanceStaffGenerateWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// Update the Staff Attendance.
	$("#attendanceStaffUpdateList").click(function (e) {

		e.preventDefault();

		$("#attendanceStaffUpdateWarningBG").fadeIn(200);
		$("#attendanceStaffUpdateWarningNo").focus();

	});

	$("#attendanceStaffUpdateWarningYes").on("click", function () {

		var formValues = $("form[name=attendanceStaffList]").serialize() + "&request=" + "updateAttendanceStaff";

		$("#attendanceStaffUpdateWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200)
			document.open();
			document.write(data);
			document.close();
		});

	});

	// Post Add Staff Attendance Data.
	$("form[name=addAttendanceStaff]").submit(function (e) {

		e.preventDefault();

		$("#attendanceStaffAddWarningBG").fadeIn(200);
		$("#attendanceStaffAddWarningNo").focus();

	});

	// Continue with Adding when Yes is pressed.
	$("#attendanceStaffAddWarningYes").on("click", function () {

		var formValues = $("form[name=addAttendanceStaff]").serialize() + "&request=" + "addAttendanceStaff";

		$("#attendanceStaffAddWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// Generate / Regenerate the Periods Attendance for the given day, month, and year.
	$("#attendancePeriodsGenerateList").click(function (e) {

		e.preventDefault();

		$("#attendancePeriodsGenerateWarningBG").fadeIn(200);
		$("#attendancePeriodsGenerateWarningNo").focus();

	});

	$("#attendancePeriodsGenerateWarningYes").on("click", function () {

		var formValues = $("form[name=attendancePeriodsListSelectionForm]").serialize() + "&request=" + "generateAttendancePeriods";

		$("#attendancePeriodsGenerateWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {

			$("#loadingScreen").fadeOut(200);

			if (data === "teacher") {
				$("#messageBox span").html("Problem Generating Periods Attendance Records, Hint: Teachers Can Only Generate Records For Classes They Are Incharge Of.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			} else {
				document.open();
				document.write(data);
				document.close();
			}

		});

	});

	// Update the Periods Attendance.
	$("#attendancePeriodsUpdateList").click(function (e) {

		e.preventDefault();

		$("#attendancePeriodsUpdateWarningBG").fadeIn(200);
		$("#attendancePeriodsUpdateWarningNo").focus();

	});

	$("#attendancePeriodsUpdateWarningYes").on("click", function () {

		var formValues = $("form[name=attendancePeriodsList]").serialize() + "&request=" + "updateAttendancePeriods";

		$("#attendancePeriodsUpdateWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// Post Add StuPeriodsdent Attendance Data.
	$("form[name=addAttendancePeriods]").submit(function (e) {

		e.preventDefault();

		$("#attendancePeriodsAddWarningBG").fadeIn(200);
		$("#attendancePeriodsAddWarningNo").focus();

	});

	// Continue with Adding when Yes is pressed.
	$("#attendancePeriodsAddWarningYes").on("click", function () {

		var formValues = $("form[name=addAttendancePeriods]").serialize() + "&request=" + "addAttendancePeriods";

		$("#attendancePeriodsAddWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {

			$("#loadingScreen").fadeOut(200);
			if (data === "teacher") {
				$("#messageBox span").html("Problem Adding Periods Attendance Records, Hint: Teachers Can Only Add Records For Classes They Are Incharge Of.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			} else {
				document.open();
				document.write(data);
				document.close();
			}

		});

	});

	// Generate / Regenerate the Student Entry Exit Times Attendance for the given month and year.
	$("#attendanceTimesGenerateList").click(function (e) {

		e.preventDefault();

		$("#attendanceTimesGenerateWarningBG").fadeIn(200);
		$("#attendanceTimesGenerateWarningNo").focus();

	});

	$("#attendanceTimesGenerateWarningYes").on("click", function () {

		var formValues = $("form[name=attendanceTimesListSelectionForm]").serialize() + "&request=" + "generateAttendanceTimes";

		$("#attendanceTimesGenerateWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {

			$("#loadingScreen").fadeOut(200);

			if (data === "teacher") {
				$("#messageBox span").html("Problem Generating Entry Exit Times Records, Hint: Teachers Can Only Generate Records For Classes They Are Incharge Of.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			} else {
				document.open();
				document.write(data);
				document.close();
			}

		});

	});

	// Update the Student Entry Exit Times Attendance.
	$("#attendanceTimesUpdateList").click(function (e) {

		e.preventDefault();

		$("#attendanceTimesUpdateWarningBG").fadeIn(200);
		$("#attendanceTimesUpdateWarningNo").focus();

	});

	$("#attendanceTimesUpdateWarningYes").on("click", function () {

		var formValues = $("form[name=attendanceTimesList]").serialize() + "&request=" + "updateAttendanceTimes";

		$("#attendanceTimesUpdateWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// Post Add Entry Exit Times Attendance Data.
	$("form[name=addAttendanceTimes]").submit(function (e) {

		e.preventDefault();

		$("#attendanceTimesAddWarningBG").fadeIn(200);
		$("#attendanceTimesAddWarningNo").focus();

	});

	// Continue with Adding when Yes is pressed.
	$("#attendanceTimesAddWarningYes").on("click", function () {

		var formValues = $("form[name=addAttendanceTimes]").serialize() + "&request=" + "addAttendanceTimes";

		$("#attendanceTimesAddWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {

			$("#loadingScreen").fadeOut(200);
			if (data === "teacher") {
				$("#messageBox span").html("Problem Adding Entry Exit Times Records, Hint: Teachers Can Only Add Records For Classes They Are Incharge Of.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			} else {
				document.open();
				document.write(data);
				document.close();
			}

		});

	});

	// Add new Staff Member.
	$("form[name=addStaff]").submit(function (e) {

		e.preventDefault();

		if ($("#staffAddRole").val() === "teacher") {
			if (!checkSubjectRedundancy("staffAdd")) {

				$("#staffAddWarningBG").fadeIn(200);
				$("#staffAddWarningNo").focus();
			} else {
				$("#messageBox span").html("Two Subject Fields can not have the same value.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			}
		} else {
			$("#staffAddWarningBG").fadeIn(200);
			$("#staffAddWarningNo").focus();
		}

	});

	$("#staffAddWarningYes").on("click", function () {

		var formValues = $("form[name=addStaff]").serialize() + "&request=" + "addStaff";

		$("#staffAddWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});
	});

	// Edit Existing Staff Information.
	$("form[name=editStaff]").submit(function (e) {

		e.preventDefault();

		if ($("#staffEditRole").val() === "teacher") {
			if (!checkSubjectRedundancy("staffEdit")) {

				$("#staffEditWarningBG").fadeIn(200);
				$("#staffEditWarningNo").focus();
			} else {
				$("#messageBox span").html("Two Subject Fields can not have the same value.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			}
		} else {
			$("#staffEditWarningBG").fadeIn(200);
			$("#staffEditWarningNo").focus();
		}

	});

	$("#staffEditWarningYes").on("click", function () {

		var formValues = $("form[name=editStaff]").serialize() + "&request=" + "editStaff";

		$("#staffEditWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});
	});

	// Add new Payroll Information.
	$("form[name=addPayroll]").submit(function (e) {

		e.preventDefault();

		$("#payrollAddWarningBG").fadeIn(200);
		$("#payrollAddWarningNo").focus();

	});

	$("#payrollAddWarningYes").on("click", function () {

		var formValues = $("form[name=addPayroll]").serialize() + "&request=" + "addPayroll";

		$("#payrollAddWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});
	});

	// Edit Existing Staff Information.
	$("form[name=editPayroll]").submit(function (e) {

		e.preventDefault();

		$("#payrollEditWarningBG").fadeIn(200);
		$("#payrollEditWarningNo").focus();

	});

	$("#payrollEditWarningYes").on("click", function () {

		var formValues = $("form[name=editPayroll]").serialize() + "&request=" + "editPayroll";

		$("#payrollEditWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});
	});

	// Generate / Regenerate the Payroll for the given month and year.
	$("#payrollGenerateList").click(function (e) {

		e.preventDefault();

		$("#payrollGenerateWarningBG").fadeIn(200);
		$("#payrollGenerateWarningNo").focus();

	});

	$("#payrollGenerateWarningYes").on("click", function () {

		var formValues = "month=" + $("#payrollListSelectMonth").val() +
			"&year=" + $("#payrollListSelectYear").val().trim() + "&request=" + "generatePayroll";

		$("#payrollGenerateWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// Add new Payroll Information.
	$("form[name=addReminder]").submit(function (e) {

		e.preventDefault();

		$("#remindersAddWarningBG").fadeIn(200);
		$("#remindersAddWarningNo").focus();

	});

	$("#remindersAddWarningYes").on("click", function () {

		var formValues = $("form[name=addReminder]").serialize() + "&request=" + "addReminder";

		$("#remindersAddWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});
	});

	// Edit Existing Staff Information.
	$("form[name=editReminder]").submit(function (e) {

		e.preventDefault();

		$("#remindersEditWarningBG").fadeIn(200);
		$("#remindersEditWarningNo").focus();

	});

	$("#remindersEditWarningYes").on("click", function () {

		var formValues = $("form[name=editReminder]").serialize() + "&request=" + "editReminder";

		$("#remindersEditWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});
	});

	// Add new User Information.
	$("form[name=addUser]").submit(function (e) {

		e.preventDefault();

		var pass = $("#usersAddPassword").val();
		var confirmPass = $("#usersAddConfirmPassword").val();

		if (pass === confirmPass) {
			$("#usersAddWarningBG").fadeIn(200);
			$("#usersAddWarningNo").focus();
		} else {
			$("#messageBox span").html("The Two Password Fields Do Not Match.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
		}

	});

	$("#usersAddWarningYes").on("click", function () {

		var formValues = $("form[name=addUser]").serialize() + "&request=" + "addUser";

		$("#usersAddWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});
	});

	// Edit Existing Staff Information.
	$("form[name=editUser]").submit(function (e) {

		e.preventDefault();

		var pass = $("#usersAddPassword").val();
		var confirmPass = $("#usersAddConfirmPassword").val();

		if (pass === confirmPass) {
			$("#usersEditWarningBG").fadeIn(200);
			$("#usersEditWarningNo").focus();
		} else {
			$("#messageBox span").html("The Two Password Fields Do Not Match.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
		}
	});

	$("#usersEditWarningYes").on("click", function () {

		var formValues = $("form[name=editUser]").serialize() + "&request=" + "editUser";

		$("#usersEditWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});
	});

	// Edit Subject Names.
	$("form[name='editSubjectNames']").submit(function (e) {
		
		e.preventDefault();

		if (!checkSubjectRedundancy("settingsSubjectNames", 20)) {

			var formValues = $(this).serialize() + "&request=" + "editSubjectNames";

			$("#loadingScreen").fadeIn(200);

			$.post("/", formValues, function (data) {
				$("#loadingScreen").fadeOut(200);
				document.open();
				document.write(data);
				document.close();
			});
		} else {
			$("#messageBox span").html("Two Subjects Can Not Have The Same Name.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
		}


	});

	// Edit Existing Class Information.
	$("form[name=editClassSectionDetails]").submit(function (e) {

		e.preventDefault();

		if (!checkSubjectRedundancy("settingsCSDetailsEdit", 8)) {

			var formValues = $(this).serialize() + "&request=" + "editClassSectionDetails";

			$("#loadingScreen").fadeIn(200);

			$.post("/", formValues, function (data) {
				$("#loadingScreen").fadeOut(200);
				document.open();
				document.write(data);
				document.close();
			});
		} else {
			$("#messageBox span").html("Two Subject Fields Can Not Have The Same Value.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
		}

	});

	// Update the Periods Settings from Settings.JSON.
	$("form[name=editLeaves]").submit(function (e) {

		e.preventDefault();
		var formValues = $(this).serialize() + "&ranges=" + (dateRange - 1) + "&dates=" + (date - 1) + "&request=" + "editLeaves";

		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// Delete the Given Leave Data.
	$("tbody").on("click", ".leaves-list-link", function () {

		var id = $(this).attr("id").toString();
		leaveId = id.substring(id.indexOf('[') + 1, id.indexOf(']'));

		$("#loadingScreen").fadeIn(200);

		$.post("/", {
			request: "leaveDelete",
			id: leaveId
		}, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// Update the Periods Settings from Settings.JSON.
	$("form[name=editPeriods]").submit(function (e) {

		e.preventDefault();
		var formValues = $(this).serialize() + "&request=" + "editPeriods";

		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// Update the Session Settings from Settings.JSON.
	$("form[name=editSession]").submit(function (e) {

		e.preventDefault();
		var formValues = $(this).serialize() + "&request=" + "editSession";

		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// Update the Session Settings from Settings.JSON.
	$("form[name=editFeeSettings]").submit(function (e) {

		e.preventDefault();
		var formValues = $(this).serialize() + "&request=" + "editFeeSettings";

		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// Post the updated Study Scheme Termwise Data.
	$("form[name=studySchemeTermwiseEdit]").submit(function (e) {

		e.preventDefault();
		var length = $("#studySchemeTermwiseEdit tbody tr").length;

		var formValues = $(this).serialize() + "&length=" + length + "&request=" + "editStudySchemeTermwise";

		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// Post the update Study Scheme Weekly Data.
	$("form[name=studySchemeWeeklyEdit]").submit(function (e) {

		e.preventDefault();
		var length = $("#studySchemeWeeklyEdit tbody tr").length;

		var formValues = $(this).serialize() + "&length=" + length + "&request=" + "editStudySchemeWeekly";

		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// Change the School Information in the General Settings.
	$("#settingsGeneralInformationForm").submit(function(e) {

		e.preventDefault();

		$("#settingsGeneralInformationWarningBG").fadeIn(200);
		$("#settingsGeneralInformationWarningNo").focus();

	});
	$("#settingsGeneralInformationWarningYes").click(function () {

		$("#settingsGeneralInformationWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);
		
		var formValues = $("form[name='settingsGeneralInformationForm']").serialize() + "&request=" + "schoolInformationChange";

		$.post("/", formValues, function (err) {
			
			$("#loadingScreen").fadeOut(200);
			
			if (err){
				$("#messageBox span").html("There Was a Problem With Changing The School Information.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			}
			else {
				$("#messageBox span").html("The School Information Is Changed.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			}

		});

	});

	// Change the School Logos in the General Settings.
	$("form[name=settingsGeneralLogoForm]").submit(function (e) {

		e.preventDefault();

		$("#settingsGeneralLogoWarningBG").fadeIn(200);
		$("#settingsGeneralLogoWarningNo").focus();


	});
	$("#settingsGeneralLogoWarningYes").click(function () {

		$("#settingsGeneralLogoWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);
		
		var formValues = $("form[name='settingsGeneralLogoForm']").serialize() + "&request=" + "schoolLogoChange";

		$.post("/", formValues, function (err) {
			
			$("#loadingScreen").fadeOut(200);
			
			if (err){
				$("#messageBox span").html("There Was a Problem With Changing The School Logos.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			}
			else {
				$("#messageBox span").html("The School Logos Are Changed.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			}

		});

	});

	// Change the Software Settings in the General Settings.
	$("form[name=settingsGeneralSoftwareSettingsForm]").submit(function (e) {

		e.preventDefault();

		$("#settingsGeneralSoftwareSettingsWarningBG").fadeIn(200);
		$("#settingsGeneralSoftwareSettingsWarningNo").focus();


	});
	$("#settingsGeneralSoftwareSettingsWarningYes").click(function () {

		$("#settingsGeneralSoftwareSettingsWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		var formValues = $("form[name='settingsGeneralSoftwareSettingsForm']").serialize() + "&request=" + "softwareSettingsChange";

		$.post("/", formValues, function (err) {
			
			$("#loadingScreen").fadeOut(200);
			
			if (err){
				$("#messageBox span").html("There Was a Problem With Changing The Software Settings.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			}
			else {
				$("#messageBox span").html("The Software Settings Are Changed.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			}

		});

	});

	// Export the Table Data.
	$("#exportDataButton").on("click", function (e) {

		e.preventDefault();
		var table = $("#importExportTableSelect").val().trim();
		var typeName = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

		$("#loadingScreen").fadeIn(200);

		$.post("/", { table: table, request: "exportTable" }, function (data) {
			
			$("#loadingScreen").fadeOut(200);
			
			if (data == "") {
				$("#messageBox span").html("There Was a Problem With Exporting Table.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			}
			else if (data == "Electron") {
				$("#messageBox span").html("Table Exported in the 'Table Export' Folder.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			}
			else {

				window.open("/downloadTable?table=" + table);

			}

		});

	});

	// Import the Table Data.
	$("#importDataButton").on("click", function (e) {

		e.preventDefault();
		var table = $("#importExportTableSelect").val().trim();
		var data = $("#settingsImportDataSource").val().trim();

		if (data === undefined || data === null || data === "") {

			$("#messageBox span").html("Please Select A File.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();

		}
		else {

			$("#loadingScreen").fadeIn(200);

			$.post("/", { table: table, data: data, request: "importTable" }, function (err) {
			
				$("#loadingScreen").fadeOut(200);
				
				if (err === "Error!") {
					$("#messageBox span").html("There Was a Problem With Importing Table. Make Sure The Cells Have Proper Values.");
					$("#messageBox").fadeIn().delay(3000).fadeOut();
				}
				else if (err === "File!") {
					$("#messageBox span").html("There Was a Problem With The File. Make Sure The Cells Have Proper Values.");
					$("#messageBox").fadeIn().delay(3000).fadeOut();
				}
				else if (err === "No Rows!") {
					$("#messageBox span").html("The Data In All Rows Was Incorrect.");
					$("#messageBox").fadeIn().delay(3000).fadeOut();
				}
				else {
					$("#messageBox span").html("Data Import Complete. " + err.Success + " Rows Imported, " + err.Fail + " Rows Failed.\nYou May Have To Reload Data To See Changes.");
					$("#messageBox").fadeIn().delay(3000).fadeOut();
				}
	
			});	

		}

	});

	// Export The Student Data for Entry Exit Machine.
	$("#exportDataEntryExitButton").on("click", function (e) {

		e.preventDefault();

		$("#loadingScreen").fadeIn(200);

		$.post("/", { request: "exportEntryExitMachine" }, function (data) {
			
			$("#loadingScreen").fadeOut(200);
			
			if (data == "") {
				$("#messageBox span").html("There Was a Problem With Exporting Entry Exit Machine Data");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			}
			else if (data == "Electron") {
				$("#messageBox span").html("File Exported in the 'Table Export' Folder.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			}
			else {

				window.open("/downloadTable?table=" + "Entry_Exit_Machine");

			}

		});

	});

	// Export The Student Data for Period Attendance Machine.
	$("#exportDataPeriodsButton").on("click", function (e) {

		e.preventDefault();

		$("#loadingScreen").fadeIn(200);

		$.post("/", { request: "exportPeriodsMachine" }, function (data) {
			
			$("#loadingScreen").fadeOut(200);
			
			if (data == "") {
				$("#messageBox span").html("There Was a Problem With Exporting Periods Attendance Machine Data");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			}
			else if (data == "Electron") {
				$("#messageBox span").html("File Exported in the 'Table Export' Folder.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			}
			else {

				window.open("/downloadTable?table=" + "Periods_Machine");

			}

		});

	});

	// Backup Data to local file and internet, the latter only if internet is connected.
	$("#backUpDatabaseButton").click(function () {

		$("#backUpDatabaseWarningBG").fadeIn(200);
		$("#backUpDatabaseWarningNo").focus();

	});
	$("#backUpDatabaseWarningYes").click(function () {

		$("#loadingScreen").fadeIn(200);

		$.post("/", {
			request: "backUpDatabase"
		}, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// Backup Data to local file and internet, the latter only if internet is connected.
	$("#restoreDatabaseButton").click(function () {

		$("#restoreDatabaseWarningBG").fadeIn(200);
		$("#restoreDatabaseWarningNo").focus();

	});
	$("#restoreDatabaseWarningYes").click(function () {

		$("#restoreDatabaseWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", {
			request: "restoreDatabase"
		}, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	/* -----------------------
			Time Table
	----------------------- */

	// Counts the total periods entered for each Class and Teacher in Class_Subject and Teacher_Subject Schedules.
	$(".cell-periods").on("change", function () {
		var current = 0;
		var id = $(this).attr("id");
		var tab = id.split("_")[0];
		var classNumber = id.split("_")[1];

		var total = $("#" + tab + "_" + classNumber + "_Total").html().trim();

		for (var i = 1; i <= 8; i++) {
			var val = $("#" + tab + "_" + classNumber + "_Subject_" + i + "_Periods").val() === undefined ? 0 :
				parseInt($("#" + tab + "_" + classNumber + "_Subject_" + i + "_Periods").val())
			current += val;
		}

		$("#" + tab + "_" + classNumber + "_Current").html(current);

		if (current > total) {
			$("#" + tab + "_" + classNumber + "_Current").addClass("invalid");
		} else {
			$("#" + tab + "_" + classNumber + "_Current").removeClass("invalid");
		}
	});

	var creation_method, data, students, teachers, CSDetails, leaveSunday, leaveFriday, leaveSaturday,
		periods, time_table, CSSchedule, TSSchedule, day, teacherAttendances;

	// Load the Time Table Data to the Client Side to Provide Quick Checks.
	$("#timeTableButton").on("click", function () {
		$.get("/", {
			request: "loadTimeTableData"
		}, function (getData) {

			students = getData.students;
			teachers = getData.teachers;
			CSDetails = getData.CSDetails;
			leaveSunday = getData.leaveSunday;
			leaveFriday = getData.leaveFriday;
			leaveSaturday = getData.leaveSaturday;
			periods = getData.periods;
			time_table = getData.time_table;
			CSSchedule = getData.CSSchedule;
			TSSchedule = getData.TSSchedule;
			day = 1;

			if (time_table === "") {
				creation_method = "Class";
				data = null;
			} else {
				var dataClass = time_table.filter(function (time) {
					return (time.Section_ID === null);
				});

				var dataSection = time_table.filter(function (time) {
					return (time.Section_ID !== null);
				});

				if (dataClass.length > 0) {
					creation_method = "Class";
					data = dataClass;
				} else if (dataSection.length > 0) {
					creation_method = "Section";
					data = dataSection;
				}
			}

		});

	});

	// Submit the Class_Schedule_Schedule .
	$("form[name=editClassSubjectSchedule]").submit(function (e) {

		e.preventDefault();

		var problem = false;
		$("#timeTableClassSubjectTable .cell-current").each(function () {
			var val = $(this).html();

			if ($(this).hasClass("invalid")) {
				problem = true;
			}
		});

		if (problem) {
			$("#messageBox span").html("You have a problem in the Table, Fix it Before Editing.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
		} else {

			$("#classScheduleEditWarningBG").fadeIn(200);
			$("#classScheduleEditWarningNo").focus();

		}

	});

	$("#classScheduleEditWarningYes").on("click", function () {
		var formValues = $("form[name=editClassSubjectSchedule]").serialize() + "&request=" + "editClassSubjectSchedule";

		$("#classScheduleEditWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});
	});

	// Submit the Teacher_Schedule_Schedule .
	$("form[name=editTeacherSubjectSchedule]").submit(function (e) {

		e.preventDefault();

		var problem = false;
		var teacherLength = $("#timeTableTeacherSubjectTable tr").length;

		var problem = false;
		$("#timeTableTeacherSubjectTable .cell-current").each(function () {
			var val = $(this).html();

			if ($(this).hasClass("invalid")) {
				problem = true;
			}
		});

		if (problem) {
			$("#messageBox span").html("You have a problem in the Table, Fix it Before Editing.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
		} else {

			$("#teacherScheduleEditWarningBG").fadeIn(200);
			$("#teacherScheduleEditWarningNo").focus();

		}

	});

	$("#teacherScheduleEditWarningYes").on("click", function () {

		var formValues = $("form[name=editTeacherSubjectSchedule]").serialize() + "&request=" + "editTeacherSubjectSchedule";

		$("#teacherScheduleEditWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// The Creation_Method for Time Table is changed. 
	$("form[name=timeTableSelectMethod]").submit(function (e) {

		e.preventDefault();
		$("#timeTableChangeMethodWarningBG").fadeIn(200);
		$("#timeTableChangeMethodWarningNo").focus();

	});

	$("#timeTableChangeMethodWarningYes").on("click", function () {

		creation_method = $("#editTimeTableCreationMethod").val().trim();

		$("#timeTableChangeMethodWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		setTimeTableTable(creation_method, data, students, teachers, CSDetails, leaveSunday, leaveFriday, leaveSaturday, periods, day);

	});

	// The Time Table Day is changed.
	$("form[name=timeTableSelectDay]").submit(function (e) {

		e.preventDefault();
		$("#timeTableChangeDayWarningBG").fadeIn(200);
		$("#timeTableChangeDayWarningNo").focus();

	});

	$("#timeTableChangeDayWarningYes").on("click", function () {

		day = parseInt($("#editTimeTableDay").val().trim());

		$("#timeTableChangeDayWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		setTimeTableTable(creation_method, data, students, teachers, CSDetails, leaveSunday, leaveFriday, leaveSaturday, periods, day);

		$("#editTimeTableDayValue").val(day);

	});

	// One of the Subject Select is changed. Do all the subject related checks here.
	$("#timeTableMainTable").on("change", ".time-table-select-subject", function () {

		$("#timeTableErrorMessage").fadeOut();

		var subject = $(this).val();
		var id = $(this).attr("id");

		checkSubjectCompliance(subject, id, students, creation_method, teachers, time_table, TSSchedule, CSDetails, CSSchedule, teacherAttendances, day);

	});

	// One of the Teacher Select is changed. Do all the teacher related checks here.
	$("#timeTableMainTable").on("change", ".time-table-select-teacher", function () {

		$("#timeTableErrorMessage").fadeOut();

		var teacher = $(this).val();
		var id = $(this).attr("id");

		checkTeacherCompliance(teacher, id, students, creation_method, teachers, time_table, TSSchedule, CSDetails, CSSchedule, day);

	});

	// Edit the Time Table Data if everything is valid.
	$("form[name=editTimeTable]").submit(function (e) {

		e.preventDefault();

		var results = verifyTimeTable(students, creation_method, teachers, time_table, TSSchedule, CSDetails, CSSchedule);
		if (results) {
			$("#timeTableEditWarningBG").fadeIn(200);
			$("#timeTableEditWarningNo").focus();
		}

	});

	$("#timeTableEditWarningYes").on("click", function () {

		var day = $("#editTimeTableDayValue").val().trim();

		$("#timeTableEditWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		var formValues = $("form[name=editTimeTable]").serialize() + "&day=" + day + "&method=" + creation_method + "&request=" + "editTimeTable";

		$.post("/", formValues, function (data) {
			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();
		});

	});

	// The First Column (Class Name) is clicked on the The Time Table. Give the daily breakdown of subjects.
	$("#timeTableMainTable tbody").on("click", ".time-table-name", function () {

		var id = $(this).attr("id");
		var class_ID = parseInt(id.split('_')[1]);
		var name = $(this).html();
		var generalId = "";

		var section_ID = null;
		if (id.includes("Section")) {
			section_ID = parseInt(id.split('_')[3]);
		}

		var subjectDetails = [];

		if (section_ID === null) {

			var currDetails = CSDetails["Class_" + class_ID];
			subjectDetails = currDetails.filter(function (detail) {
				return (detail.Section_ID == null)
			});
			subjectDetails = subjectDetails[0];

			generalId = `class_${class_ID}`;

		} else {

			var currDetails = CSDetails["Class_" + class_ID];
			subjectDetails = currDetails.filter(function (detail) {
				return (detail.Section_ID == section_ID)
			});
			subjectDetails = subjectDetails[0];

			generalId = `class_${class_ID}_Section_${section_ID}`;

		}

		var detailsHeader = name + ": " + getDayName(day);
		var detailsText = "";

		var rowSubjects = [];

		// Iterates over the period columns and stores all the subjects.
		for (var j = 1; j <= 8; j++) {

			var currSubject = $(`#${generalId}_Period_${j}_Subject`).val();
			rowSubjects.push(currSubject);

		}

		// Goes over the Eight Subjects of the current Class.
		for (var i = 1; i <= 8; i++) {

			if (subjectDetails["Subject_" + i] != null) {

				var currSubjectPeriods = rowSubjects.filter(function (subject) {
					return (subjectDetails["Subject_" + i] == subject);
				});

				detailsText += getSubjectName(subjectDetails["Subject_" + i]) + " : " + currSubjectPeriods.length + "<br>";
			}

		}

		$("#timeTableDetailsBG").fadeIn(200);
		$("#timeTableDetails h3").html(detailsHeader);
		$("#timeTableDetails h4").html("Daily Subject Breakdown");
		$("#timeTableDetails span").html(detailsText);
		$("#timeTableDetailsClose").focus();

	});

	// Shows the Daily Breakdown for the clicked Class.
	$("#timeTableDetailsClose").on("click", function () {
		$("#timeTableDetailsBG").fadeOut(200);
	});

	$("#timeTableDetailsClose").keydown(function (e) {
		e.preventDefault();
		if (e.which === 13) {
			$("#timeTableDetailsBG").fadeOut(200);
		}
	});

	$("#timeTableTeacherOverview").on("click", function () {

		$("#timeTableDetailsBG").fadeIn(200);
		$("#timeTableDetails h3").html("Teacher Overview");
		$("#timeTableDetails h4").html("Weekly Breakdown");
		$("#timeTableDetails span").html(getTeacherOverviewTable(students, creation_method, teachers, time_table, TSSchedule, day)).addClass("table");
		$("#timeTableDetailsClose").focus();

	});

	$("#timeTableClassOverview").on("click", function () {

		$("#timeTableDetailsBG").fadeIn(200);
		$("#timeTableDetails h3").html("Class Overview");
		$("#timeTableDetails h4").html("Weekly Breakdown");
		$("#timeTableDetails span").html(getClassOverviewTable(CSDetails, CSSchedule, time_table, day)).addClass("table");
		$("#timeTableDetailsClose").focus();

	});

	// Copy the Time Table Data From another Day.
	$("#timeTableCopyButton").on("click", function () {

		var dayFrom = $("#timeTableCopyDay").val();

		if (dayFrom !== null) {

			timeTableCopy(dayFrom, day, time_table, creation_method, students, teachers, creation_method, periods);

			$("#messageBox span").html("Time Table Data Copied.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();

		}

	});

	$("#timeTableViewSelectMethod").on("change", function () {

		$("form[name=timeTableViewSelectionForm] label").not(":first").not(":last").fadeOut(200);
		$("form[name=timeTableViewSelectionForm] select").not(":first").not(":last").fadeOut(200);

		$("#timeTableViewSelect" + $(this).val()).fadeIn(200);
		$("label[for=timeTableViewSelect" + $(this).val() + "]").fadeIn(200);

		if ($("#timeTableViewSelectMethod").val() == "Class") {
			$("#timeTableViewSelectBy").change();
		}

	});

	$("#timeTableViewSelectClass").on("change", function () {

		$("#timeTableViewSelectBy").change();

	});

	// Show or Hide Sections Select Menu on Change of Generation Method.
	$("#timeTableViewSelectBy").on("change", function () {

		var selectBy = $(this).val();
		var selectMethod = $("#timeTableViewSelectMethod").val();

		if (selectBy === "sections" && selectMethod === "Class") {

			$("#timeTableViewSelectSection").fadeIn(200);
			$("label[for=timeTableViewSelectSection]").fadeIn(200);

			var classID = parseInt($("#timeTableViewSelectClass").val());
			var sectionOptions = changeSectionMenuOptions(classID, students);

			$("#timeTableViewSelectSection").html(sectionOptions);

		} else {

			$("#timeTableViewSelectSection").fadeOut(200);
			$("label[for=timeTableViewSelectSection]").fadeOut(200);

		}

	});

	$("form[name=timeTableViewSelectionForm]").submit(function (e) {

		e.preventDefault();

		var method = $("#timeTableViewSelectMethod").val();
		var daySelect = $("#timeTableViewSelectDay").val();
		var teacher = $("#timeTableViewSelectTeacher").val();
		var teacherName = $("#timeTableViewSelectTeacher option[value=" + teacher + "]").text();
		var clas = $("#timeTableViewSelectClass").val();
		var section = $("#timeTableViewSelectSection").val();
		var methodBy = $("#timeTableViewSelectBy").val();

		if (method === "Class") {

			$("#loadingScreen").fadeIn(200);
			setTimeTableViewTableByClass("screen", time_table, clas, section, leaveSunday, leaveFriday, leaveSaturday, methodBy, teachers);

		} else if (method === "Day") {

			$("#loadingScreen").fadeIn(200);
			setTimeTableViewTableByDay("screen", time_table, students, daySelect, methodBy, teachers);

		} else if (method === "Teacher") {

			$("#loadingScreen").fadeIn(200);
			setTimeTableViewTableByTeacher("screen", time_table, students, teacher, teacherName, leaveSunday, leaveFriday, leaveSaturday, methodBy, teachers);

		}

	});

	// Get the staff attendances for today and then generate the time table for today accordingly.
	$("form[name=timeTableAbsentSelectionForm]").submit(function (e) {

		e.preventDefault();

		var date = new Date();
		var day = date.getDate();
		var dayOfWeek = date.getDay();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();

		var methodBy = $("#timeTableAbsentSelectBy").val().trim();

		$("#loadingScreen").fadeIn(200);

		$.get("/", {
			request: "timeTableAbsences",
			month: month,
			year: year,
			date: date
		}, function (rows) {

			teacherAttendances = rows;

			if (teacherAttendances === "") {

				$("#messageBox span").html("There Was An Error With The Attendance Query. Try Again.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

				$("#loadingScreen").fadeOut(200);

			} else if (teacherAttendances === "leave") {

				$("#messageBox span").html("Today Is A Leave.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

				$("#loadingScreen").fadeOut(200);

			} else {

				setTimeTableAbsent(time_table, students, teacherAttendances, dayOfWeek, methodBy, teachers, CSDetails, periods);

				$("#loadingScreen").fadeOut(200);

			}

		});

	});

	// One of the Subject Select is changed on the Absence Management Time Table. Do all the subject related checks here.
	$("#timeTableAbsentTable").on("change", ".time-table-select-subject", function () {

		$("#timeTableAbsentErrorMessage").fadeOut();

		var subject = $(this).val();
		var id = $(this).attr("id");

		checkSubjectCompliance(subject, id, students, creation_method, teachers, time_table, TSSchedule, CSDetails, CSSchedule, teacherAttendances);

	});

	// One of the Teacher Select is changed on the Absence Management Time Table. Do all the teacher related checks here.
	$("#timeTableAbsentTable").on("change", ".time-table-select-teacher", function () {

		$("#timeTableAbsentErrorMessage").fadeOut();

		var teacher = $(this).val();
		var id = $(this).attr("id");

		checkTeacherCompliance(teacher, id, students, creation_method, teachers, time_table, TSSchedule, CSDetails, CSSchedule);

	});


	/* -----------------------
			Date Sheet
	----------------------- */

	// Get the Date Sheet Create Table, based on the selected term and method setting.
	$("form[name=dateSheetCreateSelectionForm]").submit(function (e) {

		e.preventDefault();

		$("#dateSheetCreateWarningBG").fadeIn(200);
		$("#dateSheetCreateWarningNo").focus();

	});

	$("#dateSheetCreateWarningYes").on("click", function () {

		var term = $("#dateSheetCreateSelectTerm").val();
		var start_date = $("#dateSheetCreateExamStart").val();
		var by = $("#dateSheetCreateSelectBy").val();

		$("#dateSheetCreateWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.get("/", {
			request: "dateSheetCreateTable",
			term: term,
			start_date: start_date,
			by: by
		}, function (details) {

			$("#loadingScreen").fadeOut(200);

			if (details == null) {

				$("#messageBox span").html("Please Pick a Date Between the Start and End Dates for the Term. Also Make Sure There are at least 8 Working Days Before Term End.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			} else {

				var method = (by === "classes" ? "Class" : "Section");

				$("#dateSheetCreateTab h4").html(method + " Date Sheet: Term " + term);

				$("#dateSheetCreateTable thead").html(details.tableHeader);
				$("#dateSheetCreateTable tbody").html(details.tableBody);

				$("#dateSheetCreateSave").prop("disabled", false);
				$("#dateSheetCreateAddDay").prop("disabled", false);
				$("#dateSheetCreateRemoveDay").prop("disabled", false);

			}

		});

	});

	// On A Subject being assigned an exam date, exclude that option from the rest of the days select element.
	$("#dateSheetCreateTable").on("change", "select", function () {

		var option = $(this).val();

		var options = [];

		if (options.indexOf(option) === -1 && option !== "None") {
			options.push(option);
		}

		// Store all the selected options in options array.
		$(this).parent().siblings("td").children("select").each(function () {

			var val = $(this).val();
			if (options.indexOf(val) === -1 && val !== "None") {
				options.push(val);
			}

		});

		// Set all the selected options to disalbed on all other select elements;
		$(this).parent().siblings("td").children("select").each(function () {

			var val = $(this).val();

			$(this).children("option").each(function () {

				var optionVal = $(this).val();
				if (options.indexOf(optionVal) !== -1) {
					$(this).prop("disabled", true);
				} else {
					$(this).prop("disabled", false);
				}

			});

			$(this).children("option[value=" + val + "]").prop("disabled", false);

		});

	});

	// Add A New Day to the Date Sheet.
	$("#dateSheetCreateAddDay").on("click", function () {

		var lastDate = new Date($("#dateSheetCreateTable thead th:last-child input").val());
		var days = $("#dateSheetCreateTable thead input").length;
		var selectId = $("#dateSheetCreateTable tbody tr td:nth-child(2)").children("select").attr("id");
		var term = $("#dateSheetCreateTab h4").html().split("Term ")[1];
		term = parseInt(term);

		var bySection = selectId.includes("Section");

		// Check if a new day can be added. If so, get the html to add to each new line.
		$.get("/", {
			request: "dateSheetAddDay",
			lastDate: lastDate,
			days: days,
			bySection: bySection,
			term: term
		}, function (data) {

			if (data === null) {

				$("#messageBox span").html("Can Not Add Another Day. Next Working Day is in the Next Term.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			} else {

				// Add the new Header Cell.
				$("#dateSheetCreateTable thead tr").append(data.headerCell);

				// Add the new Cell for Each Row.
				$("#dateSheetCreateTable tbody tr").each(function (i) {

					$(this).append(data.tableBody[i]);

				});

				$("#dateSheetCreateTable tbody tr td select").change();

			}

		});

	});

	// Remove The Last Day from the Date Sheet, only if there are more than Eight Days.
	$("#dateSheetCreateRemoveDay").on("click", function () {

		var days = $("#dateSheetCreateTable thead input").length;

		if (days > 8) {

			$("#dateSheetCreateTable thead tr th:last-child").remove();
			$("#dateSheetCreateTable tbody tr td:last-child").remove();

		} else {

			$("#messageBox span").html("Can Not Delete Last Day. Date Sheet Can not have less than Eight days.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();

		}

	});

	// Submit The Date Sheet to be saved.
	$("#dateSheetCreateSave").on("click", function () {

		var term = $("#dateSheetCreateTab h4").html().split("Term ")[1];
		var selectId = $("#dateSheetCreateTable tbody tr td:nth-child(2)").children("select").attr("id");
		term = parseInt(term);
		var days = $("#dateSheetCreateTable thead input").length;

		var bySection = selectId.includes("Section");
		var by = (bySection) ? "Section" : "Class";

		var formValues = $("form[name=dateSheetCreateForm]").serialize() + "&term=" + term + "&by=" + by + "&days=" + days + "&request=" + "createDateSheet";

		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {

			$("#loadingScreen").fadeOut(200);

			document.open();
			document.write(data);
			document.close();

		});

	});

	// Get the Date Sheet View Table for the given Term and Method.
	$("form[name=dateSheetViewSelectionForm]").submit(function (e) {

		e.preventDefault();

		var term = $("#dateSheetViewSelectTerm").val().trim();
		var by = $("#dateSheetViewSelectBy").val().trim();

		$("#loadingScreen").fadeIn(200);

		$.get("/", {
			request: "dateSheetViewTable",
			term: term,
			by: by
		}, function (details) {

			$("#loadingScreen").fadeOut(200);

			if (details === null) {

				$("#messageBox span").html("Found no Date Sheet Data by Given Criteria.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			} else {

				var method = (by === "classes") ? "Class" : "Section";

				$("#dateSheetViewTab h4").html(method + " Date Sheet: Term " + term);

				$("#dateSheetViewTable thead").html(details.tableHeader);
				$("#dateSheetViewTable tbody").html(details.tableBody);

				$("#dateSheetViewPrint").prop("disabled", false);

			}

		});

	});

	/* -----------------------
			Results
	----------------------- */
	$("#resultsEditSelectBy").on("change", function () {

		var val = $(this).val();

		if (val === "classes") {
			$("#resultsEditSelectSection").fadeOut(200);
			$("label[for=resultsEditSelectSection]").fadeOut(200);
		} else {
			$("#resultsEditSelectSection").fadeIn(200);
			$("label[for=resultsEditSelectSection]").fadeIn(200);
		}

	});

	// Add Or Remove A 9th Subject, Used for Extra Subjects Like Summer Vacation Work.
	$("#resultsAddOrRemoveSubject").on("click", function(e) {

		e.preventDefault();

		var subject9 = $("#subject_Subject_9").prop("disabled");
		
		if (subject9) {
			
			$("#resultsEditTable thead tr th:nth-child(10)").fadeIn(200);
			$("#resultsEditTable thead tr th:nth-child(10) input").prop("disabled", false);
			$("#resultsEditTable tbody tr td:nth-child(10)").fadeIn(200);
			$("#resultsEditTable tbody tr td:nth-child(10) input").prop("disabled", false);

			$("#resultsAddOrRemoveSubject").html("x Remove Subject");		
		}
		else {

			$("#resultsEditTable thead tr th:nth-child(10)").fadeOut(200);
			$("#resultsEditTable thead tr th:nth-child(10) input").prop("disabled", true);
			$("#resultsEditTable tbody tr td:nth-child(10)").fadeOut(200);
			$("#resultsEditTable tbody tr td:nth-child(10) input").prop("disabled", true);

			$("#resultsAddOrRemoveSubject").html("+ Add Subject");	
		}

	});

	// Change the Subject Value of the 9th Subject.
	$("#resultsEditTable").on("change", "#name_Subject_9", function() {

		$("#subject_Subject_9").val($(this).val());

	});

	$("#resultsViewSelectBy").on("change", function () {

		var val = $(this).val();

		if (val === "classes") {
			$("#resultsViewSelectSection").fadeOut(200);
			$("label[for=resultsViewSelectSection]").fadeOut(200);
		} else {
			$("#resultsViewSelectSection").fadeIn(200);
			$("label[for=resultsViewSelectSection]").fadeIn(200);
		}

	});

	$("#resultsViewFinalSelectBy").on("change", function () {

		var val = $(this).val();

		if (val === "classes") {
			$("#resultsViewFinalSelectSection").fadeOut(200);
			$("label[for=resultsViewFinalSelectSection]").fadeOut(200);
		} else {
			$("#resultsViewFinalSelectSection").fadeIn(200);
			$("label[for=resultsViewFinalSelectSection]").fadeIn(200);
		}

	});

	// Get the Results Edit Table.
	$("form[name=resultsEditSelectionForm]").submit(function (e) {

		e.preventDefault();

		var by = $("#resultsEditSelectBy").val();
		var term = $("#resultsEditSelectTerm").val();
		var class_id = $("#resultsEditSelectClass").val();
		var section_id = $("#resultsEditSelectSection").val();

		var formValues = $(this).serialize() + "&request=" + "resultsEditTable";

		$("#loadingScreen").fadeIn(200);

		$.get("/", formValues, function (data) {

			$("#loadingScreen").fadeOut(200);

			if (data === null || data === "") {

				$("#messageBox span").html("There was a Problem With the Request. Try Again.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			} else if (data === "teacher") {

				$("#messageBox span").html("No Data Found. Hint: Teachers Can Only Edit Results For Classes They Teach Or Are Incharge Of.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			} else {

				$("#resultsEditTable thead").html(data.tableHeader);
				$("#resultsEditTable tbody").html(data.tableBody);

				var headerPrefix = (by === "classes") ? ("Class: " + getClassName(class_id)) : ("Class: " + getClassName(class_id) + " " + getSectionName(section_id));

				$("#resultsEditTab h4").html(headerPrefix + "  Term: " + term);

				$("#resultsEditSave").prop("disabled", false);
				$("#resultsAddOrRemoveSubject").prop("disabled", false);

				var subject9 = $("#subject_Subject_9").prop("disabled"); 
				if(subject9) {
					$("#resultsAddOrRemoveSubject").html("x Add Subject");
				}
				else {
					$("#resultsAddOrRemoveSubject").html("x Remove Subject");
				}

			}

		});

	});

	// When the Total Marks for a Subject Change, Recalculate the total Marks, and set the max limit for the numbers of that subject.
	$("#resultsEditTable").on("change", "th input", function () {

		var val = $(this).val();
		var id = $(this).attr("id");
		var subject = parseInt(id.split("_")[2]);
		var total = 0;

		$("#resultsEditTable tr:not(:first-child) th input").each(function () {
			var curr = ($(this).val().trim() === "") ? 0 : $(this).val().trim();
			total += parseInt(curr);
		});

		$("#total_All").html(total);

		$("#resultsEditTable tbody tr td:nth-child(" + (subject + 1) + ") input").attr("max", val);

	});

	// On Subjects Marks Change for a student, Update the total Marks for said student.
	$("#resultsEditTable").on("change", "td input", function () {

		var val = $(this).val();
		var id = $(this).attr("id");
		var subject = id.split("_")[4];
		var student = id.split("_")[2];
		var total = 0;
		var subjects = $(this).parents("tr").children("td").length - 2;

		for (var i = 1; i <= subjects; i++) {

			var curr = $("#marks_Student_" + student + "_Subject_" + i).val().trim();
			curr = (curr === "") ? 0 : curr;

			total += parseInt(curr);

		}

		$("#total_Student_" + student).html(total);

		var max = $("#total_Subject_" + subject).val().trim();

		if (total > max) {
			$("#total_Student_" + student).addClass("invalid");
		} else {
			$("#total_Student_" + student).removeClass("invalid");
		}

	});

	// Save the Results.
	$("form[name=resultsEditForm]").submit(function (e) {

		e.preventDefault();

		$("#resultsEditSaveWarningBG").fadeIn(200);
		$("#resultsEditSaveWarningNo").focus();

	});

	$("#resultsEditSaveWarningYes").on("click", function () {

		var formValues = $("form[name=resultsEditForm]").serialize() + "&request=" + "resultsEditSave";

		$("#resultsEditSaveWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {

			$("#loadingScreen").fadeOut(200);
			document.open();
			document.write(data);
			document.close();

		});

	});

	// Get the Results View Table.
	$("form[name=resultsViewSelectionForm]").submit(function (e) {

		e.preventDefault();

		var by = $("#resultsViewSelectBy").val();
		var term = $("#resultsViewSelectTerm").val();
		var year = $("#resultsViewSelectYear").val();
		var class_id = $("#resultsViewSelectClass").val();
		var section_id = $("#resultsViewSelectSection").val();

		var formValues = $(this).serialize() + "&request=" + "resultsViewTable";

		$("#loadingScreen").fadeIn(200);

		$.get("/", formValues, function (data) {

			$("#loadingScreen").fadeOut(200);

			if (data === null || data === "") {

				$("#messageBox span").html("No Results Data Found by the Given Criteria.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			} else if (data === "teacher") {

				$("#messageBox span").html("No Data Found. Hint: Teachers Can Only View Results For Classes They Teach Or Are Incharge Of.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			} else {

				$("#resultsViewTable thead").html(data.tableHeader);
				$("#resultsViewTable tbody").html(data.tableBody);

				var headerPrefix = (by === "classes") ? ("Class: " + getClassName(class_id)) : ("Class: " + getClassName(class_id) + " " + getSectionName(section_id));

				$("#resultsViewTab h4").html(headerPrefix + "  Term: " + term + "  Year: " + year);

				$("#resultsViewPrint").prop("disabled", false);
				$("#resultsViewPrintDMC").prop("disabled", false);

			}

		});

	});

	// Get the Final Results Table.
	$("form[name=resultsViewFinalSelectionForm]").submit(function (e) {

		e.preventDefault();

		var by = $("#resultsViewFinalSelectBy").val();
		var year = $("#resultsViewFinalSelectYear").val();
		var class_id = $("#resultsViewFinalSelectClass").val();
		var section_id = $("#resultsViewFinalSelectSection").val();

		var formValues = $(this).serialize() + "&request=" + "resultsViewFinalTable";

		$("#loadingScreen").fadeIn(200);

		$.get("/", formValues, function (data) {

			$("#loadingScreen").fadeOut(200);

			if (data === null && data === "") {

				$("#messageBox span").html("Not All Terms Results Data Are Generated For the Year.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			} else if (data === "teacher") {

				$("#messageBox span").html("No Data Found. Hint: Teachers Can Only Edit Results For Classes They Teach Or Are Incharge Of.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();

			} else {

				$("#resultsViewFinalTable thead").html(data.tableHeader);
				$("#resultsViewFinalTable tbody").html(data.tableBody);

				var headerPrefix = (by === "classes") ? ("Class: " + getClassName(class_id)) : ("Class: " + getClassName(class_id) + " " + getSectionName(section_id));

				$("#resultsViewFinalTab h4").html(headerPrefix + "  Year: " + year);

				$("#resultsViewFinalPrint").prop("disabled", false);
				$("#resultsViewFinalPrintDMC").prop("disabled", false);

			}

		});

	});

	// Generate or Regenerate the Final Results Table.
	$("#resultsViewFinalGenerate").click(function (e) {

		e.preventDefault();

		var year = $("#resultsViewFinalSelectYear").val();

		if (year === "" || year < 1900 || year > 2999) {
			$("#messageBox span").html("Please Specify a year.");
			$("#messageBox").fadeIn().delay(3000).fadeOut();
		} else {

			$("#resultsFinalGenerateSaveWarningBG").fadeIn(200);
			$("#resultsFinalGenerateSaveWarningNo").focus();

		}
	});

	// Continue with Generating the Final Result when Yes is pressed.
	$("#resultsFinalGenerateSaveWarningYes").on("click", function () {

		var formValues = $("form[name=resultsViewFinalSelectionForm]").serialize() + "&request=" + "resultsFinalGenerate";

		$("#resultsFinalGenerateSaveWarningBG").fadeOut(200);
		$("#loadingScreen").fadeIn(200);

		$.post("/", formValues, function (data) {

			$("#loadingScreen").fadeOut(200);

			if (data === "teacher") {
				$("#messageBox span").html("No Data Found. Hint: Teachers Can Only Generate Results For Classes They Teach Or Are Incharge Of.");
				$("#messageBox").fadeIn().delay(3000).fadeOut();
			} else {
				document.open();
				document.write(data);
				document.close();
			}

		});

	});

});


function setBeforeSearch() {
	if (currentScreen === "home") {
		$("#studentMain").css("display", "block");
		$("#homeMain").css("display", "none");
		$("#studentButton").addClass("active");
		$("#homeButton").removeClass("active");
	} else if (currentScreen === "fee") {
		$("#studentMain").css("display", "block");
		$("#feeMain").css("display", "none");
		$("#studentButton").addClass("active");
		$("#feeButton").removeClass("active");
	} else if (currentScreen === "attendance") {
		$("#studentMain").css("display", "block");
		$("#attendanceMain").css("display", "none");
		$("#studentButton").addClass("active");
		$("#attendanceButton").removeClass("active");
	} else if (currentScreen === "user") {
		$("#studentMain").css("display", "block");
		$("#userMain").css("display", "none");
		$("#studentButton").addClass("active");
		$("#userButton").removeClass("active");
	}

	if ($("#studentListButton").prop("active", false)) {
		$("#studentListButton").click();
	}
}

function restoreAfterSearch() {
	$("#studentListTab tbody tr").css("display", "table-row");
	if (currentScreen == "home") {
		$("#studentMain").css("display", "none");
		$("#homeMain").css("display", "block");
		$("#studentButton").removeClass("active");
		$("#homeButton").addClass("active");
	} else if (currentScreen == "fee") {
		$("#studentMain").css("display", "none");
		$("#feeMain").css("display", "block");
		$("#studentButton").removeClass("active");
		$("#feeButton").addClass("active");
	} else if (currentScreen == "attendance") {
		$("#studentMain").css("display", "none");
		$("#attendanceMain").css("display", "block");
		$("#studentButton").removeClass("active");
		$("#attendanceButton").addClass("active");
	} else if (currentScreen == "user") {
		$("#attendanceMain").css("display", "none");
		$("#userMain").css("display", "block");
		$("#studentButton").removeClass("active");
		$("#userButton").addClass("active");
	}
}

function getHint() {
	var name = $(this).val().trim();
	var id = $(this).attr("id");

	var idTab = id.includes("Add") ? "studentAdd" : "studentEdit";
	var idSection = id.includes("Father") ? "Father" : id.includes("Mother") ? "Mother" : "Guardian";
	var source = id.includes("Father") ? "father" : id.includes("Mother") ? "mother" : "guardian";

	if ($(this).val() === "") {
		$("#" + idTab + idSection + "ID").val("");
		$("#" + idTab + idSection + "IDHidden").val("");
	} else {
		$.get("/", {
			request: "studentHint",
			source: source,
			name: name
		}, function (data) {
			if (!data.length > 0) {
				$("#" + idTab + idSection + "Hint").fadeOut(200);
			} else {
				var length = (data.length > 5) ? 5 : data.length;
				$("#" + idTab + idSection + "Hint").html('<span id="' + idTab + idSection + 'HintClose" class="student-hint-close" tabindex="0">Hide</span>');
				for (var i = 0; i < length; i++) {
					var hints = '<div id="' + idTab + idSection + 'HintID[' + data[i].ID + ']" class="student-hint-option" tabindex="0">' +
						'<span class="student-hint-option-id">' + data[i].ID + '</span>' +
						'<span class="student-hint-option-name">' + data[i].Name + '</span>' +
						'<span class="student-hint-option-qualification">' + data[i].Qualification + " " + data[i].Field + '</span>' +
						'</div>';
					$("#" + idTab + idSection + "Hint").append(hints);
					$("#" + idTab + idSection + "Hint").fadeIn(200);
				}
			}
		});
	}
}

function getHintOptionData() {

	var id = $(this).attr("id");

	var idTab = id.includes("Add") ? "studentAdd" : "studentEdit";
	var idSection = id.includes("Father") ? "Father" : id.includes("Mother") ? "Mother" : "Guardian";
	var source = id.includes("Father") ? "father" : id.includes("Mother") ? "mother" : "guardian";

	$("#" + idTab + idSection + "Hint").fadeOut(200);

	id = id.substring(id.indexOf('[') + 1, id.indexOf(']'));

	$.get("/", {
		request: "studentHintOption",
		source: source,
		id: id
	}, function (data) {

		$("#" + idTab + idSection + "ID").val(data.ID);
		$("#" + idTab + idSection + "IDHidden").val(data.ID);
		$("#" + idTab + idSection + "Name").val(data.Name);
		$("#" + idTab + idSection + "NIC").val(data.NIC);
		$("#" + idTab + idSection + "Qualification").val(data.Qualification);
		$("#" + idTab + idSection + "Field").val(data.Field);
		$("#" + idTab + idSection + "Income").val(data.Income);
		$("#" + idTab + idSection + "Email").val(data.Email);
		$("#" + idTab + idSection + "OfficePhone").val(data.Office_Phone);
		$("#" + idTab + idSection + "MobilePhone").val(data.Mobile_Phone);
	});
}

// Checks if the subject select entries are redundant.
function checkSubjectRedundancy(idStart, subjects) {

	var subjects = [];
	for (var i = 1; i <= subjects; i++) {
		var val = $("#" + idStart + "Subject" + i).val().trim();
		subjects.push(val);
	}

	var result = false;
	var length = subjects.length;

	for (var i = 0; i < length; i++) {
		for (var j = 0; j < length; j++) {
			if (i !== j && subjects[i] === subjects[j] && !(subjects[i] == "null" || subjects[i] == 0)) {
				result = true;
			}
		}
	}

	return result;
}

// Changes The Options of the Section Menu in the Time Table View Page based on the class.
// Show Sections for the class that has Students.
function changeSectionMenuOptions(classID, students) {

	var sectionOptions = "";

	for (var i = 1; i <= 5; i++) {

		var currStudents = students.filter(function (student) {
			return (student.Class_ID === classID && student.Section_ID === i);
		});

		if (currStudents.length > 0) {

			sectionOptions += `<option value="${i}">${getSectionName(i)}</option>`

		}

	}

	return sectionOptions;

}

// Changes the Time Table on change of Method or Day.
function setTimeTableTable(creation_method, data, students, teachers, CSDetails, leaveSunday, leaveFriday, leaveSaturday, periods, day) {

	$("#editTimeTableCreationMethod").val(creation_method);

	$("#timeTableMainTab h3").html("Day: " + getDayName(day));

	$("#editTimeTableDay").html("");
	for (var i = 1; i < 7; i++) {
		if (i == 5 && leaveFriday.length == 0) {
			$("#editTimeTableDay").append(`<option value="5">Friday</option>`);
		} else if (i == 6 && leaveSaturday.length == 0) {
			$("#editTimeTableDay").append(`<option value="6">Saturday</option>`);
		} else if (i == 7 && leaveSunday.length == 0) {
			$("#editTimeTableDay").append(`<option value="0">Sunday</option>`);
		} else if (i !== 5 && i !== 6 && i !== 7) {
			$("#editTimeTableDay").append(`<option value="${i}">${getDayName(i)}</option>`);
		}
	}

	// Disable the Current Day from the options in Copy Option.
	$("#timeTableCopyDay option").each(function (index, element) {
		if ($(element).val() == day) {
			$(element).prop("disabled", true);
		} else {
			$(element).prop("disabled", false);
		}
	});
	$("#timeTableCopyButton").prop("disabled", false);

	// Gets the total number of rows in the time table.
	var rows = 0;
	var classList = [];
	var classSectionList = {};

	var classNumber = 0;
	for (var x = 15; x >= 1; x--) {
		var classCurrent = students.filter(function (student) {
			return (student.Class_ID === x);
		});

		if (classCurrent.length > 0) {
			classList.push(x);
			classNumber++;
		}
	}

	if (creation_method === "Class") {

		rows = classNumber;

	} else if (creation_method === "Section") {

		var currClassList = classList.slice();
		for (var w = currClassList.length; w >= 1; w--) {

			var currClass = currClassList.pop();

			var sectionList = [];

			for (var x = 5; x >= 1; x--) {

				var sectionCurrent = students.filter(function (student) {
					return (student.Section_ID == x && student.Class_ID == currClass);
				});

				if (sectionCurrent.length > 0) {
					sectionList.push(x);
					rows++;
				}

			}

			classSectionList[currClass] = sectionList;

		}

	}

	$("#timeTableMainTable tbody").html("");
	var tableBody = "";

	var currClassSectionlist = classSectionList;
	var currSectionlist = [];
	var currClassList = classList.slice();
	var currClass = undefined;

	for (var i = 1; i <= rows; i++) {

		var name, id;

		if (creation_method === "Section") {

			if (currSectionlist.length === 0) {
				currClass = currClassList.pop();
				currSectionlist = currClassSectionlist[currClass].slice();
			}

			currSection = currSectionlist.pop();

			var currClassAndSection = students.filter(function (student) {
				return (student.Class_ID === currClass && student.Section_ID === currSection);
			});

			if (currClassAndSection.length === 0) {
				continue;
			}

			id = "class_" + currClass + "_Section_" + currSection + "_Name";
			name = getClassName(currClass) + " " + getSectionName(currSection);

		} else {
			currClass = currClassList.pop();

			id = "class_" + currClass + "_Name";
			name = getClassName(currClass);
		}

		tableBody += `<tr><td id="${id}" class="time-table-name">${name}</td>`;

		var classSubjectDetails = CSDetails["Class_" + currClass];
		var subjectsOptions, subjectsDetails;

		for (var x = 0; x < classSubjectDetails.length; x++) {
			if (creation_method === "Section") {
				if (classSubjectDetails[x].Section_ID == currSection) {
					subjectsDetails = classSubjectDetails[x];
				}
			} else {
				if (classSubjectDetails[x].Section_ID == null) {
					subjectsDetails = classSubjectDetails[x];
				}
			}
		}

		subjectsOptions = "<option value='free'>Free</option>";
		for (var j = 1; j <= 8; j++) {
			var currSubjectID = subjectsDetails['Subject_' + j];
			if (currSubjectID != null) {
				subjectsOptions += `<option value="${currSubjectID}">${getSubjectName(currSubjectID)}</option>`;
			}
		}

		var teachersOptions = "<option value='free'>Free</option>";
		for (var j = 0; j < teachers.length; j++) {
			var found = false;
			for (var k = 1; k <= 8; k++) {
				var currSubjectID = subjectsDetails['Subject_' + k];
				for (var l = 1; l <= 8; l++) {
					var currTeacherSubjectID = teachers[j].Teacher["Subject_" + l];

					if (currSubjectID != null && currSubjectID == currTeacherSubjectID) {

						teachersOptions += `<option value="${teachers[j].ID}">${teachers[j].Name}</option>`;

						found = true;
						break;
					}

				}

				if (found) {
					break;
				}
			}
		}

		for (var j = 1; j <= 8; j++) {

			if (parseInt(periods["day_" + day]) >= j) {
				if (creation_method === "Section") {
					tableBody += `<td>
									<span class="time-table-subject">
										<label for="class_${currClass}_Section_${currSection}_Period_${j}_Subject">Subject</label>
										<select id="class_${currClass}_Section_${currSection}_Period_${j}_Subject" name="subject_${currClass}_${currSection}_${j}" class="time-table-select-subject">
											${subjectsOptions}
										</select>
									</span>
									<span class="cell-divider"></span>
									<span class="time-table-teacher">
										<label for="class_${currClass}_Section_${currSection}_Period_${j}_Teacher">Teacher</label>
										<select id="class_${currClass}_Section_${currSection}_Period_${j}_Teacher" name="teacher_${currClass}_${currSection}_${j}" class="time-table-select-teacher">
											${teachersOptions}
										</select>
									</span>
								</td>`;
				} else {
					tableBody += `<td>
									<span class="time-table-subject">
										<label for="class_${currClass}_Period_${j}_Subject">Subject</label>
										<select id="class_${currClass}_Period_${j}_Subject" name="subject_${currClass}_${j}" class="time-table-select-subject">
											${subjectsOptions}
										</select>
									</span>
									<span class="cell-divider"></span>
									<span class="time-table-teacher">
										<label for="class_${currClass}_Period_${j}_Teacher">Teacher</label>
										<select id="class_${currClass}_Period_${j}_Teacher" name="teacher_${currClass}_${j}" class="time-table-select-teacher">
											${teachersOptions}
										</select>
									</span>
								</td>`;
				}

			} else {
				tableBody += `<td class="disabled"></td>`;
			}

		}

		tableBody += `</tr>`

	}

	$("#timeTableMainTable tbody").html(tableBody);

	if (data !== null) {

		currClassSectionlist = classSectionList;
		currSectionList = [];
		currClassList = classList.slice();
		currClass = undefined;
		var currSection = null;

		for (var i = 1; i <= rows; i++) {

			var generalId = "";

			if (creation_method === "Section") {

				if (currSectionList.length === 0) {
					currClass = currClassList.pop();
					currSectionList = currClassSectionlist[currClass].slice();
				}

				var currSection = currSectionList.pop();

				generalId = `class_${currClass}_Section_${currSection}`;

			} else {
				currClass = currClassList.pop();
				generalId = `class_${currClass}`;
			}

			var currData = data.filter(function (d) {
				return (d.Class_ID == currClass && d.Section_ID == currSection && d.Day_ID == day);
			});

			if (currData.length > 0) {

				for (var k = 1; k <= 8; k++) {

					var subject = currData[0]["Period_" + k + "_Subject_ID"] == null ? "free" : currData[0]["Period_" + k + "_Subject_ID"];
					var teacher = currData[0]["Period_" + k + "_Teacher_ID"] == null ? "free" : currData[0]["Period_" + k + "_Teacher_ID"];

					$(`#${generalId}_Period_${k}_Subject`).val(subject);

					$(`#${generalId}_Period_${k}_Teacher`).val(teacher);


					// Enables the appropriate teacher options based on the selected subject options, disables the rest.
					if (subject !== "free") {

						var currTeachers = teachers.filter(function (teacher) {
							return ((teacher.Teacher.Subject_1 == subject) || (teacher.Teacher.Subject_2 == subject) || (teacher.Teacher.Subject_3 == subject) ||
								(teacher.Teacher.Subject_4 == subject) || (teacher.Teacher.Subject_5 == subject) || (teacher.Teacher.Subject_6 == subject) ||
								(teacher.Teacher.Subject_7 == subject) || (teacher.Teacher.Subject_8 == subject));
						});

						if (currTeachers.length > 0) {
							$(`#${generalId}_Period_${k}_Teacher` + " option:not([value='free'])").prop("disabled", true);
							for (var l = 0; l < currTeachers.length; l++) {
								$(`#${generalId}_Period_${k}_Teacher` + " option[value='" + currTeachers[l].ID + "']").prop("disabled", false);
							}
						} else {
							$(`#${generalId}_Period_${k}_Teacher` + " option[value='free']").prop("selected", true);
						}

					}

					// Enables the appropriate subject options based on the selected teacher options, disables the rest.
					if (teacher !== "free") {

						var currTeacher = teachers.filter(function (temp) {
							return (temp.ID == teacher);
						});
						currTeacher = currTeacher[0];
						var currSubjects = [];

						$(`#${generalId}_Period_${k}_Subject` + " option:not([value='free'])").each(function () {

							var optionValue = $(this).val();
							var found = false;
							for (var l = 1; l <= 8; l++) {
								if (currTeacher.Teacher["Subject_" + l] == optionValue) {
									found = true;
									break;
								}
							}

							if (found) {
								currSubjects.push(optionValue);
							}
						});

						if (currSubjects.length > 0) {

							$(`#${generalId}_Period_${k}_Subject` + " option:not([value='free'])").prop("disabled", true);

							for (var l = 0; l < currSubjects.length; l++) {

								$(`#${generalId}_Period_${k}_Subject` + " option[value='" + currSubjects[l] + "']").prop("disabled", false);

							}

						} else {

							$(`#${generalId}_Period_${k}_Subject` + " option[value='free']").prop("selected", true);

						}

					}

				}

			}

		}

	}

	$("#messageBox span").html("Time Table Changed");
	$("#messageBox").fadeIn().delay(3000).fadeOut();

	$("#loadingScreen").fadeOut(200);

}

// Sets the Attendance Management Time Table for the current day, highlighting absent teachers and suggesting replacement.
function setTimeTableAbsent(data, students, teacherAttendances, day, method, teachers, CSDetails, periods) {

	var date = new Date();
	var currDate = date.getDate();
	$("#timeTableAbsentTab h3").html("Date: " + date.getDate() + " " + getMonth(date.getMonth() + 1) + ", " + date.getFullYear());

	// Gets the total number of rows in the time table.
	var rows = 0;
	var classList = [];
	var classSectionList = {};

	var classNumber = 0;
	for (var x = 15; x >= 1; x--) {
		var classCurrent = students.filter(function (student) {
			return (student.Class_ID === x);
		});

		if (classCurrent.length > 0) {
			classList.push(x);
			classNumber++;
		}
	}

	if (method === "classes") {

		rows = classNumber;

	} else if (method === "sections") {

		var currClassList = classList.slice();

		for (var w = currClassList.length; w >= 1; w--) {

			var currClass = currClassList.pop();

			var sectionList = [];

			for (var x = 5; x >= 1; x--) {

				var sectionCurrent = students.filter(function (student) {
					return (student.Section_ID == x && student.Class_ID == currClass);
				});

				if (sectionCurrent.length > 0) {
					sectionList.push(x);
					rows++;
				}

			}

			classSectionList[currClass] = sectionList;

		}

	}

	$("#timeTableAbsentTable tbody").html("");
	var tableBody = "";

	var currClassSectionlist = classSectionList;
	var currSectionlist = [];
	var currClassList = classList.slice();
	var currClass = undefined;

	for (var i = 1; i <= rows; i++) {

		var name, id;

		if (method === "sections") {

			if (currSectionlist.length === 0) {
				currClass = currClassList.pop();
				currSectionlist = currClassSectionlist[currClass].slice();
			}

			currSection = currSectionlist.pop();

			var currClassAndSection = students.filter(function (student) {
				return (student.Class_ID === currClass && student.Section_ID === currSection);
			});

			if (currClassAndSection.length === 0) {
				continue;
			}

			id = "absent_class_" + currClass + "_Section_" + currSection + "_Name";
			name = getClassName(currClass) + " " + getSectionName(currSection);

		} else {
			currClass = currClassList.pop();

			id = "absent_class_" + currClass + "_Name";
			name = getClassName(currClass);
		}

		tableBody += `<tr><td id="${id}" class="time-table-name">${name}</td>`;

		var classSubjectDetails = CSDetails["Class_" + currClass];
		var subjectsOptions, subjectsDetails;

		for (var x = 0; x < classSubjectDetails.length; x++) {
			if (method === "sections") {
				if (classSubjectDetails[x].Section_ID == currSection) {
					subjectsDetails = classSubjectDetails[x];
				}
			} else {
				if (classSubjectDetails[x].Section_ID == null) {
					subjectsDetails = classSubjectDetails[x];
				}
			}
		}

		subjectsOptions = "<option value='free'>Free</option>";
		for (var j = 1; j <= 8; j++) {

			var currSubjectID = subjectsDetails['Subject_' + j];
			if (currSubjectID != null) {
				subjectsOptions += `<option value="${currSubjectID}">${getSubjectName(currSubjectID)}</option>`;
			}

		}

		var teachersOptions = "<option value='free'>Free</option>";
		for (var j = 0; j < teachers.length; j++) {
			var found = false;
			for (var k = 1; k <= 8; k++) {
				var currSubjectID = subjectsDetails['Subject_' + k];
				for (var l = 1; l <= 8; l++) {
					var currTeacherSubjectID = teachers[j].Teacher["Subject_" + l];

					if (currSubjectID != null && currSubjectID == currTeacherSubjectID) {

						var present = teacherAttendances.filter(function (attendance) {
							return (attendance.ID === teachers[j].ID && attendance.Attendance["Day_" + currDate] === 1);
						});

						if (present.length > 0) {
							teachersOptions += `<option value="${teachers[j].ID}">${teachers[j].Name}</option>`;
						} else {
							teachersOptions += `<option value="${teachers[j].ID}" disabled class="absent">${teachers[j].Name}</option>`;
						}

						found = true;
						break;
					}

				}

				if (found) {
					break;
				}
			}
		}

		for (var j = 1; j <= 8; j++) {

			if (parseInt(periods["day_" + day]) >= j) {
				if (method === "sections") {
					tableBody += `<td>
										<span class="time-table-subject">
											<label for="absent_class_${currClass}_Section_${currSection}_Period_${j}_Subject">Subject</label>
											<select id="absent_class_${currClass}_Section_${currSection}_Period_${j}_Subject" name="subject_${currClass}_${currSection}_${j}" class="time-table-select-subject">
												${subjectsOptions}
											</select>
										</span>
										<span class="cell-divider"></span>
										<span class="time-table-teacher">
											<label for="absent_class_${currClass}_Section_${currSection}_Period_${j}_Teacher">Teacher</label>
											<select id="absent_class_${currClass}_Section_${currSection}_Period_${j}_Teacher" name="teacher_${currClass}_${currSection}_${j}" class="time-table-select-teacher">
												${teachersOptions}
											</select>
										</span>
									</td>`;
				} else {
					tableBody += `<td>
										<span class="time-table-subject">
											<label for="absent_class_${currClass}_Period_${j}_Subject">Subject</label>
											<select id="absent_class_${currClass}_Period_${j}_Subject" name="subject_${currClass}_${j}" class="time-table-select-subject">
												${subjectsOptions}
											</select>
										</span>
										<span class="cell-divider"></span>
										<span class="time-table-teacher">
											<label for="absent_class_${currClass}_Period_${j}_Teacher">Teacher</label>
											<select id="absent_class_${currClass}_Period_${j}_Teacher" name="teacher_${currClass}_${j}" class="time-table-select-teacher">
												${teachersOptions}
											</select>
										</span>
									</td>`;
				}

			} else {
				tableBody += `<td class="disabled"></td>`;
			}

		}

		tableBody += `</tr>`

	}

	$("#timeTableAbsentTable tbody").html(tableBody);

	if (data !== null) {

		currClassSectionlist = classSectionList;
		currSectionList = [];
		currClassList = classList.slice();
		currClass = undefined;
		var currSection = null;

		for (var i = 1; i <= rows; i++) {

			var generalId = "";

			if (method === "sections") {

				if (currSectionList.length === 0) {
					currClass = currClassList.pop();
					currSectionList = currClassSectionlist[currClass].slice();
				}

				var currSection = currSectionList.pop();

				generalId = `absent_class_${currClass}_Section_${currSection}`;

			} else {
				currClass = currClassList.pop();
				generalId = `absent_class_${currClass}`;
			}

			var currData = data.filter(function (d) {
				return (d.Class_ID == currClass && d.Section_ID == currSection && d.Day_ID == day);
			});

			if (currData.length > 0) {

				for (var k = 1; k <= 8; k++) {

					var subject = currData[0]["Period_" + k + "_Subject_ID"] == null ? "free" : currData[0]["Period_" + k + "_Subject_ID"];
					var teacher = currData[0]["Period_" + k + "_Teacher_ID"] == null ? "free" : currData[0]["Period_" + k + "_Teacher_ID"];

					var present = teacherAttendances.filter(function (attendance) {
						return (attendance.ID === teacher && attendance.Attendance["Day_" + currDate] === 1);
					});

					$(`#${generalId}_Period_${k}_Subject`).val(subject);
					$(`#${generalId}_Period_${k}_Teacher`).val(teacher);

					// The Teacer assigned to the current period is not present.
					if (present.length === 0 && teacher !== "free") {

						$(`#${generalId}_Period_${k}_Teacher`).parent().addClass("invalid");

					}

					// Enables the appropriate teacher options based on the selected subject options, disables the rest.
					if (subject !== "free") {

						var currTeachers = teachers.filter(function (teacher) {
							return ((teacher.Teacher.Subject_1 == subject) || (teacher.Teacher.Subject_2 == subject) || (teacher.Teacher.Subject_3 == subject) ||
								(teacher.Teacher.Subject_4 == subject) || (teacher.Teacher.Subject_5 == subject) || (teacher.Teacher.Subject_6 == subject) ||
								(teacher.Teacher.Subject_7 == subject) || (teacher.Teacher.Subject_8 == subject));
						});

						if (currTeachers.length > 0) {
							$(`#${generalId}_Period_${k}_Teacher` + " option:not([value='free'])").prop("disabled", true);

							for (var l = 0; l < currTeachers.length; l++) {

								var presentInner = teacherAttendances.filter(function (att) {
									return (att.ID === currTeachers[l].ID && att.Attendance["Day_" + currDate] === 1);
								});

								if (presentInner.length > 0) {
									$(`#${generalId}_Period_${k}_Teacher` + " option[value='" + currTeachers[l].ID + "']").prop("disabled", false);
								}

							}

						} else {
							$(`#${generalId}_Period_${k}_Teacher` + " option[value='free']").prop("selected", true);
						}

					}

					// Enables the appropriate subject options based on the selected teacher options, disables the rest.
					if (teacher !== "free") {

						var currTeacher = teachers.filter(function (temp) {
							return (temp.ID == teacher);
						});
						currTeacher = currTeacher[0];
						var currSubjects = [];

						$(`#${generalId}_Period_${k}_Subject` + " option:not([value='free'])").each(function () {

							var optionValue = $(this).val();
							var found = false;
							for (var l = 1; l <= 8; l++) {
								if (currTeacher.Teacher["Subject_" + l] == optionValue) {
									found = true;
									break;
								}
							}

							if (found) {
								currSubjects.push(optionValue);
							}
						});

						if (currSubjects.length > 0) {

							$(`#${generalId}_Period_${k}_Subject` + " option:not([value='free'])").prop("disabled", true);

							for (var l = 0; l < currSubjects.length; l++) {

								$(`#${generalId}_Period_${k}_Subject` + " option[value='" + currSubjects[l] + "']").prop("disabled", false);

							}

						} else {

							$(`#${generalId}_Period_${k}_Subject` + " option[value='free']").prop("selected", true);

						}

					}

				}

			}

		}

	}

	$("#messageBox span").html("Time Table Changed");
	$("#messageBox").fadeIn().delay(3000).fadeOut();

}

// Sets the Attendance Management PRINT Time Table for the current day, highlighting absent teachers.
function setTimeTableAbsentPrint(time_table, students, teacherAttendances, dayOfWeek, method, teachers, CSDetails, periods) {

	var date = new Date();
	var currDate = date.getDate();

	// Gets the total number of rows in the time table.
	var rows = 0;
	var classList = [];
	var classSectionList = {};

	var classNumber = 0;
	for (var x = 15; x >= 1; x--) {
		var classCurrent = students.filter(function (student) {
			return (student.Class_ID === x);
		});

		if (classCurrent.length > 0) {
			classList.push(x);
			classNumber++;
		}
	}

	if (method === "classes") {

		rows = classNumber;

	} else if (method === "sections") {

		var currClassList = classList.slice();

		for (var w = currClassList.length; w >= 1; w--) {

			var currClass = currClassList.pop();

			var sectionList = [];

			for (var x = 5; x >= 1; x--) {

				var sectionCurrent = students.filter(function (student) {
					return (student.Section_ID == x && student.Class_ID == currClass);
				});

				if (sectionCurrent.length > 0) {
					sectionList.push(x);
					rows++;
				}

			}

			classSectionList[currClass] = sectionList;

		}

	}

	var tableHeader =
		`<tr>
		<th><span class="time-table-first-column"><span>Periods&#8594;</span><span>Classes&#8595;</span></span></th>
		<th>Period 1</th>
		<th>Period 2</th>
		<th>Period 3</th>
		<th>Period 4</th>
		<th>Period 5</th>
		<th>Period 6</th>
		<th>Period 7</th>
		<th>Period 8</th>
	</tr>`;

	var tableBody = "";

	var currClassSectionlist = classSectionList;
	var currSectionlist = [];
	var currClassList = classList.slice();
	var currClass = undefined;

	for (var i = 1; i <= rows; i++) {

		var name, id;

		if (method === "sections") {

			if (currSectionlist.length === 0) {
				currClass = currClassList.pop();
				currSectionlist = currClassSectionlist[currClass].slice();
			}

			currSection = currSectionlist.pop();

			var currClassAndSection = students.filter(function (student) {
				return (student.Class_ID === currClass && student.Section_ID === currSection);
			});

			if (currClassAndSection.length === 0) {
				continue;
			}

			name = getClassName(currClass) + " " + getSectionName(currSection);

		} else {
			currClass = currClassList.pop();

			name = getClassName(currClass);
		}

		tableBody += `<tr><td>${name}</td>`;

		var currTimeTable = time_table.filter(function (time) {
			return (time.Class_ID == currClass && time.Section_ID == currSection && time.Day_ID == dayOfWeek);
		});

		for (var j = 1; j <= 8; j++) {

			if (parseInt(periods["day_" + dayOfWeek]) >= j) {

				var subject = currTimeTable[0][`Period_${j}_Subject_ID`];
				subject = (subject == null) ? "" : getSubjectName(subject);

				var teacherID = currTimeTable[0][`Period_${j}_Teacher_ID`];
				var teacher;
				if (teacherID != null) {
					teacher = teachers.filter(function (teach) {
						return (teach.ID == teacherID);
					});
					teacher = teacher[0].Name;
				} else {
					teacher = "";
				}


				if (method === "sections") {
					tableBody += `<td><span>${subject}</span><span>${teacher}</span></td>`;
				} else {
					tableBody += `<td></td>`;
				}

			} else {
				tableBody += `<td class="fail"></td>`;
			}

		}

		tableBody += `</tr>`

	}

	var heading = " Time Table Absent Management, Date: " + date.getDate() + " " + getMonth(date.getMonth() + 1) + ", " + date.getFullYear();
	var formValues = {
		tableHeader: tableHeader,
		tableBody: tableBody,
		heading: heading,
		request: "timeTableAbsentPrint"
	};

	$.post("/", formValues, function (html) {

		// Open the Print Screen in a Pop up.
		var wnd = window.open("about:blank", "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no");
		wnd.document.write(html);
		wnd.document.close();
		$("#loadingScreen").fadeOut(200);

	});

}

// Checks for Subject Problems.
function checkSubjectCompliance(subject, id, students, creation_method, teachers, time_table, TSSchedule, CSDetails, CSSchedule, teacherAttendances, day) {

	var generalId = id.slice(0, -9);
	var teacherId = id.slice(0, -8) + "_Teacher";

	var currDate = new Date().getDate();

	$("#" + id).parents("tr").removeClass("invalid");

	var rowSubjects = [];

	var class_ID = parseInt(id.split('_')[1]);
	var name = $(this).html();
	var section_ID = null;

	if (id.includes("Section")) {
		section_ID = parseInt(id.split('_')[3]);
	}

	var currTimeTable = [];
	if (time_table !== "") {

		currTimeTable = time_table.filter(function (time) {
			return (time.Class_ID == class_ID && time.Section_ID == section_ID && time.Day_ID == j);
		});

	}

	// Enables the appropriate teacher options based on the selected subject options, disables the rest.
	if (subject === "free") {

		$("#" + teacherId + " option").prop("disabled", false);
		$("#" + teacherId + " option[value='free']").prop("selected", true);
		$("#" + id + " option").prop("disabled", false);

		// If the current page is absent management, disable teachers who ware absent.
		if (teacherId.includes("absent")) {

			$("#" + teacherId + " option").each(function (index, element) {

				var present = teacherAttendances.filter(function (attendance) {
					return (attendance.ID == $(element).val() && attendance.Attendance["Day_" + currDate] === 1);
				});

				if (present.length === 0) {
					$(element).prop("disabled", true);
				}

			});

		}

	} else {

		var currTeachers = teachers.filter(function (teacher) {
			return ((teacher.Teacher.Subject_1 == subject) || (teacher.Teacher.Subject_2 == subject) || (teacher.Teacher.Subject_3 == subject) ||
				(teacher.Teacher.Subject_4 == subject) || (teacher.Teacher.Subject_5 == subject) || (teacher.Teacher.Subject_6 == subject) ||
				(teacher.Teacher.Subject_7 == subject) || (teacher.Teacher.Subject_8 == subject));
		});

		if (currTeachers.length > 0) {
			$("#" + teacherId + " option:not([value='free'])").prop("disabled", true);
			for (var i = 0; i < currTeachers.length; i++) {
				$("#" + teacherId + " option[value='" + currTeachers[i].ID + "']").prop("disabled", false);
			}
		} else {
			$("#" + teacherId + " option[value='free']").prop("selected", true);
		}

		// If the current page is absent management, disable teachers who ware absent.
		if (teacherId.includes("absent")) {

			$("#" + teacherId + " option").each(function (index, element) {

				var present = teacherAttendances.filter(function (attendance) {
					return (attendance.ID == $(element).val() && attendance.Attendance["Day_" + currDate] === 1);
				});

				if (present.length === 0) {
					$(element).prop("disabled", true);
				}

			});

		}

	}

	for (var i = 1; i <= 8; i++) {

		$("#" + generalId + i + "_Subject").parent().removeClass("invalid");
		var curr = $("#" + generalId + i + "_Subject").val();
		rowSubjects.push(curr);

	}

	// Checks if more than 3 Periods have been assigned to the same subject.
	var skip = false;
	var multipleSubjects = [],
		no = 0;
	for (var i = 0; i < 7; i++) {

		multipleSubjects[no] = 1;
		for (var j = i + 1; j < 8; j++) {

			if ((rowSubjects[i] != "free" && rowSubjects[i] != undefined) && (rowSubjects[i] === rowSubjects[j])) {
				multipleSubjects[no]++;
			}

		}

		if (multipleSubjects[no] > 2) {

			$("#timeTableErrorMessage").fadeIn(function () {
				if ($("#sideBar").css("position") === "fixed") {
					$(this).css("display", "inline-flex");

				}
			});

			$("#timeTableErrorMessage .error-message").html("One Subject Can not have more than two periods in a day.");

			for (var k = 0; k < 8; k++) {

				if (rowSubjects[i] == rowSubjects[k]) {
					$("#" + generalId + (k + 1) + "_Subject").parent().addClass("invalid");
				}

			}

			skip = true;
			break;
		}

		if (multipleSubjects[no] === 2) {
			no++;
		}
	}

	// Checks if more than two subject have been assigned two periods.
	if (!skip) {

		var doubleSubjects = multipleSubjects.filter(function (multiple) {
			return (multiple === 2);
		});

		if (doubleSubjects.length > 2) {

			$("#timeTableErrorMessage").fadeIn(function () {
				if ($("#sideBar").css("position") === "fixed") {
					$(this).css("display", "inline-flex");
				}
			});

			$("#timeTableErrorMessage .error-message").html("No more than Two Subjects can have Double Periods in a Day.");

			$("#" + id).parents("tr").addClass("invalid");

			skip = true;

		}

	}

	// Checks the subjects against the weekly alotted values for each, warns if overflow.
	if (!skip) {

		var subjectDetails = [];

		if (section_ID === null) {

			var currDetails = CSDetails["Class_" + class_ID];
			subjectDetails = currDetails.filter(function (detail) {
				return (detail.Section_ID == null)
			});
			subjectDetails = subjectDetails[0];

		} else {

			var currDetails = CSDetails["Class_" + class_ID];
			subjectDetails = currDetails.filter(function (detail) {
				return (detail.Section_ID == section_ID)
			});
			subjectDetails = subjectDetails[0];

		}

		for (var i = 1; i <= 8; i++) {

			var currSubject = subjectDetails["Subject_" + i];

			if (currSubject != null) {

				var currTotal = CSSchedule.filter(function (curr) {
					return (curr.Class_ID == class_ID);
				});

				currTotal = currTotal[0]["Subject_" + currSubject + "_Periods"];

				var currSubjectPeriods = rowSubjects.filter(function (subject) {
					return (subject == currSubject);
				});

				var currSubjectPeriodsAlreadyAdded = 0;

				for (var j = 0; j < 7; j++) {

					if (currTimeTable.length > 0) {

						currTimeTable = currTimeTable[0];

						for (var r = 1; r <= 8; r++) {

							if (currTimeTable["Period_" + r + "Subject_ID"] == currSubject) {
								currSubjectPeriodsAlreadyAdded++;
							}

						}

					}

				}

				// If the Total Alotted Periods for the changed subject are less than the assigned periods.
				var currCounted = currSubjectPeriods.length + currSubjectPeriodsAlreadyAdded;
				if (currCounted > currTotal) {

					$("#timeTableErrorMessage").fadeIn(function () {
						if ($("#sideBar").css("position") === "fixed") {
							$(this).css("display", "inline-flex");
						}
					});

					$("#timeTableErrorMessage .error-message").html("The Total Alloted Weekly Periods for the highlighted Subject are: " +
						currTotal + ". You have Entered: " + currCounted + ".");

					for (var l = 1; l <= 8; l++) {
						if (currSubject == rowSubjects[l - 1]) {
							$("#" + generalId + l + "_Subject").parent().addClass("invalid");
						}
					}

					skip = true;
					break;
				}

			}
		}

	}

	// Checks the teacher and subject combinations against the weekly alotted values for each, warns if overflow.
	// Searches all periods and all classes/sections.
	if (!skip) {

		var result = checkTeacherSubjectCompliance(students, creation_method, teachers, time_table, TSSchedule, day);

		return result;

	}

	return false;

}

// Checks for Teacher Problems.
function checkTeacherCompliance(teacher, id, students, creation_method, teachers, time_table, TSSchedule, CSDetails, CSSchedule, day) {

	var generalId = id.slice(0, -9);
	var subjectId = id.slice(0, -8) + "_Subject";

	$("#" + id).parents("tr").removeClass("invalid");

	var class_ID = parseInt(id.split('_')[1]);
	var name = $(this).html();
	var section_ID = null;

	if (id.includes("Section")) {
		section_ID = parseInt(id.split('_')[3]);
	}

	// Gets the total number of rows in the time table.
	var rows = 0;
	var classList = [];
	var classSectionList = {};

	var classNumber = 0;
	for (var x = 15; x >= 1; x--) {
		var classCurrent = students.filter(function (student) {
			return (student.Class_ID === x);
		});

		if (classCurrent.length > 0) {
			classList.push(x);
			classNumber++;
		}
	}

	if (creation_method === "Class") {

		rows = classNumber;

	} else if (creation_method === "Section") {

		var currClassList = classList.slice();
		for (var w = currClassList.length; w >= 1; w--) {

			var currClass = currClassList.pop();

			var sectionList = [];

			for (var x = 5; x >= 1; x--) {

				var sectionCurrent = students.filter(function (student) {
					return (student.Section_ID == x && student.Class_ID == currClass);
				});

				if (sectionCurrent.length > 0) {
					sectionList.push(x);
					rows++;
				}

			}

			classSectionList[currClass] = sectionList;

		}

	}

	var rowTeachers = [];

	// Enables the appropriate teacher options based on the selected subject options, disables the rest.
	if (teacher === "free") {

		$("#" + subjectId + " option").prop("disabled", false);
		$("#" + subjectId + " option[value='free']").prop("selected", true);
		$("#" + id + " option").prop("disabled", false);

	} else {

		var currTeacher = teachers.filter(function (temp) {
			return (temp.ID == teacher);
		});
		currTeacher = currTeacher[0];
		var currSubjects = [];

		$("#" + subjectId + " option:not([value='free'])").each(function () {

			var optionValue = $(this).val();
			var found = false;
			for (var i = 1; i <= 8; i++) {
				if (currTeacher.Teacher["Subject_" + i] == optionValue) {
					found = true;
					break;
				}
			}

			if (found) {
				currSubjects.push(optionValue);
			}
		});

		if (currSubjects.length > 0) {

			$("#" + subjectId + " option:not([value='free'])").prop("disabled", true);

			for (var i = 0; i < currSubjects.length; i++) {

				$("#" + subjectId + " option[value='" + currSubjects[i] + "']").prop("disabled", false);

			}

		} else {

			$("#" + subjectId + " option[value='free']").prop("selected", true);

		}

	}

	// Getting all the teachers in the current row.
	for (var i = 1; i <= 8; i++) {

		$("#" + generalId + i + "_Teacher").parent().removeClass("invalid");
		var curr = $("#" + generalId + i + "_Teacher").val();
		rowTeachers.push(curr);

	}

	var skip = false;
	var multipleTeachers = [],
		no = 0;

	// Checks if more than 2 Periods have been assigned to the same teacher.
	// DEPRECIATED: I FAIL TO SEE WHY THIS WAS ADDED IN THE FIRST PLACE,
	// BUT I HAVE NOT REMOVED IT YET IN FEAR THAT IT MAY SERVE SOME DARK TWISTED PURPOSE.
	// UPDATE: TURNS OUT, ATLEAST THE multipleTeachers ARRAY IS USED BELOW SO I HAVE UNCOMMENTED THAT.
	// FORGIVE ME FOR I HAVE SINNED.
	for (var i = 0; i < 7; i++) {

		multipleTeachers[no] = 1;

		for (var j = i + 1; j < 8; j++) {

			if ((rowTeachers[i] != "free" && rowTeachers[i] != undefined) && (rowTeachers[i] === rowTeachers[j])) {
				multipleTeachers[no]++;
			}

		}

		/*	
		if (multipleTeachers[no] > 2) {

			$("#timeTableErrorMessage").fadeIn();
			$("#timeTableErrorMessage .error-message").html("One Teacher Can not have more than Two Periods in a Day.");

			for (var k = 0; k < 8; k++) {
				if (rowTeachers[i] == rowTeachers[k]) {
					$("#" + generalId + (k + 1) + "_Teacher").parent().addClass("invalid");
				}
			}
			skip = true;
			break;
		}
		*/

		if (multipleTeachers[no] === 2) {
			no++;
		}
	}

	// Checks if the same teacher has been allocated another class in the same period slot.
	if (!skip) {

		var columnTeachers = [];
		var columnIds = [];

		var column = id.slice(-16);

		var currClassSectionlist = classSectionList;
		var currSectionList = [];
		var currClassList = classList.slice();
		var currClass = undefined;

		// Gets all the teacher in the current period.
		for (var i = 0; i < rows; i++) {

			var generalId;

			// Generate the general id for the subject and teachers in this row.
			if (creation_method === "Section") {

				if (currSectionList.length === 0) {
					currClass = currClassList.pop();
					currSectionList = currClassSectionlist[currClass].slice();
				}

				var currSection = currSectionList.pop();

				generalId = "class_" + currClass + "_Section_" + currSection;

			} else {
				currClass = currClassList.pop();

				generalId = "class_" + currClass;
			}

			var currId = generalId + "_" + column;
			$("#" + currId).parent().removeClass("invalid");

			var currTeacherValue = $("#" + currId).val();
			columnTeachers.push(currTeacherValue);
			columnIds.push(currId);

		}

		for (var i = 0; i < columnTeachers.length; i++) {

			for (var j = 0; j < columnTeachers.length; j++) {

				if ((i !== j) && (columnTeachers[i] !== "free" && columnTeachers[i] != undefined) && (columnTeachers[j] == columnTeachers[i])) {

					$("#" + columnIds[i]).parent().addClass("invalid");
					$("#" + columnIds[j]).parent().addClass("invalid");

					$("#timeTableErrorMessage").fadeIn(function () {
						if ($("#sideBar").css("position") === "fixed") {
							$(this).css("display", "inline-flex");

						}
					});

					$("#timeTableErrorMessage .error-message").html("One Teacher can not teach two classes at the same time.");

					skip = true;
					break;

				}

			}
			if (skip) {
				break;
			}

		}

	}

	// Checks if more than two teachers have been assigned two periods.
	if (!skip) {
		var doubleTeachers = multipleTeachers.filter(function (multiple) {
			return (multiple === 2);
		});
		if (doubleTeachers.length > 2) {

			$("#timeTableErrorMessage").fadeIn(function () {
				if ($("#sideBar").css("position") === "fixed") {
					$(this).css("display", "inline-flex");

				}
			});

			$("#timeTableErrorMessage .error-message").html("No more than Two Teachers can have Double Periods in a Day.");

			$("#" + id).parents("tr").addClass("invalid");

			skip = true;
		}
	}

	// Checks the teacher and subject combinations against the weekly alotted values for each, warns if overflow.
	// Searches all periods and all classes/sections.
	if (!skip) {

		var result = checkTeacherSubjectCompliance(students, creation_method, teachers, time_table, TSSchedule, day);

		return result;

	}

	return false;

}

// Checks on Time Table Select Option Change if the Table complies with the Teacher_Subject_Schedule Table Rules.
function checkTeacherSubjectCompliance(students, creation_method, teachers, current_time_table, TSSchedule, day) {


	// Gets the total number of rows in the time table.
	var rows = 0;
	var classList = [];
	var classSectionList = {};

	var classNumber = 0;
	for (var x = 15; x >= 1; x--) {
		var classCurrent = students.filter(function (student) {
			return (student.Class_ID === x);
		});

		if (classCurrent.length > 0) {
			classList.push(x);
			classNumber++;
		}
	}

	if (creation_method === "Class") {

		rows = classNumber;

	} else if (creation_method === "Section") {

		var currClassList = classList.slice();
		for (var w = currClassList.length; w >= 1; w--) {

			var currClass = currClassList.pop();

			var sectionList = [];

			for (var x = 5; x >= 1; x--) {

				var sectionCurrent = students.filter(function (student) {
					return (student.Section_ID == x && student.Class_ID == currClass);
				});

				if (sectionCurrent.length > 0) {
					sectionList.push(x);
					rows++;
				}

			}

			classSectionList[currClass] = sectionList;

		}

	}

	// Iterates over all the teachers and looks over all the subjects they have been assigned to find problems.
	for (var a = 0; a < teachers.length; a++) {

		var currTeacherID = teachers[a].ID;

		// Stores all the subjects assigned to the teacher in the time_table for that day.
		var currTeacher = {
			"ID": currTeacherID,
			"Subject_1": 0,
			"Subject_2": 0,
			"Subject_3": 0,
			"Subject_4": 0,
			"Subject_5": 0,
			"Subject_6": 0,
			"Subject_7": 0,
			"Subject_8": 0,
		}

		var currClassList = classList.slice();
		var currClass = undefined;
		var currClassSectionlist = classSectionList;
		var currSectionList = [];

		for (var i = 1; i <= rows; i++) {

			var generalId;

			// Generates the general id, the starting part of all the id's for the current row.
			if (creation_method === "Section") {

				if (currSectionList.length === 0) {
					currClass = currClassList.pop();
					currSectionList = currClassSectionlist[currClass].slice();
				}

				var currSection = currSectionList.pop();

				generalId = "class_" + currClass + "_Section_" + currSection;

			} else {
				currClass = currClassList.pop();

				generalId = "class_" + currClass;
			}

			for (var j = 1; j <= 8; j++) {

				var currCellTeacher = parseInt($("#" + generalId + "_Period_" + j + "_Teacher").val());
				var currCellSubject = $("#" + generalId + "_Period_" + j + "_Subject").val();

				if (!isNaN(currCellTeacher) && (currCellTeacher == currTeacher.ID) && (currCellSubject != "free")) {

					for (var k = 1; k <= 8; k++) {

						if (teachers[a].Teacher["Subject_" + k] == parseInt(currCellSubject)) {

							currTeacher["Subject_" + k] = currTeacher["Subject_" + k] + 1;

						}

					}

				}

			}

		}

		// Gets all the subjects that have been already assigned to ther teacher on other days.
		var currTeacherAlreadyAdded = {
			"ID": currTeacherID,
			"Subject_1": 0,
			"Subject_2": 0,
			"Subject_3": 0,
			"Subject_4": 0,
			"Subject_5": 0,
			"Subject_6": 0,
			"Subject_7": 0,
			"Subject_8": 0,
		}

		for (var x = 0; x < current_time_table.length; x++) {

			if (current_time_table[x].Day_ID !== day) {

				for (var y = 1; y <= 8; y++) {

					var currCellSubjectID = current_time_table[x]["Period_" + y + "_Subject_ID"];
					var currCellTeacherID = current_time_table[x]["Period_" + y + "_Teacher_ID"];

					if (currCellTeacherID == currTeacherAlreadyAdded.ID && currCellSubjectID != null) {

						if (currCellTeacherID === 3)
							for (var k = 1; k <= 8; k++) {

								if (teachers[a].Teacher["Subject_" + k] == currCellSubjectID) {
									currTeacherAlreadyAdded["Subject_" + k] = currTeacherAlreadyAdded["Subject_" + k] + 1;
								}

							}

					}

				}

			}

		}

		var curr_Total = TSSchedule.filter(function (schedule) {
			return (schedule.Teacher_ID == currTeacher.ID);
		});

		curr_Total = curr_Total[0];

		var problem = false;
		for (var x = 1; x <= 8; x++) {

			if (currTeacher.ID === 3)

				var currCounted = currTeacher["Subject_" + x] + currTeacherAlreadyAdded["Subject_" + x];

			if (currCounted > curr_Total["Subject_" + x + "_Periods"]) {

				var currTeacherName = teachers.filter(function (teacher) {
					return (teacher.ID == currTeacher.ID);
				});
				var currSubjectName = teachers[a].Teacher["Subject_" + x];

				$("#timeTableErrorMessage").fadeIn(function () {
					if ($("#sideBar").css("position") === "fixed") {
						$(this).css("display", "inline-flex");

					}
				});
				$("#timeTableErrorMessage .error-message").html("The Total Alloted Weekly Periods for the Teacher '" + currTeacherName[0].Name +
					"' and Subject '" + getSubjectName(currSubjectName) + "' are " +
					curr_Total["Subject_" + x + "_Periods"] + ". You have Entered " + currCounted + ".");

				problem = true;
				break;

			}

		}

		if (problem) {
			break;
		}

	}

	if (problem) {
		return false;
	} else {
		return true;
	}

}

// Copy Time Table Data from another day.
function timeTableCopy(dayFrom, dayTo, time_table, creation_method, students, teachers, creation_method, periods) {

	// Gets the total number of rows in the time table.
	var rows = 0;
	var classList = [];
	var classSectionList = {};

	var classNumber = 0;
	for (var x = 15; x >= 1; x--) {
		var classCurrent = students.filter(function (student) {
			return (student.Class_ID === x);
		});

		if (classCurrent.length > 0) {
			classList.push(x);
			classNumber++;
		}
	}

	if (creation_method === "Class") {

		rows = classNumber;

	} else if (creation_method === "Section") {

		var currClassList = classList.slice();
		for (var w = currClassList.length; w >= 1; w--) {

			var currClass = currClassList.pop();

			var sectionList = [];

			for (var x = 5; x >= 1; x--) {

				var sectionCurrent = students.filter(function (student) {
					return (student.Section_ID == x && student.Class_ID == currClass);
				});

				if (sectionCurrent.length > 0) {
					sectionList.push(x);
					rows++;
				}

			}

			classSectionList[currClass] = sectionList;

		}

	}

	var timeTableFrom = time_table.filter(function (time) {
		return (time.Day_ID == dayFrom);
	});

	var timeTableTo = time_table.filter(function (time) {
		return (time.Day_ID == dayTo);
	});

	var dayFromPeriods = periods["day_" + dayFrom];
	var dayToPeriods = periods["day_" + dayTo];

	var currClassSectionlist = classSectionList;
	var currSectionList = [];
	var currClassList = classList.slice();
	var currClass = undefined;
	var currSection = null;

	for (var i = 0; i < rows; i++) {

		var generalId;

		if (creation_method === "Section") {

			if (currSectionList.length === 0) {
				currClass = currClassList.pop();
				currSectionList = currClassSectionlist[currClass].slice();
			}

			currSection = currSectionList.pop();

			generalId = "class_" + currClass + "_Section_" + currSection;

		} else {
			currClass = currClassList.pop();

			generalId = "class_" + currClass;
		}

		var currTimeTableFrom = timeTableFrom.filter(function (time) {
			return (time.Class_ID === currClass && time.Section_ID === currSection);
		});

		for (var j = 1; j <= 8; j++) {

			var currGeneralId = generalId + "_Period_" + j;

			if (currTimeTableFrom.length > 0 && dayFromPeriods >= j && dayToPeriods >= j) {

				var subject = currTimeTableFrom[0][`Period_${j}_Subject_ID`] === null ? "free" : currTimeTableFrom[0][`Period_${j}_Subject_ID`];
				var teacher = currTimeTableFrom[0][`Period_${j}_Teacher_ID`] === null ? "free" : currTimeTableFrom[0][`Period_${j}_Teacher_ID`];

				$(`#${currGeneralId}_Subject`).val(subject).change();
				$(`#${currGeneralId}_Teacher`).val(teacher).change();

			}

		}


	}

}

// Verifies the time table for submission.
function verifyTimeTable(students, creation_method, teachers, time_table, TSSchedule, CSDetails, CSSchedule) {

	var classList = [];
	var sectionList = [];

	// Gets the total number of rows in the time table.
	var rows = 0;
	var classList = [];
	var classSectionList = {};

	var classNumber = 0;
	for (var x = 15; x >= 1; x--) {
		var classCurrent = students.filter(function (student) {
			return (student.Class_ID === x);
		});

		if (classCurrent.length > 0) {
			classList.push(x);
			classNumber++;
		}
	}

	if (creation_method === "Class") {

		rows = classNumber;

	} else if (creation_method === "Section") {

		var currClassList = classList.slice();
		for (var w = currClassList.length; w >= 1; w--) {

			var currClass = currClassList.pop();

			var sectionList = [];

			for (var x = 5; x >= 1; x--) {

				var sectionCurrent = students.filter(function (student) {
					return (student.Section_ID == x && student.Class_ID == currClass);
				});

				if (sectionCurrent.length > 0) {
					sectionList.push(x);
					rows++;
				}

			}

			classSectionList[currClass] = sectionList;

		}

	}

	var currClassSectionlist = classSectionList;
	var currSectionList = [];
	var currClassList = classList.slice();
	var currClass = undefined;

	var skip = false;

	// Subject and Teacher Individual Checks.
	for (var i = 1; i <= rows; i++) {

		var generalId;

		if (creation_method === "Section") {

			if (currSectionList.length === 0) {
				currClass = currClassList.pop();
				currSectionList = currClassSectionlist[currClass].slice();
			}

			var currSection = currSectionList.pop();

			generalId = "class_" + currClass + "_Section_" + currSection;

		} else {
			currClass = currClassList.pop();

			generalId = "class_" + currClass;
		}

		for (var j = 1; j <= 8; j++) {

			// Subject Checks.
			var sujbectId = generalId + "_Period_" + j + "_Subject";
			var generalSubjectId = sujbectId.slice(0, -9);
			var rowSubjects = [];

			for (var p = 1; p <= 8; p++) {
				$("#" + generalSubjectId + p + "_Subject").parent().removeClass("invalid");
				var curr = $("#" + generalSubjectId + p + "_Subject").val();
				rowSubjects[p - 1] = curr;
			}

			// Checks if more than 3 Periods have been assigned to the same subject.
			var multipleSubjects = [],
				no = 0;
			for (var p = 0; p < 7; p++) {

				multipleSubjects[no] = 1;
				for (var q = p + 1; q < 8; q++) {
					if ((rowSubjects[p] != "free" && rowSubjects[p] != undefined) && (rowSubjects[p] === rowSubjects[q])) {
						multipleSubjects[no]++;
					}
				}

				if (multipleSubjects[no] > 2) {

					$("#timeTableErrorMessage").fadeIn(function () {
						if ($("#sideBar").css("position") === "fixed") {
							$(this).css("display", "inline-flex");
	
						}
					});

					$("#timeTableErrorMessage .error-message").html("One Subject Can not have more than two periods in a day.");

					for (var r = 0; r < 8; r++) {
						if (rowSubjects[p] == rowSubjects[r]) {
							$("#" + generalSubjectId + (r + 1) + "_Subject").parent().addClass("invalid");
						}
					}
					skip = true;
					break;
				}

				if (multipleSubjects[no] === 2) {
					no++;
				}
			}

			// Checks if more than two subject have been assigned two periods.
			if (!skip) {
				var doubleSubjects = multipleSubjects.filter(function (multiple) {
					return (multiple === 2);
				});
				if (doubleSubjects.length > 2) {

					$("#timeTableErrorMessage").fadeIn(function () {
						if ($("#sideBar").css("position") === "fixed") {
							$(this).css("display", "inline-flex");

						}
					});

					$("#timeTableErrorMessage .error-message").html("No more than Two Subjects can have Double Periods in a Day.");

					$("#" + sujbectId).parents("tr").addClass("invalid");

					skip = true;
				}
			}


			// Checks the subjects against the weekly alotted values for each, warns if overflow.
			if (!skip) {

				var class_ID = parseInt(sujbectId.split('_')[1]);
				var name = $(this).html();
				var section_ID = null;
				if (sujbectId.includes("Section")) {
					section_ID = parseInt(sujbectId.split('_')[3]);
				}

				var subjectDetails = [];

				if (section_ID === null) {
					var currDetails = CSDetails["Class_" + class_ID];
					subjectDetails = currDetails.filter(function (detail) {
						return (detail.Section_ID == null)
					});
					subjectDetails = subjectDetails[0];
				} else {
					var currDetails = CSDetails["Class_" + class_ID];
					subjectDetails = currDetails.filter(function (detail) {
						return (detail.Section_ID == section_ID)
					});
					subjectDetails = subjectDetails[0];
				}

				for (var p = 1; p <= 8; p++) {

					var currSubject = subjectDetails["Subject_" + p];

					if (currSubject != null) {

						var currTotal = CSSchedule.filter(function (curr) {
							return (curr.Class_ID == class_ID);
						});

						currTotal = currTotal[0]["Subject_" + currSubject + "_Periods"];

						var currSubjectPeriods = rowSubjects.filter(function (subject) {
							return (subject == currSubject);
						});

						var currSubjectPeriodsAlreadyAdded = 0;
						if (time_table !== "") {
							for (var q = 0; q < 7; q++) {

								var currTimeTable = time_table.filter(function (time) {
									return (time.Class_ID == class_ID && time.Section_ID == section_ID && time.Day_ID == q);
								});

								if (currTimeTable.length > 0) {
									currTimeTable = currTimeTable[0];

									for (var r = 1; r <= 8; r++) {
										if (currTimeTable["Period_" + r + "Subject_ID"] == currSubject) {
											currSubjectPeriodsAlreadyAdded++;
										}
									}
								}

							}
						}

						var currSubjectsCounted = currSubjectPeriods.length + currSubjectPeriodsAlreadyAdded;
						if (currSubjectsCounted > currTotal) {

							$("#timeTableErrorMessage").fadeIn(function () {
								if ($("#sideBar").css("position") === "fixed") {
									$(this).css("display", "inline-flex");
			
								}
							});

							$("#timeTableErrorMessage .error-message").html("The Total Alloted Weekly Periods for the highlighted Subject are: " +
								currTotal + ". You have Entered: " + currSubjectsCounted + ".");

							for (var l = 1; l <= 8; l++) {
								if (currSubject == rowSubjects[l]) {
									$("#" + generalSubjectId + l + "_Subject").parent().addClass("invalid");
								}
							}

							skip = true;
							break;
						}

					}
				}

			}

			// Teacher Checks.
			var teacherId = generalId + "_Period_" + j + "_Teacher";
			var generalTeacherId = teacherId.slice(0, -9);
			var rowTeachers = [];
			if (!skip) {
				for (var p = 1; p <= 8; p++) {
					$("#" + generalTeacherId + p + "_Teacher").parent().removeClass("invalid");
					var curr = $("#" + generalTeacherId + p + "_Teacher").val();
					rowTeachers[p - 1] = curr;
				}
			}

			// Checks if more than 2 Periods have been assigned to the same teacher.
			// DEPRECIATED: SEE ABOVEIN CHECKTEACHERCOMPLIANCE.
			var multipleTeachers = [],
				no = 0;
			if (!skip) {

				for (var p = 0; p < 7; p++) {

					multipleTeachers[no] = 1;
					for (var q = p + 1; q < 8; q++) {
						if ((rowTeachers[p] != "free" && rowTeachers[p] != undefined) && (rowTeachers[p] === rowTeachers[q])) {
							multipleTeachers[no]++;
						}
					}

					/*
					if (multipleTeachers[no] > 2) {

						$("#timeTableErrorMessage").fadeIn();
						$("#timeTableErrorMessage .error-message").html("One Teacher Can not have more than Two Periods in a Day.");

						for (var r = 0; r < 8; r++) {
							if (rowTeachers[q] == rowTeachers[r]) {
								$("#" + generalTeacherId + (r + 1) + "_Teacher").parent().addClass("invalid");
							}
						}
						skip = true;
						break;
					}
					*/

					if (multipleTeachers[no] === 2) {
						no++;
					}
				}

			}

			// Checks if the same teacher has been allocated another class in the same period slot.
			if (!skip) {

				var columnTeachers = [];
				var columnIds = [];
				var classTeachersList = classList.slice();
				var sectionTeachersList = classSectionList;
				var currSectionTeacherslist = [];

				var column = teacherId.slice(-16);

				var currTeachersClass = undefined;

				for (var p = 0; p < rows; p++) {

					var generalTeacherId;

					if (creation_method === "Section") {

						if (currSectionTeacherslist.length === 0) {
							currTeachersClass = classTeachersList.pop();
							currSectionTeacherslist = sectionTeachersList[currTeachersClass].slice();
						}

						currSection = currSectionTeacherslist.pop();

						generalTeacherId = "class_" + currTeachersClass + "_Section_" + currSection;

					} else {
						currTeachersClass = classTeachersList.pop();

						generalTeacherId = "class_" + currTeachersClass;
					}

					var currId = generalTeacherId + "_" + column;
					$("#" + currId).parent().removeClass("invalid");

					var currTeacherValue = $("#" + currId).val();
					columnTeachers.push(currTeacherValue);
					columnIds.push(currId);

				}

				for (var p = 0; p < columnTeachers.length; p++) {

					for (var q = 0; q < columnTeachers.length; q++) {

						if ((p !== q) && (columnTeachers[p] !== "free" && columnTeachers[p] != undefined) && (columnTeachers[q] == columnTeachers[p])) {

							$("#" + columnIds[p]).parent().addClass("invalid");
							$("#" + columnIds[q]).parent().addClass("invalid");

							$("#timeTableErrorMessage").fadeIn(function () {
								if ($("#sideBar").css("position") === "fixed") {
									$(this).css("display", "inline-flex");

								}
							});

							$("#timeTableErrorMessage .error-message").html("One Teacher can not teach two classes at the same time.");

							skip = true;
							break;

						}

					}

					if (skip) {
						break;
					}

				}

			}

			// Checks if more than two teachers have been assigned two periods.
			if (!skip) {
				var doubleTeachers = multipleTeachers.filter(function (multiple) {
					return (multiple === 2);
				});
				if (doubleTeachers.length > 2) {

					$("#timeTableErrorMessage").fadeIn(function () {
						if ($("#sideBar").css("position") === "fixed") {
							$(this).css("display", "inline-flex");

						}
					});

					$("#timeTableErrorMessage .error-message").html("No more than Two Teachers can have Double Periods in a Day.");

					$("#" + teacherId).parents("tr").addClass("invalid");

					skip = true;
				}
			}

			if (skip) {
				break;
			}
		}

		if (skip) {
			break;
		}
	}

	// Teacher Subject Combined Checks.
	// Compares the alotted periods for each teacher and subject against assigned periods.
	if (!skip) {

		for (var a = 0; a < teachers.length; a++) {

			var currClassSectionlist = classSectionList;
			var currSectionList = [];
			var currClassList = classList.slice();
			var currClass = undefined;

			var currTeacherID = teachers[a].ID;
			var currTeacher = {
				"ID": currTeacherID,
				"Subject_1": 0,
				"Subject_2": 0,
				"Subject_3": 0,
				"Subject_4": 0,
				"Subject_5": 0,
				"Subject_6": 0,
				"Subject_7": 0,
				"Subject_8": 0,
			}

			for (var i = 1; i <= rows; i++) {

				var generalId;

				if (creation_method === "Section") {

					if (currSectionList.length === 0) {
						currClass = currClassList.pop();
						currSectionList = currClassSectionlist[currClass].slice();
					}

					var currSection = currSectionList.pop();

					generalId = "class_" + currClass + "_Section_" + currSection;

				} else {
					currClass = currClassList.pop();

					generalId = "class_" + currClass;
				}

				for (var j = 1; j <= 8; j++) {

					var currCellTeacher = parseInt($("#" + generalId + "_Period_" + j + "_Teacher").val());
					var currCellSubject = $("#" + generalId + "_Period_" + j + "_Subject").val();

					if (!isNaN(currCellTeacher) && currCellTeacher == currTeacher.ID && currCellSubject != "free") {

						for (var k = 1; k <= 8; k++) {

							if (teachers[a].Teacher["Subject_" + k] == parseInt(currCellSubject)) {
								currTeacher["Subject_" + k] = currTeacher["Subject_" + k] + 1;
							}

						}

					}

				}

			}

			var currTeacherAlreadyAdded = {
				"ID": currTeacherID,
				"Subject_1": 0,
				"Subject_2": 0,
				"Subject_3": 0,
				"Subject_4": 0,
				"Subject_5": 0,
				"Subject_6": 0,
				"Subject_7": 0,
				"Subject_8": 0,
			}

			if (time_table !== "") {

				var currTimeTable = [];
				if (creation_method === "Class") {

					currTimeTable = time_table.filter(function (time) {
						return (time.Class_ID == class_ID && time.Section_ID == null);
					});

				} else {

					currTimeTable = time_table.filter(function (time) {
						return (time.Class_ID == class_ID && time.Section_ID != null);
					});

				}

				for (var x = 0; x < currTimeTable.length; x++) {

					for (var y = 1; y <= 8; y++) {

						var currCellSubjectID = currTimeTable[x]["Period_" + y + "_Subject_ID"];
						var currCellTeacherID = currTimeTable[x]["Period_" + y + "_Teacher_ID"];

						if (currCellTeacherID == currTeacherAlreadyAdded.ID && currCellSubjectID != null) {

							for (var k = 1; k <= 8; k++) {

								if (teachers[a].Teacher["Subject_" + k] == currCellSubjectID) {
									currTeacherAlreadyAdded["Subject_" + k] = currTeacherAlreadyAdded["Subject_" + k] + 1;
								}

							}

						}

					}

				}

			}

			var curr_Total = TSSchedule.filter(function (schedule) {
				return (schedule.Teacher_ID == currTeacher.ID);
			});

			curr_Total = curr_Total[0];

			for (var x = 1; x <= 8; x++) {

				var currCounted = currTeacher["Subject_" + x] + currTeacherAlreadyAdded["Subject_" + x];

				if (currCounted > curr_Total["Subject_" + x + "_Periods"]) {


					var currTeacherName = teachers.filter(function (teacher) {
						return (teacher.ID == currTeacher.ID);
					});
					var currSubjectName = teachers[a].Teacher["Subject_" + x];

					$("#timeTableErrorMessage").fadeIn(function () {
						if ($("#sideBar").css("position") === "fixed") {
							$(this).css("display", "inline-flex");
	
						}
					});

					$("#timeTableErrorMessage .error-message").html("The Total Alloted Weekly Periods for the Teacher '" + currTeacherName[0].Name +
						"' and Subject '" + getSubjectName(currSubjectName) + "' are " +
						curr_Total["Subject_" + x + "_Periods"] + ". You have Entered " + currCounted + ".");

					skip = true;
					break;

				}

			}


		}
	}

	if (skip) {
		return false;
	} else {
		return true;
	}

}

// Generates the Subject Overview weekly table. Shows the weekly status of the Subjects' Subjects.
function getClassOverviewTable(CSDetails, CSSchedule, time_table, day) {

	var tableBody = "<table><thead><th></th><th>S1</th><th>S2</th><th>S3</th><th>S4</th><th>S5</th><th>S6</th><th>S7</th><th>S8</th></thead><tbody>";

	$(".time-table-name").each(function () {

		var id = $(this).attr("id");
		var name;

		var class_ID = parseInt(id.split('_')[1]);

		var generalId = "class_" + class_ID;

		name = getClassName(class_ID);

		var section_ID = null;
		if (id.includes("Section")) {
			section_ID = parseInt(id.split('_')[3]);
			name += " " + getSectionName(section_ID);
			generalId += "_Section_" + section_ID;
		}

		tableBody += "<tr><td>" + name + "</td>";

		// Get the subjects added for the class on the current table.
		var rowSubjects = [];
		for (var i = 1; i <= 8; i++) {
			var currPeriod = $("#" + generalId + "_Period_" + i + "_Subject").val();
			rowSubjects.push(currPeriod);
		}

		var subjectDetails = [];

		if (section_ID === null) {

			var currDetails = CSDetails["Class_" + class_ID];
			subjectDetails = currDetails.filter(function (detail) {
				return (detail.Section_ID == null)
			});
			subjectDetails = subjectDetails[0];

		} else {

			var currDetails = CSDetails["Class_" + class_ID];
			subjectDetails = currDetails.filter(function (detail) {
				return (detail.Section_ID == section_ID)
			});
			subjectDetails = subjectDetails[0];

		}

		// Get the subjects added for the Class elsewhere in the time table.
		for (var i = 1; i <= 8; i++) {

			var currSubject = subjectDetails["Subject_" + i];

			if (currSubject != null) {

				var currTotal = CSSchedule.filter(function (curr) {
					return (curr.Class_ID == class_ID);
				});

				currTotal = currTotal[0]["Subject_" + currSubject + "_Periods"];

				var currSubjectPeriods = rowSubjects.filter(function (subject) {
					return (subject == currSubject);
				});

				var currSubjectPeriodsAlreadyAdded = 0;
				if (time_table !== "") {

					for (var j = 0; j < 7; j++) {

						if (day !== j) {

							var currTimeTable = time_table.filter(function (time) {
								return (time.Class_ID == class_ID && time.Section_ID == section_ID && time.Day_ID == j);
							});

							if (currTimeTable.length > 0) {
								currTimeTable = currTimeTable[0];

								for (var r = 1; r <= 8; r++) {

									if (currTimeTable["Period_" + r + "_Subject_ID"] == currSubject) {
										currSubjectPeriodsAlreadyAdded++;
									}

								}

							}

						}

					}

				}

				var currCounted = currSubjectPeriods.length + currSubjectPeriodsAlreadyAdded;

				tableBody += `<td><div>${getSubjectName(currSubject)}</div><div>${currCounted} / ${currTotal}</div></td>`;

			} else {
				tableBody += `<td class="disabled"></td>`;
			}

		}

		tableBody += "</tr>";

	});

	tableBody += "</tbody></table>"

	return tableBody;

}

// Generates the Teacher Overview weekly table. Shows the weekly status of the Teachers' Subjects.
function getTeacherOverviewTable(students, creation_method, teachers, time_table, TSSchedule, day) {

	var classList = [];
	var classSectionList = [];
	var rows = 0;

	var tableBody = "<table><thead><th></th><th>S1</th><th>S2</th><th>S3</th><th>S4</th><th>S5</th><th>S6</th><th>S7</th><th>S8</th></thead><tbody>";

	var classNumber = 0;
	for (var x = 15; x >= 1; x--) {

		var classCurrent = students.filter(function (student) {
			return (student.Class_ID === x);
		});

		if (classCurrent.length > 0) {
			classList.push(x);
			classNumber++;
		}

	}

	if (creation_method === "Class") {
		rows = classNumber;
	} else if (creation_method === "Section") {

		var currClassList = classList.slice();
		for (var w = currClassList.length; w >= 1; w--) {

			var currClass = currClassList.pop();

			var sectionList = [];

			for (var x = 5; x >= 1; x--) {

				var sectionCurrent = students.filter(function (student) {
					return (student.Section_ID == x && student.Class_ID == currClass);
				});

				if (sectionCurrent.length > 0) {
					sectionList.push(x);
					rows++;
				}

			}

			classSectionList[currClass] = sectionList;

		}

	}

	for (var a = 0; a < teachers.length; a++) {

		var currClassSectionlist = classSectionList;
		var currSectionList = [];
		var currClassList = classList.slice();
		var currClass = undefined;

		var currTeacherID = teachers[a].ID;
		var currTeacher = {
			"ID": currTeacherID,
			"Subject_1": 0,
			"Subject_2": 0,
			"Subject_3": 0,
			"Subject_4": 0,
			"Subject_5": 0,
			"Subject_6": 0,
			"Subject_7": 0,
			"Subject_8": 0,
		}

		tableBody += "<tr>"

		for (var i = 1; i <= rows; i++) {

			var generalId;

			if (creation_method === "Section") {

				if (currSectionList.length === 0) {
					currClass = currClassList.pop();
					currSectionList = currClassSectionlist[currClass].slice();
				}

				currSection = currSectionList.pop();

				generalId = "class_" + currClass + "_Section_" + currSection;

			} else {
				currClass = currClassList.pop();

				generalId = "class_" + currClass;
			}

			for (var j = 1; j <= 8; j++) {

				var currCellTeacher = parseInt($("#" + generalId + "_Period_" + j + "_Teacher").val());
				var currCellSubject = $("#" + generalId + "_Period_" + j + "_Subject").val();

				if (currCellTeacher == currTeacher.ID && currCellSubject != "free") {

					for (var k = 1; k <= 8; k++) {

						if (teachers[a].Teacher["Subject_" + k] == currCellSubject) {
							currTeacher["Subject_" + k] = currTeacher["Subject_" + k] + 1;
						}

					}

				}

			}

		}

		var currTeacherAlreadyAdded = {
			"ID": currTeacherID,
			"Subject_1": 0,
			"Subject_2": 0,
			"Subject_3": 0,
			"Subject_4": 0,
			"Subject_5": 0,
			"Subject_6": 0,
			"Subject_7": 0,
			"Subject_8": 0,
		}

		if (time_table !== "") {

			var timeTable;
			if (creation_method === "Section") {
				timeTable = time_table.filter(function (time) {
					return (time.Section_ID != null);
				});
			} else {
				timeTable = time_table.filter(function (time) {
					return (time.Section_ID == null);
				});
			}

			for (var x = 0; x < timeTable.length; x++) {

				for (var y = 1; y <= 8; y++) {

					var currCellSubjectID = timeTable[x]["Period_" + y + "_Subject_ID"];
					var currCellTeacherID = parseInt(timeTable[x]["Period_" + y + "_Teacher_ID"]);

					if (timeTable[x]["Day_ID"] != day) {

						if (!isNaN(currCellTeacherID) && currCellTeacherID == currTeacherAlreadyAdded.ID && currCellSubjectID != null) {

							for (var k = 1; k <= 8; k++) {

								if (teachers[a].Teacher["Subject_" + k] == parseInt(currCellSubjectID)) {
									currTeacherAlreadyAdded["Subject_" + k] = currTeacherAlreadyAdded["Subject_" + k] + 1;
								}

							}

						}

					}

				}

			}

		}

		var curr_Total = TSSchedule.filter(function (schedule) {
			return (schedule.Teacher_ID == currTeacher.ID);
		});

		curr_Total = curr_Total[0];

		var currTeacherName = teachers.filter(function (teacher) {
			return (teacher.ID == currTeacher.ID);
		});

		tableBody += `<td>${currTeacherName[0].Name}</td>`;

		for (var x = 1; x <= 8; x++) {

			var currCounted = currTeacher["Subject_" + x] + currTeacherAlreadyAdded["Subject_" + x];

			var currSubjectName = teachers[a].Teacher["Subject_" + x];

			if (getSubjectName(currSubjectName) !== "None") {
				tableBody += `
					<td>
						<div>${getSubjectName(currSubjectName)}</div>
						<div>${currCounted} / ${curr_Total["Subject_" + x + "_Periods"]}</div>
					</td>`;
			} else {
				tableBody += "<td class='disabled'></td>";
			}

		}

		tableBody += "</tr>"

	}

	tableBody += "</tbody></table>";

	return tableBody;

}

function setTimeTableViewTableByClass(screenOrPrint, time_table, class_id, section_id, leaveSunday, leaveFriday, leaveSaturday, method, teachers) {

	var tableHeader = "",
		tableBody = "";

	tableHeader = '<th><span class="time-table-first-column"><span>Periods&#8594;</span><span>Days&#8595;</span></span></th>';
	for (var i = 1; i <= 8; i++) {
		tableHeader += `<th>Period ${i}</th>`;
	}

	var rows = [];

	if (method === "sections") {

		rows = time_table.filter(function (row) {
			return (row.Class_ID == class_id && row.Section_ID == section_id);
		});

	} else {

		rows = time_table.filter(function (row) {
			return (row.Class_ID == class_id && row.Section_ID == null);
		});

	}

	for (var i = 0; i < 7; i++) {

		if ((i == 0 && leaveSunday.length == 0) || (i == 5 && leaveFriday.length == 0) || (i == 6 && leaveSaturday.length == 0) || (i !== 0 && i !== 5 && i !== 6)) {
			tableBody += "<tr><td>" + getDayName(i) + "</td>";

			var currentRow = rows.filter(function (row) {
				return (row.Day_ID == i);
			});

			if (currentRow.length > 0) {
				currentRow = currentRow[0];

				for (var j = 1; j <= 8; j++) {

					var subject = currentRow["Period_" + j + "_Subject_ID"] == null ? "" : getSubjectName(currentRow["Period_" + j + "_Subject_ID"]);
					var teacher = "";

					if (currentRow["Period_" + j + "_Teacher_ID"] != null) {

						teacher = teachers.filter(function (teach) {
							return (teach.ID == currentRow["Period_" + j + "_Teacher_ID"]);
						});
						teacher = teacher[0].Name

					}

					tableBody += "<td><div>" + subject + "</div>";
					tableBody += "<div>" + teacher + "</div></td>";

				}

			} else {
				for (var j = 1; j <= 8; j++) {
					tableBody += "<td></td>";
				}
			}

			tableBody += "</tr>"

		}
	}

	// Shows the Table on the Screen.
	if (screenOrPrint === "screen") {

		if (method === "classes") {
			$("#timeTableViewTab h3").html("Class Breakdown: " + getClassName(class_id));
		} else {
			$("#timeTableViewTab h3").html("Section Breakdown, Class: " + getClassName(class_id) + ", Section: " + getSectionName(section_id));
		}

		$("#timeTableViewTable thead").html(tableHeader);
		$("#timeTableViewTable tbody").html(tableBody);
		$("#loadingScreen").fadeOut(200);

	}
	// Opens the Table in a pop up window for printing
	else {

		var heading = "Time Table Class Breakdown: " + getClassName(class_id);
		var formValues = {
			tableHeader: tableHeader,
			tableBody: tableBody,
			heading: heading,
			request: "timeTablePrint"
		};

		$.post("/", formValues, function (html) {

			// Open the Print Screen in a Pop up.
			var wnd = window.open("about:blank", "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no");
			wnd.document.write(html);
			wnd.document.close();
			$("#loadingScreen").fadeOut(200);

		});

	}

}

function setTimeTableViewTableByDay(screenOrPrint, time_table, students, day, method, teachers) {

	var tableHeader = "",
		tableBody = "";

	tableHeader = '<th><span class="time-table-first-column"><span>Periods&#8594;</span><span>Class&#8595;</span></span></th>';
	for (var i = 1; i <= 8; i++) {
		tableHeader += `<th>Period ${i}</th>`;
	}

	var timeTableDay = time_table.filter(function (row) {
		return (row.Day_ID == day);
	});

	// Gets the total number of rows in the time table.
	var rows = 0;
	var classList = [];
	var classSectionList = {};

	var classNumber = 0;
	for (var x = 15; x >= 1; x--) {
		var classCurrent = students.filter(function (student) {
			return (student.Class_ID === x);
		});

		if (classCurrent.length > 0) {
			classList.push(x);
			classNumber++;
		}
	}

	if (method === "classes") {

		rows = classNumber;

	} else if (method === "sections") {

		var currClassList = classList.slice();
		for (var w = currClassList.length; w >= 1; w--) {

			var currClass = currClassList.pop();

			var sectionList = [];

			for (var x = 5; x >= 1; x--) {

				var sectionCurrent = students.filter(function (student) {
					return (student.Section_ID == x && student.Class_ID == currClass);
				});

				if (sectionCurrent.length > 0) {
					sectionList.push(x);
					rows++;
				}

			}

			classSectionList[currClass] = sectionList;

		}

	}

	var currClassSectionlist = classSectionList;
	var currSectionList = [];
	var currClassList = classList.slice();
	var currClass = undefined;
	var currSection = null;

	for (var i = 0; i < rows; i++) {

		if (method === "sections") {

			if (currSectionList.length === 0) {
				currClass = currClassList.pop();
				currSectionList = currClassSectionlist[currClass].slice();
			}

			currSection = currSectionList.pop();

			tableBody += "<tr><td>" + getClassName(currClass) + " " + getSectionName(currSection) + "</td>";

		} else {
			currClass = currClassList.pop();

			tableBody += "<tr><td>" + getClassName(currClass) + "</td>";
		}


		var currentRow = timeTableDay.filter(function (row) {
			return (row.Class_ID == currClass && row.Section_ID == currSection);
		});

		if (currentRow)

			if (currentRow.length > 0) {

				currentRow = currentRow[0];

				for (var j = 1; j <= 8; j++) {

					var subject = currentRow["Period_" + j + "_Subject_ID"] == null ? "" : getSubjectName(currentRow["Period_" + j + "_Subject_ID"]);
					var teacher = "";

					if (currentRow["Period_" + j + "_Teacher_ID"] != null) {
						teacher = teachers.filter(function (teach) {
							return (teach.ID == currentRow["Period_" + j + "_Teacher_ID"]);
						});
						teacher = teacher[0].Name;
					}

					tableBody += "<td><div>" + subject + "</div>";
					tableBody += "<div>" + teacher + "</div></td>";
				}
			} else {

				for (var j = 1; j <= 8; j++) {
					tableBody += `<td></td>`;
				}
			}

		tableBody += "</tr>"

	}

	// Shows the Table on the Screen.
	if (screenOrPrint === "screen") {

		$("#timeTableViewTab h3").html("Daily Breakdown: " + getDayName(day));

		$("#timeTableViewTable thead").html(tableHeader);
		$("#timeTableViewTable tbody").html(tableBody);
		$("#loadingScreen").fadeOut(200);

	}
	// Opens the Table in a pop up window for printing
	else {

		var heading = "Time Table, Daily Breakdown: " + getDayName(day);
		var formValues = {
			tableHeader: tableHeader,
			tableBody: tableBody,
			heading: heading,
			request: "timeTablePrint"
		};

		$.post("/", formValues, function (html) {

			// Open the Print Screen in a Pop up.
			var wnd = window.open("about:blank", "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no");
			wnd.document.write(html);
			wnd.document.close();
			$("#loadingScreen").fadeOut(200);

		});

	}

}

// Sets the View Time Table Tab to Show Time Table by the given Teacher. Shows Weekly Time Table for the Teacher.
function setTimeTableViewTableByTeacher(screenOrPrint, time_table, students, teacher, teacherName, leaveSunday, leaveFriday, leaveSaturday, method, teachers) {

	var tableHeader = "",
		tableBody = "";

	tableHeader = '<th><span class="time-table-first-column"><span>Periods&#8594;</span><span>Days&#8595;</span></span></th>';
	for (var j = 1; j <= 8; j++) {
		tableHeader += `<th>Period ${j}</th>`;
	}

	// Iterates Over the Days.
	for (var i = 0; i < 7; i++) {

		var periods = [{
				Subject: "",
				Class: ""
			},
			{
				Subject: "",
				Class: ""
			},
			{
				Subject: "",
				Class: ""
			},
			{
				Subject: "",
				Class: ""
			},
			{
				Subject: "",
				Class: ""
			},
			{
				Subject: "",
				Class: ""
			},
			{
				Subject: "",
				Class: ""
			},
			{
				Subject: "",
				Class: ""
			}
		];

		var currDayTimeTable = time_table.filter(function (time) {
			return (time.Day_ID === i);
		});

		// Finds the Alloted Periods for the current Day.
		if (currDayTimeTable.length > 0) {

			// Gets the total number of rows in the time table.
			var rows = 0;
			var classList = [];
			var classSectionList = {};

			var classNumber = 0;
			for (var x = 15; x >= 1; x--) {
				var classCurrent = students.filter(function (student) {
					return (student.Class_ID === x);
				});

				if (classCurrent.length > 0) {
					classList.push(x);
					classNumber++;
				}
			}

			if (method === "classes") {

				rows = classNumber;

			} else if (method === "sections") {

				var currClassList = classList.slice();
				for (var w = currClassList.length; w >= 1; w--) {

					var currClass = currClassList.pop();

					var sectionList = [];

					for (var x = 5; x >= 1; x--) {

						var sectionCurrent = students.filter(function (student) {
							return (student.Section_ID == x && student.Class_ID == currClass);
						});

						if (sectionCurrent.length > 0) {
							sectionList.push(x);
							rows++;
						}

					}

					classSectionList[currClass] = sectionList;

				}

			}

			var currClassSectionlist = classSectionList;
			var currSectionList = [];
			var currClassList = classList.slice();
			var currClass = undefined;
			var currSection = null;

			// Iterates over the classes.
			for (var j = 0; j < rows; j++) {

				// Checks whether to show Class Or Section Time Table.
				if (method === "sections") {

					if (currSectionList.length === 0) {
						currClass = currClassList.pop();
						currSectionList = currClassSectionlist[currClass].slice();
					}

					currSection = currSectionList.pop();

					var currentClassTimeTable = currDayTimeTable.filter(function (current) {
						return (current.Class_ID === currClass && current.Section_ID == currSection);
					});

					if (currentClassTimeTable.length > 0) {

						// Iterates over the periods for the current Time Table.
						for (var k = 1; k <= 8; k++) {

							var currTeacher = currentClassTimeTable[0]["Period_" + k + "_Teacher_ID"];

							if (currTeacher == teacher) {
								periods[k - 1].Subject = getSubjectName(currentClassTimeTable[0]["Period_" + k + "_Subject_ID"]);
								periods[k - 1].Class = getClassName(currClass) + " " + getSectionName(currSection);
							}

						}

					}

				} else {

					currClass = currClassList.pop();

					var currentClassTimeTable = currDayTimeTable.filter(function (current) {
						return (current.Class_ID === currClass && current.Section_ID == null);
					});

					if (currentClassTimeTable.length > 0) {

						// Iterates over the periods for the current Time Table.
						for (var k = 1; k <= 8; k++) {

							var currTeacher = currentClassTimeTable[0]["Period_" + k + "_Teacher_ID"];

							if (currTeacher == teacher) {
								periods[k - 1].Subject = getSubjectName(currentClassTimeTable[0]["Period_" + k + "_Subject_ID"]);
								periods[k - 1].Class = getClassName(currClass);
							}

						}

					}

				}

				if (method === "classes") {

				} else {



				}

				var currClassTimeTable = currDayTimeTable.filter(function (current) {
					return (current.Class_ID === j);
				});

			}

		}

		// Sets the time table row for the current day.
		if ((i == 0 && leaveSunday.length == 0) || (i == 5 && leaveFriday.length == 0) || (i == 6 && leaveSaturday.length == 0) || (i !== 0 && i !== 5 && i !== 6)) {

			tableBody += "<tr><td>" + getDayName(i) + "</td>";

			for (var j = 1; j <= 8; j++) {

				tableBody += "<td><span>" + periods[j - 1].Class + "</span><span>" + periods[j - 1].Subject + "</span></td>";

			}

		}

		tableBody += "</tr>"

	}

	// Shows the Table on the Screen.
	if (screenOrPrint === "screen") {

		$("#timeTableViewTab h3").html("Teacher Breakdown: " + teacherName);

		$("#timeTableViewTable thead").html(tableHeader);
		$("#timeTableViewTable tbody").html(tableBody);
		$("#loadingScreen").fadeOut(200);

	}
	// Opens the Table in a pop up window for printing
	else {

		var heading = " Time Table Teacher Breakdown: " + teacherName;
		var formValues = {
			tableHeader: tableHeader,
			tableBody: tableBody,
			heading: heading,
			request: "timeTablePrint"
		};

		$.post("/", formValues, function (html) {

			// Open the Print Screen in a Pop up.
			var wnd = window.open("about:blank", "_blank", "toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no");
			wnd.document.write(html);
			wnd.document.close();
			$("#loadingScreen").fadeOut(200);

		});

	}

}

// Adds Phone Numbers to the Email List.
function addPhoneNumbersList(numbers) {
	$("#sendSMSMessageNumbers").html("<h4>Sending List</h4>");

	for (var i = 0; i < numbers.length; i++) {
		$("#sendSMSMessageNumbers").append('<span class="message-number"><span class="message-number-value">' + numbers[i] + '</span><span class="message-number-close">x</span></span>');
	}

	if (numbers.length === 0) {
		$("#messageBox span").html("No Student Found by Given Criteria.");
		$("#messageBox").fadeIn().delay(3000).fadeOut();
	}
}

// Adds Email Addresses to the Email List.
function addEmailList(emails) {
	$("#sendEmailMessageEmails").html("<h4>Sending List</h4>");

	for (var i = 0; i < emails.length; i++) {
		$("#sendEmailMessageEmails").append('<span class="message-email"><span class="message-email-value">' + emails[i] + '</span><span class="message-email-close">x</span></span>');
	}

	if (emails.length === 0) {
		$("#messageBox span").html("No Student Found by Given Criteria.");
		$("#messageBox").fadeIn().delay(3000).fadeOut();
	}
}

function getSubjectName(id) {

	let subjectsList = JSON.parse($("#settingsSubjectNamesList").val());
	return (subjectsList[id-1] === undefined ? "" : subjectsList[id-1]);
	
};

function getClassName(id) {
	return id == 1 ? "Kindergarten" : (id == 2 ? "Nursery" : (id == 3 ? "Prep" : (id == 4 ? "One" :
		(id == 5 ? "Two" : (id == 6 ? "Three" : (id == 7 ? "Four" :
			(id == 8 ? "Five" : (id == 9 ? "Six" : (id == 10 ? "Seven" :
				(id == 11 ? "Eight" : (id == 12 ? "Nine" : (id == 13 ? "Ten" :
					(id == 14 ? "First Year" : (id == 15 ? "Second Year" : (id == 99 ? "Left" : "None")))))))))))))));
}

function getDayName(day) {
	return day == 0 ? "Sunday" : (day == 1 ? "Monday" : (day == 2 ? "Tuesday" : (day == 3 ? "Wednesday" : (day == 4 ? "Thursday" :
		(day == 5 ? "Friday" : (day == 6 ? "Saturday" : "None"))))));
}

function getSectionName(section) {
	return section == 1 ? "A" : (section == 2 ? "B" : (section == 3 ? "C" : (section == 4 ? "D" : section == 5 ? "E" : "None")));
}

function getMonth(day) {
	return day == 1 ? "January" : (day == 2 ? "February" : (day == 3 ? "March" : (day == 4 ? "April" :
		(day == 5 ? "May" : (day == 6 ? "June" : (day == 7 ? "July" :
			(day == 8 ? "August" : (day == 9 ? "September" : (day == 10 ? "October" :
				(day == 11 ? "November" : (day == 12 ? "December" : "None")))))))))));
}
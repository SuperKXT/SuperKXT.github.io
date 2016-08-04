		$( document ).ready(function() {

			var fixmeTop = $("#nav").offset().top;       // get initial position of the element
			$(window).scroll(function() {                  // assign scroll event listener
				var currentScroll = $(window).scrollTop(); // get current position
				if (currentScroll >= fixmeTop) {           
					$("#nav").addClass("navFixed");
					// using css property to avoid the difference in width between jquery width and css.
					if($("#pullMenu").css("display") == "block") {
						if ($("#navbar").hasClass("navbarFixed")) {
							$("#navbar").addClass("navbarTop").removeClass("navbarFixed");
						}
						else {
							$("#navbar").addClass("navbarTop");
						}
					}
					else {
						if ($("#navbar").hasClass("navbarTop")) {
							$("#navbar").addClass("navbarFixed").removeClass("navbarTop");
						}
						else {
							$("#navbar").addClass("navbarFixed");
						}
					}
					$("li a").addClass("liaFixed");
					$(".horizontalLine").addClass("horizontalLineFixed");
					$("#barLogo").addClass("barLogoFixed");
					$("#pullMenu").addClass("pullMenuFixed");
					
				} 
				else {   				// apply position: static
					$("#nav").removeClass("navFixed");
					if ($("#navbar").hasClass("navbarFixed")) {
						$("#navbar").removeClass("navbarFixed");
					}
					else {
						$("#navbar").removeClass("navbarTop");
					}
					$("li a").removeClass("liaFixed");
					$(".horizontalLine").removeClass("horizontalLineFixed");
					$("#barLogo").removeClass("barLogoFixed");
					$("#pullMenu").removeClass("pullMenuFixed");
					if($("#pullMenu").css("display") == "block") {
						if ($("#navbar").hasClass("navbarFixed")) {
							$("#navbar").addClass("navbarTop").removeClass("navbarFixed");
						}
					}
					else {
						if ($("#navbar").hasClass("navbarTop")) {
							$("#navbar").addClass("navbarFixed").removeClass("navbarTop");
						}
					}
				}
			});
			
			$(window).resize(function() {
				if($("#navbar").hasClass("shownavbar")) {
					$("#navbar").removeClass("shownavbar");
				}
				if($("#navbar li").hasClass("showli")) {	
					$("#navbar li").removeClass("showli");
				}			
				if($("#pullMenu").css("display") == "block") {
					if ($("#navbar").hasClass("navbarFixed")) {
						$("#navbar").addClass("navbarTop").removeClass("navbarFixed");
					}
				}
				else {
					if ($("#navbar").hasClass("navbarTop")) {
							$("#navbar").addClass("navbarFixed").removeClass("navbarTop");
						}
				}
			});
			
			$("#pullMenu").click(function(){
				$("#navbar").toggleClass("shownavbar");
				$("#navbar li").toggleClass("showli");
			});
		});	
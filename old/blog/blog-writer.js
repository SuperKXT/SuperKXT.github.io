	$(document).ready(function()
    {	
		$(document).on("keypress", function(e) { 		
			if ( e.ctrlKey && e.altKey && ( e.which === 73 ) ) {
				var box = $("#textArea");
				box.val(box.val() + "&lt;img src=''&gt; &lt;/img&gt;");
			}
			else if ( e.ctrlKey && e.altKey && ( e.which === 77 ) ) {
				var box = $("#textArea");
				box.val(box.val() + "&lt;div class='caption'&gt; &lt;/div&gt;");
			}
			else if ( e.ctrlKey && e.altKey && ( e.which === 76 ) ) {
				var box = $("#textArea");
				box.val(box.val() + "&lt;a href='#'&gt; &lt;/img&gt;");
			}
			else if ( e.ctrlKey && e.altKey && ( e.which === 67 ) ) {
				var box = $("#textArea");
				box.val(box.val() + "&lt;div class='code'&gt; &lt;/div&gt;");
			}
			else if ( e.ctrlKey && e.altKey && ( e.which === 66 ) ) {
				var box = $("#textArea");
				box.val(box.val() + "&lt;br&gt;");
			}
		});
		
		var id;
		$(document).on("click", "#menu", function (event) {
			id = $(event.target).attr('id');
			var val = $("#textArea").value;
			if (id == "menuImage") {
				var box = $("#textArea");
				box.val(box.val() + "&lt;img src=''&gt; &lt;/img&gt;");
			}
			else if (id == "menuImageCaption") {
				var box = $("#textArea");
				box.val(box.val() + "&lt;div class='caption'&gt; &lt;/div&gt;");
			}
			else if (id == "menuLink") {
				var box = $("#textArea");
				box.val(box.val() + "&lt;a href='#'&gt; &lt;/img&gt;");
			}
			else if (id == "menuCode") {
				var box = $("#textArea");
				box.val(box.val() + "&lt;div class='code'&gt; &lt;/div&gt;");
			}
			else if(id== "menuNewLine") {
				var box = $("#textArea");
				box.val(box.val() + "&lt;br&gt؛");
			}
		});
	});

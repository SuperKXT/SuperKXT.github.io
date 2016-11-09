
	$(document).ready(function()
      {	
		var $all;	  
        $.get('blog/blog.xml', function(file){
			$(file).find('item').each(function(){

				var $item = $(this);				
				var id = $item.attr("id");
				var name = $item.find("title");
				var year = $item.find('year');
				var month = $item.find('month');
				var monthName = (month.text() == '01' ? 'January' : (month.text() == '02' ? 'February' : 
								(month.text() == '03' ? 'March' : (month.text() == '04' ? 'April' : 
								(month.text() == '05' ? 'May' : (month.text() == '06' ? 'June' : 
								(month.text() == '07' ? 'July' : (month.text() == '08' ? 'August' : 
								(month.text() == '09' ? 'September' : (month.text() == '10' ? 'October' : 
								(month.text() == '11' ? 'November' : (month.text() == '12' ? 'December' : 'invalid'))))))))))));
				
				var head = "<ul id='i" + year.text() + "'>" + year.text() + "</ul>";
				var subHead = "<ul id='i" + month.text() + "'>" + monthName + "</ul>";
				var content = "<li id='" + id + "'>" + name.text() + "</li>";
				$("#rightBar:not(:has(#i" + year.text() + "))").append(head);
				$("#i" + year.text() + ":not(:has(#i" + month.text() + "))").append(subHead);
				$("#i" + month.text()).append(content);
			});
			$all = $(file).find('item');
			var $first5 = $all.slice(0, 5);

			$first5.each(function(){
				getContent($(this));
			});
			
			label = 1;
			for(i=0; i<$all.length; i+=5) {
				var htm = "<div class='pagesButton'><a class='buttonLink'  pageNumber='" + (label-1) + "' href='javascript:void(0);'>" + label + "</a></div>";
				$("#pagesNav").append(htm);
				label++;
			}

			// See if a specific id is posted with the blog address.
			urlId();
		});
		
		function urlId() {
			var results = new RegExp('[\?&]' + "id" + '=([^&#]*)').exec(window.location.href);
			if (results == null){
				return null;
			}
			else {
				$.get('blog/blog.xml', function(file){
					var $item = $(file).find('item[id="' + results[1] + '"]');
					$("#mainSection").html('');
					getContent($item);
					$(document).scrollTop(0);					
				});			
			}
		}	

		function changePage(e) {
			var pageNo = $(e.target).attr("pageNumber");
			var start = pageNo * 5;
			var $current5 = $all.slice(start, start+5);
			$("#mainSection").html("");
			$current5.each(function(){
				getContent($(this));
			});
		}
		
		function getContent($item){
			var id = $item.attr("id");
			var name = $item.find("title");
			var text = $item.find('text');
			var year = $item.find('year');
			var month = $item.find('month');
			var day = $item.find('day');
			var date = day.text() + "/" + month.text() + "<br>" + year.text();				
				
			var htm = "<div class='blog'><div class='blogDate'>" + date + "</div>";
				htm += "<div class='blogTitle'>" + name.text() + "</div>";
				htm += "<div class='blogText'>" + text.text() + "</div></div><hr>";
					
			$("#mainSection").append(htm);
		}
		
		$(document).on('click', function(e){
			if($(e.target).is('ul')) {
				$(e.target).children().toggle();
				$(e.target).toggleClass('active');
			}
			else if ($(e.target).is('li')) {
				$.get('blog/blog.xml', function(file){
					var $item = $(file).find('item[id="' + $(e.target).attr('id') + '"]');
					$("#mainSection").html('');
					getContent($item);
					$(document).scrollTop(0);					
				});
			}
			else if(e.target.id == "searchButton") {
				var keywords = $("#searchBox").val().split(/\s+/);
				var i;
				$("#mainSection").html('');
				$.get('blog/blog.xml', function(file){
					$(file).find('item').each(function(){
						for(i=0; i<keywords.length; i++) {							
							var result;
							var $item = $(this);
							$item.find('keyword').each(function(){
								if(keywords[i] == $(this).text()) { result = 1; }
							});
							if(result == 1) {
								getContent($item);
								break;
							}
						}
					});
					$(document).scrollTop(0);
				});
			}
			else if($(e.target).attr('class') == 'buttonLink') {
				changePage(e);
			}
		});
		
		$("#searchBox").keyup(function(event){
			if(event.keyCode == 13){
				$("#searchButton").click();
			}
		});
	});

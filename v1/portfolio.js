$(document).ready(function () {
  $.get("portfolio/portfolio.xml", function (file) {
    $(file)
      .find("item")
      .each(function () {
        var $item = $(this);
        var Class = $item.attr("class");
        var id = $item.attr("id");
        var name = $item.find("name");
        var description = $item.find("description");
        var thumbnail = $item.find("thumbnail");

        var htm = "<div id='" + id + "' class='item'>";
        htm +=
          "<div class='itemImage'> <span class='thumbnail " +
          id +
          "'></span></div>";
        htm += "<div class='itemHeading'>" + name.text() + "</div>";
        htm +=
          "<div class='itemDescription'>" +
          description.text() +
          "</div> </div>";

        $("#" + Class).append(htm);
      });
  });

  $(document).on("click", ".item", function () {
    $("#popUp").css("display", "block");
    var divId = $(this).attr("id");
    $.get("portfolio/portfolio.xml", function (file) {
      $(file)
        .find("item")
        .filter(function () {
          return $(this).attr("id") == divId;
        })
        .each(function () {
          var $item = $(this);
          var name = $item.find("name");
          var description = $item.find("description");
          $("#popUpName").html(name.text());
          $("#popUpDescription").html(description.text());
          var im;
          var n = 0;
          $item.find("image").each(function () {
            var i = "<img src='" + $(this).text() + "'></img>";
            i += "<div>" + $(this).attr("description") + "</div>";
            $("#popUpImage").append(i);
          });
          setPopUpHeight();
          $(document).scrollTop(0);
        });
    });
  });

  function setPopUpHeight() {
    $("#popUp").height($(document).height());
  }

  $(document).on("click", "#popUpCancel", function () {
    $("#popUp").css("display", "none");
    $("#popUpImage").html("");
    $("#popUp").css("height", "0");
  });

  $(document).on("click", "#popUp", function (event) {
    if (event.target == $("#popUp").get(0)) {
      $("#popUp").css("display", "none");
      $("#popUpImage").html("");
      $("#popUp").css("height", "0");
    }
  });

  $(document).keyup(function (e) {
    if (e.keyCode == 27) {
      // escape key maps to keycode `27`
      $("#popUp").css("display", "none");
      $("#popUpImage").html("");
      $("#popUp").css("height", "0");
    }
  });

  $(window).resize(function () {
    if (
      $("#popUp").css("display") == "block" &&
      $("#popUp").height() < $(document).height()
    ) {
      $("#popUp").height($(document).height());
    }
  });
});

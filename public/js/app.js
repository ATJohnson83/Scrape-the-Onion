
$.getJSON("/articles", function(data) {
  console.log("dbdata:" + data);
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<div><h3>" + data[i].title + "</h3><a class='artlink' target='_blank' href=" + data[i].link + ">Read Article</a><a data-id='" + data[i]._id + "' href='#' class='onionart'>Write Note</a></div>");
  }
});


$(document).on("click", ".onionart", function() {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");
  console.log($(this).attr("data-id"));
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .done(function(data) {
      console.log("article notes:" +JSON.stringify(data));
      $("#notes").append("<div class='row'><h4 class='col-lg-12'>" + data.title + "</h4></div>");
      $("#notes").append("<div class='row'><input id='titleinput' name='title' type='text' class'form-control col-lg-12'></div>");
      $("#notes").append("<div class='row'><textarea id='bodyinput' name='body' type='text' class='form-control col-lg-12'></textarea></div>");
      $("#notes").append("<div class='row'><button data-id='" + data._id + "' id='savenote' class='btn btn-primary col-lg-4 col-lg-offset-4'>Save Note</button></div>");

      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
    });
});

$(document).on("click", "#getarts", function() {
  alert('click test');
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
    .done(function(data) {
      console.log("scrape:" + data)
  });
});


$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .done(function(data) {
      console.log(data);
      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Display current date at the header of the page
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);

  // Click event listener for save button
  $(".saveBtn").on("click", function () {
    // id of parent block
    var timeBlockId = $(this).parent().attr("id");
    // get user input
    var userInput = $(this).siblings(".description").val();
    // save the user input to local storage
    localStorage.setItem(timeBlockId, userInput);
  });
  // apply past,present,or future class
  var currentHour = dayjs().hour();
  $(".time-block").each(function () {
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
    // replace class when the hour passes
    if (timeBlockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (timeBlockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });

  // get the user input saved in local storage
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var userInput = localStorage.getItem(timeBlockId);

    if (userInput) {
      $(this).find(".description").val(userInput);
    }
  });
});

$(document).ready(function () {

  // $('.yearPicker').yearpicker({
  //   year: 2015,
  //   startYear: 1930,
  //   endYear: 2050
  // });

  // Activate tooltip
  $('[data-bs-toggle="tooltip"]').tooltip();
  // var editTool = document.getElementById('edit-tool');
  // var editTooltip = new bootstrap.Tooltip(editTool, {
  //   boundary: document.body
  // });

  // Select/Deselect choiceboxes
  var checkbox = $('table tbody input[type=checkbox]');
  $('#selectAll').click(function () {
    if (this.checked) {
      checkbox.each(function () {
        this.checked = true;
      });
    }
    else {
      checkbox.each(function () {
        this.checked = false;
      });
    }
  });

  checkbox.click(function () {
    if (!this.checked) {
      $('#selectAll').prop("checked", false);
    }
  });

  // const csvForm = $('#csvForm');
  // const csvFile = $('#chooseFile');

  // $('#csvForm').on('submit', function(e){
  //   e.preventDefault();
  //   console.log("form submitted");
  // });

  // $('#chooseFile').bind('change', function () {
  //     var filename = $("#chooseFile").val();
  //     console.log(filename);
  //     var df = $.csv.toArray(filename)
  //     console.log(df);
  //     if (/^\s*$/.test(filename)) {
  //       $(".file-upload").removeClass('active');
  //       $("#noFile").text("No file chosen..."); 

  //     }
  //     else {
  //       $(".file-upload").addClass('active');
  //       // $("#noFile").text(filename.replace("C:\\fakepath\\", "")); 
  //     }
  //   });      

  // $('.date-own').datepicker({
  //   minViewMode: 2,
  //   format: 'yyyy'
  // });
});
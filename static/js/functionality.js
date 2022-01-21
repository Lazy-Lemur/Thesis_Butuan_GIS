$(document).ready(function(){

  $('.yearPicker').yearpicker({
    year: 2015,
    startYear: 1930,
    endYear: 2050
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
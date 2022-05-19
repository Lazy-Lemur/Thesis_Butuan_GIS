// const gr_pop1 = document.getElementById("gr_pop1");
// const modcont1 = document.getElementById("modcont1");
// const close1 = document.getElementById("close1");

// gr_pop1.addEventListener('click', () => {
//     modcont1.classList.add('show');
// });

// close1.addEventListener('click', () => {
//     modcont1.classList.remove('show');
// });

// // Graph 2

// const gr_pop2 = document.getElementById("gr_pop2");
// const modcont2 = document.getElementById("modcont2");
// const close2 = document.getElementById("close2");

// gr_pop2.addEventListener('click', () => {
//     modcont2.classList.add('show');
// });

// close2.addEventListener('click', () => {
//     modcont2.classList.remove('show');
// });

$('#gr_pop1').click(function() {
   $('#modal-container1').removeAttr('class').addClass('show');
   $('#modal-canvas').removeAttr('class');
   $('#modal-canvas').addClass('zoomIn');
   $('body').addClass('modal-active'); 
});

$('#close1').click(function (){
    $('#modal-container1').addClass('out');
    $('#modal-canvas').addClass('out');
    $('body').removeClass('modal-active');
});

$('#gr_pop2').click(function() {
    $('#modal-container2').removeAttr('class').addClass('show');
    $('#modal-canvas').removeAttr('class');
    $('#modal-canvas').addClass('zoomIn');
    $('body').addClass('modal-active'); 
 });
 
 $('#close2').click(function (){
     $('#modal-container2').addClass('out');
     $('#modal-canvas').addClass('out');
     $('body').removeClass('modal-active');
 });
 
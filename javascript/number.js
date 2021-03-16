$(".number-input").keyup(function(e){
  if($(this).val().length >= 11)
       $(".call-button").addClass("show");  
  if(e.which == 8)
     $(".call-button").removeClass("show");
})
//called when key is pressed in textbox
$(".number-input").keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
               return false;
    }
});


$("[data-number]").on('click',function(){
  if($(".number-input").val().length < 11){
    var phoneNumber = $(".number-input").val() + $(this).data("number");
    $(".number-input").val(phoneNumber);
  }
  if($(".number-input").val().length == 11)
     $(".call-button").addClass("show");  
});

$(".delete").on('click',function(){
  var phoneNumber = $(".number-input").val().slice(0,-1);
  $(".number-input").val("");
  $(".number-input").val(phoneNumber);
  $(".call-button").removeClass("show");
});
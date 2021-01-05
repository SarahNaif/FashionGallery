

$(document).ready(function() {
    $("form#ratingForm").submit(function(e) {
        e.preventDefault();
        if ($("#ratingForm :radio:checked").length == 0) {
            $('#status').html("nothing checked");
            return false;
        } else {
            $('#status').html( 'You picked ' + $('input:radio[name=rating]:checked').val() );
        }
    });
});
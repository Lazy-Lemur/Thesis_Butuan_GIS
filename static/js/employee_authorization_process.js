$(document).ready(function() {
    var login_employee = function() {
        var form = $(this);
        var email = $('#sign-in #email').val();
        var password = $('#sign-in #password').val();

        data = {
            email: email,
            password: password
        }

        $.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            data: {
                email: email,
                password: password
            },
            dataType: 'json',
            success: function(data) {
                console.log(data);
                form[0].reset();
                if(data[0].success == 'True'){
                    window.location.replace("database.html");
                }
                else{
                    $('#promptModal #message').html(data[0].success);
                    $('#promptModal .modal-title').html("Login Error");
                }
                $('#promptModal').modal('show');
            }
        });

        return false;
    }

    /** Binding */
    $('#sign-in .sign-in-form').on('submit', login_employee);
});
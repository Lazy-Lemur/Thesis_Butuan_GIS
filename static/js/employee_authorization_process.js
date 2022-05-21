$(document).ready(function() {

   

    var login_employee = function() {
        var form = $(this);
        var email = $('#sign-in #email').val();
        var password = $('#sign-in #password').val();

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

    function requiredEqualPass(pass1, pass2){
        if(pass1 !== pass2){
            $('#promptModal #message').html("Passwords don't match");
            $('#promptModal .modal-title').html("Sign Up Error");
            $("#promptModal").modal("show");
            return true;
        }
        return false;
    }

    function requiredInputFieldsNonEmpty(first_name, last_name, email, password, confirm_pass){
        if(
            first_name.length == 0 ||
            last_name.length == 0 ||
            email.length == 0 ||
            password.length == 0 ||
            confirm_pass.length == 0 
        ){
            $('#promptModal #message').html("Please fill up sign up form to register");
            $('#promptModal .modal-title').html("Sign Up Error");
            $("#promptModal").modal("show");
            return true;
        }

        return false;
    }

    var register_employee = function() {
        var form = $(this);
        var first_name = $('#sign-up #first_name').val();
        var last_name = $('#sign-up #last_name').val();
        var email = $('#sign-up #email').val();
        var password = $('#sign-up #password').val();
        var confirm_pass = $('#sign-up #confirm_password').val();
        var error = true;

        error = requiredEqualPass(password, confirm_pass);
        error = requiredInputFieldsNonEmpty(first_name, last_name, email, password, confirm_pass);
        console.log(error);
        if(error == false){
            console.log('work');

            try{
                $.ajax({
                    url: form.attr('action'),
                    type: form.attr('method'),
                    data: {
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        password: password,
                        confirm_password: confirm_pass
                    },
                    dataType: 'json',
                    success: function(data){
                        console.log(data);
                        form[0].reset();
                        if(data[0].success == 'True'){
                            $('#promptModal #message').html("Account signed up successfully\nYou may login with your account now.");
                            $('#promptModal .modal-title').html("Sign Up Success");
                            
                            $("#promptModal").modal("show");
                        }
                        else{
                            $('#promptModal #message').html(data[0].success);
                            $('#promptModal .modal-title').html("Sign Up Error");
                            
                            $("#promptModal").modal("show");
                        }
                        
                        
                    }
                });
            }catch(err){
                console.log(err);
            }
            
        }
        
        return false;
    }
    

    /** Binding */
    $('#sign-in .sign-in-form').on('submit', login_employee);
    $('#sign-up .sign-up-form').on('submit', register_employee);
});
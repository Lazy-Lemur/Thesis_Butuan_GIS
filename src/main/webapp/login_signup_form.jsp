<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign In and Sign Up Form</title>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous" referrerpolicy="no-referrer"
    />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="static/css/login_signup_style.css">
	<link rel="stylesheet" href="alert/dist/sweetalert.css">
</head>

<body>
    <div class="main_container">
        <div class="forms-container">
            <div class="signin-signup" id="sign-in">
                <form method="POST" action="login" class="sign-in-form">
                    <h2 class="title-head">Sign in</h2>
                    <input type="hidden" id="status_login" value="<%= request.getAttribute("status_login") %>">
                    <div class="input-field">
                        <i class="fas fa-envelope"></i>
                        <input type="text" name="email" placeholder="Email Address" id="email">
                    </div>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input type="password" name="password" placeholder="Password" id="password">
                    </div>
                    <input type="submit" value="Sign In" class="btn-submit solid-style">
                    <p class="social-text">Or Sign in with social platforms</p>
                    <div class="social-media">
                        <a href="#" class="social-icon">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="social-icon">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="social-icon">
                            <i class="fab fa-google"></i>
                        </a>
                        <a href="#" class="social-icon">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </form>
            </div>

            <div class="signup-signup" id="sign-up">
                <form method="POST" action="register" class="sign-up-form">
                    <h2 class="title-head">Sign up</h2>
                    <input type="hidden" id="status_reg" value="<%= request.getAttribute("status_reg") %>">
                    <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input type="text" name="first_name" placeholder="First Name" id="first_name">
                    </div>
                    <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input type="text" name="last_name" placeholder="Last Name" id="last_name">
                    </div>
                    <div class="input-field">
                        <i class="fas fa-envelope"></i>
                        <input type="text" name="email" placeholder="Email Address" id="email">
                    </div>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input type="password" name="password" placeholder="Password" id="password">
                    </div>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input type="password" name="confirm_password" placeholder="Confirm Password" id="confirm_password">
                    </div>
                    <input type="submit" value="Sign up" class="btn-submit solid-style">
                    <p class="social-text">Or Sign up with social platforms</p>
                    <div class="social-media">
                        <a href="#" class="social-icon">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="social-icon">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="social-icon">
                            <i class="fab fa-google"></i>
                        </a>
                        <a href="#" class="social-icon">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </form>
            </div>
        </div>
        <div class="panels-container">
            <div class="panel-ui left-panel">
                <div class="content-ui">
                    <h3>New here?</h3>
                    <p>Please Sign Up</p>
                    <button class="btn-submit transparent-ui" id="sign-up-button">Sign up</button>
                </div>
                <img src="static/img/sign_in.svg" alt="" class="image">
            </div>

            <div class="panel-ui right-panel">
                <div class="content-ui">
                    <h3>One of us?</h3>
                    <p>Please log in </p>
                    <button class="btn-submit transparent-ui" id="sign-in-button">Sign in</button>
                </div>
                <img src="static/img/sign_up.svg" alt="" class="image">
            </div>
        </div>
    </div>

    <!-- Prompt Modal HTML -->
    <div id="promptModal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Prompt Title</h4>
                    <span class="close" data-bs-dismiss="modal" aria-hidden="true"><i class="material-icons">&#xe5cd;</i></span>
                </div>
                <div class="modal-body">
                    <p id="message">Data updated successfully!</p>
                </div>
                <div class="modal-footer">
                    <input type="button" value="Okay" class="btn btn-info" data-bs-dismiss="modal">
                </div>
            </div>
        </div>
    </div>

    <script src="static/js/login_signup_script.js"></script>
	<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
	<!-- <script src="static/js/employee_authorization_process.js"></script> -->
	
	<script type="text/javascript">
		var status_login = document.getElementById("status_login").value;
		var status_reg = document.getElementById("status_reg").value;
		
		if(status_login == "failed") {
			swal("Error", "Login failed, wrong email and password combination", "error");
		}
		
		if(status_reg == "success"){
			swal("Success", "Account created successfully!", "success");
		}
		if(status_reg == "failed"){
			swal("Error", "Registration failed", "error");
		}
	</script>
</body>

</html>
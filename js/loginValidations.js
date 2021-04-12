var email = document.getElementById('email'),
    password = document.getElementById('password');    

email.onblur = function(e){
    var emailConditions = new RegExp("^([\dA-Za-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$");
    if(emailConditions.test(email.value) === false){
        spanEmail.style.display = 'block';
        spanEmail.innerHTML = '<span>Enter a valid email</span>';
        e.preventDefault();
    } else {
        spanEmail.style.display = 'none';
    }
};

email.addEventListener('focus', function(e){
    if(spanEmail.style.display === 'block'){
        spanEmail.style.display = 'none';
    }
});

password.onblur = function(e){
    var passwordValue = password.value;
    var characters = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
    if(passwordValue.length < 8){
        spanPassword.style.display = 'block';
        spanPassword.innerHTML = '<span>Passowrd must have al least 8 characters</span>';
        e.preventDefault();
    } else if(characters.test(passwordValue) === false){
        spanPassword.style.display = 'block';
        spanPassword.innerHTML = '<span>Enter a lowercase, an uppercase and a number</span>';
        e.preventDefault();
    } else {
        spanPassword.style.display = 'none';
    }
};

password.addEventListener('focus', function(e){
    if(spanPassword.style.display === 'block'){
        spanPassword.style.display = 'none';
    }
});
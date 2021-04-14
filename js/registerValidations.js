var fullName = document.getElementById('fullName'),
    email = document.getElementById('email'),
    password = document.getElementById('password'),
    confirmPassword = document.getElementById('confirmPassword'),
    form = document.querySelector('form'),
    error = document.getElementById('error');
    
// fullName - onblur - focus

fullName.onblur = function(e){
        var spanFullName = document.getElementById('spanFullName');
            fullNameValue = fullName.value;

        if(fullNameValue.length <= 6){
            spanFullName.style.display = 'block';
            spanFullName.innerHTML = '<span>Name must be more than 6 characters</span>';
            e.preventDefault();
            fullName.focus;
        } else if(fullNameValue.indexOf(' ') === -1){
            spanFullName.style.display = 'block';
            spanFullName.innerHTML = '<span>Name must have a blank space</span>';
            e.preventDefault();
        } else {
            spanFullName.style.display = 'none';
        }
};

fullName.addEventListener('focus', function(e){
    if(spanFullName.style.display === 'block'){
        spanFullName.style.display = 'none';
    }
});

// email.onblur - focus

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

// password.onblur - focus

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

// confirmPassword.onblur - focus

confirmPassword.onblur = function(e){
    var passwordValue = password.value;
    var confirmPasswordValue = confirmPassword.value;
    if(passwordValue != confirmPasswordValue){
        spanConfirmPassword.style.display = 'block';
        spanConfirmPassword.innerHTML = '<span>Passwords do not match</span>';
        e.preventDefault();
    } else {
        spanConfirmPassword.style.display = 'none';
    }
};

confirmPassword.addEventListener('focus', function(e){
    if(spanConfirmPassword.style.display === 'block'){
        spanConfirmPassword.style.display = 'none';
    }
});

// Submit function

var handleSubmit = function(e){
    e.preventDefault();
    var inputs = form.querySelectorAll('input');
    inputs.forEach(function(input){
        error.innerHTML += input.name + ': ' + input.value + '</br>';
    });
    fetch(`https://jsonplaceholder.typicode.com/users?email=${email.value}`)
    .then (response => response.json())
    .then (info => console.log(info));
};
form.addEventListener('submit', handleSubmit);
const fullName = document.getElementById('fullName'),
      email = document.getElementById('email'),
      password = document.getElementById('password'),
      confirmPassword = document.getElementById('confirmPassword'),
      form = document.querySelector('form'),
      submitForm = document.getElementById('form'),
      error = document.getElementById('error');

let flagFullName = false,
    flagEmail = false,
    flagPassword = false,
    flagConfirmPassword = false;

fullName.onblur = function(e){
        const spanFullName = document.getElementById('spanFullName');
              fullNameValue = fullName.value;

        if(fullNameValue.length <= 6){
            spanFullName.style.display = 'block';
            spanFullName.innerHTML = '<span>Name must be more than 6 characters</span>';
            flagFullName = false;
            e.preventDefault();
            fullName.focus;
        } else if(fullNameValue.indexOf(' ') === -1){
            spanFullName.style.display = 'block';
            spanFullName.innerHTML = '<span>Name must have a blank space</span>';
            flagFullName = false;
            e.preventDefault();
        } else {
            spanFullName.style.display = 'none';
            flagFullName = true;
        }
};

fullName.onfocus = function(e){
    if(spanFullName.style.display === 'block'){
        spanFullName.style.display = 'none';
    }
};

email.onblur = function(e){
    const emailConditions = new RegExp("^([\dA-Za-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$");
    if(emailConditions.test(email.value) === false){
        spanEmail.style.display = 'block';
        spanEmail.innerHTML = '<span>Enter a valid email</span>';
        flagEmail = false;
        e.preventDefault();
    } else {
        spanEmail.style.display = 'none';
        flagEmail = true;
    }
};

email.onfocus = function(e){
    if(spanEmail.style.display === 'block'){
        spanEmail.style.display = 'none';
    }
};

password.onblur = function(e){
    let passwordValue = password.value;
    const characters = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
    if(passwordValue.length < 8){
        spanPassword.style.display = 'block';
        spanPassword.innerHTML = '<span>Passowrd must have al least 8 characters</span>';
        flagPassword = false;
        e.preventDefault();
    } else if(characters.test(passwordValue) === false){
        spanPassword.style.display = 'block';
        spanPassword.innerHTML = '<span>Enter a lowercase, an uppercase and a number</span>';
        flagPassword = false;
        e.preventDefault();
    } else {
        spanPassword.style.display = 'none';
        flagPassword = true;
    }
};

password.onfocus = function(e){
    if(spanPassword.style.display === 'block'){
        spanPassword.style.display = 'none';
    }
};

confirmPassword.onblur = function(e){
    let passwordValue = password.value;
    let confirmPasswordValue = confirmPassword.value;
    if(passwordValue != confirmPasswordValue){
        spanConfirmPassword.style.display = 'block';
        spanConfirmPassword.innerHTML = '<span>Passwords do not match</span>';
        flagConfirmPassword = false;
        e.preventDefault();
    } else {
        spanConfirmPassword.style.display = 'none';
        flagConfirmPassword = true;
    }
};

confirmPassword.onfocus = function(e){
    if(spanConfirmPassword.style.display === 'block'){
        spanConfirmPassword.style.display = 'none';
    }
};

submitForm.onsubmit = function(e){
    if(flagFullName && flagEmail && flagPassword && flagConfirmPassword){
        const inputs = form.querySelectorAll('input');
        error.innerHTML = '';
        inputs.forEach(function(input){
            error.innerHTML += input.name + ': ' + input.value + '</br>';
        });
        e.preventDefault();
        fetch(`http://localhost:4000/register`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
                },
            body: JSON.stringify({
                fullName: fullName.value,
                email: email.value,
                password: password.value,
            })
        })
        .then (response => response.json())
        .then (info => console.log(info))
        .catch(function(error){
            console.log('Error trying to send the data')
        });
    } else {
        error.innerHTML = 'Please, check your data';
    }
};
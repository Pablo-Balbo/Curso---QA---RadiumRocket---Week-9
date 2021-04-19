const email = document.getElementById('email'),
      password = document.getElementById('password');   
      form = document.querySelector('form'),
      submitForm = document.getElementById('form'),
      error = document.getElementById('error');

let flagEmail = false,
    flagPassword = false;

email.onblur = function(e){
    const emailConditions = new RegExp("^([\dA-Za-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$");
    if(emailConditions.test(email.value) === false){
        spanEmail.style.display = 'block';
        spanEmail.innerHTML = '<span>Enter a valid email</span>';
        e.preventDefault();
    } else {
        spanEmail.style.display = 'none';
    }
};

email.focus = function(e){
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
        e.preventDefault();
    } else if(characters.test(passwordValue) === false){
        spanPassword.style.display = 'block';
        spanPassword.innerHTML = '<span>Enter a lowercase, an uppercase and a number</span>';
        e.preventDefault();
    } else {
        spanPassword.style.display = 'none';
    }
};

password.focus = function(e){
    if(spanPassword.style.display === 'block'){
        spanPassword.style.display = 'none';
    }
};

submitForm.onsubmit = function(e){
    if (flagEmail && flagPassword){
        const inputs = form.querySelectorAll('input');
        error.innerHTML = '';
        inputs.forEach(function(input){
            error.innerHTML += input.name + ': ' + input.value + '</br>';
        })
        fetch(`http://localhost:4000/login`,{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
                },
            body: JSON.stringify({
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
        e.preventDefault(e);
        error.innerHTML = 'Please, check your data';
    }
};
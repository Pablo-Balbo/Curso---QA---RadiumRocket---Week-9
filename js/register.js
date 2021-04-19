testForm(4, 'register');

function testForm(expectedInputs, expectedButtonText) {

    const error = document.getElementById('error');
    let errorResults = [];
    let fullMessage = '';


    let testCheckFormResult = testCheckForm();
    if (testCheckFormResult != undefined) {
        errorResults.push(testCheckFormResult);
    }

    let testInputsLengthResult = testInputsLength(expectedInputs);
    if (testInputsLengthResult != undefined) {
        errorResults.push(testInputsLengthResult);
    }

    let testCheckInputsWithLabelsResult = testCheckInputsWithLabels();
    if (testCheckInputsWithLabelsResult != undefined) {
        errorResults.push(testCheckInputsWithLabelsResult);
    }

    let testCheckRequiredFieldsResult = testCheckRequiredFields();
    if (testCheckRequiredFieldsResult != undefined) {
        errorResults.push(testCheckRequiredFieldsResult);
    }

    let testCheckButtonContentResult = testCheckButtonContent(expectedButtonText);
    if (testCheckButtonContentResult != undefined) {
        errorResults.push(testCheckButtonContentResult);
    }

    if (errorResults.length != 0) {
        fullMessage = 'Validation results:</br>' + errorResults.join('</br>');
    } else {
        fullMessage = 'Validation results:</br> Every validation has passed.</br>';
    }

    error.innerHTML = fullMessage;
};

function testCheckForm() {
    const form = document.getElementsByTagName('form');

    if (form.length == 0) {
        var errorMessage = 'Form is not found';
        return errorMessage;
    }
};

function testInputsLength(expectedTotal){
    const inputs = document.getElementsByTagName('input');

    if (inputs.length != expectedTotal) {
        var errorMessage = 'There are ' + inputs.length + ' inputs, but expected ' + expectedTotal;
        return errorMessage;
    }
};

function testCheckInputsWithLabels(){
    const inputs = document.getElementsByTagName('input');
    const labels = document.getElementsByTagName('label');
    let count = 0;

    if (inputs.length > labels.length) {
        let errorMessage = 'There are missing labels for inputs';
        return errorMessage;
    }

    for (var i = 0; i < inputs.length; i++) {
        let id = inputs[i].getAttribute('id');

        for (var j = 0; j < labels.length; j++) {
            let forValue = labels[j].getAttribute('for');
            if (id === forValue) {
                count++;
                break;
            }
        }  
    }

    if (count != inputs.length){
        const errorMessage = 'There are missing labels for inputs';
        return errorMessage;
    }
};

function testCheckRequiredFields(){
    const inputs = document.getElementsByTagName('input');

    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].required) {
            let errorMessage = 'there are optional inputs';
            return errorMessage;
        }
    }
};

function testCheckButtonContent(expectedContent){
    const buttonSubmit = document.getElementsByTagName('button').submit;

    if (buttonSubmit === undefined) {
        let errorMessage = 'missing submit button';
        return errorMessage;
    } 

    const buttonSubmitContent = buttonSubmit.textContent;
    
    if (buttonSubmitContent != expectedContent) {
        let errorMessage = 'button content is invalid';
        return errorMessage;
    }
};
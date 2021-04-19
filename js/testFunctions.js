export function testForm(expectedInputs, expectedButtonText) {

    var error = document.getElementById('error');
    var errorResults = [];
    var fullMessage = '';


    var testCheckFormResult = testCheckForm();
    if (testCheckFormResult != undefined) {
        errorResults.push(testCheckFormResult);
    }

    var testInputsLengthResult = testInputsLength(expectedInputs);
    if (testInputsLengthResult != undefined) {
        errorResults.push(testInputsLengthResult);
    }

    var testCheckInputsWithLabelsResult = testCheckInputsWithLabels();
    if (testCheckInputsWithLabelsResult != undefined) {
        errorResults.push(testCheckInputsWithLabelsResult);
    }

    var testCheckRequiredFieldsResult = testCheckRequiredFields();
    if (testCheckRequiredFieldsResult != undefined) {
        errorResults.push(testCheckRequiredFieldsResult);
    }

    var testCheckButtonContentResult = testCheckButtonContent(expectedButtonText);
    if (testCheckButtonContentResult != undefined) {
        errorResults.push(testCheckButtonContentResult);
    }

    if (errorResults.length != 0) {
        fullMessage = 'Validation results: ' + errorResults.join(', ');
    } else {
        fullMessage = 'Validation results: every validation has passed.';
    }

    error.innerHTML = fullMessage;
};

export function testCheckForm() {
    var form = document.getElementsByTagName('form');

    if (form.length == 0) {
        var errorMessage = 'Form is not found';
        return errorMessage;
    }
};

export function testInputsLength(expectedTotal) {
    var inputs = document.getElementsByTagName('input');

    if (inputs.length != expectedTotal) {
        var errorMessage = 'There are ' + inputs.length + ' inputs, but expected ' + expectedTotal;
        return errorMessage;
    }
};

export function testCheckInputsWithLabels() {
    var inputs = document.getElementsByTagName('input');
    var labels = document.getElementsByTagName('label');
    var count = 0;

    if (inputs.length > labels.length) {
        var errorMessage = 'There are missing labels for inputs';
        return errorMessage;
    }

    for (var i = 0; i < inputs.length; i++) {
        var id = inputs[i].getAttribute('id');

        for (var j = 0; j < labels.length; j++) {
            var forValue = labels[j].getAttribute('for');
            if (id === forValue) {
                count++;
                break;
            }
        }  
    }

    if (count != inputs.length){
        var errorMessage = 'There are missing labels for inputs';
        return errorMessage;
    }
};

export function testCheckRequiredFields(){
    var inputs = document.getElementsByTagName('input');

    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].required) {
            var errorMessage = 'there are optional inputs';
            return errorMessage;
        }
    }
};

export function testCheckButtonContent(expectedContent){
    var buttonSubmit = document.getElementsByTagName('button').submit;

    if (buttonSubmit === undefined) {
        var errorMessage = 'missing submit button';
        return errorMessage;
    } 

    var buttonSubmitContent = buttonSubmit.textContent;
    
    if (buttonSubmitContent != expectedContent) {
        var errorMessage = 'button content is invalid';
        return errorMessage;
    }
};
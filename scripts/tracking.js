var mouseClicks = 0; //the number of mouse Clicks
var timeSpent = 0; //the time spent on the signup page
var keyPresses = 0; //the number of keys pressed
var charsTyped = 0; // the total number of characters typed
var isSubmitPressed = false; // boolean that keeps track if the submit button was pressed

var isFormCorrect = false; // boolean that keeps track if
// all the information in the form
// was introduced corectly

/**
 * Once the window has loaded, we run this code:
 */
window.onload = function () {
    //make the div that contains the results 
    //that should be displayed hidden
    var results = document.getElementById("results");
    results.style.visibility = "hidden";

    const inputs = document.querySelectorAll("input"); //select all the input boxes 

    var body = document.getElementsByTagName("body")[0]; //select the body tag
    var disp = document.getElementById("display"); // select the 
    var spent = document.getElementById("timeSpent"); // select the id of the element
    // where we display the spent time
    var keys = document.getElementById("keyPresses"); // select the id of the element
    // where we display the number of keys pressed 
    var chars = document.getElementById("charsTyped"); // select the id of the element
    // where we display the number of characters typed

    var subBut = document.getElementById("subButSignUp");// select the id of the submit button
    var startTime = Date.now();//tracks the moment the page was first open 
    var elapsed; // initialize the variable that tracks the elapsed time spent to complete the form
    let charsTyped = 0; // the number of chars typed

    var forms = document.getElementById("realForm");
    /**
     * To not refresh the page after the submit button is pressed.
     */
    forms.addEventListener("submit", function (event) {
        event.preventDefault();
    });
    /**
     * When the submit button has been clicked:
     * 1. checks the length of each input field to determine the
     * amount of characters typed
     * 2. shows the div containing all the tracking info.
     */
    subBut.addEventListener("click", function () {
        charsTyped = 0;
        for (let i = 0; i < inputs.length - 1; i++) {
            charsTyped += inputs[i].value.length;
        }
        chars.innerHTML = charsTyped;

        if (isFormCorrect) {
            results.style.visibility = "visible";
            isSubmitPressed = true;
        }
    });
    /**
     * Checks how many mouse clicks have occurred on the input form.
     * Once the submit button has been pressed, the mouse click counter stops.
     */
    body.onclick = function () {
        if (!isSubmitPressed) {
            mouseClicks++;
        }
        disp.innerHTML = mouseClicks;
    }
    /**
     * Every second, we update the timer which tracks the amount
     * of time spent by the user on the page.
     * Once the submit button has been pressed, the tracking stops.
     */
    setInterval(() => {
        if (!isSubmitPressed) {
            elapsed = Math.round((Date.now() - startTime) / 1000);
        }
        var minutes = Math.floor(elapsed / 60);
        var seconds = elapsed % 60;
        if (minutes == 0) {
            spent.innerHTML = seconds + " seconds";
        }
        else
            spent.innerHTML = minutes + " minutes, " + seconds + " seconds";
    }, 1000);

    /**
     * Checks when a key has been pressed and updates the keypress counter accordingly;
     * If the submit button has been pressed already, we do not
     * track any other key presses.
     */
    document.addEventListener("keydown", function () {
        if (!isSubmitPressed) {
            keyPresses++;
        }
        keys.innerHTML = keyPresses;
    });


    /**
     * INPUT CHECKING BEGINS HERE
     */
    document.addEventListener("focusout", function () {
        /**
         * We consider the form to be
         * completed corectly
         * until proven otherwise
         */
        isFormCorrect = true; 
        
   
        /**
         * UserID Check
         */
        var uID = document.getElementById("user-id");
        let userID = inputs[0].value;
        let firstChar = userID[0];
        let lastChar = userID[userID.length - 1];
        let len = userID.length;

        if (firstChar >= 'A' && firstChar <= 'Z' &&
            lastChar >= '!' && lastChar <= '/' &&
            len >= 5 && len <= 12) {
            uID.style.color = "#7effcc";
            uID.innerHTML = "Correct!";
        }
        else {
            isFormCorrect = false; // if the field is wrong
            // the form is not correct
            uID.style.color = "red";
            if (!(firstChar >= 'A' && firstChar <= 'Z')) {
                uID.innerHTML = "Your user ID should start with a capital letter.";
            }
            else if (!(lastChar >= '!' && lastChar <= '/'))
                uID.innerHTML = "Your user ID should end with a special character (!,./#&).";
            else
                uID.innerHTML = "Your user ID should have 5-12 characters.";
        }

        /**
         * Full Name Check
         */


        var fName = document.getElementById("full-name");
        let fullName = inputs[1].value;
        let correctFullName = true;

        // We first check whether the name contains only letters (with the exception of spaces);
        for (let i = 0; i < fullName.length; i++)
            if (!(isAlpha(fullName[i]) || fullName[i] == ' ')) {
                correctFullName = false;
            }
        
        // Secondly, we check whether the name is long enough to be accepted
        // (as in, not be blank and not be too short) 

        if (fullName.length < 3)
            correctFullName = false;
        if (!correctFullName) {
            // If there is an error in the name input, we display that to the user.
            isFormCorrect = false
            fName.style.color = "red";
            fName.innerHTML = "Your name should contain characters only and not be blank.";
        }
        else {
            // If all the above conditions are satisfied, we display a 'correct' message to the user.
            fName.style.color = "#7effcc";
            fName.innerHTML = "Correct!";
        }

        /**
         * Zip Code Check
         */
        var zCode = document.getElementById("zip-code");
        var zipCode = inputs[4].value;

        // We split the zip code in two parts:
        // One which should contain only numbers (the first four characters)
        // and one which should contain only characters (the last two)

        var zipNumbers = zipCode.substring(0, 4);
        var zipLetters = zipCode.substring(4, 6);
        var correctZipCode = true;

        // We check each of the strings separately for their contents
        for (let i = 0; i < zipNumbers.length; i++) {
            if (!isNumber(zipNumbers[i])) {
                correctZipCode = false;
            }
        }
        for (let i = 0; i < zipLetters.length; i++) {
            if (!isAlpha(zipLetters[i]) || zipLetters[i] == ' ') {
                correctZipCode = false;
            }
        }

        if (zipNumbers.length != 4 || zipLetters.length != 2
            || zipCode.length != 6)
            correctZipCode = false;

        // If the zip code does not satisfy the Dutch zip code requirements,
        // we let the user know with a message.
        if (!correctZipCode) {
            isFormCorrect = false;
            zCode.style.color = "red";
            zCode.innerHTML = "The entered Zip Code is not a correct Dutch Zip Code";
        } else {
            // Otherwise, we display a message to show the user that their input is correct.
            zCode.style.color = "#7effcc";
            zCode.innerHTML = "Correct!";
        }

        /**
         * Password Validator
         */
        var pass = document.getElementById("password");
        var password = inputs[6].value;
        // We check whether the password has at least 12 characters.
        if (password.length < 12) {
            // If not, we display the appropriate message.
            isFormCorrect = false;
            pass.style.color = "red";
            pass.innerHTML = "The entered password is not longer than 12 characters";
        } else {

            // If it is, we advise the user to have a longer password, although it is not required

            if (password.length < 14) {
                pass.style.color = "orange";
                pass.innerHTML = "Password strength is good";
            }
            // We also check for the password to contain the following:

            // -Uppercase and lowercase letters;
            var hasUppercaseLetter = false;
            var hasLowercaseLetter = false;

            for (let i = 0; i < password.length; i++) {
                if (password[i] >= "A" && password <= "Z") {
                    hasUppercaseLetter = true;
                }
                if (password[i] >= "a" && password <= "z") {
                    hasLowercaseLetter = true;
                }
            }
            if (!hasUppercaseLetter || !hasLowercaseLetter) {
                isFormCorrect = false;
                pass.style.color = "red";
                pass.innerHTML = "The password must be a combination of upper and lower case letters";
            } else {
                // -Numbers and special characters.
                var hasNumbers = false;
                var hasSymbols = false;
                for (let i = 0; i < password.length; i++) {
                    if (isNumber(password[i])) {
                        hasNumbers = true;
                    }
                    else {
                        if (!isAlpha(password[i])) {
                            hasSymbols = true;
                        }
                    }
                }
                if (!hasNumbers || !hasSymbols) {
                    isFormCorrect = false;
                    pass.style.color = "red";
                    pass.innerHTML = "The password must contain at least one number and one symbol";
                }
                else {
                    // If every criteria is satisfied, we let the user know with a message.
                    pass.style.color = "#7effcc";
                    pass.innerHTML = "Password strength is good";
                }
            }

        }

        /**
         * Password Confirmation Check
         */
        var passConfirm = document.getElementById("pass-confirm");
        var passwordConfirm = inputs[7].value;
        
        // We first check whether both passwords are equal

        if (passwordConfirm != password) {
            // if they're not, then we show a message telling the user that. 
            isFormCorrect = false;
            passConfirm.style.color = "red";
            passConfirm.innerHTML = "These password does not coincide with the one previously entered";
        } else

        // If the passwords are identical, we also check whether the password is not empty.
        // (field mandatory)
            if (passwordConfirm.length <= 0) {
                isFormCorrect = false;
                passConfirm.style.color = "red";
                passConfirm.innerHTML = 'The "Confirm Password" field is mandatory.';
            }
            else {
                passConfirm.style.color = "#7effcc";
                passConfirm.innerHTML = "Correct!";
            }
        /**
         * Mandatory Other Fields Check
         * (Country, E-mail)
         */
        var emailDiv = document.getElementById("email");
        var enteredEmail = inputs[5].value;
        if (enteredEmail.length <= 0) {
            isFormCorrect = false;
            emailDiv.style.color = "red";
            emailDiv.innerHTML = 'The "Email" field is mandatory.';
        }
        else {
            emailDiv.style.color = "#7effcc";
            emailDiv.innerHTML = 'Correct!';
        }

        var countryDiv = document.getElementById("country");
        var enteredCountry = inputs[3].value;
        if (enteredCountry.length <= 0) {
            isFormCorrect = false;
            countryDiv.style.color = "red";
            countryDiv.innerHTML = 'The "Country" field is mandatory.';
        }
        else {
            countryDiv.style.color = "#7effcc";
            countryDiv.innerHTML = 'Correct!';
        }
    });





}

var isAlpha = function (ch) {
    return typeof ch === "string" && ch.length === 1
        && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
}

var isNumber = function (crtChar) {
    return crtChar >= "0" && crtChar <= "9" && crtChar.length === 1;
}
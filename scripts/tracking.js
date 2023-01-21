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
    
    var form = document.getElementsByTagName("body")[0]; //select the body tag
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
        charsTyped=0;
        for(let i=0; i<inputs.length-1;i++){
            charsTyped+=inputs[i].value.length;
        }
        chars.innerHTML = charsTyped;
        
        if(isFormCorrect){
            results.style.visibility = "visible";
            isSubmitPressed = true;
        }
    });
    /**
     * Checks how many mouse clicks have occurred on the input form.
     * Once the submit button has been pressed, the mouse click counter stops.
     */
    form.onclick = function () {
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
    document.addEventListener("focusout", function (){
        isFormCorrect = true; // we consider the form to be
                              // completed corectly
                              // until proven otherwise
        /**
         * UserID Check
         */
        var uID = document.getElementById("user-id");
        let userID = inputs[0].value;
        let firstChar = userID[0];
        let lastChar = userID[userID.length-1];
        let len = userID.length;

        if(firstChar >= 'A' && firstChar <= 'Z' && 
            lastChar >= '!' && lastChar <= '/' &&
        len >= 5 && len <= 12){
            uID.style.color = "green";
            uID.innerHTML = "Correct!";
        }
        else {
            isFormCorrect = false; // if the field is wrong
                                   // the form is not correct
            uID.style.color = "red";
            if(!(firstChar >= 'A' && firstChar <= 'Z')){
                uID.innerHTML = "Your user ID should start with a capital letter.";
            }
            else if(!(lastChar >= '!' && lastChar <= '/'))
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
        for(let i = 0; i < fullName.length; i++)
            if(!(isAlpha(fullName[i]) || fullName[i] == ' ')){
                correctFullName = false;
            }
        if(fullName.length < 3)
            correctFullName = false;
        if(!correctFullName){
            fName.style.color="red";
            fName.innerHTML="Your name should contain characters only and be of length 3.";
        }
        else{
            fName.style.color="green";
            fName.innerHTML="Correct!";
        }

        /**
         * Zip Code Check
         */
        let zCode = document.getElementById("")
    });

      

}

var isAlpha = function(ch){
    return typeof ch === "string" && ch.length === 1
           && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
  }
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let email2 = document.getElementById("email2").value;
    let password2 = document.getElementById("password2").value;
    let password3 = document.getElementById("password3").value;

    if (!email2 || !password2 || !password3){
        alert("!יש למלא את כל השדות")
        return;
    }

    alert("!התחברות בוצעה בהצלחה")
})

document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!email || !password){
        alert("!יש למלא את כל השדות")
        return;
    }

    alert("!התחברות בוצעה בהצלחה")
})

document.getElementById("makeContact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let fullName = document.getElementById("fullName").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if (!fullName || !phone || !email || !message){
        alert("!יש למלא את כל השדות")
        return;
    }

    alert("!התחברות בוצעה בהצלחה")
})
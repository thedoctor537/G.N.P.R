document.getElementById("login-fotm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!email || !password){
        alert("!יש למלא את כל השדות")
        return;
    }

    alert("!התחברות בוצעה בהצלחה")
})
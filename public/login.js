var password = 'Test';

let passwordEntered = document.getElementById('password').value;
var submit = document.getElementById('submit');

submit.addEventListener('click', function() {
    console.log('submitted', passwordEntered);
    passwordEntered = document.getElementById('password').value;

    if (passwordEntered === password) {
        window.location.href = '../Quiz/PrimaryPage.html';
    } else {
        alert('Wrong password.')
    }
});

document.getElementById('password').addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("submit").click();
    }
});
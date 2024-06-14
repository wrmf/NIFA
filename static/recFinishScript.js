
function handleClick(event) {

document.getElementById("nextButton").addEventListener("click", function() {
    document.getElementById("submitSubmitButton").click();
});
}

const element = document.getElementById(`nextSubmitButton`);
element.addEventListener('click', handleClick);


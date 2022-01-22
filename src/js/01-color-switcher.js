const bodyTarg = document.querySelector("body");
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener("click", changeBgColor);

function changeBgColor(event) {

    timerId = setInterval(() => {
        let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        bodyTarg.style.backgroundColor = color;
    }, 1000);

    startBtn.disabled = true;
    stopBtn.disabled = false;
}

stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
});
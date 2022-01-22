import Notiflix from "notiflix";




const refs = {

    form: document.querySelector(".form"),
    delayF: document.querySelector("[name='delay']"),
    stepF: document.querySelector("[name='step']"),
    amountF: document.querySelector("[name='amount']"),
}


refs.form.addEventListener("submit", letsMakePromises);

function letsMakePromises(event) {

    event.preventDefault();

    const step = +refs.stepF.value;
    let delay = +refs.delayF.value;


    for (let i = 0; i < +refs.amountF.value; i += 1) {
        const position = i + 1;
        createPromise(position, delay).then(({ position, delay }) => {
            Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { useIcon: false });
        })
            .catch(({ position, delay }) => {
                Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, { useIcon: false });
            });
        delay += step;
    }
}


function createPromise(position, delay) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const shouldResolve = Math.random() > 0.3;
            if (shouldResolve) {
                resolve({ position, delay });
            } else {
                reject({ position, delay });
            }
        }, delay);
    });
    return promise;
};
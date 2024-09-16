'use strict';  

import iziToast from "izitoast";  
import "izitoast/dist/css/iziToast.min.css";  

const form = document.querySelector('.form');  

form.addEventListener('submit', (event) => {  
    event.preventDefault();  
    
    const delay = Number(event.target.elements.delay.value);  
    const isResolved = event.target.elements.state.value === 'fulfilled';  

    const promise = new Promise((resolve, reject) => {  
        if (isResolved) {  
            resolve(delay);  
        } else {  
            reject(delay);  
        }  
    });  

    promise  
        .then(() => {  
            setTimeout(() => {  
                iziToast.success({  
                    title: 'Ok',  
                    message: `Fulfilled promise in ${delay}ms`,  
                    position: 'topRight',  
                    color: '#59a10d',  
                    titleColor: '#fff',  
                    titleSize: '16px',  
                    titleLineHeight: '150%',  
                    messageColor: '#fff',  
                    messageSize: '16px',  
                    messageLineHeight: '150%',  
                });  
            }, delay);  
        })  
        .catch(() => {  
            setTimeout(() => {  
                iziToast.error({  
                    title: 'Error',  
                    message: `Rejected promise in ${delay}ms`,  
                    position: 'topRight',  
                    color: '#ef4040',  
                    titleColor: '#fff',  
                    titleSize: '16px',  
                    titleLineHeight: '150%',  
                    messageColor: '#fff',  
                    messageSize: '16px',  
                    messageLineHeight: '150%',  
                });  
            }, delay);  
        });  
});  
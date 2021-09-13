// TASK 4
const radio_1 = document.getElementById('radio-1');
const radio_2 = document.getElementById('radio-2');
const radio_3 = document.getElementById('radio-3');

radio_1.addEventListener('click', () => checkClick('radio-1'));
radio_2.addEventListener('click', () => checkClick('radio-2'));
radio_3.addEventListener('click', () => checkClick('radio-3'));

const checkClick = (btn)=>{
    if(btn === 'radio-1'){
        radio_1.checked = true;
        radio_2.checked = false;
        radio_3.checked = false;
    }
    else if(btn === 'radio-2'){
        radio_1.checked = false;
        radio_2.checked = true;
        radio_3.checked = false;
    }
    else if(btn === 'radio-3'){
        radio_1.checked = false;
        radio_2.checked = false;
        radio_3.checked = true;
    }
}
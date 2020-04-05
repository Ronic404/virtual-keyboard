import {numberKeys, enKeys, ruKeys} from './buttons.js';

window.onload = () => {
  setValueLang();
  addTextarea();
  addKeyboard();
  addLangSwitcher();
  addClickButtons();
  addPressButtons();
  // addCapsLockclick();
};

let lang = 'ru';
let numberKey = 0;

const setValueLang = () => {
  if(lang !== localStorage.getItem('language')) lang = 'en';
}

const addTextarea = () => {
  const textArea = document.createElement('textarea');
  document.body.prepend(textArea);
  document.querySelector('textArea').placeholder = 'Переключение языка на CTRLleft + ShiftLeft';
};

const addKeyboard = () => {
  const div = document.createElement('div');
  document.querySelector('textarea').after(div);
  document.querySelector('div').classList.add('keyboard');
  addKeys();
};

const addKeys = () => {
  const ul = document.createElement('ul');  
  let count = 0;

  document.querySelector('.keyboard').append(ul);

  for(let key = 0; key < numberKeys.length; key++) {
    const li = document.createElement('li');
    document.querySelector('ul').append(li); 
  }
  
  document.querySelectorAll('li').forEach(el => {    
    el.classList.add(numberKeys[count]);
    count++
  });

  document.querySelectorAll('li').forEach(el => {
    const span = document.createElement('span');
    el.append(span);
  });
  
  document.querySelectorAll('span').forEach(el => {
    if(lang === 'en') {
      el.innerHTML = enKeys[numberKey];
      numberKey++;
    } else {
      el.innerHTML = ruKeys[numberKey];
      numberKey++;
    }    
  });  
}

const addLangSwitcher = () => {
  let pressed = new Set();
  let needPress = new Set(['ShiftLeft', 'ControlLeft']);

  document.addEventListener('keydown', (event) => {
    pressed.add(event.code);
    for (let button of needPress) {
      if(!pressed.has(button)) {
        return;
      }
    }

    pressed.clear();   

    if(lang === 'ru') {
      lang = 'en';
      localStorage.setItem('language', lang);
      numberKey = 0; 
      document.querySelector('ul').innerHTML = '';
      addKeys();
    } else {
      lang = 'ru';
      localStorage.setItem('language', lang);
      numberKey = 0; 
      document.querySelector('ul').innerHTML = '';
      addKeys();
    }
  });

  document.addEventListener('keyup', (event) => {
    pressed.delete(event.code);
  });
}

const addClickButtons = () => {
  document.addEventListener('mousedown', (event) => {
    if(event.target.closest('li')) {
      event.target.classList.add('pressed');
      document.querySelector('textArea').value += event.target.innerText;
    }    
  });

  document.addEventListener('mouseup', (event) => {
    if(event.target.closest('li')) {
      event.target.classList.remove('pressed');
    }    
  });

  document.addEventListener('mouseout', (event) => {
    if(event.target.closest('li')) {
      event.target.classList.remove('pressed');
    } 
  });
}

const addPressButtons = () => {
  document.addEventListener('keydown', (event) => {
    document.querySelectorAll('li').forEach(el => {
      if(el.classList.contains(event.code)) {
        el.classList.add('pressed');
        document.querySelector('textArea').value += event.key;
      }
    });
  });

  document.addEventListener('keyup', (event) => {
    document.querySelectorAll('li').forEach(el => {      
      el.classList.remove('pressed');      
    });
  });
}

// const addCapsLockclick = () => {
//   document.querySelector('li:nth-child(30)').addEventListener('click', (event) => {
//     event.target.classList.toggle('pressed');
//   });
// }
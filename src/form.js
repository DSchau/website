import { FORM_URL } from './constants/urls';

let SUBMITTED = false;

export function validate(inputs = ['name', 'message'], invalidClassName = 'invalid') {
  let focused = false;
  const fields = [].concat(inputs)
    .map(id => document.getElementById(id))
    .filter(el => {
      const valid = el.value && el.value.length > 0;
      if (!valid) {
        if ( !focused ) {
          el.focus();
          focused = true;
        }
        el.classList.add(invalidClassName);
      } else {
        el.classList.remove(invalidClassName);
      }
      return valid;
    });
  
  return fields.length === inputs.length;
}

export function getSuccessMessage(successMessage = 'Thanks! I\'ll be in touch.') {
  const message = document.createElement('h3');
  message.className = 'message success';
  message.innerHTML = successMessage;
  return message;
}

export function sendEmail(url = FORM_URL, inputs = ['name', 'message']) {
  const form = inputs
    .reduce((formObj, inputId) => {
      formObj[inputId] = document.getElementById(inputId).value;
      return formObj;
    }, {});
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(form)
  });
}

export default function handleForm(id = 'contact-form') {
  const formEl = document.getElementById(id);
  const submitCallback = (ev) => {
    ev.preventDefault();
    if ( !SUBMITTED ) {
      const valid = validate();

      if ( valid ) {
        SUBMITTED = true;
        formEl.classList.add('pending');
        // sendEmail()
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2500);
        })
          .catch(() => ({}))  
          .then(() => {
            formEl.classList.add('hide');
            formEl.classList.remove('pending');
            formEl.appendChild(getSuccessMessage());
          });
      }
    }
  };

  formEl.addEventListener('submit', submitCallback);

  return () => {
    return formEl.removeEventListener('submit', submitCallback);
  };
}

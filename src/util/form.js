import { FORM_URL } from '../constants';

const EXCLUDED_FORM_ELEMENTS = ['BUTTON'];

const VALIDATORS = {
  text: value => value.length > 0,
  email: value => /.+@.+\..+/.test(value)
};

let SUBMITTED = false;

export function getFormElements(
  excludeNodes = EXCLUDED_FORM_ELEMENTS,
  formName = 'contact-form'
) {
  return Array.prototype.slice
    .call(document.forms[formName])
    .filter(el => excludeNodes.indexOf(el.nodeName) === -1)
    .reduce((formObj, el) => {
      formObj[el.id] = el;
      return formObj;
    }, {});
}

export function elementIsValid(element, validators = VALIDATORS) {
  const type = element.getAttribute('type') || 'text';
  if (element.value) {
    return (validators[type] || validators.text)(element.value);
  }
  return false;
}

export function validate(invalidClassName = 'invalid') {
  let focused = false;
  const inputs = getFormElements();
  const ids = Object.keys(inputs);
  return (
    ids.reduce((validCount, id) => {
      const el = inputs[id];
      if (!elementIsValid(el)) {
        el.classList.add(invalidClassName);
        if (!focused) {
          el.focus();
          focused = true;
        }
      } else {
        el.classList.remove(invalidClassName);
        validCount += 1;
      }
      return validCount;
    }, 0) === ids.length
  );
}

export function sendEmail(url = FORM_URL) {
  const inputs = getFormElements();
  const form = Object.keys(inputs).reduce((formObj, id) => {
    formObj[id] = inputs[id].value;
    return formObj;
  }, {});
  return Promise.race([
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(form)
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => reject('Service call failed'), 5000);
    })
  ]);
}

export function disableElements(elements) {
  elements.forEach(el => {
    el.setAttribute('disabled', true);
  });
}

export function enableElements(elements) {
  elements.forEach(el => {
    el.removeAttribute('disabled');
  });
}

export default function handleForm(formId = 'contact-form-container') {
  const formContainer = document.getElementById(formId);
  const formEl = formContainer.querySelector('form');
  const alertEl = formContainer.querySelector('.alert');
  const formElements = getFormElements([]);
  const { submit: submitButton } = formElements;
  const inputs = Object.keys(formElements).map(id => formElements[id]);

  const submitButtonContent = submitButton.innerHTML;
  const submitCallback = ev => {
    ev.preventDefault();
    if (!SUBMITTED) {
      const valid = validate();

      if (valid) {
        SUBMITTED = true;
        submitButton.innerHTML = 'Sending&hellip;';
        formEl.classList.add('pending');
        disableElements(inputs);
        sendEmail()
          .then(() => {
            formContainer.style.height = `${formEl.clientHeight}px`;
            formEl.remove();
            alertEl.classList.remove('hide');
          })
          .catch(e => {
            enableElements(inputs);
            formEl.classList.remove('pending');
            submitButton.innerHTML = submitButtonContent;
            throw e;
          });
      }
    }
  };

  formEl.addEventListener('submit', submitCallback);

  return () => formEl.removeEventListener('submit', submitCallback);
}

import i18nextInstance from '../i18n.js';

const renderFormControls = (input, submitButton, formState) => {
  input.classList.remove('is-invalid');
  input.removeAttribute('readonly');
  submitButton.disabled = false;

  switch (formState) {
    case 'invalid':
      input.classList.add('is-invalid');
      break;

    case 'validatedAndSubmitted':
      input.setAttribute('readonly', true);
      submitButton.disabled = true;
      break;

    default:
      input.value = '';
      input.focus();
      break;
  }
};

const renderFeedbackMessage = (feedback, value) => {
  switch (value) {
    case null:
      feedback.textContent = '';
      break;
    case 'noErrors':
      feedback.textContent = i18nextInstance.t('rssSuccessfullySubmitted');
      feedback.classList.add('text-success');
      feedback.classList.remove('text-danger');
      break;
    default:
      feedback.textContent = i18nextInstance.t(`error.${value}`);
      feedback.classList.add('text-danger');
      feedback.classList.remove('text-success');
      break;
  }
};

export { renderFormControls, renderFeedbackMessage };

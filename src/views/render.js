import i18nextInstance from '../i18n.js';

const renderValidationError = (form, formState) => {
  const input = form.querySelector('input#url-input');

  if (formState === 'invalid') {
    input.classList.add('is-invalid');
  } else {
    input.classList.remove('is-invalid');
    input.value = '';
    input.focus();
  }
};

const renderFeedbackMessage = (feedback, value) => {
  const isSuccess = value === 'success';

  feedback.classList.toggle('text-success', isSuccess);
  feedback.classList.toggle('text-danger', !isSuccess);
  feedback.textContent = isSuccess ? i18nextInstance.t('rssSuccessfullySubmitted') : value;
};

export { renderValidationError, renderFeedbackMessage };

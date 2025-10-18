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
  const isSuccess = value === 'RSS успешно загружен';

  feedback.classList.toggle('text-success', isSuccess);
  feedback.classList.toggle('text-danger', !isSuccess);

  feedback.textContent = value;
};

export { renderValidationError, renderFeedbackMessage };

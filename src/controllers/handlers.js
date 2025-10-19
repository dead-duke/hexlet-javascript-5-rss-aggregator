import urlSchema from '../models/validator.js';

const submitHandler = (state) => (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const url = formData.get('url').trim();

  urlSchema(state.feeds)
    .validate(url)
    .then(() => {
      state.feeds.push(url);
      state.rssForm.feedbackMessage = 'success';
      state.rssForm.state = 'waitingForSubmission';
    })
    .catch((error) => {
      const errorMessage = error.errors[0];
      state.rssForm.feedbackMessage = errorMessage;
      state.rssForm.state = 'invalid';
    });
};

export default submitHandler;

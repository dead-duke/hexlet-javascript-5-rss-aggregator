import onChange from 'on-change';
import {
  renderValidationError,
  renderFeedbackMessage,
} from '../views/render.js';

const watcher = (state, form, feedback) => {
  const watchedState = onChange(state, (path, value) => {
    if (path === 'rssForm.state') {
      renderValidationError(form, value);
    }
    if (path === 'rssForm.feedbackMessage') {
      renderFeedbackMessage(feedback, value);
    }
  });

  return watchedState;
};

export default watcher;

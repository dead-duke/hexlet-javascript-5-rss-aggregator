import onChange from 'on-change';
import { renderFormControls, renderFeedbackMessage, renderPosts } from '../views/render.js';

const watcher = (state, input, submitButton, feedback, postsContainer, feedsContainer) => {
  const watchedState = onChange(state, (path, value) => {
    if (path === 'rssForm.state') {
      renderFormControls(input, submitButton, value);
    }
    if (path === 'rssForm.error') {
      renderFeedbackMessage(feedback, value);
    }
    if (path === 'channels') {
      renderPosts(postsContainer, feedsContainer, ...value);
    }
  });

  return watchedState;
};

export default watcher;

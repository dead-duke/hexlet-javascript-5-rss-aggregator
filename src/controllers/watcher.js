import onChange from 'on-change';
import {
  renderFormControls,
  renderFeedbackMessage,
  renderPosts,
  renderNewPosts,
  fillModalContent,
  renderViewedPost,
} from '../views/render.js';

const watcher = (
  state,
  input,
  submitButton,
  feedback,
  postsContainer,
  feedsContainer,
  modal,
  bootstrapModal
) => {
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
    if (path.endsWith('newPosts')) {
      renderNewPosts(postsContainer, value);
    }
    if (path === 'ui.lastMarkedPostId') {
      renderViewedPost(value);
    }
    if (path === 'ui.modal') {
      if (value.isOpen) {
        fillModalContent(modal, value);
        bootstrapModal.show();
      } else {
        bootstrapModal.hide();
      }
    }
  });

  return watchedState;
};

export default watcher;

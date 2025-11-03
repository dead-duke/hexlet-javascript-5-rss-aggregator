import watcher from './controllers/watcher.js';
import submitHandler from './controllers/handlers.js';
import i18nInstance from './i18n.js';

const init = () => {
  const elements = document.querySelectorAll('[data-translate]');
  for (const element of elements) {
    const key = element.dataset.translate;
    element.innerText = i18nInstance.t(key);
  }
};

const app = () => {
  init();

  const state = {
    rssForm: {
      state: 'waitingForSubmission',
      error: null,
    },
    channels: [],
  };

  const form = document.querySelector('form.rss-form');
  const input = form.querySelector('input#url-input');
  const feedback = document.querySelector('p.feedback');
  const submitButton = form.querySelector('button[type="submit"]');
  const postsContainer = document.querySelector('section.container-fluid.container-xxl div.posts');
  const feedsContainer = document.querySelector('section.container-fluid.container-xxl div.feeds');

  const stateWatcher = watcher(state, input, submitButton, feedback, postsContainer, feedsContainer);
  form.addEventListener('submit', submitHandler(stateWatcher));
};

export default app;

import watcher from './controllers/watcher.js';
import submitHandler from './controllers/handlers.js';
import i18nInstance from './i18n.js';
import i18nInit from './views/i18nInit.js';

const app = () => {
  i18nInit(i18nInstance);

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

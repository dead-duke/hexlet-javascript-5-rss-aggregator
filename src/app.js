import watcher from './controllers/watcher.js';
import submitHandler from './controllers/handlers.js';
import i18nextInstance from './i18n.js';

const init = () => {
  const elements = document.querySelectorAll('[data-translate]');
  for (const element of elements) {
    const key = element.dataset.translate;
    element.innerText = i18nextInstance.t(key);
  }
};

const app = () => {
  init();

  const state = {
    rssForm: {
      state: 'waitingForSubmission',
      feedbackMessage: null,
    },
    feeds: [],
  };

  const form = document.querySelector('form.rss-form');
  const feedback = document.querySelector('p.feedback');

  const stateWatcher = watcher(state, form, feedback);
  form.addEventListener('submit', submitHandler(stateWatcher));
};

export default app;

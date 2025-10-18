import watcher from './controllers/watcher.js';
import submitHandler from './controllers/handlers.js';

const app = () => {
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

import watcher from './controllers/watcher.js';
import submitHandler from './controllers/handlers.js';
import updateRssPosts from './controllers/updateRssPosts.js';
import i18nInstance from './i18n.js';
import i18nInit from './views/i18nInit.js';

const UPDATE_INTERVAL = 5000;

const app = () => {
  i18nInit(i18nInstance);

  const state = {
    rssForm: {
      state: 'waitingForSubmission',
      error: null,
    },
    channels: [],
    ui: {
      lastMarkedPostId: null,
      viewedPosts: new Set(),
      modal: {
        isOpen: false,
        postId: null,
        title: null,
        content: null,
        link: null,
      },
    },
  };

  const form = document.querySelector('form.rss-form');
  const input = form.querySelector('input#url-input');
  const feedback = document.querySelector('p.feedback');
  const submitButton = form.querySelector('button[type="submit"]');
  const postsContainer = document.querySelector('section.container-fluid.container-xxl div.posts');
  const feedsContainer = document.querySelector('section.container-fluid.container-xxl div.feeds');

  const stateWatcher = watcher(state, input, submitButton, feedback, postsContainer, feedsContainer);
  form.addEventListener('submit', submitHandler(stateWatcher));

  updateRssPosts(stateWatcher, UPDATE_INTERVAL);
};

export default app;

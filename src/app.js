import watcher from './controllers/watcher.js'
import {
  submitHandler,
  openModalHandler,
  closeModalHandler,
  openPostHandler,
} from './controllers/handlers.js'
import updateRssPosts from './controllers/updateRssPosts.js'
import i18nInstance from './i18n.js'
import i18nInit from './views/i18nInit.js'

const UPDATE_INTERVAL = 5000

const app = () => {
  i18nInit(i18nInstance)

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
  }

  const elements = {
    form: document.querySelector('form.rss-form'),
    input: document.querySelector('input#url-input'),
    feedback: document.querySelector('p.feedback'),
    submitButton: document.querySelector('button[type="submit"]'),
    postsContainer: document.querySelector('section.container-fluid.container-xxl div.posts'),
    feedsContainer: document.querySelector('section.container-fluid.container-xxl div.feeds'),
    modal: document.getElementById('modal'),
  }

  /* global bootstrap */
  const bootstrapModal = new bootstrap.Modal(elements.modal)
  const stateWatcher = watcher(state, elements, bootstrapModal)

  elements.form.addEventListener('submit', submitHandler(stateWatcher))
  elements.postsContainer.addEventListener('click', openPostHandler(stateWatcher))
  elements.postsContainer.addEventListener('auxclick', openPostHandler(stateWatcher))
  elements.postsContainer.addEventListener('click', openModalHandler(stateWatcher))
  elements.modal.addEventListener('hidden.bs.modal', closeModalHandler(stateWatcher))

  updateRssPosts(stateWatcher, UPDATE_INTERVAL)
}

export default app

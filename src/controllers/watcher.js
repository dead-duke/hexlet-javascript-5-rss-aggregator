import onChange from 'on-change'
import {
  renderFormControls,
  renderFeedbackMessage,
  renderPosts,
  renderNewPosts,
  fillModalContent,
  renderViewedPost,
} from '../views/render.js'

const watcher = (state, elements, bootstrapModal) => {
  const watchedState = onChange(state, (path, value) => {
    if (path === 'rssForm.state') {
      renderFormControls(elements.input, elements.submitButton, value)
    }
    if (path === 'rssForm.error') {
      renderFeedbackMessage(elements.feedback, value)
    }
    if (path === 'channels') {
      renderPosts(elements.postsContainer, elements.feedsContainer, ...value)
    }
    if (path.endsWith('newPosts')) {
      renderNewPosts(elements.postsContainer, value)
    }
    if (path === 'ui.lastMarkedPostId') {
      renderViewedPost(value)
    }
    if (path === 'ui.modal') {
      if (value.isOpen) {
        fillModalContent(elements.modal, value)
        bootstrapModal.show()
      }
      else {
        bootstrapModal.hide()
      }
    }
  })

  return watchedState
}

export default watcher

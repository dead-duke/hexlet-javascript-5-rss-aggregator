import urlSchema from '../models/validator.js';
import classifyError from '../utils/errorClassifier.js';
import { fetchRssChannel } from '../services/rssService.js';
import findPostById from '../utils/postFinder.js';

const submitHandler = (state) => (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const url = formData.get('url').trim();

  urlSchema(state.channels.map(({ url }) => url))
    .validate(url)
    .then(() => {
      state.rssForm.error = null;
      state.rssForm.state = 'validatedAndSubmitted';
      return fetchRssChannel(url);
    })
    .then((data) => {
      state.channels.unshift({ url, ...data });
      state.rssForm.error = 'noErrors';
      state.rssForm.state = 'waitingForSubmission';
    })
    .catch((error) => {
      const errorType = classifyError(error);
      state.rssForm.error = errorType;
      state.rssForm.state = 'invalid';
    });
};

const openModalHandler = (state) => (event) => {
  const button = event.target.closest('.btn');
  if (button) {
    const postContainer = button.closest('.list-group-item');
    const postId = postContainer.dataset.postId;
    const post = findPostById(postId, state.channels);

    state.ui.modal = {
      isOpen: true,
      postId: postId,
      title: post.title,
      content: post.description,
      link: post.link,
    };
  }
};

const closeModalHandler = (state) => () => {
  state.ui.modal = {
    isOpen: false,
    postId: null,
    title: null,
    content: null,
    link: null,
  };
};

const openPostHandler = (state) => (event) => {
  const isLink = event.target.closest('a');
  const isButton = event.target.closest('.btn') && event.type === 'click';

  if (isLink || isButton) {
    const postContainer = event.target.closest('.list-group-item');
    const postId = postContainer.dataset.postId;

    if (!state.ui.viewedPosts.has(postId)) {
      state.ui.lastMarkedPostId = postId;
      state.ui.viewedPosts.add(postId);
    }
  }
};

export { submitHandler, openModalHandler, closeModalHandler, openPostHandler };

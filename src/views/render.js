import i18nextInstance from '../i18n.js';

const renderFormControls = (input, submitButton, formState) => {
  input.classList.remove('is-invalid');
  input.removeAttribute('readonly');
  submitButton.disabled = false;

  switch (formState) {
    case 'invalid':
      input.classList.add('is-invalid');
      break;

    case 'validatedAndSubmitted':
      input.setAttribute('readonly', true);
      submitButton.disabled = true;
      break;

    default:
      input.value = '';
      input.focus();
      break;
  }
};

const renderFeedbackMessage = (feedback, value) => {
  switch (value) {
    case null:
      feedback.textContent = '';
      break;
    case 'noErrors':
      feedback.textContent = i18nextInstance.t('rssSuccessfullySubmitted');
      feedback.classList.add('text-success');
      feedback.classList.remove('text-danger');
      break;
    default:
      feedback.textContent = i18nextInstance.t(`error.${value}`);
      feedback.classList.add('text-danger');
      feedback.classList.remove('text-success');
      break;
  }
};

const createListContainer = (containerTitle) => {
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const titleContainer = document.createElement('div');
  titleContainer.classList.add('card-body');

  const title = document.createElement('h2');
  title.classList.add('card-title', 'h4');
  title.textContent = containerTitle;

  card.append(titleContainer);
  titleContainer.append(title);

  const itemsContainer = document.createElement('ul');
  itemsContainer.classList.add('list-group', 'border-0', 'rounded-0');
  card.append(itemsContainer);

  return card;
};

const addPosts = (postsList, posts) => {
  for (const post of posts) {
    const item = document.createElement('li');
    item.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
      'border-0',
      'border-end-0'
    );
    item.dataset.postId = post.id;

    const link = document.createElement('a');
    link.classList.add('fw-bold');
    link.href = post.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = post.title;
    item.append(link);

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.textContent = i18nextInstance.t('viewButton');
    item.append(button);

    postsList.prepend(item);
  }
};

const addFeed = (feedsList, { title, description }) => {
  const feed = document.createElement('li');
  feed.classList.add('list-group-item', 'border-0', 'border-end-0');

  const feedTitle = document.createElement('h3');
  feedTitle.classList.add('h6', 'm-0');
  feedTitle.textContent = title;
  feed.append(feedTitle);

  const feedDescription = document.createElement('p');
  feedDescription.classList.add('m-0', 'small', 'text-black-50');
  feedDescription.textContent = description;
  feed.append(feedDescription);

  feedsList.prepend(feed);
};

const renderPosts = (postsContainer, feedsContainer, { feed, posts }) => {
  if (postsContainer.children.length < 1) {
    const postsListContainer = createListContainer(i18nextInstance.t('posts'));
    postsContainer.append(postsListContainer);
    const feedsListContainer = createListContainer(i18nextInstance.t('feeds'));
    feedsContainer.append(feedsListContainer);
  }
  const postsList = postsContainer.querySelector('ul.list-group');
  addPosts(postsList, posts);
  const feedsList = feedsContainer.querySelector('ul.list-group');
  addFeed(feedsList, feed);
};

const renderNewPosts = (postsContainer, posts) => {
  const postsList = postsContainer.querySelector('ul.list-group');
  addPosts(postsList, posts);
};

const fillModalContent = (modal, modalData) => {
  modal.querySelector('.modal-title').textContent = modalData.title;
  modal.querySelector('.modal-body').textContent = modalData.content;
  modal.querySelector('.full-article').href = modalData.link;
};

const renderViewedPost = (postId) => {
  const post = document.querySelector(`[data-post-id="${postId}"]`);
  const link = post.querySelector('a');
  link.classList.remove('fw-bold');
  link.classList.add('fw-normal', 'link-secondary');
};

export {
  renderFormControls,
  renderFeedbackMessage,
  renderPosts,
  renderNewPosts,
  fillModalContent,
  renderViewedPost,
};

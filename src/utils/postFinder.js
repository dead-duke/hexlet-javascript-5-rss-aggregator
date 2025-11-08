export const findPostById = (postId, channels) => {
  for (const channel of channels) {
    const post = channel.posts.find(({ id }) => id === postId);
    if (post) {
      return post;
    }
  }
  return null;
};

export default findPostById;

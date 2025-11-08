const generatePostId = (link, pubDate) => {
  const linkPart = btoa(link)
    .replaceAll(/[^a-zA-Z0-9]/g, '')
    .slice(-20);
  const datePart = new Date(pubDate).getTime();
  return `post_${linkPart}_${datePart}`;
};

export default generatePostId;

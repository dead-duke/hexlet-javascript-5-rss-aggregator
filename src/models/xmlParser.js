import ParsingError from '../errors/ParsingError.js';
import generatePostId from '../utils/idGenerator.js';

const xmlParser = (xml) => {
  const parser = new DOMParser();
  const xmlDomTree = parser.parseFromString(xml, 'application/xml');

  const parseError = !xmlDomTree.querySelector('rss');
  if (parseError) {
    throw new ParsingError();
  }

  const title = xmlDomTree.querySelector('channel>title').textContent;
  const description = xmlDomTree.querySelector('channel>description').textContent;
  const posts = Array.from(xmlDomTree.querySelectorAll('item'))
    .map((item) => {
      const title = item.querySelector('title').textContent;
      const description = item.querySelector('description').textContent;
      const link = item.querySelector('link').textContent;
      const pubDate = item.querySelector('pubDate')?.textContent || Date.now();
      const id = generatePostId(link, pubDate);
      return { id, title, description, link };
    })
    .reverse();

  return {
    feed: {
      title,
      description,
    },
    posts,
    newPosts: [],
  };
};

export default xmlParser;

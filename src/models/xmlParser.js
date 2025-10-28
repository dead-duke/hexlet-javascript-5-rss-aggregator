import ParsingError from '../errors/ParsingError.js';

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
      const link = item.querySelector('link').textContent;
      return { title, link };
    })
    .reverse();

  return {
    feed: {
      title,
      description,
    },
    posts,
  };
};

export default xmlParser;

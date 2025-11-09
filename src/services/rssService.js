import axios from 'axios';
import addProxy from '../utils/proxyHelper.js';
import xmlParser from '../models/xmlParser.js';
import getCompositePostKey from '../utils/postKeyGenerator.js';

const fetchRssChannel = (url) => {
  // Для обхода кэширования Safari
  // const separator = url.includes('?') ? '&' : '?';
  // const uniqueUrl = `${url}${separator}_t=${Date.now()}`;

  // return axios.get(addProxy(uniqueUrl)).then((response) => {
  //   const xml = response.data.contents;
  //   const data = xmlParser(xml);
  //   return data;
  // });
  return axios.get(addProxy(url)).then((response) => {
    const xml = response.data.contents;
    const data = xmlParser(xml);
    return data;
  });
};

const fetchNewPosts = (channel) =>
  fetchRssChannel(channel.url).then((data) => {
    const existingKeys = new Set(channel.posts.map(getCompositePostKey));
    const newPosts = (data.posts || []).filter((post) => !existingKeys.has(getCompositePostKey(post)));
    return newPosts;
  });

export { fetchRssChannel, fetchNewPosts };

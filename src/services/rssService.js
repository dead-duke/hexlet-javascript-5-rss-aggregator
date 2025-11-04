import axios from 'axios';
import addProxy from '../utils/proxyHelper.js';
import xmlParser from '../models/xmlParser.js';

const fetchRssChannel = (url) => {
  const separator = url.includes('?') ? '&' : '?';
  const uniqueUrl = `${url}${separator}_t=${Date.now()}`; // Для обхода кэширования Safari

  return axios.get(addProxy(uniqueUrl)).then((response) => {
    const xml = response.data.contents;
    const data = xmlParser(xml);
    return data;
  });
};

export { fetchRssChannel };

import axios from 'axios';
import { ValidationError } from 'yup';
import urlSchema from '../models/validator.js';
import xmlParser from '../models/xmlParser.js';
import ParsingError from '../errors/ParsingError.js';

const getErrorType = (error) => {
  if (error instanceof ValidationError) {
    return error.errors[0];
  }
  if (axios.isAxiosError(error)) {
    return 'networkError';
  }
  if (error instanceof ParsingError) {
    return 'parsingError';
  }
  return 'unknownError';
};

const addProxy = (url) => {
  const proxyUrl = new URL('/get', 'https://allorigins.hexlet.app');
  proxyUrl.searchParams.set('url', url);
  return proxyUrl.toString();
};

const submitHandler = (state) => (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const url = formData.get('url').trim();

  urlSchema(state.channels.map(({ url }) => url))
    .validate(url)
    .then(() => {
      state.rssForm.error = null;
      state.rssForm.state = 'validatedAndSubmitted';
      return axios.get(addProxy(url));
    })
    .then((response) => {
      const xml = response.data.contents;
      const data = xmlParser(xml);

      state.channels.unshift({ url, ...data });
      state.rssForm.error = 'noErrors';
      state.rssForm.state = 'waitingForSubmission';
    })
    .catch((error) => {
      const errorType = getErrorType(error);
      state.rssForm.error = errorType;
      state.rssForm.state = 'invalid';
    });
};

export default submitHandler;

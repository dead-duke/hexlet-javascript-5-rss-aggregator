import axios from 'axios';
import urlSchema from '../models/validator.js';
import xmlParser from '../models/xmlParser.js';
import classifyError from '../utils/errorClassifier.js';

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
      const errorType = classifyError(error);
      state.rssForm.error = errorType;
      state.rssForm.state = 'invalid';
    });
};

export default submitHandler;

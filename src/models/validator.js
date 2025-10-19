import { string } from 'yup';
import i18nextInstance from '../i18n.js';

const urlSchema = (feeds) =>
  string()
    .required(i18nextInstance.t('error.rssFieldRequired'))
    .url(i18nextInstance.t('error.rssUrlMustBeValid'))
    .notOneOf(feeds, i18nextInstance.t('error.rssAlreadyAdded'));

export default urlSchema;

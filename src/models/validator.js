import { string } from 'yup'

const urlSchema = channelsUrls =>
  string().required('rssFieldRequired').url('rssUrlMustBeValid').notOneOf(channelsUrls, 'rssAlreadyAdded')

export default urlSchema

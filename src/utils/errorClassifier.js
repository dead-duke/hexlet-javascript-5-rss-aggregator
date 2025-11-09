import { isAxiosError } from 'axios'
import { ValidationError } from 'yup'
import ParsingError from '../errors/ParsingError.js'

const classifyError = (error) => {
  if (error instanceof ValidationError) {
    return error.errors[0]
  }
  if (isAxiosError(error)) {
    return 'networkError'
  }
  if (error instanceof ParsingError) {
    return 'parsingError'
  }
  return 'unknownError'
}

export default classifyError

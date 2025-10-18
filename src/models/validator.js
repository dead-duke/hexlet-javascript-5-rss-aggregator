import { string } from 'yup';

const urlSchema = (feeds) =>
  string()
    .required('Это поле обязательно для заполнения')
    .url('Ссылка должна быть валидным URL')
    .notOneOf(feeds, 'RSS уже существует');

export default urlSchema;

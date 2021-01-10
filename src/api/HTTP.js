import axios from 'axios';
import config from './';

const HTTP = axios.create(config);

export default HTTP;

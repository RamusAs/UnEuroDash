import HTTP from './HTTP';

const BASE = 'sendMail';

export default async function send(data) {
  try {
    const response = await HTTP.put(BASE, data);
    return response;
  } catch (e) {
    throw e;
  }
}

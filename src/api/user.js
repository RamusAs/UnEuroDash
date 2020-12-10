import HTTP from './HTTP';

const BASE = 'user';

export async function sigin(data) {
  try {
    const response = await HTTP.put(BASE + '/sigin', data);
    return response;
  } catch (e) {
    throw e.response;
  }
}

export async function sigout(data) {
  try {
    const response = await HTTP.put(BASE + '/sigout', data);
    return response;
  } catch (e) {
    throw e;
  }
}

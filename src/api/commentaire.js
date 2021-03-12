import HTTP from './HTTP';

const BASE = 'commentaire';


export async function create(data) {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await HTTP.put(`${BASE}/create`, data);
    return response;
  } catch (e) {
    throw e;
  }
}

export async function getAll() {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await HTTP.put(BASE);
    return response;
  } catch (e) {
    throw e;
  }
}


export async function getOne(id) {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await HTTP.put(`${BASE}/${id}`);
    return response;
  } catch (e) {
    throw e;
  }
}


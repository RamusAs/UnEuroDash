import HTTP from './HTTP';

const BASE = 'notification';

export async function getAll(request) {
  try {
    const response = await HTTP.put(BASE, request);
    return response;
  } catch (e) {
    throw e;
  }
}

export async function deleteMany(ids) {
  try {
    const response = await HTTP.put(`${BASE}/delete`, { ids });
    return response;
  } catch (e) {
    throw e;
  }
}
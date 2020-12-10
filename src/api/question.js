import HTTP from './HTTP';

const BASE = 'question';

export async function getAll(request) {
  try {
    const response = await HTTP.put(BASE, request);
    return response;
  } catch (e) {
    throw e;
  }
}

export async function getOne(id) {
  try {
    const response = await HTTP.put(`${BASE}/${id}`);
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

export async function update(ids, answered) {
  try {
    const response = await HTTP.put(`${BASE}/update`, { ids, answered });
    return response;
  } catch (e) {
    throw e;
  }
}

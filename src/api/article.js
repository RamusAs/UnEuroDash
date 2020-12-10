import HTTP from './HTTP';

const BASE = 'article';

export async function getAll(requestQuery) {
  try {
    const response = await HTTP.put(BASE, requestQuery);
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

export async function create(data) {
  try {
    const response = await HTTP.put(`${BASE}/create`, data);
    return response;
  } catch (e) {
    throw e;
  }
}

export async function update(data) {
  try {
    const response = await HTTP.put(`${BASE}/update`, data);
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

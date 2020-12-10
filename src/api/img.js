import HTTP from './HTTP';

const BASE = 'uploadFile';

export async function uploadFile(file, path) {
  try {
    const formdata = new FormData();
    formdata.append('fiedFile', file);
    const response = await HTTP.put(`${BASE}?path=${path}`, formdata);
    return response;
  } catch (e) {
    throw e;
  }
}

export const NOTHING = "";

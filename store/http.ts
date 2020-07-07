export const http = {
  apiRoot: 'https://rn-academind-training.firebaseio.com/',
  get(url: string) {
    url = url.match(/^http/) ? url : http.apiRoot + url
    return fetch(url);
  },
  post(url: string, body: { [key: string]: any }) {
    url = url.match(/^http/) ? url : http.apiRoot + url
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...body }),
    });
  },
  patch(url: string, body: { [key: string]: any }) {
    url = url.match(/^http/) ? url : http.apiRoot + url
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...body }),
    });
  },
  delete(url: string) {
    url = url.match(/^http/) ? url : http.apiRoot + url
    return fetch(url, {
      method: 'DELETE'
    });
  },
};

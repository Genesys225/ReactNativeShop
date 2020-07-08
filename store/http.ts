export const http = {
  apiRoot: 'https://rn-academind-training.firebaseio.com/',
  get(url: string) {
    url = url.match(/^http/) ? url : http.apiRoot + url;
    return handleRequest(url);
  },
  post(url: string, body: { [key: string]: any }) {
    url = url.match(/^http/) ? url : http.apiRoot + url;
    return handleRequest(url, patchOrPost('POST', body));
  },
  patch(url: string, body: { [key: string]: any }) {
    url = url.match(/^http/) ? url : http.apiRoot + url;
    return handleRequest(url, patchOrPost('PATCH', body));
  },
  delete(url: string) {
    url = url.match(/^http/) ? url : http.apiRoot + url;
    return handleRequest(url, {
      method: 'DELETE',
    });
  },
};

async function handleRequest(url: string, options: RequestInit | null = null) {
  try {
    const response = options ? await fetch(url, options) : await fetch(url);
    if (!response.ok) throw new Error('Something went wrong!');
    return response.json();
  } catch (error) {
    throw error;
  }
}

function patchOrPost(method: 'POST' | 'PATCH', body: { [key: string]: any }) {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...body }),
  };
}

import {getUserFromCookie} from "./cookie.util";

const api = async (url = '', data = {}, options: Partial<Request> = {}) => {
  const user = getUserFromCookie();
  const method = options.method ? options.method : 'GET';
  const response = await fetch(url, {
    method: options.method ? options.method : 'GET', // *GET, POST, PUT, DELETE, etc.
    cache:  options.cache ? options.cache : 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: options.credentials ? options.credentials : 'same-origin', // include, *same-origin, omit
    headers: options.headers ? options.headers : new Headers({
      'content-type': 'application/json',
      'Authorization': `Bearer ${user ? user.accessToken : undefined}`
    }),
    redirect: options.redirect ? options.redirect : 'follow', // manual, *follow, error
    referrerPolicy: options.referrerPolicy ? options.referrerPolicy : 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: method !== 'GET' ? JSON.stringify(data) : undefined,
  });
  return response;
}

export default api;

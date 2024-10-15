import { serialize, parse } from 'cookie';

export function setCookie(name: string, value: string, options: any = {}) {
  document.cookie = serialize(name, value, {
    path: '/',
    ...options,
  });
}

export function getCookie(name: string) {
  const cookies = parse(document.cookie);
  return cookies[name];
}

export function removeCookie(name: string) {
  document.cookie = serialize(name, '', {
    maxAge: -1,
    path: '/',
  });
}
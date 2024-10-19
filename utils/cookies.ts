// utils/cookies.ts

// Function to set a cookie
export function setCookie(name: string, value: string, options: any = {}) {
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${options}; path=/`;
}
export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    const cookieValue = parts.pop(); // This could be undefined
    if (cookieValue) {
      return decodeURIComponent(cookieValue.split(';')[0]); // Safely access the first part after splitting
    }
  }
  
  return null; // Return null if the cookie doesn't exist
}
export function removeCookie(name: string) {
  setCookie(name, '', -1); // Set cookie with a past expiration date to remove it
}

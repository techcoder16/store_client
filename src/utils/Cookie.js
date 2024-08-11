import Cookies from 'js-cookie';

/**
 * Retrieves a cookie by key and checks its expiration.
 * @param {string} key - The key (name) of the cookie to retrieve.
 * @returns {object} - An object with `value` (cookie data) and `expired` (true/false).
 */
export async function DEFAULT_COOKIE_GETTER(key) {
  try {
    const cookieValue = Cookies.get(key);
    console.log(cookieValue)
    if (cookieValue) {
      return { value: cookieValue, expired: false };
    }

    // Cookie not found
    return { value: null, expired: true };
  } catch (error) {
    console.error("Error retrieving cookie:", error);
    return { value: null, expired: true };
  }
}

/**
 * Sets a cookie with optional expiration.
 * @param {string} key - The key (name) of the cookie.
 * @param {any} data - The data to store in the cookie.
 * @param {boolean} isExpired - Whether the cookie should have an expiration time.
 * @param {Date} expires - The expiration date for the cookie (optional).
 */
export async function DEFAULT_COOKIE_SETTER(key, data, isExpired, expires) {
  try {
    const options = isExpired ? { expires, secure: true,path:'' } : { expires };
    Cookies.set(key, data, options);
  } catch (error) {
    console.error("Error setting cookie:", error);
  }
}

/**
 * Deletes a cookie by key.
 * @param {string} key - The key (name) of the cookie to delete.
 */
export async function DEFAULT_COOKIE_DELETE(key) {
  Cookies.remove(key);
}

import Axios from 'axios';

const setAxiosToken = (token: string) => {
  Axios.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export const setToken = (token: string) => {
  setAxiosToken(token);
  localStorage.setItem('token', token);
};

export const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
};

export const unsetToken = () => {
  Axios.defaults.headers['Authorization'] = ``;
  localStorage.removeItem('token');
};

export const unsetRefreshToken = () => {
  localStorage.removeItem('refreshToken');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const isSetToken = () => {
  return (
    !!localStorage.getItem('token') && !!Axios.defaults.headers['Authorization']
  );
};

Axios.defaults.baseURL = process.env['API_URL']
  ? `${process.env['API_URL']}/`
  : 'http://localhost:3000/';
(() => {
  const t = getToken();
  if (t) {
    setAxiosToken(t);
  }
})();

export const refreshToken = async () => {
  const refresh = getRefreshToken();
  // eslint-disable-next-line prefer-promise-reject-errors
  if (!refresh) return Promise.reject(false);
  const rs = await Axios.post('public/refresh-token', { token: refresh }).catch(
    (e) => {
      console.error(e);
      if (e.message === 'Network Error') return 'Network Error';
      return null;
    }
  );
  if (!rs) {
    unsetToken();
    unsetRefreshToken();
    return false;
  }
  if (rs === 'Network Error') {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return false;
  }
  const { token, refreshToken } = rs.data;
  setToken(token);
  setRefreshToken(refreshToken);

  return token;
};

Axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.message === 'Network Error') {
      // if network - retry
      await new Promise((resolve) => setTimeout(resolve, 2000));
      originalConfig._retry = true;
      return Axios(originalConfig);
    }
    if (
      err.response &&
      !['public/login', 'public/refresh-token'].includes(originalConfig.url)
    ) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        const reject = () => {
          unsetToken();
          unsetRefreshToken();
          setTimeout(window.location.reload);
          originalConfig._retry = false;
          return Promise.reject(err.message);
        };
        if (err?.data?.message === 'RefreshtokenExpired') {
          return reject();
        }
        try {
          const token = await refreshToken();
          if (!token) {
            return reject();
          }
          originalConfig.headers['Authorization'] = `Bearer ${token}`;
          return Axios(originalConfig);
        } catch (_error) {
          return reject();
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  }
);

export default Axios;

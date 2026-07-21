export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    refresh: '/api/auth/refresh',
    logout: '/api/auth/logout',
    validate: '/api/auth/validate',
    session: '/api/auth/session',
    forgotPassword: '/api/auth/forgot-password',
  },

  wearables: {
    base: '/api/wearables',
  },

  onlineHelper: {
    base: '/api/onlinehelper',
  },

} as const;
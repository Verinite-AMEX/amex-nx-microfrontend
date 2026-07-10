export function captureAuthTokenFromUrl(): void {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  if (!token) {
    return;
  }

  try {
    localStorage.setItem('mfe_access_token', token);

    const payload = JSON.parse(atob(token.split('.')[1]));
    const user = {
      username: payload.sub,
      roles: payload.roles ?? [],
    };
    localStorage.setItem('mfe_user', JSON.stringify(user));

    const refreshToken = params.get('refreshToken');
    if (refreshToken) {
      localStorage.setItem('mfe_refresh_token', refreshToken);
    }
  } catch (e) {
    console.error('Failed to parse token from URL', e);
    return;
  }

  params.delete('token');
  params.delete('refreshToken');
  const cleanQuery = params.toString();
  const cleanUrl = window.location.pathname + (cleanQuery ? `?${cleanQuery}` : '') + window.location.hash;
  window.history.replaceState({}, document.title, cleanUrl);
}
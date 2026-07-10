export function captureAuthTokenFromUrl(): void {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  if (!token) {
    return; // normal navigation, nothing to bridge
  }

  try {
    // Store under the same shared key BtaAuthService reads
    localStorage.setItem('mfe_access_token', token);

    // The auth app only hands us the JWT — decode it to rebuild mfe_user
    // (username + roles), since bta-portal's origin never received the
    // auth app's own localStorage write.
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

  // Strip token params from the address bar so it isn't reprocessed/exposed
  params.delete('token');
  params.delete('refreshToken');
  const cleanQuery = params.toString();
  const cleanUrl = window.location.pathname + (cleanQuery ? `?${cleanQuery}` : '') + window.location.hash;
  window.history.replaceState({}, document.title, cleanUrl);
}
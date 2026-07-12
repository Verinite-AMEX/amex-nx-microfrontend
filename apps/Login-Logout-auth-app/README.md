# Demo Auth App

Minimal standalone Angular app demonstrating shared login/logout using
`@ui-components/ui` — the same mechanism your shell + remote
micro-frontends would use, but in one single app so you can see the
whole flow without the Module Federation setup.

## How it works

1. `amex-login-form` (from the library) renders the login UI and emits
   `loginSubmit` with `{ username, password }` — `login-page.component.ts`
   listens for that.

2. `AuthService.login()` simulates a backend call (replace with a real
   `HttpClient.post()` to your Spring Boot auth endpoint) and returns a
   token + user info.

3. `AuthService.onLoginSuccess()` calls `AmexPortalAuthUtil.onLoginSuccess()`
   (from the library), which writes the token into `localStorage` under
   fixed keys: `mfe_access_token`, `mfe_refresh_token`, `mfe_user`.

4. The `/home` route is protected by `portalAuthGuard` (also from the
   library) — it checks `localStorage` for a valid, non-expired token.
   No token → redirected to `/login`.

5. `HomePageComponent` shows the logged-in username (read back out of
   `localStorage` via the same util) and a Logout button.

6. Logout calls `AuthService.logout()` → `AmexPortalAuthUtil.logout()`
   clears the `localStorage` keys → next guarded route check fails →
   user is sent back to `/login`.

## Why this matters for the real microfrontend setup

`localStorage` is shared by every app running in the same browser tab —
shell and every Module Federation remote included. So in the real
project:

- Login only ever happens once, in the shell.
- Every remote just adds `portalAuthGuard` to its routes — it reads the
  same `localStorage` token the shell wrote, no separate login screen,
  no separate backend call.
- Logout from the shell instantly logs the user out of every remote too,
  since they're all reading/writing the same keys.

## Run it

```bash
npm install
npm start
```

Then open http://localhost:4200 — you'll land on `/login`. Type any
username/password (mock backend accepts anything non-empty), submit,
and you'll be redirected to `/home` showing your username and a working
Logout button.

## Files

- `src/app/auth.service.ts` — wraps `AmexPortalAuthUtil`, has the mock
  login call to swap for a real HTTP call
- `src/app/login-page.component.ts` — wires `amex-login-form` to `AuthService`
- `src/app/home-page.component.ts` — shows logged-in user + logout button
- `src/app/app.routes.ts` — route guard wiring with `portalAuthGuard`

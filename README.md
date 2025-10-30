# Tiradaus — Frontend (React + Vite)

Vite i React. Inclou MUI, react-router-dom i Redux Toolkit.

## Tecnologies
- React 19
- Vite
- MUI v5
- react-router-dom (v7)
- Redux Toolkit (react-redux)
- Axios

## Instal·lació i execució
Prerequisits: Node 18+ i npm

Instal·lar dependències:
```bash
npm install
```

Executar en desenvolupament:
```bash
npm run dev
```
## Estructura del projecte (arxius importants)
src/
  - main.jsx — punt d'entrada: ThemeProvider, CssBaseline, BrowserRouter, Redux Provider  
  - routes/
    - routes.json — definició central de rutes (paths)
    - Routes.jsx — registre de `<Routes>` i `<Route>`  
  - pages/
    - Index.jsx — pàgina principal (home)  
    - SignIn.jsx — pàgina d'accés (validació client + guardat auth a redux)  
    - Registre.jsx — pàgina de registre  
  - components/
    - Header.jsx — llegeix l'autenticació via selector Redux i mostra usuari / logout  
    - Footer.jsx, AuthMenu.jsx, Menu.jsx, Search.jsx  
  - services/
    - httpService.js — instància axios amb interceptor (llegeix token del Redux)  
    - account/index.js — wrappers: signIn, signOut, signUp  
  - store/
    - authSlice.js — slice d'autenticació (setAuth, logout, selectAuthToken)  
    - index.js — configuració del store (preload / persistència d'auth)  
  - styles/
    - theme.js — tema MUI (paleta, tipografia)

## Rutes
Les rutes es mantenen a `src/routes/routes.json` i s'utilitzen a `src/routes/Routes.jsx`. Afegir una ruta:
1. Afegir el path a `routes.json`.
2. Importar el component de pàgina a `Routes.jsx`.
3. Afegir `<Route path={routes.xxx} element={<YourPage />} />`.

## Autenticació (flux actual)
- `src/services/account/index.js` crida l'API via `httpService`.
- `httpService` aplica el token Bearer llegint `selectAuthToken(store.getState())` abans de cada petició, si està guardat.
- A `SignIn.jsx` després d'un login correcte:
  - obtenir token (body o headers segons backend),
  - dispatch `setAuth({ user, token })`,
  - redirigir a home.

## Redux (sense thunks)
La implementació actual disposa d'un slice senzill:
- Accions: `setAuth`, `logout`.
- Selector token: `selectAuthToken` — retornarà `state.auth.data?.token || null`.
Des de components cridar `dispatch(setAuth(authObj))` després de la resposta d'API.

## Validació client (SignIn)
- Validació a `onBlur` i a `onSubmit`.
- MUI `TextField` mostra `helperText` i `error` per camp.
- Errors del servidor es poden mapar a un objecte d'errors per camp o a un error general.

## Resolució de problemes comuns
- Error "route.path.includes is not a function": s'ha passat un objecte al prop `path`. Assegura't d'usar la cadena (ex. `routes.home.index`).
- "is not a function" al cridar un servei: comprova exports (named vs default) a `services/account`.
- Si axios no envia Authorization, comprova que el token estigui present en Redux/localStorage i que l'interceptor llegeixi correctament.

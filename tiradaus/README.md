Tiradaus — Frontend (React + Vite)

Vite i React. Inclou MUI, react-router-dom i Redux Toolkit.
Tecnologies

    React 19
    Vite
    MUI v5
    react-router-dom (v7)
    Redux Toolkit (react-redux)
    Axios

Instal·lació i execució

Prerequisits: Node 18+ i npm

Instal·lar dependències:

npm install

Executar en desenvolupament:

npm run dev

Estructura del projecte (arxius importants)

src/

    main.jsx — punt d'entrada: ThemeProvider, CssBaseline, BrowserRouter, Redux Provider, StrictMode
    routes/
        routes.json — definició central de rutes (paths)
        Routes.jsx — registre de <Routes> i <Route>
    pages/
        Index.jsx — pàgina principal (home)
        SignIn.jsx — pàgina d'accés (validació client + guardat auth a redux)
        Registre.jsx — pàgina de registre
        Perfil.jsx — pàgina de perfil d'usuari (amb DatePicker per a data de naixement)
        Calendari.jsx — calendari agrupat per mesos amb sales/events
        ContainerJocs.jsx, ContainerSales.jsx — pàgines contenidores
        ContainerJoc.jsx, ContainerSala.jsx — pàgines de detall d'un joc o sala
        CrearJoc.jsx, CrearSales.jsx — pàgines per crear nous jocs i sales
        EditarJoc.jsx, EditarSala.jsx — pàgines per editar jocs i sales
    components/
        Header.jsx — llegeix l'autenticació via selector Redux i mostra usuari / logout
        Footer.jsx, AuthMenu.jsx, Menu.jsx, Search.jsx, Confirmacio.jsx
        Jocs/ — components relacionats amb jocs:
            Jocs.jsx — llista de jocs
            Joc.jsx — vista detall d'un joc
            JocForm.jsx — formulari crear/editar jocs (mostra "Crear Joc" o "Editar Joc" segons joc)
        Salas/ — components relacionats amb sales/events:
            Sales.jsx — llista de sales amb moment.js per a dates
            Sala.jsx — vista detall d'una sala
            SalaForm.jsx — formulari crear/editar sales amb DateTimePicker
        Calendari/ — calendari:
            Calendar.jsx — calendari agrupat per mesos, amb noms en català (CatalanDays, CatalanMonths)
        base/ — components reutilitzables:
            DropDown.jsx
            NumField.jsx
            RadioGroupForm.jsx (anteriorment RadioGroup.jsx)
    constants/
        app.js — constants globals (UserRoles, CatalanDays, CatalanMonths)
    services/
        httpService.js — instància axios amb interceptor (llegeix token del Redux)
        account/index.js — wrappers: signIn, signOut, signUp, actualitzarUsusari, obtenirUsusari
        games/index.js — funcions: obtenirTotsJocs, crearJoc, actualitzarJoc, esborrarJoc
        sales/index.js — funcions: obtenirSales, crearSala, actualitzarSala, detallSala, esborrarSala
    store/
        authSlice.js — slice d'autenticació (setAuth, logout, selectAuthToken, updateUserName)
        index.js — configuració del store (preload / persistència d'auth)
    styles/
        theme.js — tema MUI (paleta, tipografia, colors)
    utils/
        validacions.js — funcions de validació (validarEmail, etc.)

> Nota: els components listats a `src/components/` inclouen tant elements d'interfície (Joc, Sala, JocForm, SalaForm) com helpers i diàlegs (p. ex. `Confirmacio.jsx`). El directori `base/` conté components petits reutilitzables. El directori `Calendari/` conté el component de calendari agrupat per mesos en Català.

Rutes

Les rutes es mantenen a src/routes/routes.json i s'utilitzen a src/routes/Routes.jsx. Afegir una ruta:

    Afegir el path a routes.json.
    Importar el component de pàgina a Routes.jsx.
    Afegir <Route path={routes.xxx} element={<YourPage />} />.

Autenticació (flux actual)

    src/services/account/index.js crida l'API via httpService.
    httpService aplica el token Bearer llegint selectAuthToken(store.getState()) abans de cada petició, si està guardat.
    A SignIn.jsx després d'un login correcte:
        obtenir token (body o headers segons backend),
        dispatch setAuth({ user, token }),
        redirigir a home.

Redux (sense thunks)

La implementació actual disposa d'un slice senzill:

    Accions: setAuth, logout.
    Selector token: selectAuthToken — retornarà state.auth.data?.token || null. Des de components cridar dispatch(setAuth(authObj)) després de la resposta d'API.

Validació client (SignIn)

    Validació a onBlur i a onSubmit.
    MUI TextField mostra helperText i error per camp.
    Errors del servidor es poden mapar a un objecte d'errors per camp o a un error general.

Resolució de problemes comuns

    Error "route.path.includes is not a function": s'ha passat un objecte al prop path. Assegura't d'usar la cadena (ex. routes.home.index).
    "is not a function" al cridar un servei: comprova exports (named vs default) a services/account.
    Si axios no envia Authorization, comprova que el token estigui present en Redux/localStorage i que l'interceptor llegeixi correctament.

Característiques recents

    Calendari (Calendari.jsx): Agrupa sales/events per mesos, amb noms de mesos i dies en Català (des de constants/app.js).
    Edició de jocs i sales: JocForm.jsx mostra "Crear Joc" o "Editar Joc" depenent si rep un joc existint. SalaForm.jsx usa DateTimePicker de MUI.
    Perfil d'usuari (Perfil.jsx): Permet editar dades d'usuari amb DatePicker per a la data de naixement (moment.utc()).
    Validació de dates: MUI DatePicker amb AdapterMoment, amb validació isValid() per evitar errors de parsing.
    Moment.js per a formats de data: "DD/MM/YYYY HH:mm", "dddd, DD" (dia de la setmana + dia), etc. Configuració de Catalan localitzada.



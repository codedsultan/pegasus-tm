import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import { createInertiaApp } from '@inertiajs/react';
// import { createRoot } from 'react-dom';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { resolvePageComponentForReact } from './Helpers/inertia-helpers';
import { Provider } from "react-redux";
import { store } from './redux/store.js'
import '../css/app.scss';
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';


// import ReactDOM from 'react-dom/client';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {

        const pages = import.meta.glob('./pages/**/*.tsx', { eager: true })

        const path = `./pages/${name}.tsx`
        return resolvePageComponentForReact(path, pages)
    },
    setup({ el, App, props }) {
        createRoot(el).render(<Provider store={store}><App {...props} /></Provider>);
    },
});

// createInertiaApp({
//     resolve: name => {
//         const pages = import.meta.glob('./Pages/**/*.tsx');
//         return pages[`./Pages/${name}.tsx`]().then(module => module.default);
//     },
//     setup({ el, App, props }) {
//         const root = createRoot(el);
//         root.render(<App {...props} />);
//     },
// });


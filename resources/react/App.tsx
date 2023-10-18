// Dependencies
import "./bootstrap";
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

// Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

// Assets & Design
import "~/libs/fontawesome/css/all.min.css";
import "@/styles/bootstrap.scss";
import '@/styles/main.scss';

createInertiaApp({
  title: (title) => `${title}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <Provider store={store}>
        <App {...props} />
      </Provider>
    );
  },
  progress: {
    color: '#4B5563',
  },
});

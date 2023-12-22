// Core
import "./core/bootstrap";

// Dependencies
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import AppContainer from "./App";
import { ToastContainer } from "react-toastify";

// Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

// Utils
import colors from "~tailwind/colors";

createInertiaApp({
  title: (title) => `${title}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <Provider store={store}>
        <AppContainer >
          <ToastContainer />
          <App {...props} />
        </AppContainer>
      </Provider>
    );
  },
  progress: {
    color: colors.primary,
  },
});

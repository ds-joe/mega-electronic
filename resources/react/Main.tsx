// Dependencies
import "./bootstrap";
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import AppContainer from "./App";

// Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

// Utils
import colors from "~tailwind/colors";

// Types
import { ServerProps } from "./types/Server";

createInertiaApp({
  title: (title) => `${title}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);
    const pageProps: ServerProps = props.initialPage.props as ServerProps;

    root.render(
      <Provider store={store}>
        <AppContainer props={pageProps}>
          <App {...props} />
        </AppContainer>
      </Provider>
    );
  },
  progress: {
    color: colors.dash.blue.DEFAULT,
  },
});

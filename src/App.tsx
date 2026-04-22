import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Settings from './pages/Settings';
import useSettingsState from './states/settingsState';
import { useEffect } from 'react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
import '@ionic/react/css/palettes/dark.class.css';
/* import '@ionic/react/css/palettes/dark.system.css'; */

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const { theme, language } = useSettingsState();

  useEffect(() => {
    let dark = false;
    if (theme === 'system') {
      dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      dark = theme === 'dark';
    }

    if (dark) {
      document.body.classList.add('dark');
      document.documentElement.classList.add('ion-palette-dark');
    } else {
      document.body.classList.remove('dark');
      document.documentElement.classList.remove('ion-palette-dark');
    }
  }, [theme]);

  useEffect(() => {
    import('./i18n').then(({ default: i18n }) => {
      i18n.changeLanguage(language || 'en');
    });
  }, [language]);

  return (
    <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" exact={true}>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact={true}>
          <Home />
        </Route>
        <Route path="/settings" exact={true}>
          <Settings />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  );
};

export default App;

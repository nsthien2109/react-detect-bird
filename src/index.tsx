import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import './stylesheets/style.scss';
import App from './app/App';
import store from './app/store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

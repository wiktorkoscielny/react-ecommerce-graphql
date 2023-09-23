/*
 * @category  REG
 * @author    Wiktor Koscielny <wiktorkoscielny@gmail.com>
 */

import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

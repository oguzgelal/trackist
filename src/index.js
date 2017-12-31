import dva from 'dva';
import { message } from 'antd';
import { persistStore, autoRehydrate } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';
import localForage from 'localforage';
import { Router } from 'dva/router';
import './index.css';

// Components
import Routes from './routes';
import history from './config/history';

// Initialize
const app = dva({
  history,
  extraEnhancers: [autoRehydrate()],
  onError(e) { message.error(e.message, 3); },
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// Router
app.router(() => {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
});

// 5. Start
app.start('#root');

// Persist redux store
let counterFilter = createFilter('counter', ['current']);

persistStore(app._store, {
  storage: localForage,
  whitelist: ['counter'],
  transforms: [
    counterFilter
  ]
});


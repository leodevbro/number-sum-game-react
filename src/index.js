import './index.css';
import App from './components/App';
import { App2 } from './components/App';
import * as serviceWorker from './serviceWorker';
import rend from './other-components/Rend';




rend(App, "root1");
rend(App2, "root2");




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

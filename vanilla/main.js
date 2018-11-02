/* global document */

// Dev / test environment
import './__FileWatcherClient__.js';
import './__Tests__.js';

// 3rd party dependencies
import './3rdParty/js/mustache.js';

// App entry points
import LevelView from './views/EntryPoints/LevelView.js';

// App helpers
import ViewHelper from './views/ViewHelper.js';

const _ = new ViewHelper();
const levelView = new LevelView(_);
document.body.innerHTML = levelView.render();
document.body.classList.add('debugMode');

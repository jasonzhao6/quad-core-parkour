/* global document */

// Dev / test environment
import './__FileWatcherClient__.js';
import './__Tests__.js';

// 3rd party dependencies
import './3rdParty/js/mustache.js';

// App entry points
import LevelView from './views/EntryPoints/LevelView.js';

// App helpers
import { singleton as _ } from './views/ViewHelper.js';

const levelView = new LevelView();
document.body.innerHTML = levelView.render();
_.appEntryPoint = levelView;
_.bindEvents();

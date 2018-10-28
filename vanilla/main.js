/* global document */

// Dev / test environment
import './__FileWatcherClient__.js';
import './__Tests__.js';

// 3rd party dependencies
import './lib/js/mustache.js';

// App dependencies
import LevelView from './js/views/LevelView.js';

const levelView = new LevelView();
document.body.innerHTML = levelView.render();

// 3rd party dependencies
import './3rdParty/js/mustache.js'; // Needed by tests.

// Dev / test environment
import './__FileWatcherClient__.js';
import './__Tests__.js';

// App entry points
import LevelView from './views/EntryPoints/LevelView.js';

new LevelView().renderDom();

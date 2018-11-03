// Dev / test environment
import './__FileWatcherClient__.js';
import './__Tests__.js';

// 3rd party dependencies
import './3rdParty/js/mustache.js';

// App entry points
import LevelView from './views/EntryPoints/LevelView.js';

new LevelView().renderToDom();

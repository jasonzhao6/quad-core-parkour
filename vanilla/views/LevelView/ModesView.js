import { ViewHelper as _ } from '../ViewHelper.js';

export default class ModesView {
  view() { // eslint-disable-line class-methods-use-this, TODO
    return {
    };
  }

  partials() { // eslint-disable-line class-methods-use-this, TODO
    const boxConfig = { label: 'Modes:', labelStyle: 'text-align:left;' };
    return {
      demoMode: _.renderBox(boxConfig, `
        <div class='ModesView-Demo flexCenter'>Demo</div>
      `, this.view()),
      easyMode: _.renderBox({}, `
        <div class='ModesView-Easy flexCenter'>Easy</div>
      `, this.view()),
      imageMode: _.renderBox({}, `
        <div class='ModesView-Image flexCenter'>Image</div>
      `, this.view()),
      stackMode: _.renderBox({}, `
        <div class='ModesView-Stack flexCenter'>Mem</div>
      `, this.view()),
    };
  }

  render() {
    return _.render(`
      <div class='ModesView'>
        <ol class='flexRow'>
          <li>{{>demoMode}}</li>
          <li>{{>easyMode}}</li>
          <li>{{>stackMode}}</li>
          <li>{{>imageMode}}</li>
        </ol>
      </div>
    `, this.view(), this.partials());
  }
}

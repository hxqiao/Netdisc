
import type { App, Component } from 'vue';
import { Svgicon } from './globComponents';

export function registerGlobComp(app: App) {
  app.use(Svgicon);
}

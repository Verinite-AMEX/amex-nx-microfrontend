import { withModuleFederation } from '@nx/module-federation/angular.js';
import config from './module-federation.config';
export default withModuleFederation(config, { dts: false });

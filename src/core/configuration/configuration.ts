/**
 * Environment Dependent Configuration
 */

import {environment} from "../environment/environment";

export let userConfig: JSON;

interface IWindowP extends Window {
    preambleUserConfig: any;
}

/**
 * Windows environment configuration
 */
function windowsConfiguration(): void {
    userConfig = (<IWindowP>window).preambleUserConfig;
}

/**
 * NodeJS environment configuration
 */
function nodeConfiguration(): void {

}

if (environment.windows) {
    windowsConfiguration();
} else {
    nodeConfiguration();
}

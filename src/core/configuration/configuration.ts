/**
 * Environment Dependent Configuration
 */

import {environment} from "../environment/environment";

export let userConfig: JSON;

interface windowP extends Window {
    preambleUserConfig: any
}

/**
 * Windows environment configuration
 */
function windowsConfiguration (): void {
    userConfig = (<windowP>window).preambleUserConfig;
}

/**
 * NodeJS environment configuration
 */
function nodeConfiguration (): void {

}

if(environment.windows) {
    windowsConfiguration();
} else {
    nodeConfiguration();
}

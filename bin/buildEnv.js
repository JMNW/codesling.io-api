/** 
 * These are lists of environment variables 
 * 
 * envBuild[directory] = [...environmentVariables]
 * 
 * Build a script to create an .env file in each directory containing the following variables
 * 
 * So anyone should just be able to run a command in their terminal to create the files!
 * 
 * Example: 
 * npm run buildEnv => ../rest-server/.env, ../socket-server/.env, etc.
 * yarn buildEnv => ../rest-server/.env, ../socket-server/.env, etc.
*/

const fs = require('fs');
const _ = require('lodash');

const envVariables = require('../config/.env.sample');

const createENVFile = (directory, variables) => {
  variables.forEach(variable => {
    fs.appendFileSync(`./${directory}/.env`, variable + '\n');
  })
}

const buildEnv = () => {
  _.each(envVariables, (value, key) => {
    fs.writeFileSync(`./${key}/.env`, '')
    createENVFile(key, value);
  });
}

buildEnv();

import axios from 'axios';

import { success } from './lib/log';
import {
  serverInitialState,
  serverChanged,
  serverLeave,
  serverRun,
  serverMessage,
} from './serverEvents';

/**
 *
 *  Client emissions (server listeners)
 *
 *  more on socket emissions:
 *  @url {https://socket.io/docs/emit-cheatsheet/}
 *
 *  @param room is an ES6 Map, containing { id, state }
 *  @url {https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map}
 *
 */
const clientReady = ({ io, client, room }, payload) => {
  success('client ready heard');
  // console.log({io, client, room}, payload, "in CLIENT READY")
  serverInitialState({ io, client, room }, payload);
};

const clientUpdate = ({ io, client, room }, payload) => {
  const { text, email } = payload;
    // console.log({io, client, room}, payload, "in CLIENT READY")
  success('client update heard. payload.text = ', payload);
  room.set('text', text);
  room.set('email', email);
  serverChanged({ io, client, room });
};

const clientDisconnect = ({ io, room }) => {
  success('client disconnected');
    // console.log({io, room}, "in CLIENT DISCONNECT")
  serverLeave({ io, room });
};

const clientRun = async ({ io, room }, payload) => {
  success('running code from client. room.get("text") = ', room.get('text'));
  // console.log({io, room}, payload, "in CLIENT RUN")
  const { text, email, test } = payload;
  const url = process.env.CODERUNNER_SERVICE_URL;
  console.log('this is the client run payload:', payload)

  try {
    const { data } = await axios.post(`${url}/submit-code`, { code: text, test: test});
    const stdout = data;
    const testData= await axios.post(`${url}/submit-test`, {test: test});
    const testout = JSON.parse(testData.config.data).test
    
    console.log('this is stdout', stdout)
    console.log('this is testoutput',testout)
    
    if(stdout === testout){
    serverRun({ io, room }, { stdout, email });
    }

  } catch (e) {
    success('error posting to coderunner service from socket server. e = ', e);
  }
};

const clientMessage = async ({ io, room }, payload) => {
  success('client message heard');
  const url = process.env.REST_SERVER_URL;
  try {
    const { data } = await axios.post(`${url}/messages/`, payload);
      // console.log({io, room}, data, "in CLIENT Message")
    serverMessage({ io, room }, data);
  } catch (e) {
    success('error saving message to the database. e = ', e);
  }
};

const clientEmitters = {
  'client.ready': clientReady,
  'client.update': clientUpdate,
  'client.disconnect': clientDisconnect,
  'client.run': clientRun,
  'client.message': clientMessage,
};

export default clientEmitters;

import axios from 'axios';

import { success } from './lib/log';
import {
  serverInitialState,
  serverChanged,
  serverLeave,
  serverRun,
  serverMessage,
} from './serverEvents';



//
//
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
  // console.log({io, client, room}, payload, "in CLIENT READY");
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
  // console.log({io, room}, payload.test, "in CLIENT RUN")



  const { text, email, test} = payload;

  console.log(payload, 'here is the payload')

  const url = process.env.CODERUNNER_SERVICE_URL;

  try {

      
    const { data } = await axios.post(`${url}/submit-code`, { code:text+test});
    const stdout = data;
    console.log('this is stdout', stdout)
    serverRun({ io, room }, { stdout, email });
  } catch (e) {
    success('error posting to coderunner service from socket server. e = ', e);
  }
};

const clientMessage = async ({ io, room }, payload) => {
  success('client message heard');
  const url = process.env.REST_SERVER_URL;
  try {

    //changed this URL *****
    // const { data } = await axios.post(`${url}/messages/`, payload);

    const { data } = await axios.post(`http://localhost:3396/api/messages`, payload);
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

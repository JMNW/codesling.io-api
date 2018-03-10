import axios from 'axios';

import { success } from './lib/log';
import {
  serverInitialState,
  serverChanged,
  serverLeave,
  serverRun,
  serverMessage,
} from './serverEvents';




const testHelper = (text, ...expectedValAndVariables) => {
	return `const assertEquals = function(callback, expected, ...args) {
	if (callback(...args) === expected) {
		return 'it works';
	} else {
		return 'it doesnt work';
	}
};
assertEquals(${text}, ${expectedValAndVariables})`;
};
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
  console.log({io, room}, payload.test, "in CLIENT RUN")


  const test = testHelper(payload.text, '1,3,2');
  const { text, email} = payload;

  const url = process.env.CODERUNNER_SERVICE_URL;
  console.log('<HERE>Is <MY>TEST</MY></HERE>', test)

  try {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> pre rebase
=======
>>>>>>> 0fc1ddfcc4384e10559d13acb0cadec999246bfd
    const { data } = await axios.post(`${url}/submit-code`, { code: text});
    let stdout = data;
    const testdata= await axios.post(`${url}/submit-test`, {test: test});
    const testout = testdata.data

    console.log('this is stdout', stdout)
    console.log('this is testout',testout)

    if(stdout === testout){

      stdout = 'success'
    } else{
      stdout = 'fail'
<<<<<<< HEAD

    }
    serverRun({ io, room }, { stdout, email });
<<<<<<< HEAD

=======
    
=======
<<<<<<< HEAD
=======
=======
>>>>>>> 092cb3df7df0aad6405295e8a1321b90b2efbf03
>>>>>>> 0fc1ddfcc4384e10559d13acb0cadec999246bfd
    const { data } = await axios.post(`${url}/submit-code`, { code: text, test: test});
    const stdout = data;
    const testData = await axios.post(`${url}/submit-test`, {test: test});
    console.log(testData, 'this is the test data')

<<<<<<< HEAD
=======
>>>>>>> pre rebase

    }
=======

>>>>>>> 0fc1ddfcc4384e10559d13acb0cadec999246bfd
    serverRun({ io, room }, { stdout, email });

<<<<<<< HEAD
>>>>>>> still working dat thang
<<<<<<< HEAD
>>>>>>> still working dat thang
=======
>>>>>>> pre rebase
=======
=======
>>>>>>> 092cb3df7df0aad6405295e8a1321b90b2efbf03
>>>>>>> 0fc1ddfcc4384e10559d13acb0cadec999246bfd

  } catch (e) {
    success('error posting to coderunner service from socket server. e = ', e);
  }
};

const clientMessage = async ({ io, room }, payload) => {
  success('client message heard');
  const url = process.env.REST_SERVER_URL;
  try {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> pre rebase
=======
>>>>>>> 0fc1ddfcc4384e10559d13acb0cadec999246bfd

    //changed this URL *****
    // const { data } = await axios.post(`${url}/messages/`, payload);

    const { data } = await axios.post(`http://localhost:3396/api/messages`, payload);
      // console.log({io, room}, data, "in CLIENT Message")
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0fc1ddfcc4384e10559d13acb0cadec999246bfd
=======
    const { data } = await axios.post(`${url}/messages/`, payload);

>>>>>>> still working dat thang
=======
<<<<<<< HEAD
>>>>>>> pre rebase
=======
    const { data } = await axios.post(`${url}/messages/`, payload);

>>>>>>> 092cb3df7df0aad6405295e8a1321b90b2efbf03
>>>>>>> 0fc1ddfcc4384e10559d13acb0cadec999246bfd
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

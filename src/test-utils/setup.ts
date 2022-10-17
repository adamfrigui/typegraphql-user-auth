import { testConn } from './testConn';
testConn(true).then(() => process.exit())//sometimes node doesnt quit out when it finishes with the promise
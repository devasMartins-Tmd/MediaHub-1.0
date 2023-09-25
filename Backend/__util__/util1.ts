import jsonWebToken from 'jsonwebtoken';
const { sign } = jsonWebToken;
require('dotenv').config({ path: '../.env' });
import * as path from 'fs';
// *************************************************************************************
type credentialType = {
  name?: string;
  email: string;
  tag?: string;
  password: string;
};
export function verifyCredentials(credentials: credentialType, action: 'Login' | 'Signup') {
  if (action === 'Login' && credentials.email && credentials.password) return true;
  if (
    (action === 'Signup' &&
      credentials.name &&
      credentials.email &&
      credentials.password &&
      credentials.tag === '1') ||
    '0'
  )
    return true;
  return false;
}
// ****************************************************************************************
/**
 * JWToken: return a string token (expires in 30d)
 * @id: payload encrypted in token
 * @return: string
 */
export function JWToken(id: string) {
  return sign({ id }, process.env.SECRET || '++++===++++', { expiresIn: '30d' });
}
// ****************************************************************************************

/**
 * unique id
 */
export function uniqueID() {
  return '0x' + Math.random().toString(32).substring(3, 6);
}

/**
 * fileExist: check if file is present is a path
 */
export function fileExist(file: string) {
  let folder = path.readdirSync('./');
  return folder.indexOf(file);
}

/**
 * timeFrame: returns an array of times
 */

export function timeFrame() {
  let date = new Date();
  let [hour, minute, second, millisec] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  ];
  return `${hour}:${minute}:${second}:${millisec}`;
}

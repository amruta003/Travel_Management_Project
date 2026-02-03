
import axios from 'axios'
import { config } from './config'

export async function register({ firstName, lastName, email, password, role }) {
  try {
    console.log(firstName + " " + lastName + " " + email + " " + password + " " + role);
    const url = `${config.server}/api/v1/auth/register`
    const body = { firstName, lastName, email, password, role }
    const response = await axios.post(url, body)
    return response.data
  } catch (ex) {
    if (ex.response && ex.response.data) {
      console.error('Registration Diagnostic:', ex.response.data);
    }
    console.log(`exception: `, ex)
  }
}

export async function login({ email, password, role }) {
  try {
    console.log(email + " " + password + " " + role);
    const url = `${config.server}/api/v1/auth/login`
    const body = { email, password, role }
    const response = await axios.post(url, body)
    return response.data
  } catch (ex) {
    if (ex.response && ex.response.data) {
      console.error('Login Diagnostic Body:', ex.response.data);
    }
    console.log(`exception: `, ex)
    throw ex; // Re-throw so Login component catch block triggers
  }
}

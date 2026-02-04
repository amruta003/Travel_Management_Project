import api from '../api/axios'

export async function register({ firstName, lastName, email, password, role }) {
  try {
    console.log(firstName + " " + lastName + " " + email + " " + password + " " + role);
    const body = { firstName, lastName, email, password, role }
    const response = await api.post('/api/v1/auth/register', body)
    return response.data
  } catch (ex) {
    if (ex.response && ex.response.data) {
      console.error('Registration Diagnostic:', ex.response.data);
    }
    console.log(`exception: `, ex)
    throw ex;
  }
}

export async function login({ email, password, role }) {
  try {
    console.log(email + " " + password + " " + role);
    const body = { email, password, role }
    const response = await api.post('/api/v1/auth/login', body)
    return response.data
  } catch (ex) {
    if (ex.response && ex.response.data) {
      console.error('Login Diagnostic Body:', ex.response.data);
    }
    console.log(`exception: `, ex)
    throw ex; // Re-throw so Login component catch block triggers
  }
}

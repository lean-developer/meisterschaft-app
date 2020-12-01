import axios from 'axios'

export default axios.create({
  // baseURL: 'https://icl-dart-service.herokuapp.com/',
  baseURL: 'http://localhost:3100/',
  headers: {
    'Content-Type': 'application/json'
  }
})

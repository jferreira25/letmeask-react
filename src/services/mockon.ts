import { httpInterceptor } from '../contexts/Http.Interceptor'




export function getUser(){
    httpInterceptor.get('/user/12345')
  .then(function (response) {
    // console.log(response.data);
    // console.log(response.status);
    // console.log(response.statusText);
    // console.log(response.headers);
    // console.log(response.config);
  });
}
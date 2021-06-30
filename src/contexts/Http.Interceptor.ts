import axios from 'axios'

let instance = axios.create({
    baseURL: `http://localhost:4000`
    
  })

  instance.interceptors.request.use(function (config) {
   // const token = store.getState().session.token;
    //config.headers.Authorization =  token;
    console.log("request");
    return config;
});

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("sucesso",response);
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("errorResponse",error);
    return Promise.reject(error);
  });


export const httpInterceptor = instance
// A custom hook that calls fetch.
// A hook is a function that can be called by React components.
// This one is wrapped around the built-in effect hook.  

import React, {useEffect} from 'react';

const useAsyncFetch = function (url, data, thenFun, catchFun) {
  let params = {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data) 
  };
  
  // the usual function that does a fetch
  async function fetchData() {
    // Send request to origin server at appropriate endpoint
    let response = await fetch(url, params);
    // Wait for origin server to send back JSON object
    if(response.ok) {
      let json = await response.json();
      // return json;
      thenFun(json);
    } else {
      Error(response.status);
      // catchFun();
    }
  }

  // The effect hook is a function called when the component is created or updated.
  // In this case, "the component" refers to the componet using 
  // this useFetch hook.
  // Because we give it a second argument of [] (meaning "update when the variables in this empty list change"),
  // this particular effect hook will get run only after the componet is created, not when it is updated.
  // In particular, when the calling component is re-rendered its state variables change,
  // this effect does not get called again. 
  useEffect(fetchData, []);

}

export default useAsyncFetch;

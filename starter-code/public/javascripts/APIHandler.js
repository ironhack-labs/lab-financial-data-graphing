class APIHandler {
    constructor (baseUrl) {
      this.api = axios.create({
      baseURL: baseUrl
      });
    }
    
    
    
    getData (map) {
        this.api.get('/',map)
      .then(response => {
          fillData(response.data);
       })
      .catch(err => {
         alert( 'Error: '+err);
       })
    }
  
    
    
    
  
  
    
    
    
  }
  
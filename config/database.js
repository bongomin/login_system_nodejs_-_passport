if(process.env.NODE_ENV === 'production'){
  
 // connecting to cloud db
 module.exports ={mongoURI: 'mongodb+srv://danny:P@55w0rd55@loginapp-klkrl.mongodb.net/test?retryWrites=true&w=majority' 
}
  
}else{
    // connection to local db
   module.exports = {mongoURI :'mongodb://localhost/loginSystem'}
}
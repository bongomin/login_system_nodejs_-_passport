if(process.env.NODE_ENV === 'production'){
   // connection to local db
 // connecting to cloud db
 module.exports ={mongoURI: '' 
}
  
}else{
   module.exports = {mongoURI :'mongodb://localhost/loginSystem'}
}
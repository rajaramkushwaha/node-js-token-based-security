# node-js-token-based-security

##1 How run the application?

  >npm install 

  >node server.js
##2 How to setup user.

   Invoke  http://localhost:8080/api/public/setup URL using GET method.
##3 how to authenticate

    Invoke http://localhost:8080/api/public/authenticate  URL using POST method

    Content-Type: application/x-www-form-urlencoded
    name=admin&password=password
    or 
    
      Content-Type: application/json
      {"name":"admin",
      "password":"password"
      }
      
##4 How to test?

  Set the token returned by authenticate call to header

    Content-Type: application/json
    x-access-token:@TODO set token 

#Enjoy.

 

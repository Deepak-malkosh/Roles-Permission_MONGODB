 POST MANAGING :->
      .Post
      .Categories
      .Comments
      .Likes
      
      
 Permissions Apply :->
 
     .User
     .Post
     .Categories
     .Comments
     .Likes     
  
  
  User Roles : ->
   
   .Admin
   .Sub-admin
   .Editor
   .User
   
   
   // Id comes
   user_id:ObjectId('1234..whatever')
   permissions:[
    {
        permission_name:'user',
        permission_value:[0,1,2,3] // 0-> create, 1-> read, 2-> edit, 3-> delete
    },

    {
        permission_name:'post',
        permission_value:[0,1,2] // 0-> create, 1-> read, 2-> edit
    },

    {
        permission_name:'category',
        permission_value:[0,2] // 0-> create, 2-> edit
    }
   ] 



   Lecture:5 //

   1. Create Permission Model.
   2. Create Add permission API from Admin.


   Lecture:6 //

   1.Create Auth Middleware
   2.Create get user API Profile


   Lecture:7 //
   Create Read, Delete and Update Permission API for Admin 

   Lecture:8  //
   Only Admin Can Access Permissions API

   Lecture:9 //
   Create CRUD APIs for Category. 
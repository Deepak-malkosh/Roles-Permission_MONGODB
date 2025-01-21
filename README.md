# Roles-Permission_MONGODB

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

   Lecture:10 //
   Create & Read POST API

   Lecture:11 //
   Delete & Update Post API 

   Lecture:12 //
   Store & Get Roles for Admin

   Lecture:13 //
   Create User API 

   Lecture:14 //
   Send mail to User with their details & password

   Lecture:15 //
   Get User AND Update user API

   Lecture:16 //
   Delete User, Post Like , Unlike, & Post Like Count API

   Lecture:17 //
   Assign Default Permission on User Regristration
    User, Post, Comment, Like 

   Lecture:18 //
   Create Query for get Permission  in Login API (code also send in LT-17 branch) 

   Lecture:19 //
   Add permission in Get & Create User API

   Lecture:20 //
   Update User Permissions 

   Lecture:21 //
   Create Router Permission Model

   Lecture:22 //
   Create API to get All Routes


   Lecture:23 //
   Create or Update Router Permission API 

   Lecture:24 //
   Get Router Permission API

   Lecture:25 //
   Update RouterPermission Model & API

   Lecture:26 //
    1.Get User Permissions Helper Method.
    2.Create an API for Refresh User Permissions.


   Lecture:27 //
    1.Create Permission Check Middleware
    2.Admin can access all routes
    3.Apply Middleware on routes 

  
   Lecture:28 //
    1.Create helper method for get Router Permission.
    2.Add Role and router endpoint check in Middleware. 



   Lecture:29 //
    1.Check User Permission with Router Permission.
    2.Middleware testing on route. 
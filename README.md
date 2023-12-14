First Of all you need to clone the project in your prefer directory.

and then open the terminal and go to that directory and run the below command 

terminal Command
-------------------
git checkout dev 

git pull

yarn

yarn prisma generate

yarn start

--------------------

Once Above five command successfully run then Next 

check The main.ts file 
In this file port is 3000 or other 


swagger Instructions
-------------------------
I created the swagger for test the api 
so after successfully run the project you need to open the browser and 

------------------------
write in browser url
http://localhost:3000/api 
-------------------------

you can change the port as per your main.ts file 

signIn token you need to add in authorization button then 
the api run so that you don't face authorization error

Get Profile api if you can pass the id so that get perticular user data
otherwise get all user data 

-------------------------------



LogOut
------------------------------
I used Jwt for token so that if you want to logout 
simple add Route to sign In screen so that token replace

and here tokenExpireTime set in 30 min 
every 30 min user logOut automatically

let form=document.getElementById("form");
let username=document.getElementById("username");
let usernameError=document.getElementById("username-error");
let first_name=document.getElementById("first-name");
let last_name=document.getElementById("last-name");
let email=document.getElementById("email");
let emailError=document.getElementById("email-error");
let password=document.getElementById("password");
let passwordError=document.getElementById("password-error");
let confirm_password=document.getElementById("confirm-password");
// let usernameError=document.getElementById("usernameError");
// let passwordError1=document.getElementById("passwordError1");
// let passwordError2=document.getElementById("passwordError2");
// let passwordTooShort=document.getElementById("passwordTooShort");
// let emailError=document.getElementById("emailError");
// let pending=document.getElementById("pendingLbl");
// let pendingError=document.getElementById("pendingError");
let phone = document.getElementById("phone");

function genderLoad(){
   const gender = [
      {name: "Male"},
      {name: "Female"},
   ];
   // gender.sort((a, b) => (a.name > b.name)? 1 : -1);

   const selectGender=document.getElementById("gender");

   gender.forEach(gender =>{
      const option=document.createElement("option");
      option.text=gender.name;
      selectGender.appendChild(option);
   });
}
genderLoad();

username.addEventListener('input', function(){
   usernameError.style.display='none'
 })
 email.addEventListener('input', function(){
   emailError.style.display='none'
 })
 password.addEventListener('input', function(){
   passwordError.style.display='none'
 })
 confirm_password.addEventListener('input', function(){
   passwordError.style.display='none'
 })


form.addEventListener('submit', function(event){
   event.preventDefault();


   // if(!navigator.onLine){
   //  pending.innerHTML='';
   //  pendingError.innerHTML='Oops!! Poor Connection';
   //  return null;
   //  }
   //  else{
   //  pendingError.innerHTML='';
   //  pending.innerHTML='● ● ●';

   if(password.value!==confirm_password.value){
      //  pending.innerHTML='';
       passwordError.style.display='block'
       passwordError.textContent='Passwords do not match!';
       password.value='';
       confirm_password.value='';
       return;
       }
   else if(password.value.length<8){
      //   pending.innerHTML='';
         passwordError.style.display='block';
         passwordError.textContent='Must contain at least 8 characters';
         return;
      }
    

function firstRegistration(userData){
    // http://127.0.0.1:8000/auth/users/
    fetch("http://127.0.0.1:8000/auth/users/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
        })
        .then(response => {
         if(!response.ok){
            // throw new Error("Network not ok");
        return response.json().then(error =>{
            if(error.username){
               //  pending.innerHTML='';
                usernameError.style.display='block';
            }
            if(error.email){
               //  pending.innerHTML='';
                emailError.style.display='block';
            }
        })   
        }

        else{
             const authUserData={
                username: formData.get('username'),
                password: formData.get('password'),
                };
        
        authenticateUser(authUserData);

        }
            return response.json();
        })
        .then(data => {
      //   console.log('first registration successful');
        })
        .catch(error => {
        console.log(error);
    })


    }

const formData=new FormData(this);

    const userData={
        username: formData.get('username'),
        first_name: formData.get('first-name').charAt(0).toUpperCase() + formData.get('first-name').slice(1).toLowerCase(),
        last_name: formData.get('last-name').charAt(0).toUpperCase() + formData.get('last-name').slice(1).toLowerCase(),
        email: formData.get('email'),
        password: formData.get('password'),
        };

firstRegistration(userData);

// let dis=document.getElementById("dis")
// dis.onclick=function(){
// // console.log(school_level_data);
// console.log(ab)
// }

function authenticateUser(userData){

    fetch("http://127.0.0.1:8000/auth/jwt/create",{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    
       })
       .then(response => {
        if(!response.ok){
             throw new Error('authentication failed!');
          }
          return response.json();
       })
     .then(data => {
       // console.log(data.error)
       const accessToken=data.access;
       localStorage.setItem('accessToken', accessToken);
      //  console.log('authentication successfully')

      const secondUserData={
      gender: formData.get('gender'),
      phone: formData.get('phone'),
      status: 'Student',
      };
      secondRegistration(secondUserData);
     
    })
    .catch(error => {
     console.log('Error', error);
    });
    
}


function secondRegistration(secondUserData){
   const accessToken=localStorage.getItem('accessToken');
   // console.log(accessToken);
   if(!accessToken){
      // console.log('Access token not found in localStorage');
      return null;
   }

   // http://127.0.0.1:8000/manage_easywin/customers/me/ 
   fetch('http://127.0.0.1:8000/manage_geniusera/students/me/', {
   method: 'PUT',
   headers: {
      'Authorization': `JWT ${accessToken}`,
      'Content-Type': 'application/json',
   },
   body: JSON.stringify(secondUserData)
})
.then(response =>{
   if(!response.ok){
      throw new Error('second registration failed');
   }
   else{
      window.location.href="login.html";
   }
   return response.json();
})
.then(data => {
   // localStorage.getItem('access');
   // console.log('second registration successful', data);
   // window.location.href="login.html";
})
.catch(error =>{
   console.log('Error', error)
});
localStorage.removeItem('accessToken');
}


// }



});


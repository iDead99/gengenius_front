let form=document.getElementById("form");
let editProfileContainer=document.getElementById("edit-profile-container");
let username=document.getElementById("username");
let first_name=document.getElementById("first-name");
let last_name=document.getElementById("last-name");
let email=document.getElementById("email");
let gender=document.getElementById("gender");
let password=document.getElementById("password");
// let confirm_password=document.getElementById("confirm-password");
// let usernameError=document.getElementById("usernameError");
// let passwordError1=document.getElementById("passwordError1");
// let passwordError2=document.getElementById("passwordError2");
// let passwordTooShort=document.getElementById("passwordTooShort");
// let emailError=document.getElementById("emailError");
// let pending=document.getElementById("pendingLbl");
// let pendingError=document.getElementById("pendingError");

let profileSuccessContainer=document.getElementById("profile-success-container");
let profileSuccessBtn=document.getElementById("profile-success-btn");

profileSuccessBtn.onclick=function(){
   window.location.href="login.html"
}

const updateProfileAccessToken=localStorage.getItem('loginAccessToken');
if(!updateProfileAccessToken){
   window.location.href="login.html";
 }

function TeacherUserDetails(){
   //  console.log(updateProfileAccessToken);
    if(!updateProfileAccessToken){
      //  console.log('Access token not found in localStorage');
       return null;
    }
 
    fetch('http://127.0.0.1:8000/auth/users/me/', {
    headers: {
       'Authorization': `JWT ${updateProfileAccessToken}`,
       'Content-Type': 'application/json',
    },
 })
 .then(response =>{
    if(!response.ok){
       throw new Error('Customer registration failed');
    }
    return response.json();
 })
 .then(data => {
    displayTeacherUserDetails(data);
 })
 .catch(error =>{
    console.log('Error', error)
 });
 }
 TeacherUserDetails();
 
 function displayTeacherUserDetails(data){
    username.value = `${data.username}`
    first_name.value = `${data.first_name}`
    last_name.value = `${data.last_name}`
    email.value = `${data.email}`;
 }
 
 
 function TeacherCustomerDetails(){
   //   console.log(updateProfileAccessToken);
     if(!updateProfileAccessToken){
        console.log('Access token not found in localStorage');
        return null;
     }
 
     fetch('http://127.0.0.1:8000/manage_geniusera/students/me/', {
     headers: {
        'Authorization': `JWT ${updateProfileAccessToken}`,
        'Content-Type': 'application/json',
       },
    })
  .then(response =>{
     if(!response.ok){
        throw new Error('Customer registration failed');
     }
     return response.json();
    })
    .then(data => {
       displayTeacherCustomerDetails(data);
 })
 .catch(error =>{
    console.log('Error', error)
 });
 }
 TeacherCustomerDetails();
 
 function displayTeacherCustomerDetails(data){
     gender.value = `${data.gender}`
     phone.value = `${data.phone}`
 }

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

   //  if(password.value!==confirm_password.value){
   //  pending.innerHTML='';
   //  passwordError1.style.display='block';
   //  passwordError2.innerHTML='Passwords do not match!';
   // console.log('Passwords do not match!');
   //  password.value='';
   //  confirm_password.value='';
   //  return;
   //  }
   //  else if(password.value.length<8){
      //   pending.innerHTML='';
      //   passwordTooShort.style.display='block';
      //   passwordError2.innerHTML='Must contain at least 8 characters';
   //      console.log('Must contain at least 8 characters');
   //      return;
   //  }

function updateUserProfile(){
   // http://127.0.0.1:8000/manage_easywin/customers/me/ 
   fetch('http://127.0.0.1:8000/core/users/me/', {
   method: 'PUT',
   headers: {
      'Authorization': `JWT ${updateProfileAccessToken}`,
      'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    username: username.value,
    first_name: first_name.value,
    last_name: last_name.value,
    email: email.value,
   })
})
.then(response =>{
   if(!response.ok){
      throw new Error('second registration failed');
   }
   else{
      // editProfileContainer.style.display='none';
      // profileSuccessContainer.style.display='block';
   }
   return response.json();
})
.then(data => {
   //  console.log(data);
})
.catch(error =>{
   console.log('Error', error)
});
localStorage.removeItem('accessToken');
}
updateUserProfile();


function updateCustomerProfile(){
   fetch('http://127.0.0.1:8000/manage_geniusera/students/me/', {
   method: 'PUT',
   headers: {
      'Authorization': `JWT ${updateProfileAccessToken}`,
      'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    gender: gender.value,
    phone: phone.value,
    status: 'Student',
   })
})
.then(response =>{
   if(!response.ok){
      throw new Error('Network was not ok');
   }
   else{
      editProfileContainer.style.display='none';
      profileSuccessContainer.style.display='block';
   }
   return response.json();
})
.then(data => {
   //  console.log(data);
})
.catch(error =>{
   console.log('Error', error)
});
localStorage.removeItem('loginAccessToken');
}
updateCustomerProfile();

// }

});


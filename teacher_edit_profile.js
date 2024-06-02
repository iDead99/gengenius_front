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
let region = document.getElementById("region");
let district = document.getElementById("district");
let town = document.getElementById("town");
let qualification = document.getElementById("qualification");
let primary = document.getElementById("primary");
let jhs = document.getElementById("jhs");
let shs = document.getElementById("shs");
let vocational = document.getElementById("vocational");
let school_level_container = document.getElementById("school-level");
let subject = document.getElementById("subject");
let phone = document.getElementById("phone");
let link = document.getElementById("link");
let amount = document.getElementById("amount");

let profileSuccessContainer=document.getElementById("profile-success-container");
let profileSuccessBtn=document.getElementById("profile-success-btn");

profileSuccessBtn.onclick=function(){
   window.location.href="login.html";
}

const updateProfileAccessToken=localStorage.getItem('loginAccessToken');
if(!updateProfileAccessToken){
   window.location.href="login.html";
 }

// display teacher data
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
 
//  display teacher data
 function TeacherCustomerDetails(){
   //   console.log(updateProfileAccessToken);
     if(!updateProfileAccessToken){
      //   console.log('Access token not found in localStorage');
        return null;
     }
 
     fetch('http://127.0.0.1:8000/manage_geniusera/teachers/me/', {
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
     region.value = `${data.region}`
     district.value = `${data.district}`
     town.value = `${data.town}`
     qualification.value = `${data.qualification}`
     school_level_container.value = `${data.school_level}`
     subject.value = `${data.subject}`
     amount.value= `${data.amount}`
     phone.value = `${data.phone}`
     if(data.link===''){
         link.value = `[no link]`
     }
     else{
         link.value = `${data.link}`
     }
 }



let school_level=[];

primary.onclick=function(){
   let primary_data = "Primary";
   school_level.push(primary_data);
   primary.style.pointerEvents='none'
   primary.style.color='lightgray'

   if((jhs.style.color==='lightgray' || shs.style.color==='lightgray' || vocational.style.color==='lightgray')){
      primary_data = ", Primary";
      school_level_container.value+=primary_data
   }
   else{
      school_level_container.value=''
      school_level_container.value+=primary_data
   }
}
jhs.onclick=function(){
   let jsh_data = "JHS";
   school_level.push(jsh_data);
   jhs.style.pointerEvents='none'
   jhs.style.color='lightgray'

   if((primary.style.color==='lightgray' || shs.style.color==='lightgray' || vocational.style.color==='lightgray')){
      jsh_data = ", JHS";
      school_level_container.value+=jsh_data
   }
   else{
      school_level_container.value=''
      school_level_container.value+=jsh_data
   }
}
shs.onclick=function(){
   let shs_data = "SHS";
   school_level.push(shs_data);
   shs.style.color='lightgray'
   shs.style.pointerEvents='none'

   if((primary.style.color==='lightgray' || jhs.style.color==='lightgray' || vocational.style.color==='lightgray')){
      shs_data = ", SHS";
      school_level_container.value+=shs_data
   }
   else{
      school_level_container.value=''
      school_level_container.value+=shs_data
   }
}
vocational.onclick=function(){
   let vocational_data = "Vocational";
   school_level.push(vocational_data);
   vocational.style.pointerEvents='none'
   vocational.style.color='lightgray'

   if((primary.style.color==='lightgray' || shs.style.color==='lightgray' || jhs.style.color==='lightgray')){
      vocational_data = ", Vocational";
      school_level_container.value+=vocational_data
   }
   else{
      school_level_container.value=''
      school_level_container.value+=vocational_data
   }
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

function qualificationLoad(){
    const qualification = [
       {name: "Diploma"},
       {name: "Degree"},
       {name: "Masters"},
       {name: "Phd"},
    ];
    qualification.sort((a, b) => (a.name > b.name)? 1 : -1);
 
    const selectQualification=document.getElementById("qualification");
 
    qualification.forEach(qualification =>{
       const option=document.createElement("option");
       option.text=qualification.name;
       selectQualification.appendChild(option);
    });
 }

 qualificationLoad();

 function regionLoad(){
    const region = [
       {name: "G.Accra"},
       {name: "Central"},
       {name: "Ashanti"},
       {name: "Eastern"},
       {name: "Northern"},
       {name: "Western"},
       {name: "Upper East"},
       {name: "Upper West"},
       {name: "Brong Ahafo"},
       {name: "Volta"},
       {name: "Ahafo"},
       {name: "Western North"},
       {name: "Savannah"},
       {name: "Bono East"},
       {name: "Oti"},
    ];
    region.sort((a, b) => (a.name > b.name)? 1 : -1);
 
    const selectRegion=document.getElementById("region");
 
    region.forEach(region =>{
       const option=document.createElement("option");
      //  option.value=region.code;
       option.text=region.name;
       selectRegion.appendChild(option);
    });
 }

 regionLoad();

      
form.addEventListener('submit', function(event){
   event.preventDefault();
   
   
   let school_level_data;
   if(!(primary.style.pointerEvents ==='none' || jhs.style.pointerEvents ==='none' || shs.style.pointerEvents ==='none' || vocational.style.pointerEvents ==='none')){
      
      school_level_data=school_level_container.value
   }
   else{
      school_level_data=school_level.join(', ')
   }

   
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
   fetch('http://127.0.0.1:8000/manage_geniusera/teachers/me/', {
   method: 'PUT',
   headers: {
      'Authorization': `JWT ${updateProfileAccessToken}`,
      'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    gender: gender.value,
    region: region.value,
    district: district.value,
    town: town.value,
    qualification: qualification.value,
    school_level: school_level_data,
    subject: subject.value,
    phone: phone.value,
    link: link.value,
    amount: amount.value,
    status: 'Teacher',
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


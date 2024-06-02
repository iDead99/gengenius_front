// const resultsContainer = document.getElementById('results');
const welcomeGenderStatus = document.getElementById("welcome-gender-status")
const welcomeTeacherName = document.getElementById("welcome-teacher-name")
const teacherProfileContainer = document.getElementById('teacher-profile-container');
const teacherName = document.getElementById('teacher-name');
const teacherGender = document.getElementById('gender');
const teacherRegion = document.getElementById('region');
const teacherDistrict = document.getElementById('district');
const teacherTown = document.getElementById('town');
const teacherTeachesIn = document.getElementById('teaches-in');
const teacherSubject = document.getElementById('subject');
const teacherAmount = document.getElementById('amount');
const teacherEmail = document.getElementById('email');
const teacherPhone = document.getElementById('phone');
const teacherLink = document.getElementById('link');

const homeOption = document.getElementById("home-option");
const profileOption = document.getElementById("profile-option");
const logoutOption = document.getElementById("logout-option");
const logoutNObtn = document.getElementById("logout-no-btn");
const logoutYESbtn = document.getElementById("logout-yes-btn");
const logoutContainer = document.getElementById("logout-container");
const goBackContainer = document.getElementById("go-back-container");
const searchGoBack = document.getElementById("search-go-back");

const getTeacher=document.getElementById("personal-teacher")
const hideForSearch =document.getElementById("hide-for-search")
const searchBar = document.getElementById("search-bar")
const lastLastContainer=document.getElementById("last-container");
const optionsTab=document.querySelector(".options-tab");

const guideContainer=document.getElementById("guide-container");
const readContainer=document.getElementById("read-container");

let contact=document.querySelector(".contact");
let contactOption=document.getElementById("contact-option");

const authenticationAccessToken=localStorage.getItem('loginAccessToken');
if(!authenticationAccessToken){
   window.location.href="login.html";
}

function TeacherUserDetails(){
   // console.log(authenticationAccessToken);
   if(!authenticationAccessToken){
      // console.log('Access token not found in localStorage');
      return null;
   }

   // http://127.0.0.1:8000/manage_geniusera/teachers/me/ 
   fetch('http://127.0.0.1:8000/auth/users/me/', {
   headers: {
      'Authorization': `JWT ${authenticationAccessToken}`,
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
   teacherName.textContent=`${data.first_name} ${data.last_name}`;
   teacherEmail.textContent = `Email: ${data.email}`;
   welcomeTeacherName.textContent=`${data.last_name}`
   // wlcTeacher(data.last_name)
}


function TeacherCustomerDetails(){
   //  console.log(authenticationAccessToken);
    if(!authenticationAccessToken){
      //  console.log('Access token not found in localStorage');
       return null;
    }

    // http://127.0.0.1:8000/manage_geniusera/teachers/me/ 
    fetch('http://127.0.0.1:8000/manage_geniusera/teachers/me/', {
    headers: {
       'Authorization': `JWT ${authenticationAccessToken}`,
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
      welcomeTeacher(data);
   // console.log(data);
})
.catch(error =>{
   console.log('Error', error)
});
 //  localStorage.removeItem('accessToken');
}
TeacherCustomerDetails();

function displayTeacherCustomerDetails(data){
    teacherGender.textContent = `Gender: ${data.gender}`
    teacherRegion.textContent = `Region: ${data.region}`
    teacherDistrict.textContent = `District: ${data.district}`
    teacherTown.textContent= `Town: ${data.town}`
    teacherTeachesIn.textContent = `Teaches in: ${data.school_level}`
    teacherSubject.textContent = `Subject(s): ${data.subject}`
    teacherAmount.textContent= `Amount charged per subject: ${data.amount}gh`
    teacherPhone.textContent = `Phone number: ${data.phone}`
    if(data.link===''){
        teacherLink.textContent = `Link: [no link]`
    }
    else{
        teacherLink.textContent = `Link: ${data.link}`
    }

   }
   function welcomeTeacher(data){
      let gender;
      if(data.gender==='Male'){
        gender='Sir '
      }
      else{
        gender='Madam '
      }
      welcomeGenderStatus.textContent=`${gender}`
   }

profileOption.onclick=function(){
   // dataTable.style.display='none';
   hideForSearch.style.display='none'
   // resultsContainer.style.display='block'
   teacherProfileContainer.style.display='block'
   lastLastContainer.style.display='none'
   optionsTab.style.display='none'
   // searchBar.style.display='none'
   goBackContainer.style.display='block'
   // studentUserDetails();
   // studentCustomerDetails();
}

logoutOption.onclick=function(){
   hideForSearch.style.display='none'
   // resultsContainer.style.display='none'
   teacherProfileContainer.style.display='none'
   lastLastContainer.style.display='none'
   optionsTab.style.display='none'
   // searchBar.style.display='none'
   // dataTable.style.display='none'
   // resultsContainer.style.display='none'
   logoutContainer.style.display='block'
}
logoutYESbtn.onclick=function(){
   accessToken=localStorage.removeItem('loginAccessToken');
   window.location.href="login.html";
}
logoutNObtn.onclick=function(){
   window.location.href="student_dashboard.html";
}
goBackContainer.onclick=function(){
   window.location.href="student_dashboard.html";
}
// searchGoBack.onclick=function(){
//    window.location.href="student_dashboard.html";
// }
readContainer.onclick=function(){
   const read = document.getElementById('read')
   if(read.textContent==='please read all'){
       guideContainer.style.height='fit-content'
       read.textContent='read less'
   }
   else if(read.textContent==='read less'){
       guideContainer.style.height='165px'
       read.textContent='please read all'
   }
}

contactOption.onclick=function(){
   contact.classList.add('animate-contact')
   setTimeout(() => {
       contact.classList.remove('animate-contact')
   }, 2000)
}
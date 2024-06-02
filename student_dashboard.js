const resultsContainer = document.getElementById('results');
const detailsContainer = document.getElementById('details');
const teacherName = document.getElementById('teacher-name');
const teacherRegion = document.getElementById('teacher-region');
const teacherDistrict = document.getElementById('teacher-district');
const teacherTown = document.getElementById('teacher-town');
const teacherTeachesIn = document.getElementById('teaches-in');
const teacherSubject = document.getElementById('teacher-subject');
const teacherAmount = document.getElementById('teacher-amount');
const teacherEmail = document.getElementById('teacher-email');
const teacherPhone = document.getElementById('teacher-phone');
const teacherLink = document.getElementById('teacher-link');

const studentName = document.getElementById('student-name');
const studentGender = document.getElementById('student-gender');
const studentEmail = document.getElementById('student-email');
const studentPhone = document.getElementById('student-phone');

const dataTable = document.getElementById("data-table");
const studentProfileContainer = document.getElementById("student-profile-container");

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

getTeacher.addEventListener('click', function(){
    hideForSearch.style.display='none'
    resultsContainer.style.display='none'
    lastLastContainer.style.display='none'
    optionsTab.style.display='none'
    searchBar.style.display='block'
    goBackContainer.style.display='block'
    goBackContainer.style.marginTop='50px'
})

let accessToken=localStorage.getItem('loginAccessToken');
if(!accessToken){
    window.location.href="login.html";
 }

document.getElementById('search-input').addEventListener('input', function() {
    dataTable.style.display='none';
    hideForSearch.style.display='none'
    resultsContainer.style.display='block'
    lastLastContainer.style.display='none'
    optionsTab.style.display='none'
    searchGoBack.style.display='block'

    const query = document.getElementById('search-input').value;
    fetchData(query);

    if(query===''){
        dataTable.style.display='inline-block';
    }
});

// display teacher data
function fetchData(query) {
    const url = `http://127.0.0.1:8000/manage_geniusera/teacher_searches/search/?q=${encodeURIComponent(query)}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displaySearchResults(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function displaySearchResults(data) {
    detailsContainer.style.display='none';
    const query = document.getElementById('search-input').value;
    resultsContainer.innerHTML = '';

    if (data.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    const ul = document.createElement('ul');
    data.forEach(item => {
        const li = document.createElement('li');
        li.className = "search-list"
        const hr = document.createElement('hr');
        hr.color='gray'
        li.style.fontSize='25px'
        li.style.cursor='pointer'
        li.style.color='black'
        li.style.margin='20px'
        li.textContent = `${item.region} / ${item.district} / ${item.town} / ${item.school_level} / ${item.subject}`;
        li.addEventListener('click', function() {
            fetchTeacherUserDetails(item.id)
            fetchTeacherCustomerDetails(item.id)
        });
        ul.appendChild(li).appendChild(hr);
    });
    resultsContainer.appendChild(ul);
}


function fetchTeachers(){
    const url = "http://127.0.0.1:8000/manage_geniusera/teachers/";
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayTeachers(data);
            // console.log(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
document.addEventListener('DOMContentLoaded', fetchTeachers);

function displayTeachers(teacherData){

        const thead = document.querySelector('thead tr');
        const tbody = document.querySelector('tbody');

        thead.innerHTML='';
        tbody.innerHTML='';

        if(teacherData.length === 0){
            tbody.innerHTML = '<tr><td colspan="5">No data available</td></tr>';
            return;
        }

        const headers = Object.keys(teacherData[0]).filter(header => (header !== 'id' && header !== 'user_id' && header !== 'qualification' && header !== 'status' && header !== 'phone' && header !== 'link' && header !== 'amount'));
        headers.forEach(headers => {
            const th = document.createElement('th');
            th.textContent=headers;
            thead.appendChild(th);
        });

        teacherData.forEach(item => {
            const tr = document.createElement('tr');
            tr.className = "table-row";
            headers.forEach(header => {
                const td = document.createElement('td');
                td.style.padding='5px'
                // td.className = "table-body";
                td.textContent = item[header];
                td.addEventListener('click', function() {
                    dataTable.style.display='none';
                    hideForSearch.style.display='none'
                    resultsContainer.style.display='none'
                    lastLastContainer.style.display='none'
                    optionsTab.style.display='none'
                    searchBar.style.display='none'
                fetchTeacherUserDetails(item.id)
                fetchTeacherCustomerDetails(item.id)
            });
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

}


function fetchTeacherUserDetails(id){
    const url = `http://127.0.0.1:8000/core/teacher_users/${id}/`;

    fetch(url)
        .then(response => {
            if(!response.ok){
                throw new Error('Network was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayTeacherUserDetails(data)
        })
        .catch(error => {
            console.log(error)
        })
}

function displayTeacherUserDetails(data){
    resultsContainer.style.display='none'
    document.getElementById('search-input').style.display='none';
    teacherName.textContent=`${data.first_name} ${data.last_name}`;
    teacherEmail.textContent = 'Email: ';
    makeEmailLink(data.email)
}
function makeEmailLink(email){
    const emailLink = document.createElement('a')
    emailLink.href=`mailto:${email}`
    emailLink.textContent=email
    teacherEmail.appendChild(emailLink)
}

function fetchTeacherCustomerDetails(id){
    const url = `http://127.0.0.1:8000/manage_geniusera/teacher_searches/${id}/`;

    fetch(url)
        .then(response => {
            if(!response.ok){
                throw new Error('Network was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayTeacherCustomerDetails(data)
        })
        .catch(error => {
            console.log(error)
        })
}

function displayTeacherCustomerDetails(data){
    resultsContainer.style.display='none'
    detailsContainer.style.display='block'
    goBackContainer.style.display="block";
    goBackContainer.style.marginTop='10px'
    document.getElementById('search-input').style.display='none';
    teacherRegion.textContent = `Region: ${data.region}`
    teacherDistrict.textContent = `District: ${data.district}`
    teacherTown.textContent= `Town: ${data.town}`
    teacherTeachesIn.textContent = `Teaches in: ${data.school_level}`
    teacherSubject.textContent = `Subject(s): ${data.subject}`
    teacherAmount.textContent= `Amount charged per subject: ${data.amount}gh`
    teacherPhone.textContent = `Phone number: ${data.phone}`
    if(data.link===''){
        teacherLink.textContent = 'Link: [no link]'
    }
    else{
        teacherLink.textContent = 'Link: '
        makeLinkLink(data.link)
    }
}
function makeLinkLink(link){
    const linkLink = document.createElement('a')
    linkLink.href=`${link}`
    linkLink.target='_blank'
    linkLink.textContent=link
    teacherLink.appendChild(linkLink)
}



// display student profile details

function studentUserDetails(){
    // console.log(authenticationAccessToken);
    if(!accessToken){
       // console.log('Access token not found in localStorage');
       return null;
    }
 
    // http://127.0.0.1:8000/manage_geniusera/teachers/me/ 
    fetch('http://127.0.0.1:8000/auth/users/me/', {
    headers: {
       'Authorization': `JWT ${accessToken}`,
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
    displayStudentUserDetails(data);
 })
 .catch(error =>{
    console.log('Error', error)
 });
 }
 
 function displayStudentUserDetails(data){
    studentProfileContainer.style.display='block'
    studentName.textContent=`${data.first_name} ${data.last_name}`;
    studentEmail.textContent = `Email: ${data.email}`;
 }
 
 
 function studentCustomerDetails(){
    //  console.log(authenticationAccessToken);
     if(!accessToken){
       //  console.log('Access token not found in localStorage');
        return null;
     }
 
     // http://127.0.0.1:8000/manage_geniusera/teachers/me/ 
     fetch('http://127.0.0.1:8000/manage_geniusera/students/me/', {
     headers: {
        'Authorization': `JWT ${accessToken}`,
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
       displayStudentCustomerDetails(data);
    // console.log(data);
 })
 .catch(error =>{
    console.log('Error', error)
 });
  //  localStorage.removeItem('accessToken');
 }
 
 function displayStudentCustomerDetails(data){
    studentProfileContainer.style.display='block'
    studentGender.textContent = `Gender: ${data.gender}`
    studentPhone.textContent = `Phone number: ${data.phone}`
 }

 profileOption.onclick=function(){
    dataTable.style.display='none';
    hideForSearch.style.display='none'
    resultsContainer.style.display='block'
    lastLastContainer.style.display='none'
    optionsTab.style.display='none'
    searchBar.style.display='none'
    goBackContainer.style.display='block'
    studentUserDetails();
    studentCustomerDetails();
 }

 logoutOption.onclick=function(){
    hideForSearch.style.display='none'
    resultsContainer.style.display='none'
    lastLastContainer.style.display='none'
    optionsTab.style.display='none'
    searchBar.style.display='none'
    dataTable.style.display='none'
    resultsContainer.style.display='none'
    logoutContainer.style.display='block'
 }
 logoutYESbtn.onclick=function(){
    localStorage.removeItem('loginAccessToken');
    window.location.href="login.html";
 }
 logoutNObtn.onclick=function(){
    window.location.href="student_dashboard.html";
}
goBackContainer.onclick=function(){
    window.location.href="student_dashboard.html";
}
searchGoBack.onclick=function(){
    window.location.href="student_dashboard.html";
}
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
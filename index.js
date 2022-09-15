const dob5 = document.getElementById("dob");
dob5.addEventListener("change", () => validateDOB(dob5));
function validateDOB(dob5){
let k=dob5.value.split("-");
let year=k[0];
let month=k[1];
let date=k[2];
let birthdate = new Date(year, month, date);
let today = new Date();
let present_year= today.getFullYear();
let birth_Year=birthdate.getFullYear()
let age = present_year - birth_Year;
let month_Diff = today.getMonth() - birthdate.getMonth();
if ((today.getDate() < birthdate.getDate())||month_Diff<0) 
{
age--;
}
if (age<18 || age>55) 
{
dob5.setCustomValidity("Your age is not between 18 , 55");
dob5.reportValidity();
}
else
{
dob5.setCustomValidity("");
}
}
let email=document.getElementById("email");
email.addEventListener('input',() => validate(email));
function validate(element){
if(element.validity.typeMismatch){
    element.setCustomValidity("Invalid email");
    element.reportValidity();
    }
    else{
    element.setCustomValidity('');
    }
}           
let userform=document.getElementById('Form_data');
const retriveEntries=()=>{
    let entries=localStorage.getItem("entries");
    if(entries){
        entries=JSON.parse(entries);
    }
    else{
        entries=[];
    }
    return entries;
}
let userEntries=retriveEntries();

const display=()=>{
    let entries=retriveEntries();
    const tableEntries=entries.map((entry)=>{
    const name=`<td>${entry.name}</td>`;
    const email=`<td>${entry.email}</td>`;
    const password=`<td>${entry.password}</td>`;
    const dob=`<td >${entry.dob}</td>`;
    const accept=`<td>${entry.acceptedTermsAndCondition}</td>`;
    const row=`<tr>${name} ${email} ${password} ${dob} ${accept}</tr>`;
    return row;
    }).join("\n");
    const table=`<table border="2">
    <tr>
    <th>Name</th>
    <th>Email</th>
    <th >Password</th>
    <th>Dob</th>
    <th>Accepted terms?</th>
    </tr>
    ${tableEntries}</table>`;
    let details=document.getElementById("entries");
    details.innerHTML=table;
}

const saveForm=(event)=>{
     event.preventDefault();
     const name=document.getElementById("name").value;
     const email=document.getElementById("email").value;
     const password=document.getElementById("password").value;
     const dob=document.getElementById("dob").value;

     const acceptedTermsAndCondition=document.getElementById("acceptTerms").checked;
     const entry={
        name,
        email,
        password,
        dob,
        acceptedTermsAndCondition
     };
     userEntries.push(entry);
     localStorage.setItem("entries",JSON.stringify(userEntries));
     display();
}
userform.addEventListener("submit",saveForm);
display();
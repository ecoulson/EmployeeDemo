const EmployeeContainer = document.getElementsByClassName("container")[0];
const AddEmployeeButton = document.getElementsByClassName("add-employee")[0];
const NameInput = document.getElementById("employee-name");
const AgeInput =  document.getElementById("employee-age");
const SexInput = document.getElementById("employee-sex");

AddEmployeeButton.addEventListener("click", handleClick);

function handleClick() {
    const name = NameInput.value;
    const age = parseInt(AgeInput.value);
    const sex = SexInput.value;
    const date = new Date();
   
    const data = {
        name: name,
        age: age,
        sex: sex,
        employmentDate: date.toDateString()
    }
    
    axios.post("/employee", data).then(function () {
        EmployeeContainer.append(createEmployeeElement(data));
    })
}


// Returns an HTML element that displays
// an employee
function createEmployeeElement(employee) {
    const EmployeeDiv = document.createElement("div");
    const NameElement = document.createElement("h1");
    const AgeElement = document.createElement("p");
    const SexElement = document.createElement("p");
    const EmploymentDateElement = document.createElement("p");

    EmployeeDiv.append(NameElement);
    EmployeeDiv.append(AgeElement);
    EmployeeDiv.append(SexElement);
    EmployeeDiv.append(EmploymentDateElement);

    EmployeeDiv.className = "employee";

    NameElement.textContent = employee.name;
    AgeElement.textContent = "Age: " + employee.age;
    SexElement.textContent = "Sex: " + employee.sex;
    EmploymentDateElement.textContent = "Date Employed: " + employee.employmentDate;

    return EmployeeDiv;
}

axios.get("/employee").then(function (payload) {
    for (let employee of payload.data) {
        EmployeeContainer.append(createEmployeeElement(employee));
    }
})
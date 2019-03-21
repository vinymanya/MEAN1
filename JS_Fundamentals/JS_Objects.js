let students = [
    {name: 'Remy', cohort: 'Jan'},
    {name: 'Genevieve', cohort: 'March'},
    {name: 'Chuck', cohort: 'Jan'},
    {name: 'Osmund', cohort: 'June'},
    {name: 'Nikki', cohort: 'June'},
    {name: 'Boris', cohort: 'June'}
];

//Challenge 1
function studentCohort(){
  for(let i = 0; i < students.length; i++){
    console.log(`Name: ${students[i].name, Cohort: ${students[i].cohort}}`);
  }
}
studentCohort();

//Challenge 2
let users = {
    employees: [
        {'first_name':  'Miguel', 'last_name' : 'Jones'},
        {'first_name' : 'Ernie', 'last_name' : 'Bertson'},
        {'first_name' : 'Nora', 'last_name' : 'Lu'},
        {'first_name' : 'Sally', 'last_name' : 'Barkyoumb'}
    ],
    managers: [
       {'first_name' : 'Lillian', 'last_name' : 'Chambers'},
       {'first_name' : 'Gordon', 'last_name' : 'Poe'}
    ]
 };

function printContent(){
    for (let group in users){
        console.log(group.toUpperCase());
        for (let i = 0; i < users[group].length; i++){
            let num = i + 1;
            let first_name = users[group][i].first_name;
            let last_name = users[group][i].last_name;
            let name_length = first_name.length + last_name.length;
            console.log(`${num} - ${first_name} - ${last_name} - ${name_length}`);
        }
    }
}

printContent();

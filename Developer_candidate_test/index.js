document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});




document.querySelector('table tbody').addEventListener('click', function(event){
    if(event.target.id === "edit-person-button"){
        editPerson(event.target.dataset.id);
    }
});


function editPerson(Company_id) {

    fetch('http://localhost:5000/getAll/' + Company_id)
    .then(response => response.json())
    .then(data => loadEditData(data['data']));


};

function loadEditData(data) {

    const editbutton = document.querySelector(`#edit-button-${data[0].Company_id}`);


    editbutton.onclick = function () {
        
        const Company_idOLD = data[0].Company_id;
        const first_name_input_edit = document.querySelector(`#first-name-input-edit-${data[0].First_name}`);
        const First_name = first_name_input_edit.value;
        first_name_input_edit.value = "";
    
    
        const last_name_input_edit = document.querySelector(`#last-name-input-edit-${data[0].Last_name}`);
        const lastname = last_name_input_edit.value;
        last_name_input_edit.value = "";
    
    
    
        const company_id_input_edit = document.querySelector(`#company-id-input-edit-${data[0].Company_id}`);
        const Company_id = company_id_input_edit.value;
        company_id_input_edit.value = "";
    
    
        fetch('http://localhost:5000/update', {
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({First_name : First_name, Last_name : lastname, Company_id : Company_id, Company_idOLD: Company_idOLD})
        })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data['data']));
        location.reload();
    
    }

};







const addbutton = document.querySelector('#add-button');

addbutton.onclick = function () {
    const first_name_input = document.querySelector('#first-name-input');
    const firstname = first_name_input.value;
    first_name_input.value = "";


    const last_name_input = document.querySelector('#last-name-input');
    const lastname = last_name_input.value;
    last_name_input.value = "";



    const company_id_input = document.querySelector('#company-id-input');
    const companyId = company_id_input.value;
    company_id_input.value = "";


    fetch('http://localhost:5000/insert', {
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({First_name : firstname, Last_name : lastname, Company_id : companyId})
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
    location.reload();

}

document.querySelector('table tbody').addEventListener('click', function(event){
    if(event.target.id === "delete-person-button"){
        deletePerson(event.target.dataset.id);
    }
});

function deletePerson(Company_id) {
    fetch('http://localhost:5000/delete/' + Company_id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success){
            location.reload();
        }
    });
};


function insertRowIntoTable(data) {

}


function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    //console.log(data);

    if (data.lenght === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No data </td></tr>";
        return;
    }

    

    let tableHtml = "";
    data.forEach(function ({Company_id, First_name, Last_name}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${Last_name}, ${First_name}</td>`;
        tableHtml += `<td>${Company_id}</td>`;
        tableHtml += `<td>date_of_birth</td>`;
        tableHtml += `<td>Department</td>`;
        tableHtml += `<td>Company_car</td>`;
        tableHtml += `<td><button class="btn btn-light" id="edit-person-button" data-toggle="modal" data-target="#edit-${Company_id}" data-id=${Company_id}>Edit</button></td>`;
        tableHtml += `<td><button class="btn btn-danger" id="delete-person-button" data-id=${Company_id}>Delete</button></td>`;
        tableHtml += "</tr>";
        tableHtml += 
    `<div id="edit-${Company_id}" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit</h4>
            </div>
            <div class="modal-body">

            <div>
            <label>First name</label>
              <input type="text" id="first-name-input-edit-${First_name}" value="${First_name}"></input>
              </div>
      
              <div>
              <label>Last name</label>
              <input type="text" id="last-name-input-edit-${Last_name}" value="${Last_name}"></input>
              </div>
      
              <div>
              <label>Company ID</label>
              <input type="number" id="company-id-input-edit-${Company_id}" value="${Company_id}"></input>
              <div>


            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button id="edit-button-${Company_id}" class="btn btn-success">Save</button>
            </div>
          </div>
        </div>
      </div>`;
        
    });

    table.innerHTML = tableHtml;
};
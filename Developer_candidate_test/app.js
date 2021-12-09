const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const service = require('./service');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false}));


app.post('/insert', (request, response) => {
    console.log(request);
    console.log(request.body);
    const { First_name } = request.body;
    const { Last_name } = request.body;
    const { Company_id } = request.body;

    const db = service.getServiceInstant();
    const result = db.insertData(First_name, Last_name, Company_id);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
    
});

app.post('/update', (request, response) => {
    console.log(request.body);
    console.log('insertissä ollaan');
    const { First_name } = request.body;
    const { Last_name } = request.body;
    const { Company_id } = request.body;
    const { Company_idOLD } = request.body;

    const db = service.getServiceInstant();
    const result = db.updateData(First_name, Last_name, Company_id, Company_idOLD);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
    
});


app.get('/getAll', (request, response) => {
    const db = service.getServiceInstant();
    const result = db.getAllData();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));

   // console.log(response);
   // console.log('testi');
});


app.get('/getAll/:Company_id', (request, response) => {
    const { Company_id } = request.params;
    
   // console.log(request.params);
    const db = service.getServiceInstant();
    const result = db.getPersonData(Company_id);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));

    //console.log(response);
    //console.log('testi2222');
});


app.delete('/delete/:Company_id', (request, response) => {
    
    const { Company_id } = request.params;
    const db = service.getServiceInstant();

    const result = db.deletePerson(Company_id);

    result
    .then(data => response.json({success : true}))
    .catch(err => console.log(err));


    //console.log('deletointi');

});


app.listen(process.env.PORT, () => console.log('appi pyörii') );
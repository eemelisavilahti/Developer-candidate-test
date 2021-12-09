const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

/*
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    port: process.env.DB_PORT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
*/

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "3307",
    password: "sqlsalasana",
    database: "CandidateTest_db"
  });


connection.connect((err) =>{
    if(err){
        console.log(err.message);
    }
    console.log('database '+ connection.state);
});


class Service {
    static getServiceInstant(){
        return instance ? instance : new Service();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Employees;";

                connection.query(query, (err, results) =>{
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })

            });
            console.log('on');
            
           // console.log(response);
            return response;
            

        } catch (error){
            console.log(error);
        }

    }



    async getPersonData(Company_id) {
        
       // console.log(Company_id);
        try {
            const companyId = Company_id;
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Employees WHERE Company_id = ?;";

                connection.query(query,[companyId], (err, results) =>{
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })

            });
           // console.log(Company_id);
          //  console.log('persoona');
           // console.log(response);
            return response;

        } catch (error){
            console.log(error);
        }

    }


    async insertData(First_name, Last_name, Company_id) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO Employees (First_name, Last_name, Company_id) VALUES (?,?,?);";

                connection.query(query, [First_name, Last_name, Company_id], (err, results) =>{
                    if (err) reject(new Error(err.message));
                    resolve(results.insertId);
                })

            });
          //  console.log('jebbbb');
          //  console.log(insertId);
            return {
                firstname: First_name,
                lastname: Last_name,
                companyId: Company_id
            };

        } catch (error){
            console.log(error);
        }
    }


    async updateData(First_name, Last_name, Company_id, Company_idOLD) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "UPDATE Employees SET First_name = ?, Last_name = ?, Company_id = ? WHERE Company_id = ?;";

                connection.query(query, [First_name, Last_name, Company_id, Company_idOLD], (err, results) =>{
                    if (err) reject(new Error(err.message));
                    resolve(results.insertId);
                })

            });
          //  console.log('jebbbb');
          //  console.log(insertId);
            return {
                firstname: First_name,
                lastname: Last_name,
                companyId: Company_id
            };

        } catch (error){
            console.log(error);
        }
    }


    async deletePerson(Company_id){
        try {
            Company_id = parseInt(Company_id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM Employees WHERE Company_id = ?;";
    
                connection.query(query, [Company_id], (err, result) =>{
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
    
        });
      //  console.log(response);

        }catch (error){
            console.log(error);

        }

    }
};

module.exports = Service;
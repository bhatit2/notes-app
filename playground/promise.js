/**async await
 * async functions always returns promises
 */

 const axios = require('axios');
const users = [
    {
        id : 1,
        studentId : 100,
        Name : 'Tanvi'
    },
    {
        id : 2,
        studentId : 101,
        Name : 'Garima'
    }
]

const grades = [
    {   
        id : 1,
        studentId : 100,
        grade : 89
    },
    {
        id : 2,
        studentId : 100,
        grade : 92
    },
    {
        id : 3,
        studentId : 101,
        grade : 91
    }
]

const getUser = (id) => {
    return new Promise((resolve, reject)=>{
        const user = users.find(user=> user.id == id);
        if(user){
            resolve(user);
        } else{
            reject(`user not found with id ${id}`)
        }
    });
}

const getGrades = (studentId) => {
    return new Promise( (resolve,reject)=>{
        const result = grades.filter(grade => grade.studentId == studentId);
        if(result.length > 0){
            resolve(result);
        } else{
            reject('invalid student id');
        }
        
        });
}

const getStatus = (userId) => {
    return getUser(userId).then((user)=>{
        return getGrades(user.studentId)
        .then(grades => {
            const average = grades.reduce((prev,current)=> (prev.grade + current.grade))/grades.length;
            return `${user.Name} has a ${average}% in the class`;
        })
    })
}

const getStatusAlt = async (userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.studentId);
    const average = grades.reduce((prev,current)=> (prev.grade + current.grade))/grades.length;
    return `${user.Name} has a ${average}% in the class`;

}

const getcountries = async (currency) => {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`);
    return response.data.map(country=>country.name);
}

/*getGrades(100).then((grades)=>{
    console.log(JSON.stringify(grades));
}).catch(err=> {
    console.log(err);
})

getStatusAlt(0).then((res)=>{
    console.log(res);
}).catch(err =>
    console.log(err)
) */

getcountries('usd').then(res =>{
    console.log(res);
})
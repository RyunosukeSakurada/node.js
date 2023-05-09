const mySum = require('./mySum')
const myArr = [1,2,3,4,5,6,7,8,9,10]
const result = mySum(...myArr)
console.log(result) 

const mySecondArr = myArr.map((val) => val * 2)
console.log(mySecondArr) 

//average
const ave = mySecondArr.reduce((acc, num) => acc + num, 0) / mySecondArr.length;
const filteredArr = mySecondArr.filter((num) => num >= ave);
console.log(filteredArr)


setTimeout(() => console.log('Goodbye'), 3000)



const employee = {
  name: 'example',
  email: 'example@email.com',
  department: 'sales',
  startDate: '2023/05/09',
}

const { name, email } = employee
const person = { name, email }
console.log(person)
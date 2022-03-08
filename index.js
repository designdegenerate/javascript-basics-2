//Get user input
const weightInKg = parseInt(process.argv[2]);
const heightInM = parseFloat(process.argv[3]);
const userAge = parseInt(process.argv[4]);
const dailyExercise = process.argv[5];
const sex = process.argv[6];

//validate input and exit if too many arguments are given
if (process.argv.length !== 7){
    console.log(`
You gave ${process.argv.length - 2} argument(s) to this program

Please provide 5 arguments (in order) for:

1. weight (kg)
2. height (m)
3. age (years)
4. Whether you exercise daily (yes/no)
5. your sex (m/f)

Example:
$ node index.js 82 1.79 32 yes m
    
    `)
    process.exit();
}

//validate input and exit if data types mismatch
if (isNaN(weightInKg) || isNaN(heightInM) || isNaN(userAge)) {
    console.log(`
Please make sure that weight, height, and age are numbers:

weight (kg) example: 82 | your input: ${process.argv[2]}
height (m) example 1.79 | your input: ${process.argv[3]}
age (years) example 32  | your input: ${process.argv[4]}

Example:
$ node index.js 82 1.79 32 yes m

    `)
    process.exit();
}

//validate weight, exit if the values are unrealistic
if (weightInKg < 30 || weightInKg > 300) {
    console.log(`
Please enter a weight between 30 kg and 300 kg:

weight (kg): 82 | your input: ${process.argv[2]}

Example:
$ node index.js 82 1.79 32 yes m
    
    `);
    process.exit();
}

//validate exercise, exit if value is not "yes" or "no"
if (dailyExercise !== "yes" && dailyExercise !== "no") {

    console.log(`
Please answer whether you exercise or not with a "yes" or "no" response:

do you exercise or not? (yes/no) | your answer: ${process.argv[5]}

Example:
$ node index.js 82 1.79 32 yes m

    `);
    process.exit();
}

//calculate BMI
const BMI = Math.round(weightInKg / (heightInM * heightInM));
const idealWeight = Math.round(22.5 * heightInM * heightInM);

//Calculate BMR
const heightInCm = heightInM * 100;
let BMR;
BMR = (10 * weightInKg) + (6.25 * heightInCm) - (5 * userAge);

//Adjust BMR based on sex, if provided
if (sex === "m") {
    BMR = BMR + 50;
} else if (sex === "f") {
    BMR = BMR - 150;
};

//Adjust daily calory usage based on exercise
const dailyCalories = dailyExercise === "yes" ? BMR * 1.6 : BMR * 1.4;

//Calculate Weight loss/gain needed
const weightDifference = weightInKg - idealWeight;
const caloriesDiet = weightDifference < 0 ? dailyCalories + 500 : dailyCalories - 500;

//Calculate diet plan duration
const weeksToDiet = Math.round(weightDifference / 0.5);

//Check user's age, and warn if they're too young
if (userAge < 20) {
    console.log(`
This BMI calculator is designed for people over 20.
Results shown may not be accurate.
    `)
}

console.log(`

**************
BMI CALCULATOR
**************

age: ${userAge} years
sex: ${sex}
height: ${heightInM} m
weight: ${weightInKg} kg
do you exercise daily? ${dailyExercise}

****************
FACING THE FACTS
****************

Your BMI is ${BMI}

A BMI under 18.5 is considered underweight
A BMI over 25 is considered overweight

Your ideal weight is ${idealWeight} kg
With a normal lifestyle you need to burn ${dailyCalories} calories a day

*********
DIET PLAN
*********

If you want to reach your ideal weight of ${idealWeight} kg:

Eat ${Math.abs(caloriesDiet)} calories a day
for ${Math.abs(weeksToDiet)} weeks
`);
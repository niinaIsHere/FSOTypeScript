export const calculateBmi = (height, mass) => {
    const height_in_meters = height / 100;
    const bmi = mass / height_in_meters ** 2;
    let message = "";
    if (bmi < 18.5) {
        message = "Underweight";
    }
    else if (bmi <= 25 && bmi >= 18.5) {
        message = "Normal range";
    }
    else if (bmi > 25) {
        message = "Overweight";
    }
    console.log(message);
    return message;
};
const mass = Number(process.argv[2]);
const height = Number(process.argv[3]);
calculateBmi(mass, height);

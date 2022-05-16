interface BMIValues {
    height: number,
    weight: number
}

const parseBmiArguments = (args: Array<string>): BMIValues => {
    if (args.length != 4) {
        throw new Error('Provide height in centimeters and weight in kilograms');
    }

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateBmi = (height: number, weight: number) => {
    if (height === 0) throw new Error("Height cannot be 0!");
    const bmi = weight/Math.pow(height/100,2);

    if (bmi < 16) return "Underweight (severe thinness)";
    if (bmi < 17) return "Underweight (moderate thinness)";
    if (bmi < 18.5) return "Underweight (mild thinness)";
    if (bmi < 25) return "Normal (healthy weight)";
    if (bmi < 30) return "Overweight (pre-obese)";
    if (bmi < 35) return "Obese (class I)";
    if (bmi < 40) return "Obese (class II)";
    return "Obese (class III)";
}

try {
    const {height, weight} = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
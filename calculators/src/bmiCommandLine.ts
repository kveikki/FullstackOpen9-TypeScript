import calculateBmi from './bmi'

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
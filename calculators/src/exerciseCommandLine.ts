import calculateExercises from './exercise'

interface ExerciseValues {
    target: number,
    exercises: Array<number>
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {

    if (args.length < 4) throw new Error("Provide a target value and at least one day's exercise duration");

    const target = Number(args[2]);
    if (isNaN(target)) throw new Error('Provided values were not numbers!');

    const exercises: Array<number> = [];
    for(let i = 0; i < args.length - 3; i++){
        exercises[i] = Number(args[i+3]);
        if (isNaN(exercises[i])) throw new Error('Provided values were not numbers!');
    }

    return ({
        target: target,
        exercises: exercises
    });
}

try {
    const exerciseValues = parseExerciseArguments(process.argv);
    console.log(calculateExercises(exerciseValues.target, exerciseValues.exercises))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
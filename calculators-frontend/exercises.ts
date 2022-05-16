interface ExerciseValues {
    target: number,
    exercises: Array<number>
}

interface ExerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
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

const calculateExercise = (target: number, exercises: Array<number>) => {
    const trainingDays = exercises.filter(i => i > 0).length;
    
    let average = 0;
    exercises.forEach(i => average += i);
    average = average / exercises.length;

    const success = average >= target;
    const rating = (success) ? 3 : (average >= target / 2) ? 2 : 1;

    let ratingDescription : string;
    switch (rating){
        case 1: ratingDescription = ' lot of improvements can be made'; break;
        case 2: ratingDescription = 'not too bad but could be better'; break;
        default: ratingDescription = 'well done'; break;
    }

    return {
        periodLength: exercises.length,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

try {
    const exerciseValues = parseExerciseArguments(process.argv);
    console.log(calculateExercise(exerciseValues.target, exerciseValues.exercises))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
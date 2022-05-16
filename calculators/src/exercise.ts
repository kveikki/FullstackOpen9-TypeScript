interface ExerciseResult {
        periodLength: number,
        trainingDays: number,
        success: boolean,
        rating: number,
        ratingDescription: string,
        target: number,
        average: number
}

export default function calculateExercises(target: number, exercises: Array<number>): ExerciseResult {
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
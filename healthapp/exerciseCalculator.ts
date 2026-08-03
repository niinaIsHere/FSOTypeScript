interface exerciseStats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  exercise_hours: number[],
  target: number,
): exerciseStats => {
  const periodLength = exercise_hours.length;
  const trainingDays = exercise_hours.filter((d) => d !== 0).length;
  const average = exercise_hours.reduce((sum, n) => sum + n, 0) / periodLength;
  const success = target <= average;

  const calculate_rating = (average: number, target: number): number => {
    const percentage = average / target;
    if (percentage < 0.5) {
      return 1;
    } else if (percentage < 1) {
      return 2;
    } else {
      return 3;
    }
  };

  const extract_rating_description = (rating: number): string => {
    if (rating == 1) {
      return "Improvement needed";
    } else if (rating == 2) {
      return "Not too bad but could be better";
    } else {
      return "Very good job";
    }
  };

  const rating = calculate_rating(average, target);

  const ratingDescription = extract_rating_description(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const args = process.argv.slice(2);
const user_target = Number(args[0]);
const diary = args.slice(1).map(Number);

console.log(calculateExercises(diary, user_target));

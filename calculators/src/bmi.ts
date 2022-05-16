export default function calculateBmi(height: number, weight: number):string {
    if (height <= 0) throw new Error("Height cannot be 0 or less!");
    if (weight <= 0) throw new Error("Weight cannot be 0 or less!");
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
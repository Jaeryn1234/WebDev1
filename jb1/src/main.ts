
const createConverter = (fromUnit: string, toUnit: string) => {
    
    // Returns the actual conversion arrow function
    return (input: number | number[]): number | number[] => {
        
        // Define the math logic based on the units passed in
        let convertLogic = (val: number): number => val; // fallback

        if (fromUnit === "kg" && toUnit === "lb") {
            convertLogic = (val) => val * 2.20462;
        } else if (fromUnit === "lb" && toUnit === "kg") {
            convertLogic = (val) => val * 0.45359237;
        } else if (fromUnit === "miles" && toUnit === "km") {
            convertLogic = (val) => val * 1.609344;
        } else if (fromUnit === "km" && toUnit === "miles") {
            convertLogic = (val) => val * 0.62137119;
        } else if (fromUnit === "celsius" && toUnit === "fahrenheit") {
            convertLogic = (val) => (val * 9/5) + 32;
        } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
            convertLogic = (val) => (val - 32) * 5/9;
        }

     
        if (Array.isArray(input)) {
            return input.map(convertLogic);
        } else {
            return convertLogic(input);
        }
    };
};

//conversions
    //weight
    const kilogramsToPounds = (kilograms: number): number => kilograms * 2.20462;
    const poundsToKilograms = (pounds: number): number => pounds * 0.45359237;

    //distance
    const milesToKilometres = (miles: number): number => miles * 1.609344;
    const kilometresToMiles = (kilometres: number): number => kilometres * 0.62137119;

    //temperature
    const celsiusToFahrenheit = (celsius: number): number => (celsius* 9/5) + 32;
    const fahrenheitToCelsius = (fahrenheit: number): number => (fahrenheit - 32) * 5/9;

//get id
    // get kg
    const kgInput = document.getElementById("kg-input") as HTMLInputElement;
    const kgButton = document.getElementById("kg-button") as HTMLButtonElement;
    const kgResult = document.getElementById("kg-result") as HTMLParagraphElement;

    //get lb
    const lbInput = document.getElementById("lb-input") as HTMLInputElement;
    const lbButton = document.getElementById("lb-button") as HTMLButtonElement;
    const lbResult = document.getElementById("lb-result") as HTMLParagraphElement;

    //get miles
    const milesInput = document.getElementById("miles-input") as HTMLInputElement;
    const milesButton= document.getElementById("miles-button") as HTMLButtonElement;
    const milesResult = document.getElementById("miles-result") as HTMLParagraphElement;

    //get kilometres
    const kilometresInput = document.getElementById("kilo-input") as HTMLInputElement;
    const kilometresButton = document.getElementById("kilo-button") as HTMLButtonElement;
    const kilometresResult = document.getElementById("kilo-result") as HTMLParagraphElement;

    //get celsius
    const celsiusInput = document.getElementById("celsius-input") as HTMLInputElement;
    const celsiusButton = document.getElementById("celsius-button") as HTMLButtonElement;
    const celsiusResult = document.getElementById("celsius-result") as HTMLParagraphElement;

    //get fahrenheit
    const fahrenheitInput = document.getElementById("fahrenheit-input") as HTMLInputElement;
    const fahrenheitButton = document.getElementById("fahrenheit-button") as HTMLButtonElement;
    const fahrenheitResult = document.getElementById("fahrenheit-result") as HTMLParagraphElement;


// 3. Helper to connect HTML Strings to the Higher-Order Function
// This takes what the user typed, turns it into a number (or array of numbers),
// feeds it to the converter, and formats the output string.
const processInput = (inputValue: string, converterFunc: (val: number | number[]) => number | number[]): string => {
    if (inputValue.includes(",")) {
        // It's a list: Convert string to array of numbers
        const stringArray = inputValue.split(",");
        const numberArray = stringArray.map(item => Number(item.trim()));
        
        // Feed array to your generated function
        const resultArray = converterFunc(numberArray) as number[];
        
        // Format to 2 decimal places and return as string
        return resultArray.map(res => res.toFixed(2)).join(", ");
    } else {
        // It's a single value
        const singleNumber = Number(inputValue.trim());
        const result = converterFunc(singleNumber) as number;
        return result.toFixed(2);
    }
};


// 4. Calculate & Event Listeners
if (kgButton) {
    kgButton.addEventListener("click", () => {
        kgResult.textContent = processInput(kgInput.value, kilogramsToPounds);
    });
}
 
if (lbButton) {
    lbButton.addEventListener("click", () => {
        lbResult.textContent = processInput(lbInput.value, poundsToKilograms);
    });
}
 
if (milesButton) {
    milesButton.addEventListener("click", () => {
        milesResult.textContent = processInput(milesInput.value, milesToKilometres);
    });
}
 
if (kilometresButton) {
    kilometresButton.addEventListener("click", () => {
        kilometresResult.textContent = processInput(kilometresInput.value, kilometresToMiles);
    });
}
 
if (celsiusButton) {
    celsiusButton.addEventListener("click", () => {
        celsiusResult.textContent = processInput(celsiusInput.value, celsiusToFahrenheit);
    });
}
 
if (fahrenheitButton) {
    fahrenheitButton.addEventListener("click", () => {
        fahrenheitResult.textContent = processInput(fahrenheitInput.value, fahrenheitToCelsius);
    });
}
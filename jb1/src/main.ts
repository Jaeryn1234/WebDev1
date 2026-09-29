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


//convert from = cf and convert dont shto = ct
const convert = (cf: string, ct: string) => {
    return(num: number | number[]) => {
        const solve = (n: number): number => { //got this line from chatgpt because initially i put solve below the if statement
            if(cf === "lb" && ct === "kg"){
                return n * 0.45359237;
            } else if (cf === "kg" && ct === "lb"){
                return n * 2.20462;
            } else if (cf === "miles" && ct === "kilometres"){
                return n * 1.609344;
            } else if (cf === "kilometres" && ct === "miles"){
                return n * 0.62137119;
            } else if (cf === "celsius" && ct === "fahrenheit"){
                return (n * 9/5) + 32;
            } else if (cf === "fahrenheit" && ct === "celsius"){
                return (n - 32) * 5/9;
            }else{
                return 0;
            }
        };
            
        //return solved values
        if (typeof num === 'number'){//https://www.geeksforgeeks.org/javascript/how-to-check-if-a-value-is-a-number-in-javascript/
            return solve(num);
        } else if (num.constructor === Array){ //https://stackoverflow.com/questions/767486/how-do-i-check-if-a-variable-is-an-array-in-javascript
            return num.map((x) => solve(x)); 
        }
    };
};


const isArray = (input: HTMLInputElement): number[] | number=> {
    if(input.value.includes(",")){
        const myArray = input.value.split(",");
        const arrayConvertNumber = myArray.map((x) => Number(x));
        return arrayConvertNumber;
    }
    const inputConvertNumber = Number(input.value);;
    return inputConvertNumber;
};

const buttonPress = (button: HTMLButtonElement, input: HTMLInputElement, result: HTMLParagraphElement, cf:string, ct: string): void =>{
    const handleConvert = (): void => {
        const runConvert = convert(cf, ct); //outer
        
        const inputConvertNumber = isArray(input);

        const total = runConvert(inputConvertNumber); //inner

        if(typeof total === "number"){
            result.textContent = total.toFixed(2); //fix only exists on number not array
        } else{
            result.textContent = total.map((x) => x.toFixed(2)).join(", "); //.join chatgpt because it says textContent requires a string
        }
    };

    if(button){
        button.addEventListener("click", handleConvert);
    }
};

buttonPress(lbButton, lbInput, lbResult, "lb", "kg");
buttonPress(kgButton, kgInput, kgResult,"kg", "lb");

buttonPress(milesButton, milesInput, milesResult, "miles", "kilometres");
buttonPress(kilometresButton, kilometresInput, kilometresResult, "kilometres", "miles");

buttonPress(celsiusButton, celsiusInput, celsiusResult, "celsius", "fahrenheit");
buttonPress(fahrenheitButton, fahrenheitInput, fahrenheitResult, "fahrenheit", "celsius");
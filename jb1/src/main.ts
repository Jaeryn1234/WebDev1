const createInput = (input: string, button: string, result: string): [HTMLInputElement, HTMLButtonElement, HTMLParagraphElement] => {
    const inputCreated = document.getElementById(input) as HTMLInputElement;
    const buttonCreated = document.getElementById(button) as HTMLButtonElement;
    const resultCreated = document.getElementById(result) as HTMLParagraphElement;
    return [inputCreated, buttonCreated, resultCreated];
}

const [kgInput, kgButton, kgResult] = createInput("kg-input", "kg-button", "kg-result");
const [lbInput, lbButton, lbResult] = createInput("lb-input", "lb-button", "lb-result");
const [milesInput, milesButton, milesResult] = createInput("miles-input", "miles-button", "miles-result");
const [kilometresInput, kilometresButton, kilometresResult] = createInput("kilometres-input", "kilometres-button", "kilometres-result");
const [celsiusInput, celsiusButton, celsiusResult] = createInput("celsius-input", "celsius-button", "celsius-result");
const [fahrenheitInput, fahrenheitButton, fahrenheitResult] = createInput("fahrenheit-input", "fahrenheit-button", "fahrenheit-result");

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
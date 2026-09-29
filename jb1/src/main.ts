/*
Jaeryn Franco and Bao Nguyen: Sep 28, Web Dev 2 CPRG-306-C

This project is meant to perform unit conversions. Pounds, kilograms, 
miles to kilometres, celsius to fahrenheit and vice versa. The website 
includes a navbar with: weight, distance, and temperature. Each tab has 
a form to convert between metric unit and imperial unit. Can convert a 
single value and an array. Uses Tailwind CSS and Javascript

Inputs are what the number(s) the user gives us in the form, whether it be for
lb, kg, miles, kilometres, celsius, and fahrenheit

For processing, the program takes the user input and calculates the conversion in 
the function called convert. It also checks if the input is an array or a single value.

Output is the calculated conversion given back and displayed to the user. Output is shown 
when the user clicks on the button.
*/

/*Note: I used some ai here to help me fix errors in my code, to understand things I didnt really understand, like mapping,
high-order functions, etc. I didn't use it to copy and paste every part of my code but rather used it as a tool to learn */


/*Here I made a function called createElement that prevents redundancy in the code. So instead of having to individually
make a const for every element, I can reduce that time using createElement which returns a tuple. The tuple helps me create all
the elements at once insted of individually making a create function for each one. Then I can issue the values I want for the constants
using the tuple. 

Note: I used some ai here because I was initially returning void but it wasnt working so I wanted to see what I was doing wrong.
It told me tuples are better
*/
const createElement = (input: string, button: string, result: string): [HTMLInputElement, HTMLButtonElement, HTMLParagraphElement] => {
    const inputCreated = document.getElementById(input) as HTMLInputElement;
    const buttonCreated = document.getElementById(button) as HTMLButtonElement;
    const resultCreated = document.getElementById(result) as HTMLParagraphElement;
    return [inputCreated, buttonCreated, resultCreated];
}

const [kgInput, kgButton, kgResult] = createElement("kg-input", "kg-button", "kg-result");
const [lbInput, lbButton, lbResult] = createElement("lb-input", "lb-button", "lb-result");
const [milesInput, milesButton, milesResult] = createElement("miles-input", "miles-button", "miles-result");
const [kilometresInput, kilometresButton, kilometresResult] = createElement("kilom-input", "kilo-button", "kilo-result");
const [celsiusInput, celsiusButton, celsiusResult] = createElement("celsius-input", "celsius-button", "celsius-result");
const [fahrenheitInput, fahrenheitButton, fahrenheitResult] = createElement("fahrenheit-input", "fahrenheit-button", "fahrenheit-result");

/*convert function is our high-order javascript function. here we can take the convertFrom cf and convertTo ct as the outer function
and a number that could be either a single value or a list of values as the inner function. Then the solve function takes a number and 
uses it to do its calculations. Once the function is done, we will check if we have a single value or an array of values : if it is an
array we will use mapping where each value in the array will undergo solve

Note: This was the trickiest part of the code so I tried writing most of the code myself. But when I ran into errors for example putting
the solve in the wrong place: bottom instead of top, or having the wrong parameters, I used ai to help me fix my errors and to help me 
understand the issue*/
const convert = (cf: string, ct: string) => {//outer
    return(num: number | number[]) => {//inner
        const solve = (n: number): number => { //got this line from chatgpt because initially i put solve below the if statement
            if(cf === "lb" && ct === "kg"){
                return n * 0.45359237; //used num before then switched to n (one of the errors ai helped me fix)
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
        //my initial error here was using n instead of num (another error ai helped me catch)
        if (typeof num === 'number'){//https://www.geeksforgeeks.org/javascript/how-to-check-if-a-value-is-a-number-in-javascript/
            return solve(num);
        } else if (num.constructor === Array){ //https://stackoverflow.com/questions/767486/how-do-i-check-if-a-variable-is-an-array-in-javascript
            return num.map((x) => solve(x)); 
        }
    };
};


/*This function checks if the input from the user is a single value or an array.
It does this by using an if condition to check for commas. If commas are found it gets split.
It then also converts the single values in the array into numbers since the input is text and also
converts the single value into a number. This will help us return the value to buttonPress as it needs 
a number, not a text, to be able to use convert */
const isArray = (input: HTMLInputElement): number[] | number=> {
    if(input.value.includes(",")){
        const myArray = input.value.split(","); //another error I initially had was using input.split instead of input.value.split (I need .value because we need to see what is inside of input. something ai helped me notice)
        const arrayConvertNumber = myArray.map((x) => Number(x));
        return arrayConvertNumber;
    }
    const inputConvertNumber = Number(input.value);;
    return inputConvertNumber;
};

/*Button press reduces redundancy by creating one function to handle all button presses instead of making
multiple button functions for each conversion. This function takes in our HTML elements and what we are converting from and to
then using the convert function as we need to get the result calculation to display to user once the button is clicked. If 
the total received back from our inner function is a single number, we use a single number, and if it is an array, we use an array 
to display*/
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

//calls our buttonPress function and gives it the necessary parameters needed to make the button work (the elements, convertingFrom and convertingTo)
buttonPress(lbButton, lbInput, lbResult, "lb", "kg");
buttonPress(kgButton, kgInput, kgResult,"kg", "lb");

buttonPress(milesButton, milesInput, milesResult, "miles", "kilometres");
buttonPress(kilometresButton, kilometresInput, kilometresResult, "kilometres", "miles");

buttonPress(celsiusButton, celsiusInput, celsiusResult, "celsius", "fahrenheit");
buttonPress(fahrenheitButton, fahrenheitInput, fahrenheitResult, "fahrenheit", "celsius");
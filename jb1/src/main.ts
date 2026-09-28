// 1. Core Conversions (Your math stays exactly the same)
const kilogramsToPounds = (kilograms: number): number => kilograms * 2.20462;
const poundsToKilograms = (pounds: number): number => pounds * 0.45359237;

const milesToKilometres = (miles: number): number => miles * 1.609344;
const kilometresToMiles = (kilometres: number): number => kilometres * 0.62137119;

const celsiusToFahrenheit = (celsius: number): number => (celsius * 9/5) + 32;
const fahrenheitToCelsius = (fahrenheit: number): number => (fahrenheit - 32) * 5/9;


// 2. Get HTML Elements
const kgInput = document.getElementById("kg-input") as HTMLInputElement;
const kgButton = document.getElementById("kg-button") as HTMLButtonElement;
const kgResult = document.getElementById("kg-result") as HTMLParagraphElement;

const lbInput = document.getElementById("lb-input") as HTMLInputElement;
const lbButton = document.getElementById("lb-button") as HTMLButtonElement;
const lbResult = document.getElementById("lb-result") as HTMLParagraphElement;

const milesInput = document.getElementById("miles-input") as HTMLInputElement;
const milesButton= document.getElementById("miles-button") as HTMLButtonElement;
const milesResult = document.getElementById("miles-result") as HTMLParagraphElement;

const kilometresInput = document.getElementById("kilo-input") as HTMLInputElement;
const kilometresButton = document.getElementById("kilo-button") as HTMLButtonElement;
const kilometresResult = document.getElementById("kilo-result") as HTMLParagraphElement;

const celsiusInput = document.getElementById("celsius-input") as HTMLInputElement;
const celsiusButton = document.getElementById("celsius-button") as HTMLButtonElement;
const celsiusResult = document.getElementById("celsius-result") as HTMLParagraphElement;

const fahrenheitInput = document.getElementById("fahrenheit-input") as HTMLInputElement;
const fahrenheitButton = document.getElementById("fahrenheit-button") as HTMLButtonElement;
const fahrenheitResult = document.getElementById("fahrenheit-result") as HTMLParagraphElement;



import { PromptAsync } from "./PromptAsync.js";
const promptAsync = new PromptAsync();
let num1, num2, num3;
let appleOrange;
num1 = await promptAsync.readNumber("Enter a number from 1 to 10", 1, 10);

num2 = await promptAsync.readNumber("Enter any number");
num3 = await promptAsync.readNumber("Enter any positive number", 1);
appleOrange = await promptAsync.readPredicate("Enter either apple or orange", "neither apple nor orange", answer => answer == 'apple' || answer == 'orange')
console.log(`num1=${num1}, num2=${num2}, num3=${num3}, appleOrange=${appleOrange}`)
promptAsync.close();

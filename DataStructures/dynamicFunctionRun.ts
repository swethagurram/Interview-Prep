import hashing from './Hashing/index.js';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const INVALID_SELECTION_ERROR = 'Invalid selection';


type HashingFunctionEntry = [string, (...args: unknown[]) => unknown]; 

const getSelectedFunction = (selection: string, hashingFunctions: HashingFunctionEntry[]): Function => {
    const index = Number(selection);
    //Validate Selection
    if (!Number.isInteger(index) || index >= hashingFunctions.length || index < 0)
        throw new TypeError(INVALID_SELECTION_ERROR);
    //Return function
    const [, hashFunction] = hashingFunctions[index];
    return hashFunction;
}

async function runFunction() {
    const rl = readline.createInterface({input, output});

    try {
        const hashingFunctions = Object.entries(hashing)
            .filter((entry): entry is HashingFunctionEntry => typeof entry[1] === 'function');

        console.log(`\nAvailable functions ::`);
        hashingFunctions.forEach(([name], index) => console.log(`\n${index}. ${name}`));

        const selection = await rl.question(`\nSelect a function to test : `);
        const hashFunction = getSelectedFunction(selection, hashingFunctions);
        
        //Run selected functions request for required inputs
        console.log(hashFunction);
    } catch(e) {
        if(e instanceof TypeError && e.message === INVALID_SELECTION_ERROR) {
            const wantToContinue = await rl.question(`\nWant to try again? Type 'YES' or anything else for no : `);
            wantToContinue.toLocaleUpperCase() === 'YES' ? await runFunction() : rl.close();
        }
    }
    rl.close();
}

runFunction();
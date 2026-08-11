import hashing from './Hashing/index.js';
import { LRUCache } from './Hashing/LRUCache.js';
import { MyHashMap } from './Hashing/CustomHash.js';
import { minWindow } from './Hashing/MinimumWindowSubstring.js';
import { isPalindrome, maxArea } from './TwoPointers/index.js';

const runFunction = () => {
    const res =  maxArea([1,8,6,2,5,4,8,3,7]);
    console.log('Result :: ', res);
}

runFunction();
/**
 * Two Sum — given an array and a target, 
 * return indices of two numbers summing to target. 
 * Aim for one pass, O(n).
 * @param {number[]} nums 
 * @param {number} target 
 */
function TwoSum(nums: number[], target: number): number[] | undefined {
    const seen = new Map(); // value -> index
    
    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      if(seen.has(complement))
        return [seen.get(complement), i];
      else
        seen.set(nums[i], i);
    }
  }
// Complexity -> time - O(n) and space - O(n)


/**
 * Contains Duplicate — return true if any value appears at least twice.
 * @param {string[]} arr
 */
function ContainsDuplicate(arr: (string | number)[]): boolean {
    const seen = new Set<string | number>();

    for(let i=0; i<arr.length; i++) {
        if(seen.has(arr[i]))
            return true;
        else
            seen.add(arr[i]);
    }

    return false;
}
// Alternate solution --> const containsDuplicate = arr => new Set(arr).size !== arr.length;
// Complexity -> time -  O(n), space -  O(n)

/**
 * Valid Anagram — determine if string t is an anagram of s.
 * @param {string} t
 * @param {string} s
 */
function ValidAnagram(t: string, s: string): boolean {
    const seen = new Map();

    for(let i=0; i<s.length; i++) {
        seen.set(s[i], (seen.get(s[i]) ?? 0) + 1);
    }
    
    for(let i=0; i<t.length; i++) {
        if(!seen.has(t[i])) return false;
        seen.get(t[i]) === 1 ? seen.delete(t[i]) : seen.set(t[i], seen.get(t[i]) - 1);
    }

    return seen.size === 0;
}
// Complexity -> Time - O(n), Space - O(k)
//Alternate Solution
// function validAnagram(s, t) {
//     if (s.length !== t.length) return false;
//     const count = new Map();
//     for (const ch of s) count.set(ch, (count.get(ch) ?? 0) + 1);
//     for (const ch of t) count.set(ch, (count.get(ch) ?? 0) - 1);
//     return [...count.values()].every(v => v === 0);
//   }

/**
 * First Unique Character — return the index of the first 
 * non-repeating character in a string.
 * @param {string} str
 */
function FirstUniqueCharacter(str: string): number {
    const seen = new Map();

    for(let i=0; i<str.length; i++) {
        const currentValue = seen.get(str[i]) ?? [i, 0];
        const count = currentValue[1] + 1;
        seen.set(str[i], [currentValue[0], count]);
    }

    for (const info of seen.values()) {
        const [firstIndex, count] = info;
        if (count === 1) return firstIndex;
    }

    return -1;
}
//Simpler one
// function firstUniqueCharacter(str) {
//     const counts = new Map();
//     for (const ch of str) counts.set(ch, (counts.get(ch) ?? 0) + 1);
    
//     for (let i = 0; i < str.length; i++) {
//       if (counts.get(str[i]) === 1) return i;
//     }
//     return -1;
//   }
// Complexity -> Time - O(n), Space -> O(n)

export default {
    TwoSum,
    ContainsDuplicate,
    ValidAnagram,
    FirstUniqueCharacter
}
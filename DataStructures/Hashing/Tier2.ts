/**
 * Group Anagrams — given an array of strings, group anagrams together.
 * @param {string[]} arr
 */
function GroupAnagrams(arr: string[]): Array<string[]> {
    const grouped = new Map();
    arr.forEach(str => {
        const groupedKey = [...str].sort().join('');
        if(!grouped.has(groupedKey)) grouped.set(groupedKey, [str]);
        else grouped.set(groupedKey, (grouped.get(groupedKey)).push(str));
    });

    return [...grouped.values()];
}
// Complexity -> time - O(n.mlogm), space = O(n.m)
// since sorting complexity is mlogm where m being length of string

/**
 * Top K Frequent Elements — given an array, return the k most frequent elements
 * @param {number[]} arr 
 * @param {number} k 
 */
function TopKFrequent(arr: number[], k: number): number[] {
    // Calculate frequency of elements
    const counts = new Map();
    arr.forEach(value => counts.set(value, (counts.get(value) ?? 0) + 1));

    // Bucket sort elements based on frequency
    const buckets: number[][] = Array.from({length: arr.length + 1}, () => []);
    [...counts.entries()].forEach(([value, count]) => buckets[count].push(value));

    // Return k most frequent elements
    const mostFrequent: number[] = [];
    while(mostFrequent.length < k && buckets.length > 0) {
        const lastBucket: number[] = buckets.pop() ?? [];
        while(lastBucket.length > 0 && mostFrequent.length < k) {
            const value = lastBucket.pop();
            if (value !== undefined) mostFrequent.push(value);
        }
    }
    return mostFrequent;
}

/**
 * Longest Substring Without Repeating Characters — sliding window + set/map.
 * @param {string} str 
 */
// function LongestSubstring(str: string): number {
//     let longestString = 0;

//     const window = new Set();
//     [...str].forEach(ch => {
//         while(ch) {
//             if(window.has(ch)) {
//                 // remove first element
//                 const oldest = window.values().next().value;
//                 window.delete(oldest!);
//             }else {
//                 // add after the last element
//                 window.add(ch);
//                 if (window.size > longestString)
//                     longestString = window.size;
//                 break;
//             }
//         }
//     });

//     return longestString;
// }
function LongestSubstring(str: string): number {
    const seen = new Map();
    let first = 0;
    let longest = 0;

    [...str].forEach((ch, index) => {
        if(seen.has(ch) && seen.get(ch) >= first)
            first = seen.get(ch) + 1;
        seen.set(ch, index);
        longest = Math.max(longest, (index - first) +1);
    })

    return longest;
}
// Complexit -> O(n)

/**
 * Subarray Sum Equals K — count the number of continuous subarrays 
 * summing to k. (Prefix sum + map pattern.) eg: subarraySum([1,1,1], 2) -> 2
 * @param {number[]} arr 
 * @param {number} k 
 */
function SubArraySum(nums: number[], k: number): number {
    const prefixCounts = new Map();
    prefixCounts.set(0, 1); // empty-prefix seed, for subarrays starting at index 0

    let runningSum = 0;
    let count = 0;

    for (const num of nums) {
        runningSum += num;

        const complement = runningSum - k;
        if (prefixCounts.has(complement)) {
            // add ALL earlier matches, not just +1
            count += prefixCounts.get(complement); 
        }

        prefixCounts.set(runningSum, (prefixCounts.get(runningSum) ?? 0) + 1);
    }

    return count;
}

/**
 * Longest Consecutive Sequence — given an unsorted array of integers, 
 * find the length of the longest consecutive elements sequence, in O(n) (no sorting allowed).
 * eg:  longestConsecutiveSequence([100, 4, 200, 1, 3, 2]) // → 4  (the sequence 1,2,3,4)
 *      longestConsecutiveSequence([0,3,7,2,5,8,4,6,0,1])  // → 9  (0,1,2,3,4,5,6,7,8)
 *  @param {number[]} nums
 */
function LongestConsecutiveSequence(nums: number[]): number {
   const numSet = new Set(nums);
   let longest = 0;
   
   for(const num of numSet) {
        if(!numSet.has(num - 1)) {
            let length = 1;
            let current = num;
            while(numSet.has(current + 1)) {
                current++;
                length++;
            }
            longest = Math.max(longest, length);
        }
   }
   return longest
}



export default {
    GroupAnagrams,
    TopKFrequent,
    LongestSubstring,
    SubArraySum,
    LongestConsecutiveSequence
}
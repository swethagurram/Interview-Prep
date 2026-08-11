import { DListNode, DoublyLinkedList } from './DoublyLinkedList.js';

/**
 * Minimum Window Substring — find the smallest window in a string containing 
 * all characters of another string. Sliding window + frequency map
 * @param s 
 * @param t 
 * @returns 
 */
export function minWindow(s: string, t: string): string {
    const need = new Map();
    for (const ch of t) need.set(ch, (need.get(ch) ?? 0) + 1);
  
    const window = new Map();
    let have = 0;
    const needCount = need.size;
  
    let left = 0;
    let bestLen = Infinity;
    let bestStart = 0;
  
    for (let right = 0; right < s.length; right++) {
      // 1. add s[right] into window
      const windowChCount = (window.get(s[right]) ?? 0) + 1;
      window.set(s[right], windowChCount);
  
      // 2. did this character just satisfy a requirement?
      if (need.has(s[right]) && need.get(s[right]) === windowChCount)
        have++;
  
      while (have === needCount) {
        // 3. record if this is the smallest valid window so far
        const currLen = right - left + 1;
        if (currLen < bestLen) {
          bestLen = currLen;
          bestStart = left;
        }
  
        // 4a. check BEFORE decrementing: does removing s[left] break a requirement?
        if (need.has(s[left]) && window.get(s[left]) === need.get(s[left])) {
          have--;
        }
        // 4b. now actually decrement window's count for s[left]
        window.set(s[left], window.get(s[left]) - 1);
  
        left++;
      }
    }
  
    return bestLen === Infinity ? "" : s.slice(bestStart, bestStart + bestLen);
}
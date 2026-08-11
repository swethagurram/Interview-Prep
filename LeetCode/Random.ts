/*
 * Longest Substring Without Repeating Characters
 */
function longestUniqueSubstring(str: string): string {
    let left = 0;
    let maxLen = 0;
    let maxStart = 0; // so you can slice the answer at the end
    const lastSeenIndex = new Map<string, number>();

    for (let right = 0; right < str.length; right++) {
        const ch = str[right];
        if (lastSeenIndex.has(ch) && lastSeenIndex.get(ch)! >= left) {
            left = lastSeenIndex.get(ch)! + 1;   // jump left forward, don't delete char by char
        }
        lastSeenIndex.set(ch, right);
        if (right - left + 1 > maxLen) {
            maxLen = right - left + 1;
            maxStart = left;
        }
    }
    return str.substring(maxStart, maxLen + maxStart);
}

/**
 * Definition for singly-linked list.
**/
  class ListNode {
      val: number
      next: ListNode | null
      constructor(val?: number, next?: ListNode | null) {
          this.val = (val===undefined ? 0 : val)
          this.next = (next===undefined ? null : next)
    }
 }

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    if(!l1) return l2;
    if(!l2) return l1;

    const sum = new ListNode();

    let cur1: ListNode | null = l1;
    let cur2: ListNode | null = l2;
    let sumCur = sum;
    let carry = 0;

    while(cur1 || cur2 || carry > 0) {
        const digitSum = (cur1?.val ?? 0) + (cur2?.val ?? 0) + carry;

        sumCur.val = digitSum % 10;
        carry =  Math.floor(digitSum/10);
        
        sumCur.next = new ListNode();
        sumCur = sumCur.next;
        cur1 = cur1?.next ?? null;
        cur2 = cur2?.next ?? null;
    }
    
    return sum;
};

function groupAnagrams(strs: string[]): string[][] {
    const buckets = new Map<string, string[]>();

    strs.forEach(str => {
        const sorted = [...str]
            .sort()
            .join('');
        if(buckets.has(sorted)) {
            const bucket = buckets.get(sorted) || [];
            bucket.push(str);
            buckets.set(sorted, bucket);
        } else {
            buckets.set(sorted, [str]);
        }
    });

    return [...buckets.values()];
};

function longestPalindrome(s: string): string {
    let center = Math.round((s.length -1) / 2);
    let left = (center - 1) < 0 ? 0 : (center - 1);
    let right = center + 1;
    let longest: string = s[center];

    while(left > 0 && right < s.length) {
        if(s[left] !== s[right])
            break;
        const subs = s.substring(left, right+1);
        if(longest.length < subs.length)    longest = subs;
        left--;
        right++;
    }

    const leftLongest = longestPalindrome(s.substring(0,center));
    const rightLongest = longestPalindrome(s.substring(center, s.length-1));

    return [longest, leftLongest, rightLongest].reduce(
        (s, res) => s.length > res.length ? s : res, "");
};

// Todo :: Not resolved yet.
function isMatch(s: string, p: string): boolean {
    const getPreceeding = (curIndex: number, pattern: string): string => {
        for(let j = curIndex-1; j >= 0; j--) {
            if(str[j] !== '*' || str[j] === '.')
                return str[j];
        }
        return '.';
    }

    for(let i=0; i<s.length; i++) {
        const sElement = s[i] === '*' ? getPreceeding(i, s) : s[i];
        const pElement = p[i] === '*' ? getPreceeding(i, p) : p[i];
        if(sElement !== '.' && pElement !== '.' && sElement !== pElement)
            return false;
    }
    return true;
};

const res = isMatch("aa", "a*");
console.log(res);
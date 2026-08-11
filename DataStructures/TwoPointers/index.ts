/**
 * Valid Palindrome
 * @param s 
 * @returns 
 */
export function isPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;

    while(left < right) {
        if(!isAlphaNumeric(s[left])) {
            left++;
            continue;
        } 

        if(!isAlphaNumeric(s[right])) {
            right--;
            continue;
        }

        if(s[left].toLowerCase() !== s[right].toLowerCase())
            return false;

        left++;
        right--;
    }

    return true;
}

function isAlphaNumeric(ch: string = ''): boolean {
    return (ch.toLowerCase() >= 'a' && ch.toLowerCase() <= 'z') || (ch >= '0' && ch <= '9');
}

/**
 * Container With Most Water
 * @param arr 
 * @returns 
 *  Eg: maxArea([1,8,6,2,5,4,8,3,7]) // → 49
 */
export function maxArea(heights: number[]): number {
    let left = 0;
    let right = heights.length - 1;
    let maxArea = 0;

    while(left < right) {
        const currArea = Math.min(heights[left], heights[right]) * (right-left); 
        if(currArea > maxArea)
            maxArea = currArea;

        //move left pointer or right to find max hight while bucket gets narrower
        if(heights[left] < heights[right])
            left++;
        else
            right--;
    }

    return maxArea;
}
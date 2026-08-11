function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    const merged = [...nums1, ...nums2];
    const medianIndex = (merged.length - 1)/2;
    //sort merged;
    const sorted = merged.sort(); // not working, has a different solution.
    console.log(`merged`, merged);
    console.log(sorted);

    if(Number.isInteger(medianIndex))
        return sorted[medianIndex];
    
    const roundedIndex = Math.floor(medianIndex);
    const meridian = (sorted[roundedIndex] + sorted[roundedIndex + 1])/2;
    return meridian;
};


function main() {
    const input1 = [1,2,3,4,5];
    const input2 = [6,7,8,9,10,11,12,13,14,15,16,17];

    const result = findMedianSortedArrays(input1, input2);
    console.log(`Result :: `, result);
}

main();
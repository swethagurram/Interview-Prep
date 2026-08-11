export class MyHashMap {
    bucketCount: number;
    buckets: Array<Array<{key: string, value: any}>>;

    constructor(bucketCount = 16) {
      this.bucketCount = bucketCount;
      this.buckets = new Array(bucketCount).fill(null).map(() => []);
    }
  
    hash(key: string) {
      // your code here — turn `key` into an index in [0, bucketCount)
      let hash = 0;
      [...key].forEach((ch, i) => {
        hash = (hash + ch.charCodeAt(0) * (i+1)) % this.bucketCount;
      })
      return hash;
    }

    set(key: string, value: any) {
        const currBucket = this.buckets[this.hash(key)];
        for(let i=0; i<currBucket.length; i++) {
            if(currBucket[i].key === key) {
                currBucket[i].value = value;
                return;
            }
        }
        currBucket.push({ key, value });
    }

    get(key: string) {
        const currBucket = this.buckets[this.hash(key)];
        for(let i=0; i<currBucket.length; i++){
            if(currBucket[i].key === key)
                return currBucket[i].value;
        };
        return -1;
    }

    remove(key: string) {
        const currBucket = this.buckets[this.hash(key)];
        const newBucket = [];
        for(let i=0; i<currBucket.length; i++){
            if(currBucket[i].key !== key)
                newBucket.push(currBucket[i]);
        };
        this.buckets[this.hash(key)] = newBucket;
    }
  }
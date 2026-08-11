import { DListNode, DoublyLinkedList } from './DoublyLinkedList.js';

export class LRUCache {
    cacheMap;
    cache;
    cacheSize = 0;

    constructor(size: number) {
        this.cacheMap = new Map<string, DListNode>();
        this.cache = new DoublyLinkedList();
        this.cacheSize = size;
    }

    get(key: any): any {
        if(!this.cacheMap.has(key)) 
            return -1;
        const currNode = this.cacheMap.get(key) as DListNode;
        this.cache.moveToHead(currNode);
        return currNode.value;
    }

    put(key: any, value: any) {
        // If key exists
        if(this.cacheMap.has(key)) {
            const currNode = this.cacheMap.get(key) as DListNode;
            currNode.value = value;
            this.cache.moveToHead(currNode);
        } else {
            // If cache reached limit, remove least called key
            if(this.cacheMap.size >= this.cacheSize) {
                const lastNode = this.cache.tail.prev as DListNode;
                this.cache.removeNode(lastNode);
                this.cacheMap.delete(key);
            }
            // Add the new value
            this.cache.addToHead(key);
            const currNode = this.cache.head.next as DListNode;
            this.cacheMap.set(key, currNode);
        }
    }
}
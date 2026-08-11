export class DListNode {
    // key: any;
    value: any;
    prev: DListNode|null;
    next: DListNode|null;

    // constructor(key: any = undefined, value: any = undefined){
    constructor(value: any = undefined){
        // this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

export class DoublyLinkedList {
    head: DListNode;
    tail: DListNode;

    constructor() {
      // set up sentinel head/tail here
      const headNode = new DListNode();
      const tailNode = new DListNode();
      headNode.next = tailNode;
      tailNode.prev = headNode;
      this.head = headNode;
      this.tail = tailNode;
    }

    /* Add after sentinal head */
    // addToHead(key: any, value: any) { 
    addToHead(value: any) { 
        /* insert new node right after sentinel head */ 
        // let newNode = new DListNode(key = null, value);
        let newNode = new DListNode(value);
        let temp = this.head.next;
        this.head.next = newNode;
        newNode.prev = this.head;
        if(temp) {
            newNode.next = temp;
            temp.prev = newNode;
        }
    }

    /* Add before sentinal tail */
    addToTail(value: any) {
        let newNode = new DListNode(value);
        let temp = this.tail.prev;
        if(temp !== null) {
            temp.next = newNode;
            newNode.prev = temp;
        }
        newNode.next = this.tail;
        this.tail.prev = newNode;
    }

    /* remove a given node from wherever it sits */
    removeNode(node: DListNode) {  
        let curr: DListNode | null = node.prev;
        let next: DListNode | null = node.next;
        if(curr) curr.next = next;
        if(next) next.prev = curr;
    }


    /* remove node from current position, reinsert right after sentinel head */ 
    moveToHead(node: DListNode) { 
        //Remove node from current position
        let curr = node.next;
        let prev = node.prev;
        if(prev) prev.next = curr;
        if(curr) curr.prev = prev;

        // Insert after head
        let temp = this.head.next;
        this.head.next = node;
        node.prev = this.head;
        if(temp) {
            node.next = temp;
            temp.prev = node;
        }
    }

    toArray() {
        let curr = this.head.next;
        let arr = [];
        while(curr != null && curr != this.tail) {
            arr.push(curr.value);
            curr = curr.next;
        }
        return arr;
    }
  }
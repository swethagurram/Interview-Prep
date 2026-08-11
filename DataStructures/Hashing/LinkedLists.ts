class ListNode {
    value: any;
    next: ListNode | null;

    constructor(value: any, next = null) {
      this.value = value;
      this.next = next;
    }
}

// Helper function to convert linkedlist to array
function listToArray(head: ListNode | null): Array<any> {
    const result = [];
    let curr = head;
    while(curr && curr.next) {
        result.push(curr.value);
        curr = curr.next;
    }
    if(curr) result.push(curr.value);
    return result;
}

function createLinkedList (arr: Array<any>): ListNode | null {
    let head: ListNode | null = null;
    arr.forEach(el => {
        const node = new ListNode(el);
        if(head === null) {
            head = node;
        } else {
            let curr = head;
            while(curr.next)
                curr = curr.next;
            curr.next = node;
        }
    });
    return head;
}


/**
 * Reverse a Linked List 
 */
function reverseLinkedList(head:ListNode | null): ListNode | null {
    let curr = head;
    let prev = null;

    while(curr != null) {
        let temp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = temp; 
    }
    return prev;
}

function testReverseLinkedList (arr: Array<any>) {
    const linkedlist = createLinkedList(arr);
    console.log(`Linked List :: `, listToArray(linkedlist));

    const reverselist = reverseLinkedList(linkedlist);
    console.log(`Reverse Linked List :: `, listToArray(reverselist));
}


export default {
    testReverseLinkedList
}
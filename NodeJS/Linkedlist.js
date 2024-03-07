class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    insertAtEnd(data) {
        const node = new Node(data);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            const lastNode = this.tail;
            node.prev = lastNode;
            lastNode.next = node;
            this.tail = node;
        }
        return node;
    }

    insertInBegin(data) {
        const node = new Node(data);
        if (!this.head) {
            this.head = node;
        } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
        return node;
    }

    deleteNode(node) {
        if (node.prev) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }
    }

    size() {
        let count = 0;
        let current = this.head;
        while (current) {
            count++;
            current = current.next;
        }
        return count;
    }

    static fromArray(array) {
        const linkedList = new LinkedList();
        for (const item of array) {
            linkedList.insertAtEnd(item);
        }
        return linkedList;
    }
}

function PrintAllQueue(llQueue) {
    let currentNode = llQueue.head;
    const llQPrint = [];
    while (currentNode !== null) {
        llQPrint.push(currentNode.data);
        currentNode = currentNode.next;
    }
    return llQPrint.join(", ");
}

module.exports = { Node, LinkedList, PrintAllQueue };

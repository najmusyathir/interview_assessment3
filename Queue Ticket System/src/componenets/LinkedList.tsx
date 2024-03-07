
class Node<T>{
  public next: Node<T> | null = null;
  public prev: Node<T> | null = null;
  constructor(public data: T) { }
}

interface ILinkedList<T> {
  insertInBegin(data: T): Node<T>;
  insertAtEnd(data: T): Node<T>;
  deleteNode(node: Node<T>): void;
  size(): number;
}

export default class LinkedList<T> implements ILinkedList<T> {
  public head: Node<T> | null = null;
  public tail: Node<T> | null = null;
  
  public insertAtEnd(data: T): Node<T> {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      const lastNode = this.tail!;
      node.prev = lastNode;
      lastNode.next = node;
      this.tail = node; 
    }
    return node;
  }

  insertInBegin(data: T): Node<T> {
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

  deleteNode(node: Node<T>): void {
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

  size(): number {
    let count = 0;
    let current = this.head;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }

  static fromArray<T>(array: T[]): LinkedList<T> {
    const linkedList = new LinkedList<T>();
    for (const item of array) {
      linkedList.insertAtEnd(item);
    }
    return linkedList;
  }
}

//Change from LinkedList to array
export function PrintAllQueue(llQueue) {
  let currentNode = llQueue.head;
  const llQPrint: string[] = [];
  while (currentNode !== null) {
    llQPrint.push(currentNode.data);
    currentNode = currentNode.next;
  }
  return llQPrint.join(", ");
}

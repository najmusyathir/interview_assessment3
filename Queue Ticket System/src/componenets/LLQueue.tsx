import LinkedList, { PrintAllQueue } from "./LinkedList";

export default function LLQueue() {

    const llQueue = LinkedList.fromArray(["Cust1", "Cust2", "Cust3"]);

    //Initial Queue
    const initialQueue = PrintAllQueue(llQueue);

    //Add new cust to the queue
    llQueue.insertAtEnd("Cust4");
    const firstIn = PrintAllQueue(llQueue);

    //Remove 1st cust from the queue
    const firstNode = llQueue.head!;
    llQueue.deleteNode(firstNode);
    const firstOut = PrintAllQueue(llQueue);

    //Queue Size
    let llQueueSize = 0;
    while (llQueue.head !== null) {
        llQueue.deleteNode(llQueue.head);
        llQueueSize++;
    }

    return (
        <div>
            <h2>Queue Function</h2>
            <strong>Initial queue:</strong> {initialQueue}<br />
            <br />
            <strong>Enqueued:</strong> {firstIn}<br /> #Cust4 enter the queue
            <br /><br />
            <strong>Dequeued:</strong> {firstOut}<br /> #Cust1 leave the queue
            <br /><br />
            <strong>LinkedList Queue Size:</strong> {llQueueSize}<br />
            <br /><br />
        </div>
    )
}


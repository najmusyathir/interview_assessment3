import LinkedList, { PrintAllQueue } from "./LinkedList";

export default function LLStack() {
    const llStack = LinkedList.fromArray(["Coin1", "Coin2", "Coin3"]);

    //Initial Stack
    const initialStack = PrintAllQueue(llStack);

    //Add new cust to the stack
    llStack.insertAtEnd("Coin4");
    const firstIn = PrintAllQueue(llStack);

    //Remove 1st cust from the queue
    const firstNode = llStack.tail!;
    llStack.deleteNode(firstNode);
    const firstOut = PrintAllQueue(llStack);

    //Queue Size
    let llStackSize = 0;
    while (llStack.head !== null) {
        llStack.deleteNode(llStack.head);
        llStackSize++;
    }


    return (
        <div>
            <h2>Stack Function</h2>
            <strong>Initial stack:</strong> {initialStack}<br />
            <br />
            <strong>Insert:</strong> {firstIn}<br /> #Coin4 enter the stack
            <br /><br />
            <strong>Remove:</strong> {firstOut}<br />  #Coin4 leave the stack
            <br /><br />
            <strong>LinkedList Stack Size:</strong> {llStackSize}<br /> 
            <br /><br />
        </div>
    )
}
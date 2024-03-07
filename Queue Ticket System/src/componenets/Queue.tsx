export default function Queue() {
    const queue: string[] = ['Cust1', 'Cust2', 'Cust3'];

    //Add new data to the queue
    const enqueued = queue.slice();
    enqueued.push('Cust4');

    //Add new data to the queue
    const dequeued = enqueued.slice();
    dequeued.shift();

    return (
        <div>
            <h2>Queue Function</h2>
            <strong>Initial queue:</strong> {queue.join(', ')}<br />
            <br />
            <strong>Enqueued:</strong> {enqueued.join(', ')}<br /> #Cust4 enter the queue
            <br /> <br />
            <strong>Dequeued:</strong> {dequeued.join(', ')}<br /> #Cust1 leave the queue
            <br /> <br />
            <strong>Queue Size:</strong> {queue.length}<br />
            <br /> <br />
        </div>
    )
}

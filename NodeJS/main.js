const { Node, LinkedList, PrintAllQueue } = require('./Linkedlist');
const express = require('express');
const app = express();
app.use(express.json());

const { sendWebSocketMessage } = require('./WebSocket');

/**
 * @swagger
 * /:
 *   get:
 *     summary: return welcoming message
 *     tags: [Welcome]
 *     responses:
 *       200:
 *         description: receive Response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example:
*/
app.get('/', (req, res) => {
    res.send("Welcome to my API");
    console.log("mainpage");
});


/////////////////////////////////////
//Start codes
let queue = new LinkedList(0);
let highestQueue = 1;
let counters = new Array(4).fill(null).map(() => LinkedList.fromArray([]));
let counterStatus = [false,false,false,false];

//Get the queue
/**
 * @swagger
 * /queue:
 *   get:
 *     summary: printQueues
 *     tags: [QueueSystem]
 *     responses:
 *       200:
 *         description: receive Response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example:
 */
app.get('/queue', (req, res) => {
    const llQPrint = [];
    let currentNode = queue.head;
    while (currentNode !== null) {
        llQPrint.push(currentNode.data);
        currentNode = currentNode.next;
    }

    res.json({ queue: llQPrint, status: counterStatus });
});

/**
 * @swagger
 * /insertQueue:
 *   post:
 *     summary: AddQueue
 *     tags: [QueueSystem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *                 example: "addQueue"
 *     responses:
 *       200:
 *         description: receive Response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Add Queue Successful"
 */
app.post('/insertQueue', (req, res) => {
    const data = req.body;
    const action = data.action;

    if (!action || action !== "addQueue") {
        console.log(req.body);
        return res.status(400).send("Bad Request");
    }

    if (queue.tail !== null) {
        highestQueue = queue.tail.data + 1;
    }
    queue.insertAtEnd(highestQueue);
    console.log("Added Ticket: " + queue.tail.data);
    highestQueue = highestQueue + 1;

    sendWebSocketMessage({ action: "loadQueue" });

    res.send("Add Queue Successful")
});

//Get the queue in counters
/**
 * @swagger
 * /counterQueue:
 *   get:
 *     summary: print queues in Counter
 *     tags: [Counter System]
 *     responses:
 *       200:
 *         description: receive Response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example:   
 */
app.get('/counterQueue', (req, res) => {
    let allCountersQueue = [];

    for (let i = 0; i < 4; i++) {
        if (counters[i].head) {
            allCountersQueue.push(counters[i].head.data)
        } else {
            allCountersQueue.push(0)
        }
    }
    console.log(allCountersQueue);
    res.json(allCountersQueue);
});

//Get the queue in counters
/**
 * @swagger
 * /counterStatus:
 *   get:
 *     summary: print status of Counter
 *     tags: [Counter System]
 *     responses:
 *       200:
 *         description: receive Response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example:   
 */
app.get('/counterStatus', (req, res) => {
    sendWebSocketMessage({ action: "loadQueue" });
    console.log(counterStatus);
    res.json(counterStatus);
});

/**
 * @swagger
 * /insertQueueInCounter:
 *   post:
 *     summary: AddQueue
 *     tags: [Counter System]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string,
 *                 example: "addQueuetoCounter"
 *               counter:
 *                 type: integer,
 *                 example: 1
 *     responses:
 *       200:
 *         description: receive Response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Add Queue Successful"
 */
app.post('/insertQueueInCounter', (req, res) => {
    const data = req.body;
    const action = data.action;
    const targetCounter = data.counter;

    if (!action || action !== "addQueuetoCounter" || targetCounter < 0 || targetCounter > 3) {
        return res.status(400).send("Bad Request");
    }
    if (queue.head) {
        if (!counters[targetCounter].head) {
            counters[targetCounter].insertAtEnd(queue.head.data);
            queue.deleteNode(queue.head);

            console.log("Counter: " + targetCounter + "; Ticket: " + counters[targetCounter].head.data);

            sendWebSocketMessage({ action: "loadQueue" });

            res.send("Added Queue to Counter: " + targetCounter + "; Ticket: " + counters[targetCounter].head.data)
        }
        else {
            console.log("Counter " + targetCounter + " is currently unavailable.");
            res.send("Counter " + targetCounter + " is currently unavailable.");
        }
    }
    else {
        console.log("No tickets in the waiting queue");
        res.send("No tickets in the waiting queue");
    }
});

/**
* @swagger
* /removeQueueFromCounter:
*   post:
*     summary: AddQueue
*     tags: [Counter System]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               action:
*                 type: string,
*                 example: "removeQueuetoCounter"
*               counter:
*                 type: integer,
*                 example: 1
*     responses:
*       200:
*         description: receive Response
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: " Counter 1 completely served previous cust."
*/
app.post('/removeQueueFromCounter', (req, res) => {
    const data = req.body;
    const action = data.action;
    const targetCounter = data.counter;

    if (!action || action !== "removeQueuetoCounter" || targetCounter < 0 || targetCounter > 3) {
        return res.status(400).send("Bad Request");
    }

    if (counters[targetCounter].head) {

        counters[targetCounter].deleteNode(counters[targetCounter].head);

        sendWebSocketMessage({ action: "loadQueue" });

        console.log('Counter ' + targetCounter + ' completely served previous cust.');
        res.send('Counter ' + targetCounter + ' completely served previous cust.')
    }
    else {
        console.log('Counter ' + targetCounter + ' already available.');
        res.send("Counter " + targetCounter + " already available.");
    }
});

/**
* @swagger
* /counterActiveStatus:
*   post:
*     summary: Toggle counterActve Status
*     tags: [Counter System]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               action:
*                 type: string,
*                 example: "toogleActiveCounter"
*               counterNo:
*                 type: number,
*                 example: 0
*               status:
*                 type: boolean,
*                 example: true
*     responses:
*       200:
*         description: receive Response
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: "Counter 0 is temporarily closed"
*/
app.post('/counterActiveStatus', (req, res) => {
    const data = req.body;
    const action = data.action;
    const counterNo = data.counterNo;

    if (!action || action !== "toogleActiveCounter") {
        return res.status(400).send("Bad Request");
    }

    if (data.status == true){
        counterStatus[counterNo]  = false;
        console.log("Counter " + counterNo + " is temporarily closed");
        res.send("Counter " + counterNo + " is temporarily closed");
    }
    else{
        counterStatus[counterNo]  = true;
        console.log("Counter " + counterNo + " is online.");
        res.send("Counter " + counterNo + " is online.");
    }

});

//End codes
////////////////////

module.exports = app;

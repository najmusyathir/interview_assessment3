import Counters from "../componenets/CounterDisplay"
import './css/CustView.css'
import { useState, useEffect } from "react";
//import { WebSocketMessage } from '../componenets/WebSocket';

export default function CustView() {

    const [queue, setQueue] = useState<number[]>([]);
    const [counterQueue, setCounterQueue] = useState<number[]>([]);
    const [counterStatus, setCounterStatus] =     useState<boolean[]>([false, false, false, false]);
    
    const [isAutoRefresh, setIsAutoRefresh] = useState(true);

    const nodeJS = "https://nodejs-queue-system.onrender.com/";

    async function fetchQueue(): Promise<void> {
        try {
            const response = await fetch(`${nodeJS}queue`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setQueue(data.queue);

        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    async function fetchCounterQueue(): Promise<void> {
        try {
            const response = await fetch(`${nodeJS}counterQueue`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setCounterQueue(data);
            SetBusy(data);
        }
        catch (error) {
            console.error("Fetch error:", error);
        }
    }

    async function fetchCounterStatus(): Promise<void> {
        try {
            const response = await fetch(`${nodeJS}counterStatus`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const status = await response.json();
            setCounterStatus(status);
        }
        catch (error) {
            console.error("Fetch error:", error);
        }
    }

    async function AddQueue() {
        try {
            const response = await window.fetch(`${nodeJS}insertQueue`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    "action": "addQueue"
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    function SetBusy(data: number[]) {
        for (let i = 0; i < 4; i++) {
            const counterNum = i + 1;
            const statusButton = document.getElementById(`counterStatus${counterNum}`)
            if (statusButton) {
                if (data[i] == 0) {
                    statusButton.style.backgroundColor = '#0f0';
                }
                else {
                    statusButton.style.backgroundColor = '#f00';
                }
            }
        }
    }

    function SetOffline(status: boolean[]) {
        for (let i = 0; i < 4; i++) {
            const counterNum = i + 1;
            const statusButton = document.getElementById(`closeCounterDiv${counterNum}`)
            if (statusButton) {
                if (status[i] == true) {
                    statusButton.style.display = 'flex';
                }
                else {
                    statusButton.style.display = 'none';
                }
            }
        }
    }

    async function LoadAllData() {
        await fetchQueue();
        await fetchCounterQueue();
        await fetchCounterStatus();
    }

    //Initialize the active counter
    useEffect(() => {
        async function fetchInitialCounterStatus() {
            await fetchCounterStatus();
        }
        fetchInitialCounterStatus();
    }, []);

    //open websocket - Canceled
    // useEffect(() => {
    //     const socket = new WebSocket('ws://localhost:8080');
    //     socket.onopen = () => {
    //     };
    //     socket.onmessage = (event) => {
    //         const message: WebSocketMessage = JSON.parse(event.data);

    //         if (message.action === 'loadQueue') LoadAllData();

    //     };
    //     return () => {
    //         socket.close();
    //     };
    // },);



    //Toggle function to enable/disable autorefresh
    
    useEffect(() => {
        let intervalId;

        if (isAutoRefresh) {
            intervalId = setInterval(() => {
                LoadAllData();
            }, 1500);
        }
        return () => clearInterval(intervalId);
    }
    , [isAutoRefresh]);

    const handleToggleAutoRefresh = () => {
        setIsAutoRefresh(!isAutoRefresh); //setOpposite
    };
    
    //update counter status on UI after array overridden
    useEffect(() => {
        SetOffline(counterStatus);
    }, [counterStatus]);

    return (<div>
        <h1>Customer View</h1>
        <button onClick={handleToggleAutoRefresh}>
            {isAutoRefresh ? 'Pause Auto Refresh' : 'Start Auto Refresh'}
        </button>
        <div className="cust-view">
            <div className="main-panel">
                Now Serving:<br />
                <strong>{(queue[0] || 1) - 1}</strong><br /><br />
                Last Number: {queue[queue.length - 1]}<br /><br />
                <button onClick={AddQueue}>
                    Take a Number
                </button>
            </div>

            <div className="counters">
                <Counters
                    counterNo="1"
                    currentServe={counterQueue[0]} />
                <Counters
                    counterNo="2"
                    currentServe={counterQueue[1]} />
                <Counters
                    counterNo="3"
                    currentServe={counterQueue[2]} />
                <Counters
                    counterNo="4"
                    currentServe={counterQueue[3]} />

            </div>
        </div>

    </div>)
}

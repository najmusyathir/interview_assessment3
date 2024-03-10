import './css/CounterDisplay.css'
import { useState } from 'react';

export default function CounterManager({ counterNo = 0 }) {

    const nodeJS = "https://nodejs-queue-system.onrender.com/"; 
    
    const [statusDisplay, setStatusDisplay] = useState("Close Counter");
    const [counterStatus, setCounterStatus] = useState<boolean[]>([false, false, false, false]);

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

    async function ToggleCounterStatus() {

        try {
            const response = await window.fetch(`${nodeJS}counterActiveStatus`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    "action": "toogleActiveCounter",
                    "counterNo": counterNo,
                    "status": counterStatus[counterNo]
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            fetchCounterStatus();

            if (counterStatus[counterNo]==true) setStatusDisplay("Close Counter");
            else setStatusDisplay("Open Counter");


        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    async function AddQueuetoCounter() {
        try {
            const response = await window.fetch(`${nodeJS}insertQueueInCounter`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    "action": "addQueuetoCounter",
                    "counter": counterNo
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    async function CompleteServe() {
        try {
            const response = await window.fetch(`${nodeJS}removeQueueFromCounter`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    "action": "removeQueuetoCounter",
                    "counter": counterNo
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    return (
        <div className="counter">
            <h2>Counter{counterNo + 1}</h2>
            <button onClick={ToggleCounterStatus} >{statusDisplay}</button>
            <button onClick={CompleteServe}>Complete Current</button>
            <button onClick={AddQueuetoCounter}>Call Next</button>
        </div>
    )
}
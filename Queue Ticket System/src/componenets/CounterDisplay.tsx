import './css/CounterDisplay.css'

export default function CounterDisplay({ counterNo = "", currentServe = 0 }) {


    return (
        <div className="counter" >
            <h2>
                Counter {counterNo}
            </h2>
            <h3>Currently Serve: {currentServe}</h3>
            <div className='status' id={`counterStatus${counterNo}`}>
            </div>
            <div className='closeCounterDiv' id={`closeCounterDiv${counterNo}`}>
                <h2>
                    Counter {counterNo}
                </h2>
                <h3>is temporarily closed.</h3>
            </div>
        </div>
    )
}
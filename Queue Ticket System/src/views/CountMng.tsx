import CounterManager from "../componenets/CounterManager"

export default function CounterManagement() {

    
    return (<div>
        <h1>Counter Management</h1>
        <div className="counters">
            <CounterManager counterNo={0} />
            <CounterManager counterNo={1} />
            <CounterManager counterNo={2} />
            <CounterManager counterNo={3} />
        </div>
    </div>)
}
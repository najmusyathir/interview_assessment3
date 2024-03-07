
export default function Stack() {

    const stack: string[] = ['Coin1', 'Coin2', 'Coin3'];

    //Add new data to the stack
    const enstacked = stack.slice();
    enstacked.push('Coin4');

    //Remove last data from the stack
    const destacked = enstacked.slice();
    destacked.pop();

    return (
        <div>
            <h2>Stack Function</h2>
            <strong>Initial stack:</strong> {stack.join(', ')}<br/> 
            <br />
            <strong>Insert:</strong> {enstacked.join(', ')}<br/> #Coin4 enter the stack
            <br /> <br />
            <strong>Remove:</strong> {destacked.join(', ')}<br/> #Coin4 leave the stack
            <br /> <br />
            <strong>Stack Size:</strong> {stack.length}<br />
            <br /> <br />

        </div>
    )
}

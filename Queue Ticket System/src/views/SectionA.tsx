import './css/SectionA.css'

import Queue from "../componenets/Queue";
import Stack from "../componenets/Stack";
import LLQueue from '../componenets/LLQueue';
import LLStack from '../componenets/LLStack';

export default function SectionA() {

    return (
        <div>
            <h1>Section A</h1>
            <h2>Question a. Using Array</h2>
            <div className="container">
                <Queue />
                <Stack />
            </div>
            <h2>Question b. Using LinkedList</h2>
            <div className="container">
                <LLQueue />
                <LLStack />
            </div>
        </div>
    )
}



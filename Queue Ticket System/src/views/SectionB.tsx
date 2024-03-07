import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './css/App.css';

import CounterManagement from "./CountMng";
import CustView from "./CustView";

const SectionB = () => {
    return (

        <Router>
            <div>
                <h1>Section B</h1>
                <div className='navbutton'>
                    <nav>
                        <button>
                            <Link to="/custView">Customer View</Link>
                        </button>
                        <button>
                            <Link to="/counterMng">Counter Manager</Link>
                        </button>
                    </nav>
                </div>

                <Routes>
                    <Route path="/custView" element={<CustView />} />
                    <Route path="/counterMng" element={<CounterManagement />} />
                </Routes>
            </div>
        </Router>
    )
}

export default SectionB;



import { FaRegCheckCircle } from 'react-icons/fa';
import  CrewTable from '../components/reUsable/crewTable';

function Crew() {
    return(
        <div className="container">
           <CrewTable />
            <div className="row">
                <div className="d-flex ">
                    <button type="button" className="btn btn-success"><FaRegCheckCircle /> Success</button>
                </div>
            </div>
        </div>
    )
}

export default Crew;
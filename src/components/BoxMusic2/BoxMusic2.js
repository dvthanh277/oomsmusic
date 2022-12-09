import { Link } from 'react-router-dom';
import './BoxMusic2.scss'

function BoxMusic2({ props }) {
    return (
        <Link to={props.link} state={props.encodeId} className="ooms-boxMusic2a">
            <div className="ooms-boxMusic2">
                <div className="box-image">
                    <img src={props.thumbnailM} alt={props.title}></img>
                </div>
                <div className='box-title-wrapper'>
                    <p className="box-title">{props.title}</p>
                    <p className="box-description">{props.sortDescription}</p>
                </div>

            </div>
        </Link>
    );
}

export default BoxMusic2;
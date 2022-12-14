import { Link } from 'react-router-dom';
import './BoxMusic.scss'

function BoxMusic({ props }) {
    return (
        <div className="ooms-boxMusic">
            <div className="box-image">
                <Link to={props.link} state={props.encodeId}><img src={props.thumbnailM} alt={props.title}></img>
                </Link>
            </div>
            <Link to={props.link} state={props.encodeId}><p className="box-title">{props.title}</p></Link>
            <p className="box-description">{props.sortDescription || props.releaseDate}</p>
        </div>
    );
}

export default BoxMusic;
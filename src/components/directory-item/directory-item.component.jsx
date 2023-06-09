import { Link } from 'react-router-dom';
import './directory-item.styles.scss';

const DirectoryItem = ({ category }) => {
    const { id, title, imageUrl } = category;
    return (
        <Link to={`/shop/${title}`} key={id} className="directory-item-container">
            <div className="background-image" style={{
                backgroundImage: `url(${imageUrl})`,
            }} />
            <div className="directory-body-container">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </Link>
    )
};

export default DirectoryItem;
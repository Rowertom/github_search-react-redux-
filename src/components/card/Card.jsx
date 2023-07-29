import { useState } from 'react';
import './style.scss';
import { Modal } from '../modal/Modal';

export const Card = ({ item }) => {
    const [activeModal, setActiveModal] = useState(false);

    const handleClick = (e) => {
        setActiveModal(true)
    }

    return (
        <div className="card" onClick={handleClick}>
            <div className="card__img">
                <img src={item.avatar_url} alt="picture" className='card__img__ava' />
            </div>
            <span className="card__name">{item.login}</span>
            {activeModal &&
                <Modal
                    activeModal={activeModal}
                    setActiveModal={setActiveModal}
                    item={item}
                />}
        </div>
    )
}
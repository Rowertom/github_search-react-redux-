import { useCallback, useEffect } from "react";
import './style.scss';



export const Modal = ({ activeModal, setActiveModal, item }) => {

    const onModalKeyDown = useCallback((e) => {
        if (e.key === 'Escape') {
            setActiveModal(false)
        }
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', onModalKeyDown);
        return (() => {
            document.removeEventListener('keydown', onModalKeyDown)
        })
    }, [onModalKeyDown])

    return (
        <div className={activeModal ? 'modal active' : 'modal'}>
            <div className={activeModal ? 'modal__content active' : 'modal__content'} onClick={(e) => e.stopPropagation()}>
                <button className="modal__content__btn" onClick={() => setActiveModal(false)}>
                    Закрыть
                </button>
                <p className="modal__content__info">Логин: {item.login}</p>
                <p className="modal__content__info">Страница GitHub: <a href={item.html_url} target="_blank">{item.html_url}</a></p>
                <p className="modal__content__info">Запрос на получение репозиториев: <a href={item.repos_url} target="_blank">{item.repos_url}</a></p>
            </div>

        </div>
    )
}
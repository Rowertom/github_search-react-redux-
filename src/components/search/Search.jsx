import { useEffect } from 'react';
import './style.scss';

export const Search = ({ search, setSearch }) => {

    useEffect(() => {
        if (search === '') return;
        const timer = setTimeout(() => {
            setSearch('')
        }, 3000)
        return () => {
            clearTimeout(timer)
        }
    }, [search])

    return (
        <input placeholder="Поиск"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search__input" />
    )
}
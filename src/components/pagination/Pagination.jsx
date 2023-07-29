import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import './style.scss';
import { setLessCountPosts, setMoreCountPosts, setPage } from "../../storage/cardSlice/cardSlice";

export const Paginate = () => {
    const dispatch = useDispatch()

    const { total, pageSize } = useSelector(s => s.cards)

    function handlePageChange(event, page) {
        dispatch(setPage(page));
        window.scrollTo(0, 0);
    }

    const handleClickMore = () => {
        dispatch(setMoreCountPosts())
    }

    const handleClickLess = () => {
        dispatch(setLessCountPosts())
    }

    return (
        <div className='pagination'>
            <button className="pagination__btn" onClick={handleClickLess} disabled={pageSize <= 3 && total > 0}>Меньше постов</button>
            <Pagination
                variant="text"
                count={total > 0 ? Math.ceil(total / pageSize) : total}
                onChange={handlePageChange}
                size={'large'}
            />
            <button className="pagination__btn" onClick={handleClickMore} disabled={pageSize >= total && total > 0}>Больше постов</button>
        </div>
    );
}
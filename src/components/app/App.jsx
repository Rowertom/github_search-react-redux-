import { useEffect, useState } from 'react';
import { useDebounce } from '../../utils/utils';
import { Search } from '../search/Search';
import './App.scss';
import { clearPosts, fetchSearchCards } from '../../storage/cardSlice/cardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CardList } from '../cardlist/CardList';
import { Paginate } from '../pagination/Pagination';


function App() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (query) => {
    dispatch(fetchSearchCards(query))
  }

  const debounceValueInApp = useDebounce(search, 500);

  const handleClickClear = () => {
    dispatch(clearPosts())
  }

  useEffect(() => {
    if (debounceValueInApp === undefined || debounceValueInApp === '') return;
    handleSearch(debounceValueInApp);
  }, [debounceValueInApp]);

  return (
    <div className="app">
      <header className="app__header">
        <Search setSearch={setSearch} search={search} />
        <button className="app__header__btn" onClick={handleClickClear}>Очистить список</button>
      </header>
      <main>
        <CardList />
        <Paginate />
      </main>
    </div>
  );
}

export default App;

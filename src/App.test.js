import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './components/app/App';
import { clearPosts, fetchSearchCards } from './storage/cardSlice/cardSlice';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk])

describe('App component', () => {
  let store;
  let component;

  beforeEach(() => {
    const initialState = {
      cards:{
        posts: [],
      }
    }
    store = mockStore(initialState);

    component = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  //проверяет, что поле ввода для поиска отображается на странице
  test('renders search input field', () => {
    const searchInput = component.getByPlaceholderText('Поиск');
    expect(searchInput).toBeInTheDocument();
  })

  //проверяет, что действие 'fetchSearchCards' диспачится при изменении значения поля ввода поиска
  test('dispatches fetchSearchCards action on search', async () => {
    const searchInput = component.getByPlaceholderText('Поиск');
    fireEvent.change(searchInput, {target: {value: 'test'}});
    await store.dispatch(fetchSearchCards('test'));
    expect(store.getActions()).toContainEqual({
      type: 'cards/fetchSearchCards/pending',
      payload: undefined,
      meta: {
        arg: 'test',
        requestId: expect.any(String),
        requestStatus: 'pending',
      },
    });
  })

  //проверяет, что действие clearPosts диспачится при нажатии на кнопку 'Очистить поиск'
  test('dispatches clearPosts action on clear button click', () => {
    const clearButton = component.getByText('Очистить список');
    fireEvent.click(clearButton);
    expect(store.getActions()).toContainEqual(clearPosts());
  })
})
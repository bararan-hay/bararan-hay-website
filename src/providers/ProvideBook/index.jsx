import { useContext, createContext, useReducer, useCallback } from 'react';
import axios from 'axios';
import reducer from './reducer';

const BookContext = createContext();

export function ProvideBook({ children }) {
  const context = useProvideBook();
  return <BookContext.Provider value={context}>{children}</BookContext.Provider>;
}

export function useBooks() {
  return useContext(BookContext);
}

function useProvideBook() {
  const [bookStorage, dispatch] = useReducer(reducer, {
    loading: true,
    error: false,
    books: [],
    list: []
  });

  const loadBooks = useCallback(() => {
    return axios
      .get(process.env.REACT_APP_API + '/books')
      .then(response => {
        return dispatch({
          type: 'setBooks',
          payload: {
            books: response.data,
            list: response.data,
            loading: false,
            error: false
          }
        });
      })
      .catch(() => dispatch({ type: 'setBooks', payload: { loading: false, error: true } }));
  }, []);

  const resetBooks = useCallback(() => {
    dispatch({
      type: 'setBooks',
      payload: {
        books: bookStorage.list,
        loading: false,
        error: false
      }
    });
  }, [bookStorage.list]);

  const searchWord = useCallback(keyword => {
    dispatch({
      type: 'setBooks',
      payload: {
        loading: true,
        error: false
      }
    });
    return axios
      .post(process.env.REACT_APP_API + '/books/search', { keyword })
      .then(response => {
        return dispatch({
          type: 'setBooks',
          payload: {
            books: response.data,
            loading: false
          }
        });
      })
      .catch(() => dispatch({ type: 'setBooks', payload: { loading: false, error: true } }));
  }, []);

  return {
    bookStorage,
    searchWord,
    resetBooks,
    loadBooks
  };
}

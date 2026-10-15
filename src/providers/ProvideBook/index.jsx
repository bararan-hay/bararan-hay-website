import { useContext, createContext, useReducer, useCallback, useRef } from 'react';
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

// The dictionary list and the word search are kept apart so neither response can
// overwrite the other, whichever arrives first.
function useProvideBook() {
  const [bookStorage, dispatch] = useReducer(reducer, {
    list: [],
    listLoading: true,
    listError: false,
    results: null,
    resultsWord: '',
    searching: false,
    searchError: false
  });
  const searchId = useRef(0);

  const loadBooks = useCallback(() => {
    dispatch({ type: 'setBooks', payload: { listLoading: true, listError: false } });
    return axios
      .get(process.env.REACT_APP_API + '/books')
      .then(response =>
        dispatch({ type: 'setBooks', payload: { list: response.data, listLoading: false } })
      )
      .catch(() =>
        dispatch({ type: 'setBooks', payload: { listLoading: false, listError: true } })
      );
  }, []);

  const resetBooks = useCallback(() => {
    searchId.current += 1;
    dispatch({
      type: 'setBooks',
      payload: { results: null, resultsWord: '', searching: false, searchError: false }
    });
  }, []);

  const searchWord = useCallback(keyword => {
    const id = ++searchId.current;
    dispatch({ type: 'setBooks', payload: { searching: true, searchError: false } });
    return axios
      .post(process.env.REACT_APP_API + '/books/search', { keyword })
      .then(response => {
        if (id !== searchId.current) return;
        dispatch({
          type: 'setBooks',
          payload: { results: response.data, resultsWord: keyword, searching: false }
        });
      })
      .catch(() => {
        if (id !== searchId.current) return;
        dispatch({ type: 'setBooks', payload: { searching: false, searchError: true } });
      });
  }, []);

  return {
    bookStorage,
    searchWord,
    resetBooks,
    loadBooks
  };
}

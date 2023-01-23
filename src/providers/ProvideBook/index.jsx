import { useContext, createContext, useReducer, useCallback } from 'react';
import { message } from 'antd';
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
    books: []
  });

  const loadBooks = useCallback(() => {
    return axios.get(process.env.REACT_APP_API + '/books').then(response => {
      return dispatch({
        type: 'setBooks',
        payload: {
          books: response.data,
          loading: false
        }
      });
    });
  }, []);

  const searchWord = useCallback(keyword => {
    dispatch({
      type: 'setBooks',
      payload: {
        loading: true
      }
    });
    return axios.post(process.env.REACT_APP_API + '/books/search', { keyword }).then(response => {
      return dispatch({
        type: 'setBooks',
        payload: {
          books: response.data,
          loading: false
        }
      });
    });
  }, []);

  return {
    bookStorage,
    searchWord,
    loadBooks
  };
}

import { useContext, createContext, useReducer, useCallback } from 'react';
import { message } from 'antd';
import axios from 'axios';
import reducer from './reducer';

const DicContext = createContext();

export function ProvideDictionary({ children }) {
  const context = useProvideDictionary();
  return <DicContext.Provider value={context}>{children}</DicContext.Provider>;
}

export function useDictionaries() {
  return useContext(DicContext);
}

function useProvideDictionary() {
  const [dictionaryStorage, dispatch] = useReducer(reducer, {
    input: '',
    loading: false,
    dictionaries: []
  });

  const search = useCallback(text => {
    dispatch({
      type: 'setDictionaries',
      payload: {
        loading: true
      }
    });

    axios.get(`${process.env.REACT_APP_API}/dictionaries?search=${text}`).then(response => {
      dispatch({
        type: 'setDictionaries',
        payload: {
          dictionaries: response.data,
          input: text,
          loading: false
        }
      });
    });
  }, []);

  const resetDictionary = useCallback(() => {
    dispatch({
      type: 'setDictionaries',
      payload: {
        input: '',
        loading: false,
        dictionaries: []
      }
    });
  });

  return {
    dictionaryStorage,
    resetDictionary,
    search
  };
}

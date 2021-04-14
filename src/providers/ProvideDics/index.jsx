import { useContext, createContext, useReducer, useCallback } from 'react';
import { message } from 'antd';
import axios from 'axios';
import reducer from './reducer';
import { DICS } from 'constans/dictionaries';
import localforage from 'localforage';

localforage.config({
  name: 'bararan-hay',
  description: 'dictionaries',
  driver: [localforage.WEBSQL, localforage.INDEXEDDB]
});

const DicContext = createContext();

export function ProvideDic({ children }) {
  const context = useProvideDic();
  return <DicContext.Provider value={context}>{children}</DicContext.Provider>;
}

export function useDics() {
  return useContext(DicContext);
}

function useProvideDic() {
  const [storage, dispatch] = useReducer(reducer, {
    loading: true,
    checkeds: [],
    dics: DICS
  });

  const load = () => {
    return localforage
      .ready()
      .then(() => {
        return storage.dics.map(dictionary => {
          return localforage
            .getItem(dictionary.key)
            .then(data => {
              return dispatch({
                type: 'load',
                payload: {
                  ...dictionary,
                  data: data
                }
              });
            })
            .catch(response => {
              message.error(response.message);
              return Promise.resolve();
            });
        });
      })
      .then(array => {
        return Promise.all(array);
      });
  };

  const fetchAndStoreDic = dictionary => {
    return axios
      .get(dictionary.location)
      .then(response => localforage.setItem(dictionary.key, response.data))
      .then(() => localforage.getItem(dictionary.key))
      .catch(response => {
        message.error(response.message);
        return Promise.reject(response);
      });
  };

  const enable = dictionary => {
    return Promise.resolve()
      .then(() => {
        if (dictionary.data) {
          return dictionary.data;
        }
        return fetchAndStoreDic(dictionary);
      })
      .then(data => {
        return dispatch({
          type: 'enable',
          payload: {
            ...dictionary,
            data: data
          }
        });
      });
  };

  const disable = dictionary => {
    return dispatch({
      type: 'disable',
      payload: dictionary
    });
  };

  return {
    storage,
    load,
    enable,
    disable
  };
}

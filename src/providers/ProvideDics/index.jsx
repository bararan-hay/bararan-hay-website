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

const saveDictonaryChacked = (key, value) => {
  return localforage.getItem('checkedKeys').then(data => {
    const checkedKeys = Object.assign({}, data, { [key]: value });
    return localforage.setItem('checkedKeys', checkedKeys);
  });
};

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
    checkedKeys: {},
    dics: DICS
  });

  const load = () => {
    return localforage
      .ready()
      .then(() => localforage.getItem('checkedKeys'))
      .then(keys => {
        const checkedKeys = keys || {};
        return Promise.all(
          storage.dics.map(dictionary => {
            if (!checkedKeys[dictionary.key]) {
              return dictionary;
            }
            return localforage
              .getItem(dictionary.key)
              .then(data => ({ ...dictionary, data: data }))
              .catch(() => Promise.resolve(dictionary));
          })
        ).then(dics => {
          return dispatch({
            type: 'load',
            payload: { dics, checkedKeys }
          });
        });
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
    return localforage
      .getItem(dictionary.key)
      .then(data => data || fetchAndStoreDic(dictionary))
      .then(data => {
        saveDictonaryChacked(dictionary.key, true);
        return dispatch({
          type: 'enable',
          payload: { ...dictionary, data: data }
        });
      });
  };

  const disable = dictionary => {
    saveDictonaryChacked(dictionary.key, false);
    return dispatch({
      type: 'disable',
      payload: { ...dictionary, data: '' }
    });
  };

  return {
    storage,
    load,
    enable,
    disable
  };
}

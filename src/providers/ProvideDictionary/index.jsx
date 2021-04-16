import { useContext, createContext, useReducer, useCallback } from 'react';
import { message } from 'antd';
import axios from 'axios';
import reducer from './reducer';
import dictionaries from './dictionaries.json';
import localforage from 'localforage';

localforage.config({
  name: 'bararan-hay',
  description: 'dictionaries',
  driver: [localforage.WEBSQL, localforage.INDEXEDDB]
});

const version = 'v2.0';

const saveChackedDictonary = (key, value) => {
  return localforage.getItem('checkedKeys').then(data => {
    const checkedKeys = Object.assign({}, data, { [key]: value });
    return localforage.setItem('checkedKeys', checkedKeys);
  });
};

const checkProjectVersion = () => {
  return localforage.ready().then(() => {
    return localforage.getItem('version').then(function (value) {
      if (value === version) {
        return Promise.resolve();
      }
      return localforage.clear().then(function () {
        return localforage.setItem('version', version);
      });
    });
  });
};

const DicContext = createContext();

export function ProvideDictionary({ children }) {
  const context = useProvideDictionary();
  return <DicContext.Provider value={context}>{children}</DicContext.Provider>;
}

export function useDictionaries() {
  return useContext(DicContext);
}

function useProvideDictionary() {
  const [storage, dispatch] = useReducer(reducer, {
    loading: true,
    checkedKeys: {},
    dictionaries: dictionaries
  });

  const load = () => {
    return checkProjectVersion()
      .then(() => localforage.getItem('checkedKeys'))
      .then(keys => {
        const checkedKeys = keys || {};
        return Promise.all(
          storage.dictionaries.map(dictionary => {
            if (!checkedKeys[dictionary.key]) {
              return dictionary;
            }
            return localforage
              .getItem(dictionary.key)
              .then(data => ({ ...dictionary, data: data }))
              .catch(() => Promise.resolve(dictionary));
          })
        ).then(dictionaries => {
          return dispatch({
            type: 'load',
            payload: { dictionaries, checkedKeys }
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
        saveChackedDictonary(dictionary.key, true);
        return dispatch({
          type: 'enable',
          payload: { ...dictionary, data: data }
        });
      });
  };

  const disable = dictionary => {
    saveChackedDictonary(dictionary.key, false);
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

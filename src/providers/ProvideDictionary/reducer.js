export default function reducer(state, action) {
  switch (action.type) {
    case 'load':
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    case 'enable':
      return {
        ...state,
        checkedKeys: {
          ...state.checkedKeys,
          [action.payload.key]: true
        },
        dictionaries: state.dictionaries.map(dic =>
          dic.key === action.payload.key ? action.payload : dic
        )
      };
    case 'disable':
      return {
        ...state,
        checkedKeys: {
          ...state.checkedKeys,
          [action.payload.key]: false
        },
        dictionaries: state.dictionaries.map(dic =>
          dic.key === action.payload.key ? action.payload : dic
        )
      };
    default:
      throw new Error(`${action.type} not found!`);
  }
}

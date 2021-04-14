export default function reducer(state, action) {
  switch (action.type) {
    case 'load':
      return {
        ...state,
        loading: false,
        dics: state.dics.map(dic => dic.key === action.payload.key ? action.payload : dic)
      };    
    case 'enable':
      return {
        ...state,
        checkeds: state.checkeds.concat(action.payload.key),
        dics: state.dics.map(dic => dic.key === action.payload.key ? action.payload : dic)
      };    
    case 'disable':       
      return {
        ...state,
        checkeds: state.checkeds.filter(key => key !== action.payload.key),
      };
    default:
      throw new Error(`${action.type} not found!`);
  }
}

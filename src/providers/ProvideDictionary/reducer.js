export default function reducer(state, action) {
  switch (action.type) {
    case 'setDictionaries':
      return {
        ...state,
        ...action.payload
      };
    default:
      throw new Error(`${action.type} not found!`);
  }
}

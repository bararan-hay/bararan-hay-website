export default function reducer(state, action) {
  switch (action.type) {
    case 'setBooks':
      return {
        ...state,
        ...action.payload
      };
    default:
      throw new Error(`${action.type} not found!`);
  }
}

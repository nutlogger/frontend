const meal = (state: {} = {}, action: any) => {
  switch (action.type) {
    case 'SET_MEAL':
      return Object.assign({}, state, action.meal);
    default:
      return state;
  }
}

export default meal;
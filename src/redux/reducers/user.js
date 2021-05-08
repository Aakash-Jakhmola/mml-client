const initialState = {
    status: "failure",
    user: {},
}

export default function userReducer(state = initialState , action)  {
  switch(action.type) {
    case 'FETCH_USER':
      const successful = Object.assign({}, state, {
        status: action.status,
        user: action.data
      })
      return successful
    case 'LOG_OUT' :
      const un = Object.assign({}, state, {
        status: "failure",
        user: {}
      })
      return un
    default:
      return state
  }
}



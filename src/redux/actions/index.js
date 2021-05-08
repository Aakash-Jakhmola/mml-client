function FetchUser(data) {
  const FETCH_USER = 'FETCH_USER'
  return {
    type: FETCH_USER,
    status: "success",
    data
  }
}

function LogoutUser() {
  const LOG_OUT = 'LOG_OUT' 
  return {
    type : LOG_OUT,
    status : "failure"
  }
}

export {
  FetchUser,
  LogoutUser
}


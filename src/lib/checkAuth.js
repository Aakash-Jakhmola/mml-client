export default (name) => {
  const val = document.cookie &&  document.cookie
  .split('; ')
  .find(row => row.startsWith(name + '='))
  .split('=')[1];
  
  if(val.length > 0)
    return val
  else 
    return null
}


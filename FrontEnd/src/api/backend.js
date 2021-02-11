const apiUrl = 'http://localhost:3000/'

export const getFrom = async (params, word) => {
  return fetch(apiUrl + params, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'word': word })
  })
    .then((response) => {
      return response.json();
    })
    .catch(err => console.log(err));
}

export const postTo = async (params, page) => {
  return fetch(apiUrl + params, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'pageUrl': page })
  })
    .then((response) => {
      return response.json();
    })
    .catch(err => console.log(err));
}

export const clearIndex = async (params) => {
  console.log(params);
  return fetch(apiUrl + params, {
    method: 'DELETE',
  })
    .then(() => 'Clear index succeeded')
    .catch(err => console.log(err));
}




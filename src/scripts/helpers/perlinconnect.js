export const getPerlin = async () => {
  const response = await fetch(`https://www.perlin.darkcornersgame.com`, {
    method: 'Get',
    mode: 'cors',
    headers: {
      Accept: 'Application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error('Getting perlin data was unsuccessful');
};
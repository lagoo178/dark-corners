import { getID } from '../src/API/leaderboardCall';
import 'regenerator-runtime/runtime';

it('Add a mock game and receive a message with the id', async () => {
  fetch.mockResponseOnce(JSON.stringify({ result: 'Game with ID: added' }));

  const result1 = await getID();
  expect(result1.result).toMatch(/(Game with ID).*(added)/);
});

it('catches API request errors', async () => {
  fetch.mockReject(() => 'Error Message');
  const result1 = await getID();

  expect(result1).toEqual(Error('API is down'));
});
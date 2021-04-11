import { getRndInteger } from './../../utils/helper';

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>(resolve =>
    setTimeout(() => resolve({ data: amount }), getRndInteger(1, 5) * 1000),
  );
}

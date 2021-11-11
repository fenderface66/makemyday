// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import * as api from './api';

jest.mock('./api', () => ({
  __esModule: true,
  default: jest.fn()
}));

(api.default as jest.Mock).mockResolvedValue(() => ({
  status: 201,
  body: {},
  json: () => ({})
}))



// jest.setup.js
import { configure } from '@testing-library/dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

configure({
  asyncUtilTimeout: 5000,
  defaultHidden: true,
});
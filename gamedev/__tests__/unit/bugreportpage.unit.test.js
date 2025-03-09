// __tests__/bugreportpage.unit.test.js
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/dom';
import { jest } from '@jest/globals';

HTMLFormElement.prototype.requestSubmit = function() {
  this.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
};

describe('Bug Report Page Unit Tests', () => {
  beforeEach(async () => {
    document.body.innerHTML = `
      <form id="bugForm">
        <input type="text" id="bugTitle" value="Unit Test Bug" required>
        <textarea id="description">Unit test description</textarea>
        <textarea id="steps">Step 1, Step 2</textarea>
        <textarea id="expected">Expected outcome</textarea>
        <textarea id="actual">Actual outcome</textarea>
        <input type="text" id="device" value="Unit Device">
        <textarea id="logs">Unit error logs</textarea>
      </form>
      <button id="submitButton" form="bugForm" type="button">Submit</button>
    `;

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('Success'),
    });

    await import('../../public_html/bugreportpage.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Submits URL-encoded form data correctly', async () => {
    fireEvent.click(document.getElementById('submitButton'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      const [url, options] = fetch.mock.calls[0];
      expect(options.method).toBe('POST');
      expect(options.headers).toEqual({ 'Content-Type': 'application/x-www-form-urlencoded' });
      expect(options.body).toEqual(
        'bugTitle=Unit+Test+Bug&description=Unit+test+description&steps=Step+1%2C+Step+2&expected=Expected+outcome&actual=Actual+outcome&device=Unit+Device&logs=Unit+error+logs'
      );
    });
  });
});
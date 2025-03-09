// __tests__/bugreportpage.validation.test.js
import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/dom';
import { jest } from '@jest/globals';

HTMLFormElement.prototype.requestSubmit = function() {
  this.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
};

describe('Bug Report Page Validation Tests', () => {
  beforeEach(async () => {
    document.body.innerHTML = `
      <form id="bugForm">
        <input type="text" id="bugTitle" required value="Test Bug">
        <textarea id="description" required>Test description</textarea>
        <textarea id="steps" required>Test steps</textarea>
        <textarea id="expected" required>Expected</textarea>
        <textarea id="actual" required>Actual</textarea>
        <input type="text" id="device" value="Test device">
        <textarea id="logs">Test logs</textarea>
      </form>
      <button id="submitButton" type="button">Submit</button>
      <p id="successMessage" style="display:none;"></p>
      <p id="errorMessage" style="display:none;"></p>
    `;

    await import('../../public_html/bugreportpage.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Logs success on HTTP 200', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, text: () => 'Success' });
    const consoleSpy = jest.spyOn(console, 'log');

    fireEvent.click(document.getElementById('submitButton'));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Response text:', 'Success');
    });
    consoleSpy.mockRestore();
  });

  test('Logs error on HTTP failure', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 });
    const consoleSpy = jest.spyOn(console, 'error');

    fireEvent.click(document.getElementById('submitButton'));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error submitting bug report:',
        expect.any(Error)
      );
    });
    consoleSpy.mockRestore();
  });
});
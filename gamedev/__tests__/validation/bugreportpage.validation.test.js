// __tests__/unit/bugreportpage.validation.test.js
import { JSDOM } from 'jsdom';
import { jest } from '@jest/globals';
import { fireEvent, waitFor, within } from '@testing-library/dom';

describe('Bug Report Page Validation Tests', () => {
  let dom;

  beforeEach(async () => {
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <div id="test-root">
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
          </div>
        </body>
      </html>
    `);

    global.document = dom.window.document;
    global.HTMLFormElement = dom.window.HTMLFormElement;

    HTMLFormElement.prototype.requestSubmit = function() {
      this.dispatchEvent(new dom.window.Event('submit', { 
        bubbles: true, 
        cancelable: true 
      }));
    };

    jest.resetModules();
    global.fetch = jest.fn().mockResolvedValue({ ok: true, text: () => 'Success' });

    await import('../../public_html/bugreportpage.js');
    
    document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
    await new Promise(resolve => setTimeout(resolve, 10));
  });

  test('Logs success on HTTP 200', async () => {
    const container = within(document.getElementById('test-root'));
    const consoleSpy = jest.spyOn(console, 'log');

    fireEvent.click(container.getByText('Submit'));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Response text:', 'Success');
    }, { container: document.getElementById('test-root') });
  });

  test('Logs error on HTTP failure', async () => {
    const container = within(document.getElementById('test-root'));
    global.fetch = jest.fn().mockResolvedValue({ 
      ok: false, 
      status: 500 
    });
    const consoleSpy = jest.spyOn(console, 'error');

    fireEvent.click(container.getByText('Submit'));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error submitting bug report:',
        expect.any(Error)
      );
    }, { container: document.getElementById('test-root') });
  });
});
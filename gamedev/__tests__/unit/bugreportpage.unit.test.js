// __tests__/unit/bugreportpage.unit.test.js
// Evan Albert
import { JSDOM } from 'jsdom';
import { jest } from '@jest/globals';
import { fireEvent, waitFor, within } from '@testing-library/dom';

describe('Bug Report Page Unit Tests', () => {
  let dom;

  beforeEach(async () => {
    // Initialize JSDOM with explicit HTML structure
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <div id="test-root">
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
          </div>
        </body>
      </html>
    `);

    global.document = dom.window.document;
    global.HTMLFormElement = dom.window.HTMLFormElement;

    // Add polyfill
    HTMLFormElement.prototype.requestSubmit = function() {
      this.dispatchEvent(new dom.window.Event('submit', { 
        bubbles: true,
        cancelable: true 
      }));
    };

    jest.resetModules();
    global.fetch = jest.fn().mockResolvedValue({ 
      ok: true, 
      text: () => Promise.resolve('Success') 
    });

    await import('../../public_html/bugreportpage.js');
    
    // Wait for event listeners to attach
    document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
    await new Promise(resolve => setTimeout(resolve, 10));
  });

  test('Submits URL-encoded form data correctly', async () => {
    const container = within(document.getElementById('test-root'));
    
    fireEvent.click(container.getByText('Submit'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      const [url, options] = fetch.mock.calls[0];
      expect(options.method).toBe('POST');
      expect(options.headers).toEqual({ 
        'Content-Type': 'application/x-www-form-urlencoded' 
      });
      expect(options.body).toEqual(
        'bugTitle=Unit+Test+Bug&description=Unit+test+description&steps=Step+1%2C+Step+2&expected=Expected+outcome&actual=Actual+outcome&device=Unit+Device&logs=Unit+error+logs'
      );
    }, { container: document.getElementById('test-root') });
  });
});
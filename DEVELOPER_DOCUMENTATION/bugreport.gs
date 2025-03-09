function doPost(e) {
  try {
    const data = e.parameter;

    const newRow = [
      data.bugTitle || "",
      data.description || "",
      data.steps || "",
      data.expected || "",
      data.actual || "",
      data.device || "",
      data.logs || "",
      new Date().toISOString()
    ];

    const ss = SpreadsheetApp.openById("PASTE-SPREADSHEET-ID-HERE");
    const sheet = ss.getSheetByName("BugReport");
    sheet.appendRow(newRow);

    const lastRow = sheet.getLastRow();
    const range = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn());
    range.setWrap(true);
    range.setVerticalAlignment("TOP");

    sheet.autoResizeColumns(1, sheet.getLastColumn());

    return ContentService.createTextOutput("Success");
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err);
  }
}

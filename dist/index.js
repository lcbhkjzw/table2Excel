export function table2Excel(tableHead, tableBody, fileName) {
    var tableString = generateTableString(tableHead, tableBody);
    var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
    excelFile += "<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>";
    excelFile += "<body><table>";
    excelFile += tableString;
    excelFile += "</table></body>";
    excelFile += "</html>";
    try {
        var blob = new Blob([excelFile], { type: "application/vnd.ms-excel" });
        var link = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.download = fileName + ".xls";
        a.href = link;
        a.click();
    }
    catch (e) {
        console.error(e);
    }
}
function thead(tableHead) {
    var thead = Object.entries(tableHead).map(function (key, value) {
        return "<th>" + value + "</th>";
    }).join('');
    return "<thead><tr>" + thead + "</tr></thead>";
}
function tbody(tableHead, tableBody) {
    var tbody = '';
    for (var _i = 0, tableBody_1 = tableBody; _i < tableBody_1.length; _i++) {
        var body = tableBody_1[_i];
        var column = '';
        for (var i in tableHead) {
            column +=
                "<th>" + body[i] + "</th>";
        }
        tbody +=
            "<tr> " + column + "</tr>";
    }
    return "<tbody>" + tbody + "</tbody>";
}
function generateTableString(tableHead, tableBody) {
    return thead(tableHead) + tbody(tableHead, tableBody);
}
//# sourceMappingURL=index.js.map
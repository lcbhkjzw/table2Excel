

function tableToExcel (tableHead: Object, tableBody: Array<Object>, fileName: string): void {
    let tableString = generateTableString(tableHead, tableBody);
    var excelFile = 
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
    excelFile += "<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>";
    excelFile += "<body><table>";
    excelFile += tableString;
    excelFile += "</table></body>";
    excelFile += "</html>";
    try {
        const blob = new Blob([excelFile], { type: "application/vnd.ms-excel" });
        const link = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.download = fileName + ".xlsx";
        a.href = link;
        a.click();
    } catch(e) {
        console.error(e);
    }
}


function thead (tableHead: Object): string {
    let thead = '';
    for (let i in tableHead) {
        thead += `<th>${tableHead[i]}</th>`
    }
    return `<thead>
        <tr>
            ${thead}
        </tr>
    </thead>`;
}

function tbody (tableHead: Object, tableBody: Array<Object>): string {
    var tbody = '';
    for (let body of tableBody) {
        var column = '';
        for (let i in tableHead) {
            column += 
            `<th>
                ${body[i]}
            </th>`
        }
        tbody += 
        `
            <tr>
                <th>
                    ${column}
                </th>
            </tr>
        `
    }
    return `<tbody>${tbody}</tbody>`;
}

function generateTableString (tableHead: Object, tableBody: Array<Object>):string {
    return thead(tableHead) + tbody(tableHead,tableBody);
}
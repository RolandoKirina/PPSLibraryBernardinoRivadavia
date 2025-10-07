front end object

{

    
    books: [
        { id: 1},
        { id: 2},
        { id: 4},
    ]
}

{
        bookId: lendBook.id
        bookCode: lendBook.bookCode,
        bookTitle: lendBook.bookTitle,
        partnerName: loanData.partnerName,
        partnerNumber: loanData.partnerNumber,
        retiredDate: loanData.retiredDate,
        expectedDate: loanData.expectedDate,
        retiredHour: '11:00',
        employeeCode: loanData.employeeCode
}


get loan for frontend loan table
     { header: 'Codigo', accessor: 'bookCode' },
            { header: 'Título', accessor: 'bookTitle' },
            { header: 'Fecha retiro', accessor: 'retiredDate' },
            { header: 'Fecha limite', accessor: 'plannedDate' },
            { header: 'Fecha devolución', accessor: 'returnedDate' },

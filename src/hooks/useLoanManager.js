import { useState, useEffect } from "react";

export const useLoanManager = (initialLoans) => {
    const getStoredLoans = () => {
        const stored = localStorage.getItem('loans');
        if (!stored || stored === '[]') {
            return initialLoans;
        }
        try {
            return JSON.parse(stored);
        } catch (error) {
            console.error("Error parsing loans:", error);
            return initialLoans;
        }
    };

    const [loans, setLoans] = useState(getStoredLoans());

    useEffect(() => { //persistencia automatica
        localStorage.setItem('loans', JSON.stringify(loans));
    }, [loans]);

    //GET BY ID
    const getLoan = (loanId) => {
        const found = loans.find((loan) => loan.loanId === loanId);
        if (!found) console.warn(`Préstamo con ID ${loanId} no encontrado`);
        return found;
    };

    //POST
    const createLoan = (newLoan) => {
        setLoans((prev) => [...prev, newLoan]);
    }

    //PUT
    const updateLoan = (loanId, updatedData) => {
        setLoans((prev) => 
            prev.map((loan) => 
                loan.loanId === loanId ? {...loan, updatedData } : loan
            )
        );
    }

    //DELETE
    const deleteLoan = (loanId) => {
        setLoans((prev) =>
            prev.filter((loan) => loan.loanId !== loanId)
        );
    };

    return{
        loans,
        getLoan,
        createLoan,
        updateLoan,
        deleteLoan
    };
};
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import './PrintableBillingPage.css';
import billingImage from '../../../assets/img/billing-form.jpg';

export default function PrintableBillingPage() {
    const [searchParams] = useSearchParams();
    const { auth } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const partnerNumber = searchParams.get('partnerNumber');
    const year = searchParams.get('year') || new Date().getFullYear();
    const semester = searchParams.get('semester') || "1";

    // --- LÓGICA DE POSICIONES FIJAS POR SEMESTRE ---
    const generateFeesArray = (baseFees) => {
        const expectedMonths = semester === "1" 
            ? ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO"]
            : ["JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];

        const expanded = [];

        // Agrupamos de a 2 meses para llenar filas de 4 columnas
        for (let i = 0; i < expectedMonths.length; i += 2) {
            const monthNameA = expectedMonths[i];
            const monthNameB = expectedMonths[i + 1];

            const dataA = baseFees.find(f => f.month.toUpperCase() === monthNameA);
            const dataB = baseFees.find(f => f.month.toUpperCase() === monthNameB);

            // Fila X: [Mes A][Mes A][Mes B][Mes B]
            if (dataA) { expanded.push(dataA); expanded.push(dataA); }
            else { expanded.push({ empty: true }); expanded.push({ empty: true }); }

            if (dataB) { expanded.push(dataB); expanded.push(dataB); }
            else { expanded.push({ empty: true }); expanded.push({ empty: true }); }
        }
        return expanded;
    };

    // --- MOCK DATA COMPLETO (Los 12 meses) ---
    const fullYearMock = [
        { month: "ENERO", amount: 1500 }, { month: "FEBRERO", amount: 1500 },
        { month: "MARZO", amount: 1500 }, { month: "ABRIL", amount: 1500 },
        { month: "MAYO", amount: 1500 }, { month: "JUNIO", amount: 1500 },
        { month: "JULIO", amount: 1500 }, { month: "AGOSTO", amount: 1500 },
        { month: "SEPTIEMBRE", amount: 1500 }, { month: "OCTUBRE", amount: 1500 },
        { month: "NOVIEMBRE", amount: 1500 }, { month: "DICIEMBRE", amount: 1500 }
    ];

    useEffect(() => {
        const fetchBillingData = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/v1/fees/yearly-report?partnerNumber=${partnerNumber}&year=${year}&semester=${semester}`, {
                    headers: { "Authorization": `Bearer ${auth.token}` }
                });
                
                if (!res.ok) throw new Error("API Error");
                const result = await res.json();
                
                setData({ 
                    ...result, 
                    Fees: generateFeesArray(result.Fees) 
                });
            } catch (err) {
                console.warn("Cargando Mock Data para el semestre:", semester);
                setData({
                    Partner: {
                        name: "JUAN",
                        surname: "PÉREZ",
                        partnerNumber: partnerNumber || "0000"
                    },
                    Fees: generateFeesArray(fullYearMock)
                });
            } finally {
                setLoading(false);
            }
        };

        if (partnerNumber) fetchBillingData();
        else {
            setData({
                Partner: { name: "USUARIO", surname: "MOCK", partnerNumber: "1234" },
                Fees: generateFeesArray(fullYearMock)
            });
            setLoading(false);
        }
    }, [partnerNumber, year, semester]);

    if (loading) return <p>Cargando vista de impresión...</p>;

    return (
        <div className="print-page">
            <div className="billing-grid-container" style={{ backgroundImage: `url(${billingImage})` }}>
                {data?.Fees.map((fee, index) => (
                    <div key={index} className="fee-card">
                        {!fee.empty && (
                            <>
                                <div className="field name-field">{data.Partner?.name} {data.Partner?.surname}</div>
                                <div className="field partner-num-field">{data.Partner?.partnerNumber}</div>
                                <div className="field month-field">{fee.month} / {year}</div>
                                <div className="field amount-field">${fee.amount}</div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <button className="no-print print-button" onClick={() => window.print()}>
                Imprimir Planilla
            </button>
        </div>
    );
}
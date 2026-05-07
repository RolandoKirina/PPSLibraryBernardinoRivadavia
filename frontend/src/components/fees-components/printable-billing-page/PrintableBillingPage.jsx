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

    // --- LÓGICA DE DISTRIBUCIÓN: 2 meses por fila, cada uno duplicado ---
    const generateFeesArray = (baseFees) => {
        const expanded = [];
        // Iteramos de a 2 meses para llenar cada fila de 4 columnas
        for (let i = 0; i < baseFees.length; i += 2) {
            const mesA = baseFees[i];
            const mesB = baseFees[i + 1];

            // Fila X: [Mes A][Mes A][Mes B][Mes B]
            if (mesA) {
                expanded.push(mesA); expanded.push(mesA);
            }
            if (mesB) {
                expanded.push(mesB); expanded.push(mesB);
            }
        }
        return expanded;
    };

    const mockData = {
        Partner: {
            name: "JUAN",
            surname: "PÉREZ",
            partnerNumber: partnerNumber || "0000"
        },
        Fees: generateFeesArray(
            semester === "1" 
            ? [{month: "ENERO", amount: 1500}, {month: "FEBRERO", amount: 1500}, {month: "MARZO", amount: 1500}, {month: "ABRIL", amount: 1500}, {month: "MAYO", amount: 1500}, {month: "JUNIO", amount: 1500}]
            : [{month: "JULIO", amount: 1500}, {month: "AGOSTO", amount: 1500}, {month: "SEPTIEMBRE", amount: 1500}, {month: "OCTUBRE", amount: 1500}, {month: "NOVIEMBRE", amount: 1500}, {month: "DICIEMBRE", amount: 1500}]
        )
    };

    useEffect(() => {
        const fetchBillingData = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/v1/fees/yearly-report?partnerNumber=${partnerNumber}&year=${year}&semester=${semester}`, {
                    headers: { "Authorization": `Bearer ${auth.token}` }
                });
                if (!res.ok) throw new Error("Error API");
                const result = await res.json();
                
                setData({ 
                    ...result, 
                    Fees: generateFeesArray(result.Fees) 
                });
            } catch (err) {
                console.warn("Cargando Mock Data");
                setData(mockData);
            } finally {
                setLoading(false);
            }
        };

        if (partnerNumber) fetchBillingData();
        else { setData(mockData); setLoading(false); }
    }, [partnerNumber, year, semester]);

    if (loading) return <p>Cargando planilla...</p>;

    return (
        <div className="print-page">
            <div className="billing-grid-container" style={{ backgroundImage: `url(${billingImage})` }}>
                {data?.Fees.map((fee, index) => (
                    <div key={index} className="fee-card">
                        <div className="field name-field">{data.Partner?.name} {data.Partner?.surname}</div>
                        <div className="field partner-num-field">{data.Partner?.partnerNumber}</div>
                        <div className="field month-field">{fee.month} / {year}</div>
                        <div className="field amount-field">${fee.amount}</div>
                    </div>
                ))}
            </div>

            <button className="no-print print-button" onClick={() => window.print()}>
                Imprimir Planilla
            </button>
        </div>
    );
}
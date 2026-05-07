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
    const [errorMessage, setErrorMessage] = useState(null);

    const partnerNumber = searchParams.get('partnerNumber');
    const year = searchParams.get('year') || new Date().getFullYear();
    const semester = searchParams.get('semester') || "1";

    const generateFeesArray = (baseFees) => {
        const expectedMonths = semester === "1" 
            ? ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO"]
            : ["JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];

        const expanded = [];
        for (let i = 0; i < expectedMonths.length; i += 2) {
            const monthNameA = expectedMonths[i];
            const monthNameB = expectedMonths[i + 1];

            const dataA = baseFees?.find(f => f.month?.toUpperCase() === monthNameA);
            const dataB = baseFees?.find(f => f.month?.toUpperCase() === monthNameB);

            if (dataA) { expanded.push(dataA); expanded.push(dataA); }
            else { expanded.push({ empty: true }); expanded.push({ empty: true }); }

            if (dataB) { expanded.push(dataB); expanded.push(dataB); }
            else { expanded.push({ empty: true }); expanded.push({ empty: true }); }
        }
        return expanded;
    };

    useEffect(() => {
        const fetchBillingData = async () => {
            setLoading(true);
            setErrorMessage(null);
            try {
                const res = await fetch(`http://localhost:4000/api/v1/fees/reports/yearly-report?partnerNumber=${partnerNumber}&year=${year}&semester=${semester}`, {
                    headers: { "Authorization": `Bearer ${auth.token}` }
                });
                
                const result = await res.json();

                // Si el socio no existe (404 real de "no existe el recurso")
                if (res.status === 404 && !result.Partner) {
                    setErrorMessage("El socio no existe en la base de datos.");
                    setData(null);
                    return;
                }

                // Si hay un error de servidor
                if (!res.ok && res.status !== 404) {
                    throw new Error(result.msg || "Error de servidor");
                }
                
                // Si llegamos acá, aunque sea 404, si hay Partner o el result es exitoso, mostramos
                setData({ 
                    Partner: result.Partner || { fullName: "Socio " + partnerNumber, partnerNumber }, 
                    Fees: generateFeesArray(result.Fees || []) 
                });

            } catch (err) {
                setErrorMessage("Error de conexión con el servidor.");
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        if (partnerNumber) fetchBillingData();
    }, [partnerNumber, year, semester, auth.token]);

    if (loading) return <div className="no-print loading-msg">Cargando...</div>;
    
    // Solo mostramos error si realmente no pudimos obtener ni el nombre del socio
    if (errorMessage && !data) return (
        <div className="no-print error-box">
            <p>{errorMessage}</p>
        </div>
    );

    return (
        <div className="print-page">
            <div className="billing-grid-container" style={{ backgroundImage: `url(${billingImage})` }}>
                {data?.Fees.map((fee, index) => (
                    <div key={index} className="fee-card">
                        {!fee.empty && (
                            <>
                                <div className="field name-field">{data.Partner?.fullName}</div>
                                <div className="field partner-num-field">{data.Partner?.partnerNumber}</div>
                                <div className="field month-field">{fee.month} / {year}</div>
                                <div className="field amount-field">${fee.amount}</div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="no-print footer-controls">
                {data?.Fees.every(f => f.empty) ? (
                    <p className="info-msg">No hay cuotas impagas para este periodo.</p>
                ) : (
                    <button className="print-button" onClick={() => window.print()}>
                        Imprimir
                    </button>
                )}
            </div>
        </div>
    );
}
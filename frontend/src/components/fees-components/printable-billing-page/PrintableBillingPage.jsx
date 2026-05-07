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

    // --- MOCK DATA PARA 12 TROQUELES (6 meses duplicados) ---
    const generateMockFees = () => {
        // En 3 filas de 4 columnas entran 3 meses.
        // Si es semestre 1: Ene, Feb, Mar. Si es semestre 2: Jul, Ago, Sep.
        // (O puedes ajustar a 6 meses si la hoja es más larga, pero basándonos en la imagen son 3 filas)
        const months = semester === "1" 
            ? ["ENERO", "FEBRERO", "MARZO"]
            : ["JULIO", "AGOSTO", "SEPTIEMBRE"];
        
        const fees = [];
        months.forEach(m => {
            // Repetimos 4 veces el mismo mes para llenar la fila de la planilla física
            for(let i = 0; i < 4; i++) {
                fees.push({ month: m, amount: 1500 });
            }
        });
        return fees;
    };

    const mockData = {
        Partner: {
            name: "JUAN",
            surname: "PÉREZ",
            partnerNumber: partnerNumber || "0000"
        },
        Fees: generateMockFees()
    };

    useEffect(() => {
        const fetchBillingData = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/v1/fees/yearly-report?partnerNumber=${partnerNumber}&year=${year}&semester=${semester}`, {
                    headers: { "Authorization": `Bearer ${auth.token}` }
                });
                
                if (!res.ok) throw new Error("No se pudo conectar");
                
                const result = await res.json();
                
                // IMPORTANTE: Si la API solo te manda 6 meses, aquí los duplicamos 
                // para que llenen las 2 columnas de la planilla
                const duplicatedFees = [];
                result.Fees.forEach(f => {
                    duplicatedFees.push(f);
                    duplicatedFees.push(f);
                });
                
                setData({ ...result, Fees: duplicatedFees });
            } catch (err) {
                console.warn("Usando Mock Data para visualización");
                setData(mockData);
            } finally {
                setLoading(false);
            }
        };

        if (partnerNumber && year) {
            fetchBillingData();
        } else {
            setData(mockData);
            setLoading(false);
        }
    }, [partnerNumber, year, auth.token]);

    if (loading) return <p>Generando vista de impresión...</p>;

    // Ahora mapeamos exactamente 12 espacios (6 filas x 2 columnas)
    const feesToRender = new Array(12).fill(null).map((_, i) => {
        return data?.Fees && data.Fees[i] ? data.Fees[i] : { empty: true };
    });

    return (
        <div className="print-page">
            <div className="billing-grid-container" style={{ backgroundImage: `url(${billingImage})` }}>
                {feesToRender.map((fee, index) => (
                    <div key={index} className="fee-card">
                        {!fee.empty && (
                            <>
                                <div className="field name-field">
                                    {data.Partner?.name} {data.Partner?.surname}
                                </div>
                                <div className="field partner-num-field">
                                    {data.Partner?.partnerNumber}
                                </div>
                                <div className="field month-field">
                                    {fee.month} - {year}
                                </div>
                                <div className="field amount-field">
                                    ${fee.amount}
                                </div>
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
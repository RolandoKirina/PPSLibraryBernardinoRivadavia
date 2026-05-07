import "./feefiltercheckbox.css";
import { useState, useEffect } from "react";
import roles from "../../../auth/roles";
import { useAuth } from "../../../auth/AuthContext";

export default function FeeFilter({ formData, onChange }) {
  const { auth } = useAuth();
  const [paidFeeCount, setPaidFeeCount] = useState(null);

  const handleLocalChange = (e) => {
    const { name, value } = e.target;

    if (name === "sortBy" && value === "recent") {
      // Enviamos el comando para ordenar por año y mes desc
      onChange({
        target: {
          name: "multiple",
          values: {
            sortBy: "createdAt",
            direction: "desc"
          }
        }
      });
    }
    else if (name === "sortBy" && value === "idPartner") {
      onChange({
        target: {
          name: "multiple",
          values: {
            sortBy: "idPartner",
            direction: "desc"
          }
        }
      });
    }
    else {
      onChange(e);
    }
  };

  const fetchPaidFees = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/fees/paid-count?partnerNumber=${formData.partnerNumber}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setPaidFeeCount(data.count);
      } else {
        setPaidFeeCount(null);
      }
    } catch {
      setPaidFeeCount(null);
    }
  };

  useEffect(() => {
    if (formData.partnerNumber) {
      fetchPaidFees();
    } else {
      setPaidFeeCount(0);
    }
  }, [formData.partnerNumber]);

  return (
    <aside className="book-filter-aside">
      <div className="book-filter-form">
        <form onSubmit={(e) => e.preventDefault()}>
          <h3 className="titleh3">Filtro de cuotas</h3>

          {/* Nuevo Grupo de Ordenamiento */}
          <div className="book-form-input-group">
            <label htmlFor="sortBy">Ordenar por</label>
            <select
              id="sortBy"
              name="sortBy"
              value={formData.sortBy ?? ""}
              onChange={handleLocalChange}
              className="feefiltercheckbox-select"
            >
              <option value="">Seleccionar...</option>
              <option value="recent">Más recientes (Año/Mes)</option>
              <option value="idPartner">Número de Socio</option>
            </select>
          </div>

          <div className="book-form-input-group">
            {auth.role === roles.admin && (
              <>
                <div className="feefiltercheckbox">
                  <label htmlFor="status" className="feefiltercheckbox-label">
                    Socios con cuotas
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status ?? ""}
                    onChange={onChange}
                    className="feefiltercheckbox-select"
                  >
                    <option value="">Todas</option>
                    <option value="paid">Pagas</option>
                    <option value="unpaid">Impagas</option>
                  </select>
                </div>

                <div className="feefiltercheckbox">
                  <label htmlFor="feeStatus" className="feefiltercheckbox-label">
                    Estado cuotas
                  </label>
                  <select
                    id="feeStatus"
                    name="feeStatus"
                    value={formData.feeStatus ?? ""}
                    onChange={onChange}
                    className="feefiltercheckbox-select"
                  >
                    <option value="">Todas</option>
                    <option value="active">Habilitadas</option>
                    <option value="inactive">Deshabilitadas</option>
                  </select>
                </div>
              </>
            )}
          </div>

          {/* ... resto de tus inputs de fecha y búsqueda ... */}

          <div className="book-form-input-group">
            <h4>Fecha de pago</h4>
            <label>Mayor a: </label>
            <input
              type="date"
              name="paymentStartDate"
              value={formData.paymentStartDate ?? ""}
              onChange={onChange}
              disabled={formData.status === "unpaid"}
            />
            <label>Y Menor a: </label>
            <input
              type="date"
              name="paymentEndDate"
              value={formData.paymentEndDate ?? ""}
              onChange={onChange}
              disabled={formData.status === "unpaid"}
            />
          </div>

          {auth.role === roles.admin && (
            <>
              <div className="book-form-input-group">
                <label>Buscar por número de socio</label>
                <input
                  type="number"
                  name="partnerNumber"
                  min="0"
                  placeholder="Número socio"
                  value={formData.partnerNumber ?? ""}
                  onChange={onChange}
                />
              </div>

              <div className="book-form-input-group">
                <label>Buscar por nombre</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={formData.name ?? ""}
                  onChange={onChange}
                />
              </div>

              <div className="book-form-input-group">
                <label>Buscar por apellido</label>
                <input
                  type="text"
                  name="surname"
                  placeholder="Apellido"
                  value={formData.surname ?? ""}
                  onChange={onChange}
                />
              </div>


              <div className="book-form-input-group">
                <label>Buscar por fecha de inscripción de socio</label>
                <input
                  type="Date"
                  name="registrationDate"
                  placeholder="Fecha"
                  value={formData.registrationDate ?? ""}
                  onChange={onChange}
                />
              </div>

              <div className="book-form-input-group">
                <label>Buscar por observación de cuota</label>
                <input
                  type="text"
                  name="observation"
                  placeholder="Observación"
                  value={formData.observation ?? ""}
                  onChange={onChange}
                />
              </div>
              <div className="book-form-input-group">
                <label className="color-secondary">
                  Total de cuotas pagas del socio N° {formData.partnerNumber} = {paidFeeCount ?? 0}
                </label>
              </div>
            </>
          )}

          <div className="book-form-input-group">
            <h4>Periodo de la cuota</h4>
            <label>Desde: </label>
            <input
              type="month"
              name="periodStartDate"
              value={formData.periodStartDate ?? ""}
              onChange={onChange}
            />
            <label>Hasta: </label>
            <input
              type="month"
              name="periodEndDate"
              value={formData.periodEndDate ?? ""}
              onChange={onChange}
            />
          </div>

          <div className="book-form-input-group">
            <h4>Fecha de creación de cuota</h4>
            <label>Desde: </label>
            <input
              type="month"
              name="creationStartDate"
              value={formData.creationStartDate ?? ""}
              onChange={onChange}
            />
            <label>Hasta: </label>
            <input
              type="month"
              name="creationEndDate"
              value={formData.creationEndDate ?? ""}
              onChange={onChange}
            />
          </div>
        </form>
      </div>
    </aside>
  );
}
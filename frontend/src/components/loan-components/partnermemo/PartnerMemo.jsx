//popup en seccion prestamo
import './PartnerMemo.css';
import { useEffect } from 'react';
import { useEntityManagerAPI } from '../../../hooks/useEntityManagerAPI';
import { useState } from 'react';

export default function PartnerMemo({ partnerNumber }) {
  const { items, getItems } = useEntityManagerAPI("partners/partner-number/" + partnerNumber);

  useEffect(() => {
    getItems();
  }, [partnerNumber]);

  return (
    <div className="partner-memo">
      <p>
        Información Nota/Observación del Socio:{" "}
        {Array.isArray(items)
          ? items[0]?.observations || "No se encontró"
          : items?.observations || "No se encontró"}
      </p>
    </div>
  );
}

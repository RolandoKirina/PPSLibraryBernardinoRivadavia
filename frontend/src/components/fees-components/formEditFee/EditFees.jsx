import { useState } from "react";
import Btn from "../../common/btn/Btn.jsx";
import  "./EditFees.css";
import { useEntityManagerAPI } from "../../../hooks/useEntityManagerAPI.js";

  export default function EditFees({ selectedFee }) {

  const [formState, setFormState] = useState({
    paid: selectedFee?.paid ?? false,
    amount: selectedFee?.amount ?? 0,
    date_of_paid: selectedFee?.date_of_paid ?? "",
    observation: selectedFee?.observation ?? "",
  });
  const [error,setError] = useState(null);
    const entityManagerApi = useEntityManagerAPI("fees");
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      const isPaid = formState.paid === "true" || formState.paid === true;
      const hasDate = formState.date_of_paid && formState.date_of_paid.trim() !== "";

      if (!isPaid && hasDate) {
        setSuccess(null)
        setError("No podés marcar la cuota como 'Impaga' si tiene una fecha de pago.");
        return;
      }

      if (isPaid && !hasDate) {
        setSuccess(null)
        setError("Si la cuota está marcada como 'Pagada', debe tener una fecha de pago.");
        return;
      }

      setError(null);  
      setSuccess(null); 

      if(!error){
        const updatedFee = {
          feeid: selectedFee.feeid,
          amount: Number(formState.amount),
          paid: formState.paid === "true" || formState.paid === true,
          date_of_paid: formState.date_of_paid,
          observation: formState.observation,
        };
        try {
              const updated = await entityManagerApi.updateItem(selectedFee.feeid, updatedFee);
              if (updated) {
                 setError(null);
                 setSuccess("Cuota actualizada con éxito.");
              }
        } 
        catch (error) {
           setSuccess(null); 
           setError("Error al editar la cuota.");
        }
      }
      
    };

  

  return (
    <form className="edit-fees-form" onSubmit={handleSubmit}>

      <h2>Editar cuota</h2>
       <div className="titlefee">
            <h3>Cuota n° {selectedFee.feeid} </h3>
        </div>
      <div>
       
       
        <div className="form-group">
          <label htmlFor="amount">Monto</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formState.amount}
             disabled={selectedFee?.paid === true}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="paid">Estado</label>
          <select
            id="paid"
            name="paid"
            value={formState.paid}
            onChange={handleChange}
            disabled={selectedFee.paid === true}
          >
            <option value={true}>Pagada</option>
            <option value={false}>Impaga</option>
          </select>
        </div>
      </div>

      <div>
        <div className="form-group">
          <label htmlFor="date_of_paid">Fecha de Pago</label>
          <input
            type="date"
            id="date_of_paid"
            name="date_of_paid"
            className="date"
            value={formState.date_of_paid}
            onChange={handleChange}
            disabled={selectedFee.paid === true}
          />
        </div>

        <div className="form-group">
          <label htmlFor="observation">Observación</label>
          <input
            type="text"
            id="observation"
            name="observation"
            value={formState.observation}
            onChange={handleChange}
          />
        </div>
      </div>

    {error && (
        <p className={`error-message ${error ? "visible" : ""}`}>
          {error}
        </p>
      )}
      {success && (
        <p className={`success-message ${success ? "visible" : ""}`}>
          {success}
        </p>
      )}
      <div className="form-actions">
        <Btn
          variant="primary"
          text="Guardar"
          type="submit"
        />
      </div>
    
    </form>
    
  );
}

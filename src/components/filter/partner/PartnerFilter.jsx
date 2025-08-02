import { useState } from "react";
import './PartnerFilter.css';
export default function PartnerFilter (){

    const [formData, setFormData] = useState({
        type: 'assets',
        unpaidfees: '',
        pendingbooks: ''

      });
      
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData((prev) => {
        const updated = { ...prev, [name]: newValue };
        console.log('Campo modificado:', name, '→', newValue);
        console.log('Nuevo estado del form:', updated);
        return updated;
        });
    };
    return (
        <aside className="filter-aside">
            
        <div className="filter-form">
            
            <form>
            <h3 className='titleh3'>Filtro de socios</h3>
            
            <div className="form-checkbox-group">
                <h4>Estado del socio</h4>
                {['all', 'assets', 'Dismissed'].map((val) => (
                <label key={val}>
                    <input
                    type="radio"
                    name="type"
                    value={val}
                    checked={formData.type === val}
                    onChange={handleChange}
                    />
                    {{
                    assets: 'Activos',
                    Dismissed: 'Dados de baja',
                    }[val] || 'Todos'}              

                    </label>
                ))}
            </div> 
            <div className="form-input-group">
                <label>Cuotas impagas </label>
                <input type="number" name="unpaidfees" max="15"/>
            </div>

            <div className="form-input-group">
                <label>Libros pendientes </label>
                <input type="number" name="pendingbooks" max="15" />
            </div>

            </form>
        </div>
        </aside>
        )
}
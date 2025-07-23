import './GenericForm.css';
import SaveIcon from '../../../assets/img/save-icon.svg';
import { useState } from 'react';

export default function GenericForm({fields, onSubmit, title}) {
    const [formState, setFormState] = useState({});

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target; //tomar valores del input que se esta modificando actualmente
        setFormState({
            ...formState, //añadir a la nueva version del form todos los datos anteriores que no fueron modificados
            [name]: type === 'checkbox' ? checked : value    //guardar el 'name'(el valor) del input si no es un checkbox. si lo es, entonces coloca checked en true
        })
    }

    return (
        <>
            <div className="generic-form-container">
                <div className='generic-form'>
                    {title &&
                    <div className='generic-form-title'>
                        <h2>{title}</h2>
                    </div>
                    }
                    <div className='generic-inputs-width'>
                       
                            {fields.map((field, idx) => {
                                const value = formState[field.name] || ''; // tomar el valor del name del input actual que se esta renderizando
                                const isCheckbox = field.type === 'checkbox'; //tomar true o false en base a si el input actual es un checkbox
                                const isSelect = field.type === 'select'; //tomar true o false en base a si el input actual es un select

                                return (
                                <div
                                    key={idx}
                                    className={isCheckbox ? 'generic-checkbox' : ''}
                                >
                                    <label>
                                    {isCheckbox ? (
                                        <>
                                        <input
                                            type='checkbox'
                                            name={field.name}
                                            checked={!!formState[field.name]} //si algun input de checkbox se vuelve true porque fue seleccionado, entonces le añade 'checked'
                                            onChange={handleChange}
                                        />
                                        {field.label}
                                        </>
                                    ) : isSelect ? (
                                        <>
                                        {field.label}
                                        <select
                                            name={field.name}
                                            value={value}
                                            onChange={handleChange}
                                        >
                                            {field.options.map((opt, i) => (
                                            <option key={i} value={opt.value}>
                                                {opt.label}
                                            </option>
                                            ))}
                                        </select>
                                        </>
                                    ) : (
                                        <>
                                        {field.label}
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={value}
                                            onChange={handleChange}
                                        />
                                        </>
                                    )}
                                    </label>
                                </div>
                                );
                            })}
                        
                    </div>

                    <div className='generic-btn-save'>
                        <button onClick={() => onSubmit(formState)} alt='Guardar'><img src={SaveIcon}/>Guardar</button>
                    </div>

                </div>
            </div>
        </>
    )
}
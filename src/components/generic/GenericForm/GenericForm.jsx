import './GenericForm.css';
import SaveIcon from '../../../assets/img/save-icon.svg';
import { useState } from 'react';
import Btn from '../../btn/Btn';

export default function GenericForm({ fields, onSubmit, title, children, className }) {
  const [formState, setFormState] = useState({});

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const incrementCounter = (name, step) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: Math.max(0, (prevState[name] || 0) + step)
    }));
  };

  return (
  <div className={`generic-form-container${className ? ` ${className}` : ''}`}>      
    <div className="generic-form">
      {title && (
        <div className="generic-form-title">
          <h2>{title}</h2>
        </div>
      )}

      {children}

      <div className="generic-inputs-width">
        {fields.map((field, idx) => {
          const value = formState[field.name] || '';
          const isCheckbox = field.type === 'checkbox';
          const isSelect = field.type === 'select';
          const isCounter = field.type === 'counter';

          return (
            <div
              key={idx}
              className={isCheckbox ? 'generic-checkbox' : 'simple-inputs input'}
            >
              {isCheckbox ? (
                <label>
                  <input
                    type="checkbox"
                    name={field.name}
                    checked={!!formState[field.name]}
                    onChange={handleChange}
                  />
                  {field.label}
                </label>
              ) : isSelect ? (
                <label>
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
                </label>
              ) : isCounter ? (
                <div className="generic-counter-field">
                  <label>{field.label}</label>
                  <div className="counter-controls">
                    <button
                      type="button"
                      onClick={() => incrementCounter(field.name, -1)}
                    >
                      –
                    </button>
                    <span>{formState[field.name] || 0}</span>
                    <button
                      type="button"
                      onClick={() => incrementCounter(field.name, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <label htmlFor={field.name}>{field.label}</label>
                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    value={value}
                    onChange={handleChange}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="generic-btn-save">
        <Btn
          variant={'primary'}
          text={'Guardar'}
          onClick={() => onSubmit(formState)}
          icon={<img src={SaveIcon} alt="Guardar" />}
        />
        {/* <button onClick={() => onSubmit(formState)}  >
          <img src={SaveIcon} alt="Guardar"/>
          Guardar
        </button> */}
      </div>
    </div>
  </div>
);

}

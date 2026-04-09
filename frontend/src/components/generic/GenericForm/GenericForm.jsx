import './GenericForm.css';
import SaveIcon from '../../../assets/img/save-icon.svg';
import { useState } from 'react';
import Btn from '../../common/btn/Btn';

export default function GenericForm({ fields, onSubmit, title, children, className, error, successMessage }) {
  const [formState, setFormState] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value
    });
  };

const handleSave = async () => {
  if (isSubmitting) return;

  setIsSubmitting(true);

  try {
    await onSubmit(formState);
  } catch (err) {
    console.error(err);
  } finally {
    setIsSubmitting(false); 
  }
};

  const incrementCounter = (name, step) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: Math.max(0, (prevState[name] || 0) + step)
    }));
  };

  const renderField = (field, idx) => {
    const value = formState[field.name] || '';
    const isCheckbox = field.type === 'checkbox';
    const isSelect = field.type === 'select';
    const isCounter = field.type === 'counter';

    const renderLabel = (text) => (
      <span className="label-text">
        {text}
        {field.required && <span className="required"> *</span>}
      </span>
    );

    return (
      <div
        key={idx}
        className={isCheckbox ? 'generic-checkbox input' : 'simple-inputs input'}
      >
        {isCheckbox ? (
          <label>
            <input
              type="checkbox"
              name={field.name}
              checked={!!formState[field.name]}
              onChange={handleChange}
            />
            {renderLabel(field.label)}
          </label>
        ) : isSelect ? (
          <label>
            {renderLabel(field.label)}
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
            <label>{renderLabel(field.label)}</label>
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
            <label htmlFor={field.name}>{renderLabel(field.label)}</label>
            <input
              id={field.name}
              type={field.type}
              name={field.name}
              value={value}
              onChange={handleChange}
              required={field.required} // ✅ ahora sí funciona
            />
          </>
        )}
      </div>
    );
  };

  return (
    <div className={`generic-form-container${className ? ` ${className}` : ''}`}>
      
      <form
        className="generic-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        {title && (
          <div className="generic-form-title">
            <h2>{title}</h2>
          </div>
        )}

        {children}

        <div className={`generic-inputs-width ${Array.isArray(fields[0]) ? 'row-layout' : 'column-layout'}`}>
          {Array.isArray(fields[0])
            ? fields.map((row, rowIdx) => (
              <div key={rowIdx} className="input-row">
                {row.map((field, idx) => renderField(field, idx))}
              </div>
            ))
            : (
              <div className="input-column">
                {fields.map((field, idx) => renderField(field, idx))}
              </div>
            )
          }
        </div>
        
        <div>{error && <p className="error-message">{error}</p>}</div>

        {successMessage && (
          <div className='sucess-message'>
            <p>{successMessage}</p>
          </div>
        )}

        <div className="generic-btn-save">
          <Btn
            variant={'primary'}
            text={isSubmitting ? 'Guardando...' : 'Guardar'}
            type="submit" 
            disabled={isSubmitting}
            icon={
              <img
                src={SaveIcon}
                alt="Guardar"
                style={{ opacity: isSubmitting ? 0.5 : 1 }}
              />
            }
          />
        </div>

      </form>
    </div>
  );
}
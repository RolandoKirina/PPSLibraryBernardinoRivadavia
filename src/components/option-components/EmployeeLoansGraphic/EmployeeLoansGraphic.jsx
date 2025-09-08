import Btn from '../../common/btn/Btn';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { mockLoans } from '../../../data/mocks/loans';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function EmployeeLoansGraphic() {


const [formValues, setFormValues] = useState({});
const [showChart, setShowChart] = useState(false);

function countQuantityAllLoansEmployee() {
  const { afterDateFrom, beforeDateTo } = formValues;

  if (!afterDateFrom || !beforeDateTo) {
    return mockLoans.length;
  }

  const dateAfter = new Date(afterDateFrom);
  const dateBefore = new Date(beforeDateTo);

  return mockLoans.filter((loan) => {
    const loanDate = new Date(loan.plannedDate);
    return loanDate >= dateAfter && loanDate <= dateBefore;
  }).length;
}


function isWithinRange(loan) {
  if (!formValues.afterDateFrom || !formValues.beforeDateTo){
    return true;
  } 
  const loanDate = new Date(loan.plannedDate);
  const dateAfter = new Date(formValues.afterDateFrom);
  const dateBefore = new Date(formValues.beforeDateTo);
  return loanDate >= dateAfter && loanDate <= dateBefore;
}

function countQuantityLateLoansEmployee(){
  return mockLoans.filter((loan) => isitLate(loan) && isWithinRange(loan)).length;}


function countQuantityNotReturnedLoansEmployee(){
  return mockLoans.filter((loan) => isNotReturned(loan) && isWithinRange(loan)).length;


}
function isitLate(loan){
     if (!loan.returnedDate || !loan.plannedDate) {
        return false;
    }
    const planned = new Date(loan.plannedDate);
    const returned = new Date(loan.returnedDate);
    return returned > planned;
        
}



function isNotReturned(loan){

  return !loan.returnedDate || loan.returnedDate === '';
}




  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      if (data[key]) {
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    });

    setFormValues(data);
    setShowChart(true);
    console.log("Formulario:", data);
  };

    const pieData = {
    labels: ['Devueltos atrasados', 'Sin devolver', 'Todos'],
    datasets: [
      {
        data: [formValues.ignoreLossDate === 'devueltos' ? countQuantityLateLoansEmployee(): 0,
               formValues.ignoreLossDate === 'sinDevolver' ? countQuantityNotReturnedLoansEmployee() : 0,
               formValues.ignoreLossDate === 'todos' ? countQuantityAllLoansEmployee() : 0],
        backgroundColor: ['#F4A261', '#E76F51', '#2A9D8F'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

return (
    <div className='lost-books-container'>
      <div className='lost-books-content'>
        <div className='lost-books-filters'>
          <form onSubmit={handleSubmit}>
            <div className='lost-books-filter-option'>
        

              <div className='filter-options'>
                <div className='input column-input'>
                  <label htmlFor='afterDateFrom'>Fecha mayor a:</label>
                  <input type="date" name="afterDateFrom" id="afterDateFrom" />
                </div>
              </div>

              <div className='filter-options'>
                <div className='input column-input'>
                  <label htmlFor='beforeDateTo'>Fecha menor a:</label>
                  <input type="date" name="beforeDateTo" id="beforeDateTo" />
                </div>
              </div>

              <div className='filter-options'>
                <div className='input column-input'>
                  <label className='exclude'>
                    <input type="radio" name="ignoreLossDate" value="todos" />
                    Todos
                  </label>
                </div>
              </div>

              <div className='filter-options'>
                <div className='input column-input'>
                  <label className='exclude'>
                    <input type="radio" name="ignoreLossDate" value="devueltos" />
                    Devueltos atrasados
                  </label>
                </div>
              </div>

              <div className='filter-options'>
                <div className='input column-input'>
                  <label className='exclude'>
                    <input type="radio" name="ignoreLossDate" value="sinDevolver" />
                    Sin devolver
                  </label>
                </div>
              </div>

              <div className='lost-books-btn'>
                <Btn variant={'primary'} text={'Generar'} type="submit" />
              </div>
            </div>
          </form>
        </div>

      </div>

      <div>
            {showChart && (
                        <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
                        <h3 style={{ textAlign: 'center' }}>Distribución de préstamos</h3>
                        <Pie data={pieData} />
                    </div>
                    
                    )}
      </div>
      
    </div>
  );
}
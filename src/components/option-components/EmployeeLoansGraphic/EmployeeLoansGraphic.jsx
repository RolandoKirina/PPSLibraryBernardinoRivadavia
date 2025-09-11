import Btn from '../../common/btn/Btn';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { mockLoans } from '../../../data/mocks/loans';
import "./EmployeeLoansGraphic.css";
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

function getLoanCountsByEmployee() {
  const counts = {};

  mockLoans.forEach((loan) => {
    if (isWithinRange(loan)) {
      const name = loan.employee;
      counts[name] = (counts[name] || 0) + 1;
    }
  });

  return counts;
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
const employeeCounts = getLoanCountsByEmployee();

const pieData = {
  labels: Object.keys(employeeCounts),
  datasets: [
    {
      data: Object.values(employeeCounts),
      backgroundColor: ['#2A9D8F', '#E76F51', '#F4A261', '#264653', '#A8DADC'], // Podés agregar más colores si hay más empleados
      borderColor: '#fff',
      borderWidth: 2,
    },
  ],
};
return (
    <div className='filter-graphic-container'>
      
        <div className='filter-graphic'>
          <form onSubmit={handleSubmit}>
        
            <div>
                <div className='filter-options'>
                  <div className='input'>
                    <label htmlFor='afterDateFrom'>Fecha mayor a:</label>
                    <input type="date" name="afterDateFrom" id="afterDateFrom" className='input-filter'/>
                  </div>
                </div>

                <div className='filter-options'>
                  <div className='input'>
                    <label htmlFor='beforeDateTo'>Fecha menor a:</label>
                    <input type="date" name="beforeDateTo" id="beforeDateTo" />
                  </div>
                </div>


            </div>
            <div>
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
            </div>
          
            {showChart && (
              <div className='container-graphic'>
  <div className='graphic'>
                        <div>
                          
                          <h3>Distribución de préstamos</h3>
                        </div>
                        <div style={{ width: '15em', height: '15em', justifyContent: 'center'}}>
                                                  <Pie data={pieData} />

                        </div>
                    </div>
                    
              </div>
            
                
                    )}
     
                <div className='btn-graphic-filter'>
                <Btn variant={'primary'} text={'Generar'} type="submit" />
              </div>
          </form>
        </div>

          


      </div>

     
      
   
  );
}
import Btn from '../../common/btn/Btn';
import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
//import { mockLoans } from '../../../data/mocks/loans';
import "./EmployeeLoansGraphic.css";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function EmployeeLoansGraphic() {


  const [formValues, setFormValues] = useState({});
  const [showChart, setShowChart] = useState(false);
  const [error, setError] = useState("");
  const [employeeCounts, setEmployeeCounts] = useState({});


  useEffect(() => {
    if (!error && showChart) {
      const counts = getLoanCountsByEmployee();
      setEmployeeCounts(counts);
    }
  }, [formValues, error, showChart]);

  let inputs = ["sinDevolver", "devueltos"];
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
        if (formValues.ignoreLossDate === inputs[1] && !isitLate(loan)) {
          return;
        }
        if (formValues.ignoreLossDate === inputs[0] && !isNotReturned(loan)) {
          return;
        }
        const name = loan.employee;
        counts[name] = (counts[name] || 0) + 1;
      }
    });

    return counts;
  }


  function isWithinRange(loan) {
    const loanDate = new Date(loan.plannedDate);
    const dateAfter = formValues.afterDateFrom ? new Date(formValues.afterDateFrom) : null;
    const dateBefore = formValues.beforeDateTo ? new Date(formValues.beforeDateTo) : null;

    if (dateAfter && dateBefore) {
      return loanDate >= dateAfter && loanDate <= dateBefore;
    }

    if (dateAfter) {

      return loanDate >= dateAfter;
    }

    if (dateBefore) {

      return loanDate <= dateBefore;
    }

    // Sin filtros → devuelve todo
    return true;
  }

  function countQuantityLateLoansEmployee() {
    return mockLoans.filter((loan) => isitLate(loan) && isWithinRange(loan)).length;
  }


  function countQuantityNotReturnedLoansEmployee() {
    return mockLoans.filter((loan) => isNotReturned(loan) && isWithinRange(loan)).length;


  }
  function isitLate(loan) {
    if (!loan.returnedDate || !loan.plannedDate) {
      return false;
    }
    const planned = new Date(loan.plannedDate);
    const returned = new Date(loan.returnedDate);
    return returned > planned;

  }



  function isNotReturned(loan) {

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


    if (data.afterDateFrom && data.beforeDateTo) {
      const dateAfter = new Date(data.afterDateFrom);
      const dateBefore = new Date(data.beforeDateTo);

      if (dateAfter > dateBefore) {
        setError("La fecha 'mayor a' no puede ser posterior a la fecha 'menor a'");
        setShowChart(false);
        return;
      }


    }

    setError(""); // limpio error si está todo bien
    setFormValues(data);
    setShowChart(true);
  };



  const pieData = {
    labels: Object.keys(employeeCounts),
    datasets: [
      {
        data: Object.values(employeeCounts),
        backgroundColor: ['#2A9D8F', '#E76F51', '#F4A261', '#264653', '#A8DADC'],
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
                <input type="date" name="afterDateFrom" id="afterDateFrom" className='input-filter' />
              </div>
            </div>

            <div className='filter-options'>
              <div className='input'>
                <label htmlFor='beforeDateTo'>Fecha menor a:</label>
                <input type="date" name="beforeDateTo" id="beforeDateTo" className='input-filter' />
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
          {error ? (
            <div style={{ color: "red", fontWeight: "bold", marginTop: "1em", justifyContent: 'center' }}>
              {error}
            </div>
          ) : (
            showChart && Object.keys(employeeCounts).length > 0 ? (
              <div className='pie-graphic'>
                <Pie data={pieData} />
              </div>
            ) : (
              showChart && (
                <p style={{ marginTop: "1em", textAlign: 'center' }}>
                  No hay préstamos que coincidan con los filtros seleccionados.
                </p>
              )
            )
          )}




          <div className='btn-graphic-filter'>
            <Btn variant={'primary'} text={'Generar'} type="submit" />
          </div>
        </form>
      </div>




    </div>




  );
}
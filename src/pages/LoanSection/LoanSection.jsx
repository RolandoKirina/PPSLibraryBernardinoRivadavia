import LoanFilter from "../../components/loanfilter/LoanFilter";
import './LoanSection.css';
import DeleteIcon from '../../assets/img/delete-icon.svg';
import EditIcon from '../../assets/img/edit-icon.svg';
import DetailsIcon from '../../assets/img/details-icon.svg';

export default function LoanSection() {
    return (
        
//filters
//loans main title
//laon table
//table pagination
//buttons        
        <>
            <main>
               <LoanFilter />
               <section className="loan-section">
                <div className="loan-title">
                    <h2>Listado de Prestamos</h2>
                </div>
                <div className="loans">
                    <div className="loan-table-options">
                        <div className="loans-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre Lector</th>
                                        <th>Titulo</th>
                                        <th className="loans-table-buttons-columns">Eliminar Prestamo</th>
                                        <th className="loans-table-buttons-columns">Editar Prestamo</th>
                                        <th className="loans-table-buttons-columns">Detalles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Carolina Gómez</td>
                                        <td class="loan-title-cell">
                                        La sombra del viento La sombra del viento La sombra del viento
                                        </td>
                                        <td class="table-buttons">
                                        <button class="table-button"><img src={DeleteIcon}/></button>
                                        </td>
                                        <td class="loan-title-cell">
                                        <button class="table-button"><img src={EditIcon}/></button>
                                        </td>
                                       <td class="loan-title-cell">
                                      <button class="table-button"><img src={DetailsIcon}/></button>
                                        </td>
                                    </tr>
                                    <tr className="pair-row">
                                        <td>Carolina Gómez</td>
                                        <td class="loan-title-cell">
                                        La sombra del viento La sombra del viento La sombra del viento
                                        </td>
                                        <td class="table-buttons">
                                        <button class="table-button"><img src={DeleteIcon}/></button>
                                        </td>
                                        <td class="loan-title-cell">
                                        <button class="table-button"><img src={EditIcon}/></button>
                                        </td>
                                       <td class="loan-title-cell">
                                        <button class="table-button"><img src={DetailsIcon}/></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Carolina Gómez</td>
                                        <td class="loan-title-cell">
                                        La sombra del viento La sombra del viento La sombra del viento
                                        </td>
                                        <td class="table-buttons">
                                        <button class="table-button"><img src={DeleteIcon}/></button>
                                        </td>
                                        <td class="loan-title-cell">
                                        <button class="table-button"><img src={EditIcon}/></button>
                                        </td>
                                       <td class="loan-title-cell">
                                        <button class="table-button"><img src={DetailsIcon}/></button>
                                        </td>
                                    </tr>
                                     <tr className="pair-row">
                                        <td>Carolina Gómez</td>
                                        <td>
                                        La sombra del viento La sombra del viento La sombra del viento
                                        </td>
                                        <td class="table-buttons">
                                        <button class="table-button"><img src={DeleteIcon}/></button>
                                        </td>
                                        <td class="loan-title-cell">
                                        <button class="table-button"><img src={EditIcon}/></button>
                                        </td>
                                       <td class="loan-title-cell">
                                        <button class="table-button"><img src={DetailsIcon}/></button>
                                        </td>
                                    </tr>
                                </tbody>
                               
                            </table>
                        </div>
                    </div>
                </div>
               </section>
            </main>
        
        </>

    );
}
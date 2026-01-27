import { useState, useEffect } from 'react';

import BackviewBtn from '../../common/backviewbtn/BackviewBtn';
import Btn from '../../common/btn/Btn';
import SaveIcon from '../../../assets/img/save-icon.svg';
import PopUp from '../../common/popup-table/PopUp';
import ConfirmMessage from '../../common/confirmMessage/ConfirmMessage';
import { Table } from '../../common/table/Table';

import DeleteIcon from '../../../assets/img/delete-icon.svg';
import AddBookIcon from '../../../assets/img/add-book-icon.svg';

export default function AddMaterialGroup({
  method,
  createGroupItem,
  groupSelected,
  errorMessage
}) {
  const BASE_URL = "http://localhost:4000/api/v1";

  const chunkSize = 100;
  const rowsPerPage = 5;

  const isUpdate = method === 'update';

  const [popupView, setPopupView] = useState('default');
  const [confirmSavePopup, setConfirmSavePopup] = useState(false);

  const [group, setGroup] = useState('');
  const [amount, setAmount] = useState('');

  const [bookTypes, setBookTypes] = useState([]);

  const [libraryBookTypes, setLibraryBookTypes] = useState([]);
  const [totalLibraryBookTypes, setTotalLibraryBookTypes] = useState(0);
  const [loadingBookTypes, setLoadingBookTypes] = useState(false);

  const [validateError, setValidateError] = useState('');

  const [offsetActual, setOffsetActual] = useState(0);
  const [resetPageTrigger, setResetPageTrigger] = useState(0);


  useEffect(() => {
    getLibraryBookTypes({ limit: chunkSize, offset: 0 });

    if (isUpdate && groupSelected) {
      setGroup(groupSelected.group ?? '');
      setAmount(groupSelected.maxAmount ?? '');

      setBookTypes(
        groupSelected.BookTypeGroups?.map(btGroup => ({
          BookTypeId: btGroup.bookTypeId,
          typeName: btGroup.BookType?.typeName,
          loanDays: btGroup.BookType?.loanDays
        })) || []
      );
    }
  }, [isUpdate, groupSelected]);


  const getLibraryBookTypes = async (filters = {}, append = false) => {
    setLoadingBookTypes(true);

    const queryParams = new URLSearchParams(filters).toString();
    const res = await fetch(`${BASE_URL}/book-types?${queryParams}`);
    const { rows, count } = await res.json();

    setTotalLibraryBookTypes(count);
    setLibraryBookTypes(prev => append ? [...prev, ...rows] : rows);

    setLoadingBookTypes(false);
  };

  async function handleChangePage(page) {
    const lastItemIndex = page * rowsPerPage;

    if (libraryBookTypes.length < totalLibraryBookTypes && lastItemIndex > libraryBookTypes.length) {
      await getLibraryBookTypes(
        { limit: chunkSize, offset: libraryBookTypes.length },
        true
      );
    }
  }

  function handleAddBookType(bookType) {
    const id = bookType.bookTypeId ?? bookType.BookTypeId;

    setBookTypes(prev => {
      const exists = prev.some(
        bt => (bt.bookTypeId ?? bt.BookTypeId) === id
      );
      if (exists) return prev;

      setValidateError('');

      return [
        ...prev,
        {
          bookTypeId: id,
          typeName: bookType.typeName,
          loanDays: bookType.loanDays
        }
      ];
    });
  }


  function handleDeleteBookType(bookType) {
    const idToDelete = bookType.BookTypeId ?? bookType.bookTypeId;

    setBookTypes(prev =>
      prev.filter(bt =>
        (bt.BookTypeId ?? bt.bookTypeId) !== idToDelete
      )
    );
  }


  function validateBeforeSave() {
    if (!group || !amount) {
      setValidateError('Debe completar el grupo y la cantidad.');
      return false;
    }

    if (!bookTypes.length) {
      setValidateError('Debe agregar al menos un tipo de material.');
      return false;
    }

    setValidateError('');
    return true;
  }

  function handleSave() {
    if (!validateBeforeSave()) return;

    const normalizedBookTypes = bookTypes
      .map(bt => ({
        bookTypeId: bt.bookTypeId ?? bt.BookTypeId,
        loanDays: bt.loanDays
      }))
      .filter(bt => bt.bookTypeId); 

      console.log(normalizedBookTypes);

    createGroupItem({
      group,
      amount,
      normalizedBookTypes
    });

    setConfirmSavePopup(false);
  }

  const libraryColumns = [
    { header: 'Nombre', accessor: 'typeName' },
    { header: 'Dias prestamo', accessor: 'loanDays' },
    {
      header: 'Agregar',
      accessor: 'add',
      render: (_, row) => (
        <button
          type="button"
          className="button-table"
          onClick={() => handleAddBookType(row)}
        >
          <img src={AddBookIcon} alt="Agregar" />
        </button>
      )
    }
  ];

  const selectedColumns = [
    { header: 'Nombre', accessor: 'typeName' },
    { header: 'Dias prestamo', accessor: 'loanDays' },
    {
      header: 'Borrar',
      accessor: 'delete',
      render: (_, row) => (
        <button
          type="button"
          className="button-table"
          onClick={() => handleDeleteBookType(row)}
        >
          <img src={DeleteIcon} alt="Borrar" />
        </button>
      )
    }
  ];

  return (
    <div className='add-loan-form-container'>
      {popupView === 'default' && (
        <div className='add-loan-form-content'>
          <form>
            <h2>Datos del grupo</h2>

            <div className='add-loan-form-inputs'>
              <div className='input'>
                <label>Grupo *</label>
                <input
                  type="text"
                  value={group}
                  onChange={e => setGroup(e.target.value)}
                />
              </div>

              <div className='input'>
                <label>Cantidad *</label>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className='lend-books-container'>
              <h3>Tipos de material asociados</h3>

              <Table
                columns={selectedColumns}
                data={bookTypes}
                totalItems={bookTypes.length}
              >
                <div className='add-book-to-lend'>
                  <Btn
                    variant='primary'
                    text='Agregar material'
                    onClick={() => setPopupView('addBook')}
                    icon={<img src={AddBookIcon} alt="add" />}
                  />
                </div>
              </Table>
            </div>

            {validateError && <p className="error-text">{validateError}</p>}
            {errorMessage && <p className="error-text">{errorMessage}</p>}

            <Btn
              type="button"
              variant="primary"
              text="Guardar"
              icon={<img src={SaveIcon} alt="save" />}
              onClick={() => setConfirmSavePopup(true)}
            />
          </form>

          {confirmSavePopup && (
            <PopUp title="Confirmar" onClick={() => setConfirmSavePopup(false)}>
              <ConfirmMessage
                text="¿Está seguro de guardar los cambios?"
                closePopup={() => setConfirmSavePopup(false)}
                onConfirm={() => {
                  handleSave();
                  setConfirmSavePopup(false);
                }}
              />
            </PopUp>
          )}
        </div>
      )}

      {popupView === 'addBook' && (
        <>
          <BackviewBtn menu="default" changeView={setPopupView} />

          <div className='author-books-container'>
            <div className='library-books'>
              <h3>Tipos de material disponibles</h3>
              <Table
                columns={libraryColumns}
                data={libraryBookTypes}
                totalItems={totalLibraryBookTypes}
                loading={loadingBookTypes}
                handleChangePage={handleChangePage}
                resetPageTrigger={resetPageTrigger}
              />
            </div>

            <div className='author-books'>
              <h3>Seleccionados</h3>
              <Table
                columns={selectedColumns}
                data={bookTypes}
                totalItems={bookTypes.length}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

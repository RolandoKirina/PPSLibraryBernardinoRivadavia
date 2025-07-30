import './GenericSection.css';
import PopUp from '../../popup-table/PopUp2';
import { Table } from '../../table/Table';

export default function GenericSection({title, filters, columns, data, popups, actions, children}) {
    return (
        <>
            <section className='genericsection'>
                {filters && (
                    filters
                )}

                <div className="genericinf">
                    <div className="generic-title">
                            <h2>{title}</h2> 
                    </div>
                    {children}
        {columns && (
        <Table columns={columns} data={data}>
         
                      

            {popups && popups.map(({ condition, title, className, content, close, variant }, idx) => (
                    condition && (
                        <PopUp
                        key={idx}
                        title={title}
                        className={className || ''}
                        onClick={close}
                        {...(variant === 'delete' && { variant: 'delete' })}
                        >
                        {content}
                        </PopUp>
                    )
                    ))}
                        <div className='actions'>
                            {actions && actions}
                        </div>

                    </Table>
        )}       
                </div>
               
            </section>
        </>
    )
}
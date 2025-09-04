import './Content.css';

export default function Content ({children}) {
    return (
        <>
            <section className='main-content'>
                {children}
            </section>  
        </>
    )
}
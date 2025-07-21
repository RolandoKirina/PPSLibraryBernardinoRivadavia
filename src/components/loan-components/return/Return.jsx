import './Return.css';
import SearchPartner from '../searchpartner/SearchPartner';
import LendBooks from '../lendbooks/LendBooks';


export default function Return() {
    return (
        <>
                <div className='return-form-content'>
                    <form>
                            <SearchPartner />
                            <LendBooks method={'return'}/>
                    </form>
                </div> 
        </>
    )
}
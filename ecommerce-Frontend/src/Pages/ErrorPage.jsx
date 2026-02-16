import { Header } from "../Components/Header";
import './ErrorPage.css'

export function ErrorPage({ cart }) {
    return(
        <>
            <Header cart={cart}/>
            <div className="Error">
                404 <br />
                Page not Found
            </div>
        </>
    );
}
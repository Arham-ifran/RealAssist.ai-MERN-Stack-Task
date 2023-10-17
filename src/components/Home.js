import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <Link to='crime-pdf'> <button> <FontAwesomeIcon icon={faPrint} /> Print</button> </Link>
        </>
    );
}

export default Home;

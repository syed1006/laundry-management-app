import React from 'react'
import { Link } from 'react-router-dom'

const CompanyText = ({path, text}) => {
    return (
        <section className="text-container">
            <h1 className='heading-logo'><span>Laundry </span><span>Service</span></h1>
            <h6 className='tag-line' >Doorstep Wash & Dryclean Service</h6>
            <p>{text === "Register" ? "Don't Have An Account" : "Already Have An Account!"}</p>
            <Link to={path}>{text}</Link>
        </section>
    )
}

export default CompanyText;
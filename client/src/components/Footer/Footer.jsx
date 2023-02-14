import './Footer.css'

const Footer = ()=>{
    let copy = String.fromCodePoint(169);
    let reg = String.fromCodePoint(174);
    return(
        <footer>
            <span>2023 {copy} Laundry Lobsters{reg}</span>
        </footer>
    )
}

export default Footer;
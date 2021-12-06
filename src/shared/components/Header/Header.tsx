import styles from "./Header.module.css";

interface HeaderInterface {
    spread: number,
    market: string,
}

function Header({spread, market} : HeaderInterface){
    return (
        <header className={styles.header}>
            <h2 className={styles.title}>ORDER BOOK - { market }</h2>
            <div className={styles.spread}>
                <h3>Spread {spread}</h3>
            </div>
        </header>
    )
}

export default Header;
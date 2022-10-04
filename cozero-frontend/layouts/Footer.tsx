import styles from "../styles/Home.module.css"

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <a
                href="https://cozero.io/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Cozero challenge - {new Date().getFullYear()}
                <span className={styles.logo}>
                </span>
            </a>
        </footer>
    )
}
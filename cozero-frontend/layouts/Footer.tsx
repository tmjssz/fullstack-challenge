import styles from "../styles/Home.module.css"

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                Created with Next.js
                <span className={styles.logo}>
                </span>
            </a>
        </footer>
    )
}
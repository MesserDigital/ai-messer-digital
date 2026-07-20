import logo from '../assets/messerdigital.PNG';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            <img src={logo} alt="Messer Digital" height={32} />
            <span className={styles.aiTag}>AI</span>
          </div>
          <p className={styles.tagline}>
            Custom local AI solutions for businesses that take their data seriously.
          </p>
          <a href="https://messerdigital.com" className={styles.parentLink} target="_blank" rel="noreferrer">
            messerdigital.com
          </a>
        </div>

        <div className={styles.links}>
          <div className={styles.col}>
            <span className={styles.colTitle}>Solutions</span>
            <a href="#services" className={styles.link}>Document Search</a>
            <a href="#services" className={styles.link}>AI Assistants</a>
            <a href="#services" className={styles.link}>Private Deployment</a>
            <a href="#services" className={styles.link}>Consulting</a>
          </div>
          <div className={styles.col}>
            <span className={styles.colTitle}>Company</span>
            <a href="#why-local" className={styles.link}>Why Local AI</a>
            <a href="#how-it-works" className={styles.link}>How It Works</a>
            <a href="#demo" className={styles.link}>Live Demo</a>
            <a href="#contact" className={styles.link}>Contact</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>&copy; {year} Messer Digital. All rights reserved.</span>
        <span className={styles.built}>Built with local-first AI in mind.</span>
      </div>
    </footer>
  );
}

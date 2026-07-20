import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import WhyLocal from './components/WhyLocal.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import DemoUI from './components/DemoUI.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyLocal />
        <HowItWorks />
        <DemoUI />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

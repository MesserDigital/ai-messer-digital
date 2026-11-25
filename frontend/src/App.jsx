import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import WhyLocal from './components/WhyLocal.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import DemoUI from './components/DemoUI.jsx';
import FAQ from './components/FAQ.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import ChatWidget from './components/ChatWidget.jsx';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main>
        <Hero />
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <WhyLocal />
        <div className="section-divider" />
        <HowItWorks />
        <div className="section-divider" />
        <DemoUI />
        <div className="section-divider" />
        <FAQ />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

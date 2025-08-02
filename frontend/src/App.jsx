import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CocktailBuilder from './pages/CocktailBuilder';
import IngredientGlossary from './pages/IngredientGlossary';
import Subscription from './pages/Subscription';
import VirtualClasses from './pages/VirtualClasses';
import PrivateEvents from './pages/PrivateEvents';
import EventsPage from './pages/EventsPage';
import FindUs from './pages/FindUs';
import AboutUs from './pages/AboutUs';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import GiftCardsPage from './pages/GiftCardsPage';
import CareersPage from './pages/CareersPage';
import PressPage from './pages/PressPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="min-h-screen bg-white">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/cocktail-builder" element={<CocktailBuilder />} />
              <Route path="/ingredients" element={<IngredientGlossary />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/virtual-classes" element={<VirtualClasses />} />
              <Route path="/private-events" element={<PrivateEvents />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/find-us" element={<FindUs />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/gift-cards" element={<GiftCardsPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/press" element={<PressPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/cookies" element={<div>Cookie Policy Page</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </I18nextProvider>
  )
}

export default App

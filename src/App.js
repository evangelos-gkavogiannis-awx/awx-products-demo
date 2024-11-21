//src App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
// import { RequestLoggerProvider, useRequestLogger } from '../src/context/RequestLoggerContext';
// import RequestConsole from '../src/components/RequestConsole/RequestConsole';
// import { setupAxiosInterceptor } from './utils/apiInterceptor';
import GlobalAccounts from './pages/GlobalAccounts';
import CreateGlobalAccount from './pages/CreateGlobalAccount';
import GlobalAccountCreationForm from './pages/GlobalAccountCreationForm';
import GlobalAccountCreationConfirmation from './pages/GlobalAccountCreationConfirmation';
import UpdateGlobalAccount from './pages/UpdateGlobalAccount';
import GlobalAccountUpdateConfirmation from './pages/GlobalAccountUpdateConfirmation';
import Issuing from './pages/Issuing';
import Cards from './pages/Cards'
import IssueCard from './pages/IssueCard'; // Import the IssueCard component
import CreatePayout from './pages/CreatePayout'
import Beneficiaries from './pages/Beneficiaries';
import BeneficiaryDetails from './pages/BeneficiaryDetails';
import CreateBeneficiary from './pages/CreateBeneficiary';
import SendInvoice from './pages/SendInvoice';
import CreatePaymentLink from "./pages/CreatePaymentLink";
import InvoicePayout from './pages/InvoicePayout';
import PayoutInvoice from './pages/PayoutInvoice';
import ViewCurrentBalances from './pages/ViewCurrentBalances';
import TopUpGlobalAccountForm from './pages/TopUpGlobalAccountForm';
import CreateQuote from "./pages/CreateQuote";
import CreateBatchPayout from './pages/CreateBatchPayout';
import ViewBalanceHistory from './pages/ViewBalanceHistory';
import BalanceHistory from './pages/BalanceHistory';
import { setupAxiosInterceptor } from "../src/utils/apiInterceptor"; // Axios interceptor
import RequestConsole from './components/RequestConsole';
import PlatformPage from './pages/PlatformPage';
import PlatformHeader from "./pages/PlatformHeader";
import ActivateAccount from "./pages/ActivateAccount";
import CreateCardholder from './pages/CreateCardholder';
import ListPayouts from './pages/ListPayouts';
import ChargeConnectedAccount from './pages/ChargeConnectedAccount';
import ConnectedAccountTransfer from './pages/ConnectedAccountTransfer';








function App() {

  const [isPlatformView, setIsPlatformView] = useState(false); // State to toggle between headers



  useEffect(() => {
    setupAxiosInterceptor(); // Initialize Axios interceptors on app load
  }, []);

  return (
    <Router>
      <div className="main-content">
        {/* Conditionally render the appropriate header */}
        {isPlatformView ? (
          <PlatformHeader setIsPlatformView={setIsPlatformView} />
        ) : (
          <Header setIsPlatformView={setIsPlatformView} />
        )}

        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/global-accounts" element={<GlobalAccounts />} />
          <Route path="/create-global-account" element={<CreateGlobalAccount />} />
          <Route path="/global-account-creation" element={<GlobalAccountCreationForm />} />
          <Route path="/global-account-confirmation" element={<GlobalAccountCreationConfirmation />} />
          <Route path="/update-global-account" element={<UpdateGlobalAccount />} />
          <Route path="/global-account-update-confirmation" element={<GlobalAccountUpdateConfirmation />} />
          <Route path="/issuing" element={<Issuing />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/issue-card" element={<IssueCard />} />
          <Route path="/create-payout" element={<CreatePayout />} />
          <Route path="/retrieve-beneficiaries" element={<Beneficiaries />} />
          <Route path="/beneficiary-details/:id" element={<BeneficiaryDetails />} />
          <Route path="/create-beneficiary" element={<CreateBeneficiary />} />
          <Route path="/send-invoice" element={<SendInvoice />} />
          <Route path="/create-payment-link/:invoiceNumber" element={<CreatePaymentLink />} />
          <Route path="/invoice-payout" element={<InvoicePayout />} />
          <Route path="/payout-invoice" element={<PayoutInvoice />} />
          <Route path="/view-current-balances" element={<ViewCurrentBalances />} />
          <Route path="/view-balance-history" element={<ViewBalanceHistory />} />
          <Route path="/balance-history" element={<BalanceHistory />} />
          <Route path="/top-up-global-account-form" element={<TopUpGlobalAccountForm />} />
          <Route path="/create-quote" element={<CreateQuote />} />
          <Route path="/create-batch-payout" element={<CreateBatchPayout />} />
          <Route path="/activate-account" element={<ActivateAccount />} />
          <Route path="/create-cardholder" element={<CreateCardholder />} />
          <Route path="/list-payouts" element={<ListPayouts />} />
          <Route path="/charge-connected-account" element={<ChargeConnectedAccount />} />
          <Route path="/connected-account-transfer" element={<ConnectedAccountTransfer />} />


          {/* Platform Page */}
          <Route
            path="/platform"
            element={<PlatformPage setIsPlatformView={setIsPlatformView} />}
          />
        </Routes>

        {/* Add the API Request Console */}
        <RequestConsole />
      </div>
    </Router>
  );
}

export default App;
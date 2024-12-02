// src/config/tabsConfig.js
const tabLinks = {
    'global-accounts': {
      path: '/global-accounts',
      label: 'Global Accounts',
      apiLink: 'https://www.airwallex.com/docs/global-treasury__global-accounts',
      dropdown: null,
    },
    wallet: {
      path: '/wallet',
      label: 'Wallet',
      apiLink: 'https://www.airwallex.com/uk/global-business-account?utm_medium=paid_search&utm_source=google&utm_term=air%20wallex&utm_campaign=uk_ao-prod-brand_generic_low_global-accounts&gad_source=1&gclid=CjwKCAiA9IC6BhA3EiwAsbltOPcjQRLH-IPoTSq7RtLD3ktKyysnp3K1k0qcWRdLGA4ciJ5iEcrGgxoCRxUQAvD_BwE',
      dropdown: [
        { path: '/view-current-balances', label: 'View current balances' },
        { path: '/view-balance-history', label: 'View balance history' },
        { path: '/convert-wallet-balances', label: 'Convert Wallet balances' },
      ],
    },
    'linked-accounts': {
      path: '/linked-accounts',
      label: 'Linked Accounts',
      apiLink: 'https://www.airwallex.com/docs/global-treasury__linked-accounts',
      dropdown: null,
    },
    beneficiaries: {
      path: '/beneficiaries',
      label: 'Beneficiaries',
      apiLink: 'https://www.airwallex.com/docs/payouts__create-beneficiaries',
      dropdown: [
        { path: '/retrieve-beneficiaries', label: 'Retrieve Beneficiaries' },
        { path: '/create-beneficiary', label: 'Create a Beneficiary' },
      ],
    },
    payouts: {
      path: '/payouts',
      label: 'Payouts',
      apiLink: 'https://www.airwallex.com/docs/payouts__create-a-transfer',
      dropdown: [
        { path: '/create-payout', label: 'Create a payout' },
        { path: '/create-payout-beneficiary', label: 'Create a payout to beneficiary' },
        { path: '/create-batch-payout', label: 'Create batch payout' },
        { path: '/list-payouts', label: 'Get list of payouts' },
        { path: '/invoice-payout', label: 'Invoice Payout' },
      ],
    },
    issuing: {
      path: '/issuing',
      label: 'Issuing',
      apiLink: 'https://www.airwallex.com/docs/issuing__overview',
      dropdown: [
        { path: '/cards', label: 'View your active cards' },
        { path: '/issue-card', label: 'Issue a card' },
        { path: '/batch-issuing', label: 'Batch Issuing' },
        { path: '/view-cardholders', label: 'View cardholders' },
        { path: '/create-cardholder', label: 'Create a cardholder' },
        { path: '/card-authorisations', label: 'Card authorisations' },
        { path: '/issuing-configuration', label: 'Issuing configuration' },
      ],
    },
    finance: {
      path: '/finance',
      label: 'Finance',
      apiLink: 'https://www.airwallex.com/docs/api#/Finance/Financial_Reports/',
      dropdown: null,
    },
    'payment-acceptance': {
      path: '/payment-acceptance',
      label: 'Payment Acceptance',
      apiLink: 'https://www.airwallex.com/docs/payments__overview',
      dropdown: [
        { path: '/send-invoice', label: 'Send Invoice' },
        { path: '/create-quote', label: 'Create Quote' },
      ],
    },
    'payment-methods': {
      path: '/payment-methods',
      label: 'Payment Methods',
      apiLink: 'https://www.airwallex.com/docs/payments__payment-methods-overview',
      dropdown: [
        { path: '/wechat-pay', label: 'WeChat Pay' },
        { path: '/hosted-payment-page', label: 'Airwallex HPP' }
      ],
    },
  };
  
  export default tabLinks;
  
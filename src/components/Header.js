// src/components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
    const navigate = useNavigate(); // Hook for programmatic navigation
    const [isSwitchToPlatform, setIsSwitchToPlatform] = useState(true); // Button state
    const [isIssuingHovered, setIsIssuingHovered] = useState(false);
    const [isPayoutsHovered, setIsPayoutsHovered] = useState(false);
    const [isBeneficiariesHovered, setIsBeneficiariesHovered] = useState(false);
    const [isPaymentHovered, setIsPaymentHovered] = useState(false);
    const [isBalancesHovered, setIsBalancesHovered] = useState(false);  // State for Balances hover


    const handleSwitchClick = () => {
        if (isSwitchToPlatform) {
            // Navigate to Platform view
            setIsSwitchToPlatform(true);
            navigate("/platform");
        } else {
            // Navigate back to Connected Accounts view
            setIsSwitchToPlatform(false);
            navigate("/");
        }
        setIsSwitchToPlatform(!isSwitchToPlatform); // Toggle button state
    };

    return (
        <div className="header">
            {/* Add the image here */}
            <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABI1BMVEUICAgAAADwUUj1g0L1gULwUEj0e0PwVUfxXkb0fUPxXEf1hUL0dUT1h0LxWEfwTUjyZEbyaEXzb0TyakXzbkX0d0P2i0HvSUkAAAUABwf4WUn8aEn/kUP6WEr4UEr4SkwcDgykQTH6YUiSNC08GxT8b0j/jEUlFA7mU0R6PCT+fUaBLydHKhX+hER3PyKwNzcrEhCgODFKJRd3LSWuQTTPTj5nKiC6SjdRIhrRVD3VTT/mXENZJhysPTReIx5AGBaXQC2/QTrVSEDdYT/CVjifRy57KibfSkOaUyu+ZjTMbzioXS59RSPaeDuMTycrGRBXLhohDg66XjRjORyCQibebz2+bDMzFRLNYzqIPCivTTOYMDBAIxXSeDjEPDxCFheyZTBXeie3AAAI3klEQVR4nO2ca1/aSBSHOdQb1gt4wZlEIgZBi4138ULFaltFrVZRFmtdu9//U+yES0E5ExLMWOPvPC/21dLweCb/k5nMEAoRBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQxLPg/G9/A3VwBgLO7f+yN+jJILm+sTk4Mjg4mN+czXFgf/sb+QvA+qamaSO24ODggGkObG2/JUcOiwvCzqZmaGPubMNbGatQ2a37tRoKx403UkY40rR+zHBAz8/B3/52PgCrif5+3HBgIPop+IqwZwtKDfXAK0KqKig1jEbngn0vQqEm6GCYDwU5UTmE+zsZRneC3DTqN6Gzob4V3FuR7ydc1DCqfw6sIhyE3RhG9VxAFXky4c4wqgc0UEWncGkYjQYzUOEw7NrwSxAD1c4Z14b61wDeirAXdm8YC2KgQtiLYSwduECFXMKTYSwWtECFg16PhrFkoNKGh8LoKDUdDIMVqLBooIYrsCs1TAcqUKvNsN1wS5RJahhLfwuOIt83MEOtACE2JzWMpT8ERhFWMcPBBVsA1k2ZYSy9FpRAhd4wYqjNVksEn02ZYWw8GQxFKBio4X4tLGHLlBiOjwckUOvN8Knhbv0u47AjNQxGoPJQL2aoLcKf/yEvMxwPRKDCkYEaNmeB9UDFDMeDEKhwiNawdckJcqbMcPz1BypfMTBDLdf6xauBihtOvPpAhV+o4cjjwQdbusTQa6DW3i7br5Zf6g8Dx72Iobbx2FAEalRm6CVQGfDr4snp6enJ2fd5eJFew7cN1HD/ycVFoMoMJ9wGqqje0qllvXv3XpDJZM4v2AvEFCyjhrttl2ZzUsMJV4HK4MdZj9XT887GdhwezgxfqH/vCqO9iKGWav/KkNNlhhMdA5UDXIvy9fQ8MhSO5x8Vl9FuhpghNoOHz7rMcGJs3kmRwXwxUtV7ajgcz3xXqwgPaA030auKQJUaygNVlO/yJGKDGg5PX6hU5FcGZqit4xWBHV1mOCYJVJElN2UrIjeMx5UqQgo1HJFs96oHKmo4hgSqKN9aqS8biTgaxqev1cUNHI8ihk+bYRNWkRu2BarofTflbJ+gg2E8ruyxiP82UMNt6bCpBipuODZ22fIx8ehyX5qs+nU2nP5H1TiFPcxwZMHhevBTlxo2A1X09g+32WzfpDvD+PRHNUXkMDqKGGLNsEXxTpcafqltY2Qw920oO2nj0jCuqIhQMFDDitPjonhClRqO3YKdLqJ8k0OTngyn1SyhwwNmqOHNsKnI81LDoTv4Ico3JPBoqKRj8NAoNkqbyxcSWEVuOHQ7VMeboZphCosGathxTgO5tNRwqEvDuBLDQ6yG2kHna4lA9dtw+of/acorBmpYcPHXhLu034YK+gX8Qg2dmmHLh3f8NrxUYHg8ihhqq64MOXv9hrxgYIYJx2bYhM29+lEKy6OYYfvyhezzn9KvO2lqT2xthh2bYYviz/Sr7hZwZKCGHp6eRKB6NrRX2lDDf/03fJjCDF00w5Z/42vam6HVU1x6qac2vmJghglPO4E4++LB0LLKS2JWVcQNfb8N4dcMWkNvq9Cs4trQipTu7TNicIIaKhikx1OIobbn8ULVQHVhaJVvWHXtlzMLnQF/9z1Jt2cww8Rvr7M0O1A7GWb7SmuNVxRwgRrGfd+yCstTmOGx97EiAtXZMFu+aTndB+do0vg+d+IwhRkmHJcvJIhAdTDMli5b3zCxewtdifJ9ORGOZlDDK3Ss1F/4Sb6ECFSpYV/5ycegiBoOq2iGmCHWDDlAbmMnn9+ZlZ2yZCvyGmZvnrxoxVeEz3wfpFczmGGifS2fwcqsfYhUYJp5ycEuEajyUdq6hhpilxZqeO/7IE2hhuEnAnb5Ns0/m74GovqsRPFnWp40rVtt4QSt4bmSZogYPm6GAMnUgvl4f6nsTBDcyQ3LzXcgnL3Qmxn+ewYzTLSs5Yvyfdoa1Nr2COs/JYq38n54++cjbMlCa+j7Wikso4bNZsghlNrV8JNdeGsWgSo1zJYa/zCcojU89X+QTk1hhvXlC1G+7Y0RTXZ2TXIrsnmHZ5p6oPJk+1tuYTi95HvOFGYww8QKr/qxxd1E22n15q6vvOQPDpfy59LsdW0fZxE1VDD3fUBreAh2uuzvjUjOcjdO581Jbhr4IDWMRKpzIyijc/z/fM8ZPoMarorHlvVdTevvcP4wJxtTdqDK5hYRzkJszcIM/V9kqz2xIffh4mq44zlgeZqGqoEqNSxDCM7QdRoFzbAxSNu6hbszpJJNDCH7Hv4iNbRKAOhKVKaoLEmx2ZMbQ4e9QSJQZYZiDlxGDacdN+J0A796nmHU6Vd52JrUMBLpQQ39X75oPNB0a+h8lhs+ZKWG6Hppxvfli+cadjoEDN+8GQ77f+KWF55jqN91GlRw68Uwo+DV77NqqHf+SQUOZS+GCnZD8Ur3hnrexY9/sXkvo1TBu23edbcw9S1X68VszfVejIzvyxc20o7vbGiaW25/KqoWqK4MfV++qF7/l+SpzcnQzM9eud+vDN+y7gz9f2Kzad6Irg3NnZy3bfVw62pPVMb3mWH98oeeDM2B2YrX7eYiUCddGKopoXQGjBuam+vdnIpgSRc1zCjYflGjUcSOhtrgxn6Xv5ooArWTYeZE2eZnyVrbU0Ntd5F1f6hFBKqz4fC5wl+crMepk6GmiebwrEM7UMw6GyrY5tVy9WX0zUxjj7CmLaQ4PHcMQSnrZKhoV3AdDg/oG9K630HBlzNXtqLE8P37e8VHZbhdRdQwsZBKPrt8deBGspM9c+77zB65+lG7YX8isemxt3e4yD16GsE6e5Hf0YTksvF4B21iYXXF50szuOnLPjZ8lzlVPUIbcKisHhtG9WRXr2GED7rq7Z0AWLrta5wKsiyr5+z+BX8IVeTl78W9g8PDw+VUIaTqwgxC18WTsuC0dPFR+rZcFRwaKDyw+ufo74vrEQRBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEATx9vkfKrzqPERRpSEAAAAASUVORK5CYII="
                alt="Logo"
                className="header-logo"
            />
            <Link to="/global-accounts" className="nav-item">Global Accounts</Link>
            {/* Balances Tab */}
            <div
                className="nav-item balances-tab"
                onMouseEnter={() => setIsBalancesHovered(true)}
                onMouseLeave={() => setIsBalancesHovered(false)} // Hover state for Balances
            >
                Wallet
                {isBalancesHovered && (
                    <div className="balances-dropdown">
                        <Link to="/view-current-balances" className="dropdown-item">View current balances</Link>
                        <Link to="/view-balance-history" className="dropdown-item">View balance history</Link>
                    </div>
                )}
            </div>
            <Link to="/linked-accounts" className="nav-item">Linked Accounts</Link>
            {/* Beneficiaries Tab */}
            <div
                className="nav-item beneficiaries-tab"
                onMouseEnter={() => setIsBeneficiariesHovered(true)}
                onMouseLeave={() => setIsBeneficiariesHovered(false)}
            >
                Beneficiaries
                {isBeneficiariesHovered && (
                    <div className="beneficiaries-dropdown">
                        <Link to="/retrieve-beneficiaries" className="dropdown-item">Retrieve Beneficiaries</Link>
                        <Link to="/create-beneficiary" className="dropdown-item">Create a Beneficiary</Link>
                    </div>
                )}
            </div>
            <div
                className="nav-item payouts-tab"
                onMouseEnter={() => setIsPayoutsHovered(true)}
                onMouseLeave={() => setIsPayoutsHovered(false)}
            >
                Payouts
                {isPayoutsHovered && (
                    <div className="payouts-dropdown">
                        <Link to="/create-payout" className="dropdown-item">Create a payout</Link>
                        <Link to="/create-payout-beneficiary" className="dropdown-item">Create a payout to beneficiary</Link>
                        <Link to="/create-batch-payout" className="dropdown-item">Create batch payout</Link>
                        <Link to="/list-payouts" className="dropdown-item">Get list of payouts</Link>
                        <Link to="/invoice-payout" className="dropdown-item">Invoice Payout</Link>
                    </div>
                )}
            </div>
            <div
                className="nav-item issuing-tab"
                onMouseEnter={() => setIsIssuingHovered(true)}
                onMouseLeave={() => setIsIssuingHovered(false)}
            >
                Issuing
                {isIssuingHovered && (
                    <div className="issuing-dropdown">
                        <Link to="/cards" className="dropdown-item">View your active cards</Link>
                        <Link to="/issue-card" className="dropdown-item">Issue a card</Link>
                        <Link to="/batch-issuing" className="dropdown-item">Batch Issuing</Link>
                        <Link to="/view-cardholders" className="dropdown-item">View cardholders</Link>
                        <Link to="/create-cardholder" className="dropdown-item">Create a cardholder</Link>
                        <Link to="/card-authorisations" className="dropdown-item">Card authorisations</Link>
                        <Link to="/issuing-configuration" className="dropdown-item">Issuing configuration</Link>
                    </div>
                )}
            </div>
            <Link to="/finance" className="nav-item">Finance</Link>
            <div
                className="nav-item payment-acceptance-tab"
                onMouseEnter={() => setIsPaymentHovered(true)}
                onMouseLeave={() => setIsPaymentHovered(false)}
            >
                Payment Acceptance
                {isPaymentHovered && (
                    <div className="payment-dropdown">
                        <Link to="/send-invoice" className="dropdown-item">Send Invoice</Link>
                        <Link to="/create-quote" className="dropdown-item">Create Quote</Link>
                    </div>
                )}
            </div>

            {/* Switch to Platform Button */}
            {/* Switch Button */}
            <button className="switch-to-platform-btn" onClick={handleSwitchClick}>
                {isSwitchToPlatform ? "Switch to Platform" : "Switch to Connected Accounts"}
            </button>

        </div>
    );
}

export default Header;

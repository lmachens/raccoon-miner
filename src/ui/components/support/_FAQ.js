import { DialogContentText, Typography } from '../generic';
import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

const FAQEntry = ({ question, answer }) => (
  <Fragment>
    <Typography variant="body2">{question}</Typography>
    <Typography variant="body1">{answer}</Typography>
  </Fragment>
);

FAQEntry.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired
};

const FAQ = () => (
  <Fragment>
    <DialogContentText>FAQ (under construction)</DialogContentText>
    <FAQEntry
      answer="Modern anti virus software tries to find hidden miners (Trojan:Win32/CoinMiner.C!cl) which runs without your permission. You want to mine so it is a false positive and you have to add an exception. Raccoon Miner uses open source miners (Ethminer and XMR-Stak) which are safe to use."
      question="My anti virus detects Racoon Miner as threat. Why?"
    />
    <FAQEntry
      answer="A mining pool is the pooling of resources by miners, who share their processing power over
          a network, to split the reward equally, according to the amount of work they contributed
          to the probability of finding a block."
      question="What is a mining pool?"
    />
    <FAQEntry
      answer="ETH is the short form of Ether which is the currency of Ethereum."
      question="What is ETH?"
    />
    <FAQEntry answer="XMR is the currency of Monero." question="What is XMR?" />
    <FAQEntry
      answer="This is normal when mining is active. Mining is a load intensive process which uses all ressources available."
      question="Why is my CPU or GPU at 100%?"
    />
    <FAQEntry
      answer="This depends on the selected mining pool. Take a look at their conditions."
      question="When do I get a payout?"
    />
    <FAQEntry
      answer="Yes, Raccoon Miner has no access to your wallet and only use it for payouts."
      question="Is my wallet safe?"
    />
    <FAQEntry
      answer="No, you can really mine crypto! Payouts are handled by the selected mining pool and not by Raccoon Miner, so make sure that you trust them."
      question="Is this scam?"
    />
    <FAQEntry
      answer="Right now I don't make any profit with this app. It is planned that a small percentage of your hashpower will donate to my wallet."
      question="How do you make profit?"
    />
  </Fragment>
);

export { FAQ };

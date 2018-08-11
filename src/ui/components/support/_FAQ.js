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

const entries = [
  {
    answer:
      'Modern anti virus software tries to find hidden miners (Trojan:Win32/CoinMiner.C!cl) which runs without your permission. You want to mine so it is a false positive and you have to add an exception. Raccoon Miner uses open source miners (Ethminer and XMR-Stak) which are safe to use.',
    question: 'My anti virus detects Racoon Miner as threat. Why?'
  },
  {
    answer:
      'This is normal when mining is active. Mining is a load intensive process which uses all ressources available.',
    question: 'Why is my CPU or GPU at 100%?'
  },
  {
    answer: '0.001 BTC or 0.1 BTC.',
    question: 'When do I get a payout?'
  },
  {
    answer: 'Yes, Raccoon Miner has no access to your wallet.',
    question: 'Is my wallet safe?'
  },
  {
    answer:
      'No, you can really mine crypto! Payouts are handled by the selected mining pool and not by Raccoon Miner, so make sure that you trust them.',
    question: 'Is this scam?'
  },
  {
    answer:
      'There is a build in donation of ~3%. Every hour Raccoon Miner uses the developer address for two minutes.',
    question: 'How do you make profit?'
  }
];

const FAQ = () => (
  <Fragment>
    <DialogContentText>FAQ</DialogContentText>
    {entries.map(({ answer, question }, index) => (
      <FAQEntry
        answer={answer}
        key={index} // we can use index as key because it is a static list
        question={question}
      />
    ))}
  </Fragment>
);

export { FAQ };

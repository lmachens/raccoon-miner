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
  </Fragment>
);

export { FAQ };

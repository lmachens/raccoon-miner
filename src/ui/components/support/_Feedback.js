import { Button, TextField, Typography } from '../generic';
import React, { Fragment, PureComponent } from 'react';

class Feedback extends PureComponent {
  state = {
    title: '',
    comment: ''
  };

  handleChange = field => event => {
    this.setState({ [field]: event.target.value });
  };

  handleSubmit = () => {
    const { title, comment } = this.state;

    Raven.captureMessage(`${title}\n${comment}`);
    this.setState({ title: '', comment: '' });
  };

  render() {
    const { title, comment } = this.state;

    return (
      <Fragment>
        <Typography>
          Your feedback helps to improve this app and make it more awesome! Please give as many
          details as possible if you report a bug or request a feature.
        </Typography>
        <TextField
          margin="normal"
          onChange={this.handleChange('title')}
          placeholder="Title"
          value={title}
        />
        <TextField
          margin="normal"
          multiline
          onChange={this.handleChange('comment')}
          placeholder="Leave a comment"
          rows={8}
          value={comment}
        />
        <Button disabled={title.length === 0 || comment.length === 0} onClick={this.handleSubmit}>
          Submit
        </Button>
      </Fragment>
    );
  }
}

export { Feedback };

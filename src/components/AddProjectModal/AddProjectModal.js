import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import grey from '@material-ui/core/colors/grey';
import AppService from '../../services/AppService';

const SNACKBAR_SUCCESS_MESSAGE = 'Submitted. After a quick review, your project will be listed!';
const SNACKBAR_FAILURE_MESSAGE = 'Project failed to be added!';

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const btnStyles = {
  margin: '10px',
};

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 4,
  },
  button: {
    backgroundColor: deepPurple[700],
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: deepPurple[900],
    },
  },
  btnCancel: {
    backgroundColor: grey[500],
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: grey[700],
    },
  },
});

class AddProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      partners: '',
      tech: '',
      link: '',
    };
    this.fetchProjects = props.fetchProjects;
    this.renderSnackbar = props.renderSnackbar;
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handlePartnersChange = this.handlePartnersChange.bind(this);
    this.handleTechChange = this.handleTechChange.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  handlePartnersChange(e) {
    this.setState({ partners: e.target.value });
  }

  handleTechChange(e) {
    this.setState({ tech: e.target.value });
  }

  handleLinkChange(e) {
    this.setState({ link: e.target.value });
  }

  handleClose() {
    const { modalClosed } = this.props;
    modalClosed();
  }

  async handleSubmit() {
    const { renderSnackbar } = this.props;
    try {
      await AppService.postProject(this.state);
      this.setState({
        name: '',
        description: '',
        partners: '',
        tech: '',
        link: '',
      });
      const snackbarText = SNACKBAR_SUCCESS_MESSAGE;
      renderSnackbar({ snackbarText });
      this.handleClose();
    } catch (e) {
      console.log('Failed to validate', e);
      const snackbarText = SNACKBAR_FAILURE_MESSAGE;
      renderSnackbar({ snackbarText });
    }
  }

  render() {
    const {
      name, description, partners, tech, link,
    } = this.state;
    const { open, classes } = this.props;
    return (
      <span>
        <Modal open={open} onClose={this.handleClose}>
          <div className={classes.paper} style={getModalStyle()}>
            <h2>List Project</h2>
            <TextField fullWidth label="Project Name" value={name} onChange={this.handleNameChange} />
            <br />
            <br />
            <TextField fullWidth label="Description" value={description} onChange={this.handleDescriptionChange} />
            <br />
            <br />
            <TextField fullWidth label="Tech Stack" value={tech} onChange={this.handleTechChange} />
            <br />
            <br />
            <TextField fullWidth label="What partners are you looking for?" value={partners} onChange={this.handlePartnersChange} />
            <br />
            <br />
            <TextField fullWidth label="Website" value={link} onChange={this.handleLinkChange} />
            <br />
            <br />
            <div style={{ textAlign: 'center' }}>
              <Button style={btnStyles} onClick={this.handleClose} className={classes.btnCancel}>
                Cancel
              </Button>
              <Button style={btnStyles} onClick={this.handleSubmit} className={classes.button}>
                Submit
              </Button>
            </div>
          </div>
        </Modal>
      </span>
    );
  }
}

export default withStyles(styles)(AddProjectModal);

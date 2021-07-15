import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import CreateIcon from '@material-ui/icons/Create';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const styles = theme => ({
    root: {
        maxWidth: '90%',
        margin:"2rem"
    },

    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
});

class CreatePost extends Component {
    constructor(props){
        super(props)

        this.onChangeDescription = this.onChangeDescription.bind(this)

    }
    state = {
        description:'',
        // Initially, no file is selected
        selectedFile: null
      };

      onChangeDescription (e) {
          this.setState({description:e.target.value})
      }
      
      // On file select (from the pop up)

      onFileChange = event => {
      
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
      
      };

      // On file upload (click the upload button)
    onFileUpload = () => {
    
        // Create an object of formData
        const formData = new FormData();
      
        // Update the formData object
        formData.append(
          "image",
          this.state.selectedFile,
          this.state.selectedFile.name
        );
        formData.append(
            "description",
            this.state.description
        )
      
        // Details of the uploaded file
        console.log(this.state.selectedFile);
      
        // Request made to the backend api
        // Send formData object
        axios.post("http://localhost:3000/api/posts/", formData)
        .then(
            window.alert('Post créé avec succés')
        )
        .catch(error => {
            this.setState({ errorMessage: error.message });
            console.error('There was an error!', error);
        })

      };
      
   
    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.root}>
                <CardHeader
                    titleTypographyProps={{variant:'h6' }}
                    
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            <CreateIcon />
                        </Avatar>
                    }
                    title="Créer une publication"

                />
                <CardContent>

                    <div>
                        <form encType="multipart/form-data" method="POST">
                            <TextField
                                color="secondary"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="description"
                                label="A quoi pensez vous ?"
                                name="description"
                                value={this.state.description} onChange={this.onChangeDescription}
                            />
                            <TextField
                                input type="file"
                                color="secondary"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="imageUrl"
                                label="Ajoutez votre image !"
                                name="image"
                                focused
                                onChange={this.onFileChange}
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                id="submitLogin"
                                //className={classes.submit}
                                onClick={this.onFileUpload}
                            >
                                PUBLIER
                            </Button>
                        </form>
                    </div>
                </CardContent>

            </Card>
        );
    }
}

export default withStyles(styles, { withTheme: true })(CreatePost)

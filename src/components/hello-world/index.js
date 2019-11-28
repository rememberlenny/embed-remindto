import {h, Component} from 'preact';

import Fab from 'preact-material-components/Fab';
import 'preact-material-components/Fab/style.css';
import Icon from 'preact-material-components/Icon';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';
import FormField from 'preact-material-components/FormField';
import 'preact-material-components/FormField/style.css';

const SUBMIT_URL = 'http://localhost:5000/remind/new'

export default class App extends Component {
	constructor() {
		super();

		this.state = {
      email: '',
      isOpen: false,
      isSending: false
		};
  }
  
  fabClicked(isOpen) {
    this.setState({
      isOpen: !isOpen
    });
  }

  onChange = (e) => {
    /*
      Because we named the inputs to match their
      corresponding values in state, it's
      super easy to update the state
    */
    this.setState({}, { [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    // get our form data out of state
    const { email } = this.state;
    const data = {
      email
    };
    
    fetch(SUBMIT_URL, {
      method: 'post',
      body: JSON.stringify(data),
      mode: 'no-cors'
    })
    .then(data => console.log(data));
  }

  isValid() {
    return true;
  }

	componentDidMount() {
	}

	componentWillUnmount() {
	}
  
  render(){
    const {isOpen, isSending, email} = this.state;
    return (
      <div>
        {(isOpen && (
          <div>
            {(isSending && (
              <div>
                Sending
              </div>
            ))}
            {(!isSending && (
              <form onSubmit={this.onSubmit}>
                <FormField>
                  <div>
                    <TextField type="email"
                                value={email}
                                onChange={this.onChange}
                                name="email"
                                autocomplete="on"
                                label="Email"/>
                  </div>
                </FormField>
                <FormField>
                  <div>
                    <button type="submit">Submit</button>
                  </div>
                </FormField>
              </form>
            ))}
          </div>
        ))}
        <Fab onClick={() => {
            this.fabClicked(isOpen)
          }}>
          {(!isOpen && 
            <span>💯</span>
          )}
          {(isOpen && 
            <span>❌</span>
          )}
        </Fab>
      </div>
    );
  }
}
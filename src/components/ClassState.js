import React from 'react';
import { Loading } from './Loading';

const SECURITY_CODE = 'qwerty';
class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vale: '',
      error: false,
      loading: false,
    };
  }

  // UNSAFE_componentWillMount() {
  //   console.log('componentWillMount');
  // }

  // componentDidMount() {
  //   console.log('componentDidMount');
  // }

  componentDidUpdate() {
    if (this.state.loading) {
      setTimeout(() => {
        if (SECURITY_CODE === this.state.value) {
          this.setState({ error: false, loading: false });
        } else {
          this.setState({ error: true, loading: false });
        }
      }, 3000);
    }
  }

  render() {
    return (
      <div>
        <h2>Delete {this.props.name}</h2>

        <p>Please enter the security code to check that you want to delete.</p>

        {this.state.error && !this.state.loading && (
          <p>Error: the code is not correct❗</p>
        )}

        {this.state.loading && <Loading />}

        <input
          type="text"
          placeholder="Security Code"
          value={this.state.value}
          onChange={(e) => this.setState({ value: e.target.value })}
        />

        <button onClick={() => this.setState({ loading: true })}>Check</button>
      </div>
    );
  }
}

export { ClassState };

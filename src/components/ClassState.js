import React from 'react';
import { Loading } from './Loading';

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      loading: false,
    };
  }

  // UNSAFE_componentWillMount() {
  //   console.log('componentWillMount');
  // }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    if (this.state.loading) {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 3000);
    }
  }

  render() {
    return (
      <div>
        <h2>Delete {this.props.name}</h2>

        <p>Please enter the security code to check that you want to delete.</p>

        {this.state.error && <p>Error: the code is not correct❗</p>}

        {this.state.loading && <Loading />}

        <input type="text" placeholder="Security Code" />

        <button onClick={() => this.setState({ loading: true })}>Check</button>
      </div>
    );
  }
}

export { ClassState };

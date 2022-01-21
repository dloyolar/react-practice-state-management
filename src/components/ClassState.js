import React from 'react';

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      loading: false,
    };
  }


  componentWillMount() {
    console.log('componentWillMount');
  }

  componentWillUnmount() { 
    console.log('componentWillUnmount');
  }
  
  componentDidMount() {
    console.log('componentDidMount');
  }


  render() {
    return (
      <div>
        <h2>Delete {this.props.name}</h2>

        <p>Please enter the security code to check that you want to delete.</p>

        {this.state.error && <p>Error: the code is not correct❗</p>}

        {this.state.loading && <p>Loading...</p>}

        <input type="text" placeholder="Security Code" />

        <button onClick={() => this.setState({loading: true})}>
          Check
        </button>
      </div>
    );
  }
}

export { ClassState };

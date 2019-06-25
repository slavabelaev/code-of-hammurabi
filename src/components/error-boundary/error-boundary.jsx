import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator';

class ErrorBoundary extends Component {
    state = {
        error: null
    };

    componentDidCatch(error, errorInfo) {
      this.setState({
          error: error
      });
    }

    render() {
        const { error } = this.state;
        const { children } = this.props;

        if (error) {
            return <ErrorIndicator error={error} />;
        }

        return children;
    }
}

export default ErrorBoundary;

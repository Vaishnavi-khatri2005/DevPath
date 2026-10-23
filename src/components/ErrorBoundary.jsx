import React from 'react';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '3rem 2rem',
          maxWidth: '700px',
          margin: '2rem auto',
          background: 'var(--bg-card)',
          border: '1px solid #ef4444',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '9999px',
            background: 'rgba(239, 68, 68, 0.15)',
            color: '#f87171',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem'
          }}>
            <AlertTriangle size={28} />
          </div>

          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#fff' }}>
            Something went wrong while rendering this page
          </h2>

          <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '0.92rem' }}>
            {this.state.error?.message || 'An unexpected rendering error occurred.'}
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={this.handleReset}>
              <ArrowLeft size={16} />
              <span>Return to Dashboard</span>
            </button>
            <button className="btn-secondary" onClick={() => window.location.reload()}>
              <RefreshCw size={16} />
              <span>Reload App</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

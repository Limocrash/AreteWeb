import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-stone-900 text-amber-100 font-sans">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <pre className="text-left text-sm text-amber-200/90 bg-black/40 p-4 rounded-lg overflow-auto max-w-2xl max-h-64">
            {this.state.error.message}
          </pre>
          <p className="mt-4 text-sm text-amber-200/70">
            Check the browser console for details. Refresh the page to try again.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

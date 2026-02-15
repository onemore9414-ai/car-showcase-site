import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In a real app, you would log this to an error reporting service
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] w-full flex-col items-center justify-center bg-white px-6 text-center animate-in fade-in zoom-in duration-300">
          <div className="mb-8 rounded-full bg-red-50 p-6 ring-1 ring-red-100 shadow-sm">
            <AlertTriangle className="h-10 w-10 text-red-600" strokeWidth={1.5} />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Application Error
          </h2>
          
          <p className="mt-4 max-w-lg text-lg text-gray-500">
            We apologize for the inconvenience. The application has encountered an unexpected state and cannot continue.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <button
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-gray-800 hover:shadow-lg focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reload Page
            </button>
            <button
              onClick={this.handleGoHome}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-bold uppercase tracking-widest text-gray-700 transition-all hover:bg-gray-50 hover:text-black focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Return Home
            </button>
          </div>

          {/* Development Error Details */}
          {(process.env.NODE_ENV === 'development' || process.env.NODE_ENV !== 'production') && this.state.error && (
            <div className="mt-12 w-full max-w-2xl overflow-hidden rounded-lg border border-red-100 bg-red-50/50 p-4 text-left">
              <div className="flex items-center gap-2 mb-2 text-red-800 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="h-3 w-3" />
                <span>Debug Information</span>
              </div>
              <pre className="text-[11px] leading-relaxed text-red-700 font-mono whitespace-pre-wrap break-all">
                {this.state.error.toString()}
              </pre>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
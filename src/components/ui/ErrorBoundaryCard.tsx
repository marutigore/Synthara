"use client";

import React, { Component, type ErrorInfo, type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

interface Props {
  children?: ReactNode;
  title?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundaryCard extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundaryCard caught an error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Card className="border border-destructive/20 bg-destructive/5 shadow-sm rounded-xl">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
            <div className="p-2 bg-destructive/10 rounded-full text-destructive">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-foreground">
                {this.props.title || "Section Load Failure"}
              </h4>
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                {this.state.error?.message || "An unexpected error occurred while compiling this widget."}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={this.handleReset}
              className="h-8 text-xs border-destructive/20 hover:bg-destructive/10 hover:text-destructive gap-1 rounded-lg"
            >
              <RefreshCcw className="h-3 w-3" /> Retry Loading
            </Button>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

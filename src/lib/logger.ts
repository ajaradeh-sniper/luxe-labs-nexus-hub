// Enhanced logging system for better error tracking and debugging

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  data?: any;
  userId?: string;
  sessionId?: string;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: string,
    data?: any,
    userId?: string
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      data,
      userId,
      sessionId: this.sessionId
    };
  }

  private addLog(entry: LogEntry) {
    this.logs.push(entry);
    
    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Console output for development
    if (process.env.NODE_ENV === 'development') {
      const logMethod = entry.level === LogLevel.ERROR ? 'error' :
                       entry.level === LogLevel.WARN ? 'warn' :
                       entry.level === LogLevel.DEBUG ? 'debug' : 'log';
      
      console[logMethod](
        `[${entry.timestamp}] ${entry.context ? `[${entry.context}] ` : ''}${entry.message}`,
        entry.data ? entry.data : ''
      );
    }
  }

  debug(message: string, context?: string, data?: any, userId?: string) {
    this.addLog(this.createLogEntry(LogLevel.DEBUG, message, context, data, userId));
  }

  info(message: string, context?: string, data?: any, userId?: string) {
    this.addLog(this.createLogEntry(LogLevel.INFO, message, context, data, userId));
  }

  warn(message: string, context?: string, data?: any, userId?: string) {
    this.addLog(this.createLogEntry(LogLevel.WARN, message, context, data, userId));
  }

  error(message: string, context?: string, data?: any, userId?: string) {
    this.addLog(this.createLogEntry(LogLevel.ERROR, message, context, data, userId));
  }

  // Auth-specific logging methods
  authSuccess(message: string, userId: string, data?: any) {
    this.info(message, 'AUTH', data, userId);
  }

  authError(message: string, data?: any) {
    this.error(message, 'AUTH', data);
  }

  // API-specific logging methods
  apiRequest(url: string, method: string, data?: any, userId?: string) {
    this.debug(`API Request: ${method} ${url}`, 'API', data, userId);
  }

  apiResponse(url: string, status: number, data?: any, userId?: string) {
    this.debug(`API Response: ${status} ${url}`, 'API', data, userId);
  }

  apiError(url: string, error: any, userId?: string) {
    this.error(`API Error: ${url}`, 'API', error, userId);
  }

  // Get logs for debugging or reporting
  getLogs(level?: LogLevel, context?: string, limit?: number): LogEntry[] {
    let filteredLogs = this.logs;

    if (level) {
      filteredLogs = filteredLogs.filter(log => log.level === level);
    }

    if (context) {
      filteredLogs = filteredLogs.filter(log => log.context === context);
    }

    if (limit) {
      filteredLogs = filteredLogs.slice(-limit);
    }

    return filteredLogs;
  }

  // Export logs as JSON for external reporting
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  // Clear logs
  clearLogs() {
    this.logs = [];
  }

  // Get summary statistics
  getLogSummary() {
    const summary = {
      total: this.logs.length,
      byLevel: {} as Record<LogLevel, number>,
      byContext: {} as Record<string, number>,
      sessionId: this.sessionId,
      timeRange: {
        first: this.logs[0]?.timestamp,
        last: this.logs[this.logs.length - 1]?.timestamp
      }
    };

    this.logs.forEach(log => {
      // Count by level
      summary.byLevel[log.level] = (summary.byLevel[log.level] || 0) + 1;
      
      // Count by context
      if (log.context) {
        summary.byContext[log.context] = (summary.byContext[log.context] || 0) + 1;
      }
    });

    return summary;
  }
}

// Export singleton instance
export const logger = new Logger();

// Convenience functions
export const log = {
  debug: (message: string, context?: string, data?: any, userId?: string) => 
    logger.debug(message, context, data, userId),
  info: (message: string, context?: string, data?: any, userId?: string) => 
    logger.info(message, context, data, userId),
  warn: (message: string, context?: string, data?: any, userId?: string) => 
    logger.warn(message, context, data, userId),
  error: (message: string, context?: string, data?: any, userId?: string) => 
    logger.error(message, context, data, userId),
  auth: {
    success: (message: string, userId: string, data?: any) => 
      logger.authSuccess(message, userId, data),
    error: (message: string, data?: any) => 
      logger.authError(message, data)
  },
  api: {
    request: (url: string, method: string, data?: any, userId?: string) => 
      logger.apiRequest(url, method, data, userId),
    response: (url: string, status: number, data?: any, userId?: string) => 
      logger.apiResponse(url, status, data, userId),
    error: (url: string, error: any, userId?: string) => 
      logger.apiError(url, error, userId)
  }
};

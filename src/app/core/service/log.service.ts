import {Injectable} from '@angular/core';
import {environment} from 'app/../../src/environments/environment';
import {logging} from 'selenium-webdriver';

enum Level {
  DEBUG,
  INFO,
  WARN,
  ERROR
}

@Injectable()
export class LogService {
  private app = 'tylr-web';
  private logLevel: Level;

  constructor() {
    this.logLevel = Level[environment.logLevel];
  }

  public debug(message: string, caller?: string) {
    this.log(Level.DEBUG, message, caller);
  }

  public info(message: string, caller?: string) {
    this.log(Level.INFO, message, caller);
  }

  public warn(message: string, caller?: string) {
    this.log(Level.WARN, message, caller);
  }

  public error(error: Error, caller?: string) {
    this.log(Level.ERROR, error.message, caller);
  }

  private generateLog(level: Level, message: string, caller?: string): string {
    return `${new Date().toLocaleString()}: ${this.app} ${Level[level]} - ${caller ? caller + ': ' : ''}${message}`;
  }

  private log(level: Level, message: string, caller?: string) {
    if (level >= this.logLevel) {
      this.getLogFunction(level)(this.generateLog(level, message, caller));
    }
  }

  private getLogFunction(level: Level): (log: string) => void {
    switch (level) {
      case Level.DEBUG:
        return console.log;
      case Level.INFO:
        return console.log;
      case Level.WARN:
        return console.warn;
      case Level.ERROR:
        return console.error;
      default:
        throw new Error(`unsupported log level ${level}`);
    }
  }
}

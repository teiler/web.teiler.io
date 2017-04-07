import {Injectable} from '@angular/core';

enum Level {
  DEBUG,
  INFO,
  WARN,
  ERROR
}

@Injectable()
export class LogService {
  private app = 'tylr-web';

  constructor() {
  }

  public debug(message: string) {
    console.log(this.generateLog(Level.DEBUG, message));
  }

  public info(message: string) {
    console.log(this.generateLog(Level.INFO, message));
  }

  public warn(message: string) {
    console.warn(this.generateLog(Level.WARN, message));
  }

  public error(error: Error) {
    console.error(this.generateLog(Level.ERROR, error.message));
  }

  private generateLog(level: Level, message: string): string {
    return `${new Date().toLocaleString()}: ${this.app} ${Level[level]} - ${message}`;
  }
}

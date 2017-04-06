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

  public INFO(message: string) {
    console.log(this.generateLog(Level.INFO, message));
  }

  public WARN(message: string) {
    console.warn(this.generateLog(Level.WARN, message));
  }

  public ERROR(error: Error) {
    console.error(this.generateLog(Level.ERROR, error.message));
  }

  private generateLog(level: Level, message: string): string {
    return `${new Date().toLocaleString()}: ${this.app} ${Level[level]} - ${message}`;
  }
}

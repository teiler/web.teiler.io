export enum TylrApiErrorType {
  NOT_AUTHORIZED_TO_GROUP
}

export class TylrApiErrorMessage {
  private errorMessages: Map<TylrApiErrorType, string> = new Map();

  public getMessage(type: TylrApiErrorType) {

  }
}

export class NotLoggedInError extends Error {
  constructor() {
    super("User not logged in");
  }
}

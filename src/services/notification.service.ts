import Observer from '@utils/Observer/observer.interface';

export default class NotificationService {
  private observers: Observer[] = [];

  public registerObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  public unregisterObserver(observer: Observer): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  public notify(message: string): void {
    this.observers.forEach(observer => observer.update(message));
  }
}

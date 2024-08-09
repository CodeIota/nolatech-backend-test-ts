import Observer from '@utils/Observer/observer.interface';

class ConsoleLogger implements Observer {
  update(message: string): void {
    console.log('Notification:', message);
  }
}

export { ConsoleLogger };

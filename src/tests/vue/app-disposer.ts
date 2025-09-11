import type { App } from "vue";

/**
 * A class that wraps an application and implements the Disposable interface.
 * It provides a way to properly unmount the app when the instance is disposed.
 *
 * This class is designed to be used with the `using` statement, which will
 * automatically unmount the app when the block exits.
 *
 * @example
 * ```
 * {
 *   using disposer = new AppDisposer(app);
 *   // Use the app...
 * } // The app is automatically unmounted here
 * ```
 */
export class AppDisposer implements Disposable {
  /**
   * Creates a new AppDisposer instance.
   * @param app - The application instance to be managed.
   */
  constructor(private app: App) {}

  /**
   * Implements the dispose method of the Disposable interface.
   * This method is called automatically when the `using` block exits,
   * ensuring that the app is properly unmounted.
   */
  [Symbol.dispose]() {
    this.app.unmount();
  }
}

if (import.meta.vitest) {
  const { it, expect, vi } = import.meta.vitest;

  it("using", () => {
    const mockApp = {
      unmount: vi.fn(),
    };

    {
      using _ = new AppDisposer(mockApp as unknown as App);
      expect(mockApp.unmount).not.toHaveBeenCalled();
    }

    expect(mockApp.unmount).toHaveBeenCalledTimes(1);
  });
}

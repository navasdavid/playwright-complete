import { Log } from 'e2e_tests/navigation.spec';

export async function waitForConsoleLogsToSettle(
  logs: Array<Log>,
  timeoutMs: number = 1000
): Promise<void> {
  let settled = false;
  let lastLength = logs.length;

  while (!settled) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (logs.length === lastLength) {
      settled = true;
    } else {
      lastLength = logs.length;
      timeoutMs -= 100;
      if (timeoutMs <= 0) break;
    }
  }
}

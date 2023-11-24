import type { Event, EventHint } from '@sentry/react';

const getLocalStorageObject = () => {
  const data: Record<string, any> = {};
  Object.keys(localStorage).forEach((value) => {
    data[value] = localStorage.getItem(value);
  });
  return data;
};

export default class LocalStorageIntegrations {
  id: string;
  name: string;

  constructor(name: string) {
    // comply to interface
    this.id = name;
    this.name = name;
  }

  setupOnce() {}

  processEvent(event: Event, hint: EventHint | undefined) {
    const date = new Date();
    const today = date.toLocaleDateString().replaceAll('/', '_');
    if (hint) {
      hint.attachments = [
        {
          filename: `local_storage_${today}_${date.getHours()}h_${date.getMinutes()}m.json`,
          data: JSON.stringify(getLocalStorageObject()),
        },
      ];
    }
    return event;
  }
}

interface UserRecord {
  id: number;
  name: string;
  active: boolean;
}

interface TimestampedItem {
  createdAt: number;
  label: string;
}

function getActiveUser(users: UserRecord[]): UserRecord | undefined {
  return users.find((u) => u.active);
}

function getOldestItem(items: TimestampedItem[]): TimestampedItem | undefined {
  if (items.length === 0) {
    return undefined;
  }

  let oldest = items[0];
  for (const item of items) {
    if (item.createdAt < oldest.createdAt) {
      oldest = item;
    }
  }
  return oldest;
}

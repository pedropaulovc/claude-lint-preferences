interface UserEntry {
  id: number;
  name: string;
  active: boolean;
}

function getActiveUser(users: UserEntry[]): UserEntry | undefined {
  return users.find((user) => user.active);
}

interface TimestampedItem {
  createdAt: number;
  label: string;
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

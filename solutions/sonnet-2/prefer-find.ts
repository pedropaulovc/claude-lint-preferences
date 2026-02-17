function getActiveUser(users: Array<{ id: number; name: string; active: boolean }>): { id: number; name: string; active: boolean } | undefined {
  for (let i = 0; i < users.length; i++) {
    if (users[i].active) {
      return users[i];
    }
  }
  return undefined;
}

function getOldestItem(items: Array<{ createdAt: number; label: string }>): { createdAt: number; label: string } | undefined {
  if (items.length === 0) {
    return undefined;
  }

  let oldest = items[0];
  for (let i = 1; i < items.length; i++) {
    if (items[i].createdAt < oldest.createdAt) {
      oldest = items[i];
    }
  }
  return oldest;
}

function getActiveUser(users: Array<{ id: number; name: string; active: boolean }>): { id: number; name: string; active: boolean } | undefined {
  return users.find(u => u.active);
}

function getOldestItem(items: Array<{ createdAt: number; label: string }>): { createdAt: number; label: string } | undefined {
  return items.find(item =>
    items.every(other => item.createdAt <= other.createdAt)
  );
}

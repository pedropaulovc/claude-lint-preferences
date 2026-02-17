function getActiveUser(users: Array<{ id: number; name: string; active: boolean }>): { id: number; name: string; active: boolean } | undefined {
  return users.find(user => user.active);
}

function getOldestItem(items: Array<{ createdAt: number; label: string }>): { createdAt: number; label: string } | undefined {
  return items.find(item => {
    const oldest = items.reduce((min, current) => current.createdAt < min.createdAt ? current : min);
    return item === oldest;
  });
}

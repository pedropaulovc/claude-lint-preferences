interface NestedUser {
  user?: {
    profile?: {
      address?: {
        city?: string;
      };
    };
  };
}

function getNestedValue(obj: NestedUser): string | undefined {
  return obj.user?.profile?.address?.city;
}

interface DataWithItems {
  data?: {
    items?: Array<{ name: string }>;
  };
}

function getFirstItemName(obj: DataWithItems): string | undefined {
  return obj.data?.items?.[0]?.name;
}

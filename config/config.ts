interface Config {
  apiBaseUrl: string;
  hashTrigger: string;
}

export const config: Config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || "",
  hashTrigger: process.env.NEXT_PUBLIC_HASHCODE || "",
};

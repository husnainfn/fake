export interface PrizeOption {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
  highlightColor: string;
}

export interface RecentClaim {
  name: string;
  city: string;
  prize: string;
  timeAgo: string;
}

export interface TrollMeme {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  badge: string;
}

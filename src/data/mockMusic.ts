import album1 from "@/assets/album1.jpg";
import album2 from "@/assets/album2.jpg";
import album3 from "@/assets/album3.jpg";
import album4 from "@/assets/album4.jpg";
import album5 from "@/assets/album5.jpg";

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverArt: string;
  audioUrl?: string; // For future implementation
}

export const mockSongs: Song[] = [
  {
    id: "1",
    title: "Electric Dreams",
    artist: "Neon Waves",
    album: "Digital Horizons",
    duration: "3:42",
    coverArt: album1,
  },
  {
    id: "2",
    title: "Midnight Drive",
    artist: "The Retro Band",
    album: "Vintage Vibes",
    duration: "4:15",
    coverArt: album2,
  },
  {
    id: "3",
    title: "Smooth Operator",
    artist: "Jazz Collective",
    album: "Late Night Sessions",
    duration: "5:28",
    coverArt: album3,
  },
  {
    id: "4",
    title: "Street Chronicles",
    artist: "Urban Flow",
    album: "City Stories",
    duration: "3:56",
    coverArt: album4,
  },
  {
    id: "5",
    title: "Starlight Serenade",
    artist: "Luna Pop",
    album: "Dreamy Nights",
    duration: "3:33",
    coverArt: album5,
  },
  {
    id: "6",
    title: "Cosmic Journey",
    artist: "Neon Waves",
    album: "Digital Horizons",
    duration: "4:01",
    coverArt: album1,
  },
  {
    id: "7",
    title: "Vinyl Memories",
    artist: "The Retro Band",
    album: "Vintage Vibes", 
    duration: "3:47",
    coverArt: album2,
  },
  {
    id: "8",
    title: "Blue Note",
    artist: "Jazz Collective",
    album: "Late Night Sessions",
    duration: "6:12",
    coverArt: album3,
  },
];
import { useState, useMemo } from "react";
import { SongCard } from "@/components/SongCard";
import { AudioPlayer } from "@/components/AudioPlayer";
import { SearchBar } from "@/components/SearchBar";
import { mockSongs, Song } from "@/data/mockMusic";
import { Music } from "lucide-react";

const Index = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter songs based on search query
  const filteredSongs = useMemo(() => {
    if (!searchQuery.trim()) return mockSongs;
    
    return mockSongs.filter(song =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handlePlay = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    const index = mockSongs.findIndex(s => s.id === song.id);
    setCurrentIndex(index);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handlePlayerPlay = () => {
    setIsPlaying(true);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % mockSongs.length;
    setCurrentIndex(nextIndex);
    setCurrentSong(mockSongs[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? mockSongs.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setCurrentSong(mockSongs[prevIndex]);
    setIsPlaying(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Spotify Clone</h1>
            </div>
            <div className="flex-1 max-w-md mx-8">
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredSongs.length} songs
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {searchQuery ? `Search results for "${searchQuery}"` : "Your Music Library"}
          </h2>
          <p className="text-muted-foreground">
            {searchQuery 
              ? `Found ${filteredSongs.length} songs matching your search`
              : "Discover and play your favorite tracks"
            }
          </p>
        </div>

        {/* Songs Grid */}
        <div className="space-y-2">
          {filteredSongs.length === 0 ? (
            <div className="text-center py-12">
              <Music className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No songs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or browse all available music.
              </p>
            </div>
          ) : (
            filteredSongs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                isPlaying={isPlaying && currentSong?.id === song.id}
                onPlay={handlePlay}
                onPause={handlePause}
              />
            ))
          )}
        </div>
      </main>

      {/* Audio Player */}
      <AudioPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlay={handlePlayerPlay}
        onPause={handlePause}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
};

export default Index;

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { Song } from "@/data/mockMusic";

interface SongCardProps {
  song: Song;
  isPlaying?: boolean;
  onPlay: (song: Song) => void;
  onPause: () => void;
}

export const SongCard = ({ song, isPlaying, onPlay, onPause }: SongCardProps) => {
  return (
    <Card className="group hover:bg-secondary/50 transition-all duration-300 cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={song.coverArt}
              alt={`${song.album} cover`}
              className="w-16 h-16 rounded-md object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 rounded-md flex items-center justify-center">
              <Button
                variant="player"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75"
                onClick={(e) => {
                  e.stopPropagation();
                  isPlaying ? onPause() : onPlay(song);
                }}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">
              {song.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {song.artist}
            </p>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {song.duration}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
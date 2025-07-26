import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Song } from "@/data/mockMusic";

interface AudioPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const AudioPlayer = ({ 
  currentSong, 
  isPlaying, 
  onPlay, 
  onPause, 
  onNext, 
  onPrevious 
}: AudioPlayerProps) => {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState("0:00");
  const audioRef = useRef<HTMLAudioElement>(null);

  // Mock progress simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentSong) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            onNext();
            return 0;
          }
          return newProgress;
        });
        
        // Mock time update
        const minutes = Math.floor(progress * 0.05);
        const seconds = Math.floor((progress * 0.05 - minutes) * 60);
        setCurrentTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong, progress, onNext]);

  if (!currentSong) {
    return null;
  }

  const handleProgressChange = (value: number[]) => {
    setProgress(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  return (
    <Card className="fixed bottom-0 left-0 right-0 bg-player-background border-t border-border">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          {/* Current Song Info */}
          <div className="flex items-center space-x-4 flex-1">
            <img
              src={currentSong.coverArt}
              alt={`${currentSong.album} cover`}
              className="w-14 h-14 rounded-md object-cover"
            />
            <div className="min-w-0">
              <h4 className="font-semibold text-foreground truncate max-w-32">
                {currentSong.title}
              </h4>
              <p className="text-sm text-muted-foreground truncate max-w-32">
                {currentSong.artist}
              </p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center space-y-2 flex-1">
            <div className="flex items-center space-x-4">
              <Button
                variant="playerSecondary"
                size="icon"
                onClick={onPrevious}
                className="w-8 h-8"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button
                variant="player"
                size="icon"
                onClick={isPlaying ? onPause : onPlay}
                className="w-10 h-10"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              
              <Button
                variant="playerSecondary"
                size="icon"
                onClick={onNext}
                className="w-8 h-8"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Progress Bar */}
            <div className="flex items-center space-x-2 w-full max-w-md">
              <span className="text-xs text-muted-foreground min-w-[40px]">
                {currentTime}
              </span>
              <Slider
                value={[progress]}
                onValueChange={handleProgressChange}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground min-w-[40px]">
                {currentSong.duration}
              </span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-2 flex-1 justify-end">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="w-24"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
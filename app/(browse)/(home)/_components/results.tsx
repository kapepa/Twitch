import { getStreams } from "@/service/feed-service";
import { FC } from "react";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { Skeleton } from "@/components/ui/skeleton";

const Results: FC = async () => {
  const streams = await getStreams()
  
  return (
    <div>
      <h2
        className="text-lg font-semibold mb-4"
      >
         Streams we think you&aposll like
      </h2>
      {
        (!(!!streams && streams.length > 0)) && (
          <div
            className="text-muted-foreground text-sm"
          >
            No streams found.
          </div>
        )
      }
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
      >
        {streams.map((stream, index) => (
          <ResultCard
            key={`${stream.id}-${index}`}
            stream={stream}
          />

        ))}
      </div>
    </div>
  )
}

const ResultsSkeleton: FC = () => {
  const resultCardCell = Array(4).fill(null);
  
  return (
    <div>
      <Skeleton
        className="h-8 w-[290px] mp-4"
      />
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
      >
        {
          resultCardCell.map((_, index) => (
            <ResultCardSkeleton
              key={`ResultCardCell-${index}`}
            />
          ))
        }
      </div>
    </div>
  )
}

export { Results, ResultsSkeleton }
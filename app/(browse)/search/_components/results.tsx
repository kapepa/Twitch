import { getSearch } from "@/service/search-service";
import { FC } from "react";
import { ResulCard, ResulCardSkeleton } from "./result-card";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultsProps {
  term?: string, 
}

const Results: FC<ResultsProps> = async (props) => {
  const { term } = props;
  const streams = await getSearch(term);

  return (
    <div>
      <h2
        className="text-lg font-semibold mb-4"
      >
        Results for term {term}
      </h2>
      {
        streams?.length === 0 && (
          <p
            className="text-muted-foreground text-sm"
          >
            No results found. Try searching for something else.
          </p>
        )
      }
      <div
        className="flex flex-col gap-y-4"
      >
        {
          streams?.map((stream, index) => (
            <ResulCard
              key={`${stream.id}-${index}`}
              stream={stream}
            />
          ))
        }
      </div>
    </div>
  )
}

const ResultsSkeleton: FC = () => {
  const resulCardCell = Array(4).fill(null);

  return (
    <div>
      <Skeleton
        className="h-8 w-[290px] mb-4"
      />
      <div
        className="flex flex-col gap-y-4"
      >
        {
          resulCardCell.map((_, index) => (
            <ResulCardSkeleton
              key={`ResulCardSkeleton-${index}`}
            />
          ))
        }
      </div>
    </div>
  )
}

export { Results, ResultsSkeleton }
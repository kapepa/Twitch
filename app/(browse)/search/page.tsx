import { ROUTERS } from "@/emun/routers";
import { NextPage } from "next";
import { redirect } from "next/navigation";
import { Results, ResultsSkeleton } from "./_components/results";
import { Suspense } from "react";


interface SearchPageProps {
  searchParams: {
    term?: string, 
  }
}

const SearchPage: NextPage<SearchPageProps> = (props) => {
  const { searchParams } = props;

  if (!searchParams.term) redirect(ROUTERS.Home);

  return (
    <div
      className="h-full p-8 max-w-screen-2xl mx-auto"
    >
      <Suspense
        fallback={<ResultsSkeleton/>}
      >
        <Results
          term={searchParams.term}
        />
      </Suspense>
    </div>
  )
}

export default SearchPage;
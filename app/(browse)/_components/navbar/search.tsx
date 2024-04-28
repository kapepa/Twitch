"use client"

import { FC, FormEvent, useState } from "react";
import queryString from 'query-string';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTERS } from "@/emun/routers";

const Search: FC = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if( !value ) return;

    const url = queryString.stringifyUrl({
      url: ROUTERS.Search,
      query: { term: value }
    }, { skipNull: true });

    router.push(url);
  }

  const onClear = () => {
    setValue("")
    const url = queryString.stringifyUrl({
      url: ROUTERS.Home,
    })

    router.push(url)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full lg:w-[400px] flex items-center"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        type="text"
        name="search"
        className="rounded-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      {
        (!!value) && 
        <X 
          onClick={onClear} 
          className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
        />
      }
      <Button
        type="submit"
        size="sm"
        variant="secondary"
      >
        <SearchIcon
          className="h-5 w-5 text-muted-foreground"
        />
      </Button>
    </form>
  )
}

export { Search }
"use client";

import { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue !== "") submitSearch();
  }

  const submitSearch = () => {
    router.push("details/" + searchValue.toLowerCase());
  };
  /* Possible future improvement: figure out if it's a working endpoint before
  navigating to the page. If it's not, don't navigate anywhere, just show an alert. */

  /* Also... I should really turn this into a real search bar, 
  handling a complete list of the pokemon names */

  return (
    <div id="search-bar">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search..." onChange={(e) => setSearchValue(e.target.value)} />
        <button type="button" onClick={submitSearch}>
          🔎
        </button>
      </form>
    </div>
  );
}

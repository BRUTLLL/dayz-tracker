"use client";

import { Search } from "lucide-react";

export function SearchForm({ initial = "" }: { initial?: string }) {
  return <form className="search-form" action="/players" method="get">
    <Search size={22} aria-hidden="true"/>
    <input name="q" defaultValue={initial} maxLength={100} placeholder="Search a tracked player name or Steam ID" aria-label="Search tracked players"/>
    <button type="submit">SEARCH PLAYER <span>→</span></button>
  </form>;
}

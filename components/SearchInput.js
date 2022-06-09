import { useState } from "react";
import { useRouter } from "next/router";

const SearchInput = ({ route }) => {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");
  const searchSubmit = (e) => {
    e.preventDefault();
    if (searchValue) {
      router.push(`/${route}/find/${searchValue}?page=1`);
    }
  };
  return (
    <form
      onSubmit={searchSubmit}
      className="flex flex-col items-center py-20 max-w-3xl mx-auto px-4 md:px-0"
    >
      <div className="flex items-end gap-3 justify-center w-full ">
        <div className="flex-1 text-gray-400">
          <label className="block mb-1 font-medium text-lg md:text-2xl">
            Search Term:
          </label>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="py-1 md:py-2 px-3 w-full rounded-md bg-slate-700 outline-none text-gray-300"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 py-1 md:py-2 px-4 rounded-md"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchInput;

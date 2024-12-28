export default function SearchBar({handleSearchImage, searchWord, setSearchWord}) {
  const inputSearchWord = (ev) => {
    setSearchWord(ev.target.value);
  };

  return (
    <div>
      <form onSubmit={(ev) => handleSearchImage(ev, searchWord)}>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          onChange={inputSearchWord}
          value={searchWord}
        />
        <button>검색</button>
      </form>
    </div>
  );
}

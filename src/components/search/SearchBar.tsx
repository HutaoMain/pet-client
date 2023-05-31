import "./SearchBar.css";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  return (
    <div className="search-container">
      <Search className="search-icon" />
      <input className="search-input" type="text" placeholder="Search.." />
    </div>
  );
};

export default SearchBar;

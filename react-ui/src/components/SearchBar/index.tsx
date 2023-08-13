import './SearchBar.css'

interface Props {
    filter : string,
    setFilter: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = ({ filter, setFilter }: Props) => {
    return (
        <div className='search-bar-container'>
            <input className="search-input" value={filter} onChange={({ target }) => setFilter(target.value)} placeholder='Search...'/>
        </div>
    )
};

export default SearchBar;
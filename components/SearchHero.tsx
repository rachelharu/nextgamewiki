import AnimateText from './AnimateText';
import SearchBar from './SearchBar';

export default function SearchHero() {
    return (
        <div className="container has-text-centered">
            <div className="columns is-vcentered hero-margin">
                <div className="column">
                    <div className="wrapper">
                        <AnimateText 
                            text="game lookup" 
                            className="title is-2 animation" 
                            as="h1"
                        />
                        <h2 className="subtitle is-4 animationSecond">
                            find info about video games
                        </h2>
                    </div>
                    <div className="search-container">
                        <SearchBar variant="default" />
                        <div id="summary"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
import Image from "next/image";
import AnimateText from "./components/AnimateText";
import SearchBar from "./components/SearchBar";
// import styles from "./page.module.css";

export default function Home() {
  return (
    <section className="hero is-fullheight is-default is-bold">
      <div className="hero-head">
        <nav className="navbar">
          <div className="container" id="nav">
            <div className="navbar-brand">
                <a className="navbar-item" href="../">
                <Image 
                  id="logo"
                  src="/game-control.png"
                  alt="Logo"
                  width={0}
                  height={0}
                  style={{ width: 'auto', height: 'auto' }}
                />
                </a>
            </div>
          </div>
        </nav>
      </div>
      <div className="${styles.hero-body}">
        <div className="container has-text-centered">
          <div className="columns is-vcentered">
            <div className="column">
              <div className="wrapper">
              <AnimateText text="game lookup" 
                className="title is-2 animation" as="h1"/>
                <h2 className="subtitle is-4 animationSecond">
                  find info about video games
                </h2>
              </div>
              <div className="search-container">
                <SearchBar />
                <div id="summary"></div>
              </div>
              {/* <div className="column is-4by4 is-hidden">
                <figure className="image is-1by1">
                  <Image
                    src="https://picsum.photos/800/600/?random"
                    alt="Description"
                    width={100} height={100}
                  />
                </figure>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="hero-foot">
        <div className="container">
          <div className="tabs is-centered">
            <ul>
              <li>
                <a className="footer-tag" href="https://rawg.io/" target="_blank"
                  >powered by RAWG</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

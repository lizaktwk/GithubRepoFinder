import { useState } from "react";
import "./App.css";

function App() {
  const [language, setLanguage] = useState("none");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [repoData, setRepoData] = useState({
    repoName: "Choose a language to get started!",
    description: "",
    language: "No language selected",
    stars: 0,
    forks: 0,
    url: "",
  });

  async function fetchRepositories(language) {
    const apiUrl = `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&is:public`;
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(apiUrl, { method: "GET" });
      if (!response.ok) {
        setError(`Response status: ${response.status}`);
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      if (result.items.length === 0) {
        setRepoData({
          repoName: "No repositories found for this language.",
          description: "",
        });
        return;
      }

      let randomRepo = Math.floor(Math.random() * result.items.length);
      setRepoData({
        repoName: result.items[randomRepo].name,
        description: result.items[randomRepo].description,
        language: result.items[randomRepo].language,
        stars: result.items[randomRepo].stargazers_count,
        forks: result.items[randomRepo].forks,
        url: result.items[randomRepo].html_url,
      });
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen p-4 *:text-gray-500 text-md flex flex-col justify-center items-center gap-8">
      <header>
        <h1 className="text-4xl font-bold text-center leading-tight">
          Github Repository Finder
        </h1>
      </header>

      <main className="w-full max-w-2xl flex flex-col gap-4 justify-center items-center">
        {/* Language selection */}
        <div className="border border-gray-700 p-4 rounded w-full flex justify-between items-center">
          <label htmlFor="language" className="">
            Choose a programming language:
          </label>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              fetchRepositories(e.target.value);
            }}
            className="bg-gray-800 border border-gray-700 rounded p-2 text-gray-500 cursor-pointer"
          >
            <option value="none" disabled>
              Select Language
            </option>
            <option value="bash">Bash</option>
            <option value="cpp">C++</option>
            <option value="csharp">C#</option>
            <option value="css">CSS</option>
            <option value="go">Go</option>
            <option value="html">HTML</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
            <option value="kotlin">Kotlin</option>
            <option value="perl">Perl</option>
            <option value="php">PHP</option>
            <option value="python">Python</option>
            <option value="r">R</option>
            <option value="ruby">Ruby</option>
            <option value="rust">Rust</option>
            <option value="sql">SQL</option>
            <option value="scala">Scala</option>
            <option value="swift">Swift</option>
            <option value="typescript">TypeScript</option>
            <option value="errorDemo">ErrorDemo</option>
          </select>
        </div>

        {/* the Repo section */}
        {loading ? (
          // LOADING UI
          <div className="border border-gray-700 rounded w-full p-4 flex justify-center items-center">
            <p>Loading...</p>
          </div>
        ) : error ? (
          // ERROR UI
          <div className="border border-red-700 rounded w-full p-4">
            <h2 className="text-2xl font-semibold mb-4">Error</h2>
            <p>{error}</p>
          </div>
        ) : (
          // NORMAL/RESULT UI
          <div className="border border-gray-700 rounded w-full p-4">
            <h2 className="text-2xl font-semibold mb-4">{repoData.repoName}</h2>
            <section className="flex flex-col gap-4 active:border-gray-600">
              <p>{repoData.description}</p>
              <div className="flex justify-between">
                <section>{repoData.language}</section>
                <section>★ {repoData.stars}</section>
                <section>Ψ {repoData.forks}</section>
              </div>
              <button
                className="cursor-pointer bg-gray-700 rounded p-2 w-fit text-gray-300 self-center"
                onClick={() => window.open(repoData.url, "_blank")}
              >
                View on GitHub
              </button>
            </section>
          </div>
        )}

        {/* Refresh button */}
        <button
          className="border border-gray-950 rounded w-full py-4 bg-gray-950 text-gray-600 font-bold text-lg tracking-wide shadow cursor-pointer hover:border hover:border-gray-700 active:scale-98 transition-all duration-150"
          onClick={() => fetchRepositories(language)}
        >
          Refresh
        </button>
      </main>

      <footer>
        <p>Tailwind CSS, React and API call practice with Error handling</p>
      </footer>
    </div>
  );
}

export default App;

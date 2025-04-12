import { useEffect, useState } from 'react';
import { LoadProjects } from "../wailsjs/go/main/App";
import { Project } from "./components/Project";
import './App.css';

function App() {
    const [projects, setProjects] = useState([]);
    const [hideClientProjects, setHideClientProjects] = useState(true);

    useEffect(() => {
        LoadProjects().then(setProjects);

        if (typeof window.runtime !== "undefined") {
            document.body.onkeyup = (ev) => {
                switch (true) {
                    case ev.key === "r":
                        window.runtime.WindowReload();
                        break;

                    case ev.key === "h":
                        setHideClientProjects((state) => !state)
                        break;

                    default:
                        break;
                }
            };
        }
    }, [])

    const visibleProjects = projects.filter((project) => {
        if (hideClientProjects) {
            return project.Name.match(/anb|kinto|efarail/i) === null;
        }

        return true;
    });

    return (
        <>
            <header>
                <div className="header-content">Projects</div>
            </header>

            <div className="projects">
                {visibleProjects.map((project, index) => (
                    <Project project={project} delay={index * 40} key={index} id={index} />
                ))}
            </div>

            <footer></footer>
        </>
    )
}

export default App

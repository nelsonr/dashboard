import { useEffect, useRef, useState } from "react";
import { OpenProject } from "../../wailsjs/go/main/App";

export function Project(props) {
    const { project, delay, id } = props;
    const [isLoading, setIsLoading] = useState(true);
    const elemRef = useRef(null);
    const humanReadableDate = new Date(project.ModifiedDate).toDateString();

    useEffect(() => {
        if (elemRef.current && isLoading) {
            elemRef.current.onanimationend = function(ev) {
                if (isLoading) {
                    ev.currentTarget.onanimationend = null;
                    setIsLoading(false);
                }
            }
        }
    }, [])

    return (
        <div
            className={"project" + (isLoading ? " project--is-loading" : "")}
            style={{ "--delay": delay + "ms", "--mask-url": `url(#fill-mask-${id})` }}
            key={project.Name}
            ref={elemRef}
            onClick={() => OpenProject(project.Path)}
        >
            <div className="project__body">
                <div className="project__content">
                    <div className="project__title">{project.Name}</div>
                    <div className="project__type">{project.Type}</div>
                    <div className="project__last-modified">{humanReadableDate}</div>
                </div>

                <div className="project__content project--mask">
                    <div className="project__title">{project.Name}</div>
                    <div className="project__type">{project.Type}</div>
                    <div className="project__last-modified">{humanReadableDate}</div>
                </div>

                <div className="project__frame">
                    <svg className="project__frame-main" width="232" height="130" viewBox="0 0 232 130">
                        <defs>
                            {/* Glow effect */}
                            <filter id="glow">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="blur" />
                                <feFlood floodColor="#FFB254" result="color" />
                                <feComposite in="color" in2="blur" operator="in" result="glow" />
                            </filter>

                            <mask id={`fill-mask-${id}`}>
                                <rect width="160%" height="100%" fill="white" x="0" y="0"></rect>
                            </mask>
                        </defs>

                        {/* Outline */}
                        <path
                            d="M205.846 1H1V103.739L26.1542 129H231V26.2609L205.846 1Z"
                            stroke="#FFB254"
                            strokeWidth="1"
                            strokeMiterlimit="1"
                            strokeLinejoin="round"
                        />

                        {/* Glow stroke */}
                        <path
                            d="M205.846 1H1V103.739L26.1542 129H231V26.2609L205.846 1Z"
                            filter="url(#glow)"
                            fill="none"
                            stroke="#FFB254"
                            strokeWidth="2"
                            strokeMiterlimit="1"
                            strokeLinejoin="round"
                        />

                        {/* Animated fill */}
                        <path
                            d="M205.846 1H1V103.739L26.1542 129H231V26.2609L205.846 1Z"
                            fill="#FFB254"
                            mask={`url(#fill-mask-${id})`}
                        />
                    </svg>

                    <svg className="project__frame-triangle top-right" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 16.8476L1.21928 1H17V16.8476Z" stroke="#FFB254" strokeWidth="2" strokeMiterlimit="1" strokeLinejoin="round" />
                    </svg>

                    <svg className="project__frame-triangle bottom-left" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.7807 16.8476H1V1L16.7807 16.8476Z" stroke="#FFB254" strokeWidth="2" strokeMiterlimit="1" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

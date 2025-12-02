import React, { useState, useEffect } from 'react';
import ProjectsHeader from './components/ProjectsHeader';
import Footer from './components/Footer';
import './styles/global.css';
import './styles/mobile.css';
import './styles/ProjectsPage.css';

const ProjectsPage = () => {
  const [projects, setProjects] = useState({
    allProjects: [],
    otherProjects: [],
    legacyProjects: [],
  });

  useEffect(() => {
    fetch('https://kmads.dev/kmadsdev/projects.json')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error loading projects:', error));
  }, []);

  return (
    <div className="App">
      <ProjectsHeader />

      <main className="projects-page-main">
        {/* All Projects */}
        <section className="projects-section">
          <div className="projects-page-container">
            <h2 className="section-title">🗂️ All Projects</h2>
            <div className="projects-table-wrapper">
              <table className="projects-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Website</th>
                    <th>Source Code</th>
                    <th>Stack</th>
                    <th>Cloud/Host</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.allProjects.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.project}</td>
                      <td>
                        {row.website ? (
                          <a href={row.website} target="_blank" rel="noopener noreferrer">
                            {row.website}
                          </a>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td>
                        {Array.isArray(row.source) && row.source.length > 0 ? (
                          row.source.map((src, i) => (
                            <span key={src.href}>
                              <a href={src.href} target="_blank" rel="noopener noreferrer">
                                {src.label}
                              </a>
                              {i < row.source.length - 1 && ' | '}
                            </span>
                          ))
                        ) : (
                          '—'
                        )}
                      </td>
                      <td>{row.stack}</td>
                      <td>{row.cloud ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Other Projects */}
        <section className="projects-section">
          <div className="projects-page-container">
            <h2 className="section-title">📂 Other Projects</h2>
            <div className="projects-table-wrapper">
              <table className="projects-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Website</th>
                    <th>Source Code</th>
                    <th>Stack</th>
                    <th>Cloud/Host</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.otherProjects.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.project}</td>
                      <td>
                        {row.website ? (
                          <a href={row.website} target="_blank" rel="noopener noreferrer">
                            {row.website}
                          </a>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td>
                        {Array.isArray(row.source) && row.source.length > 0 ? (
                          row.source.map((src, i) => (
                            <span key={src.href}>
                              <a href={src.href} target="_blank" rel="noopener noreferrer">
                                {src.label}
                              </a>
                              {i < row.source.length - 1 && ' | '}
                            </span>
                          ))
                        ) : (
                          '—'
                        )}
                      </td>
                      <td>{row.stack}</td>
                      <td>{row.cloud ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Legacy Projects */}
        <section className="projects-section">
          <div className="projects-page-container">
            <h2 className="section-title">📀 Legacy Projects</h2>
            <div className="projects-table-wrapper">
              <table className="projects-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Description</th>
                    <th>Stack</th>
                    <th>Cloud/Host</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.legacyProjects.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.project}</td>
                      <td>
                        {row.extraLinks ? (
                          <>
                            <a href={row.extraLinks[0].href} target="_blank" rel="noopener noreferrer">
                              {row.extraLinks[0].label}
                            </a>{' '}
                            |{' '}
                            <a href={row.extraLinks[1].href} target="_blank" rel="noopener noreferrer">
                              {row.extraLinks[1].label}
                            </a>
                          </>
                        ) : (
                          row.description
                        )}
                      </td>
                      <td>{row.stack}</td>
                      <td>{row.cloud ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;

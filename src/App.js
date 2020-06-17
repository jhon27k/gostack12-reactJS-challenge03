import React from "react";
import api from './services/api'

import "./styles.css";
import { useState, useEffect } from "react";

function App() {

  const [repositories, setRepositories] = useState([])
  const [i, setI] = useState(0)

  useEffect(() => {
    const response = api.get('/repositories')
      .then(response => {
        setRepositories(response.data)
      })
  }, [])

  async function handleAddRepository() {
    // TODO
    setI(i + 1)

    const response = await api.post('/repositories', {
      title: `repositório ${i}`,
      url: "https://github.com/jhon27k/gostack12-desafio03",
      techs: ["Node", "PHP", "React", "React Native"]
    })

    let repo = response.data
    setRepositories([...repositories, repo])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)
    if (response.status === 204) {
      const repo = repositories.filter(repository => repository.id !== id);
      setRepositories([...repo]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo =>
          <li key={repo.id}>{repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
          </button>
          </li>

        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div >
  );
}

export default App;

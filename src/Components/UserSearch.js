import {useEffect, useState} from 'react';

function UserSearch() {
    const [githubData, setGithubData] = useState([])
    const [userRepos, setUserRepos] = useState([])
    const [githubUser, setGithubUser] = useState("k-v-n-p")

    useEffect(() => {
        fetchData()
      }, [])

      const fetchData = () => {
        return fetch(`https://api.github.com/users/${githubUser}`)
          .then((response) => response.json())
          .then((data) => setGithubData(data));
      }
      const fetchRepos = () => {
        return fetch(`https://api.github.com/users/${githubUser}/repos`)
          .then((response) => response.json())
          .then((data) => setUserRepos(data.reduce((acc, cur) => {
            return acc.concat([[cur.name,cur.id]]);
                    }, [])));
      }

      //styles
      const tableStyle = {
        border: '1px solid black',
        borderCollapse: 'collapse',
        textAlign: 'center',
        width: '100%'
    }
    
    const tdStyle = {
          border: '1px solid #85C1E9',
        background: 'white',
        padding: '5px'
    };
    
    const thStyle = {
          border: '1px solid #3498DB',
        background: '#3498DB',
          color: 'white',
        padding: '5px'
    };

    return (
      <div >
        
        <input type="text" placeholder="Search for User" onChange={(e) => setGithubUser(e.target.value)} className="input_search" />
        <button onClick={fetchData} className="search_button">Search Github</button>
        <div>
            <img src={githubData.avatar_url} height="100" width="100" />
            <p>{githubData.name}</p>
        </div>
        <div>
        <button onClick={fetchRepos} className="search_button">Search Repos</button>
         
        {userRepos[0]}
        <table style={tableStyle}>
          <tbody>
            <tr>
              {/* <th style={thStyle}>Id</th> */}
              <th style={thStyle}>Name</th>
            </tr>
            {userRepos.map(([name,idw]) => (
              <tr key={idw}>
                {/* <td style={tdStyle}>{idw}</td> */}
                <td style={tdStyle}>{name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        </div>

      </div>
    );
  }
  
export default UserSearch;
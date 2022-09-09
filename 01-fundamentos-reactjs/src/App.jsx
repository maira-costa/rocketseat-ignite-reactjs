import { Header } from './components/Header';
import {Post} from './components/Post';
import { Sidebar } from './components/Sidebar';

import './global.css';

import styles from './App.module.css';


const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://avatars.githubusercontent.com/u/81943846?v=4',
      name: 'Maíra Costa',
      role: 'Web Dev'
    },
    content: [
      {
        type: 'paragraph', 
        content:'Fala galeraa 👋',
      },
      {
        type: 'paragraph', 
        content:'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      {
        type: 'link', 
        content:'jane.design/doctorcare',
      }      
    ],
    publishedAt: new Date('2022-09-03 20:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://avatars.githubusercontent.com/u/84477307?v=4',
      name: 'Mylena Azevedo',
      role: 'Web Dev'
    },
    content: [
      {
        type: 'paragraph', 
        content:'Fala galeraa 👋',
      },
      {
        type: 'paragraph', 
        content:'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      {
        type: 'link', 
        content:'jane.design/doctorcare',
      }      
    ],
    publishedAt: new Date('2022-09-08 20:00:00'),
  },
]

export function App() {

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post 
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}


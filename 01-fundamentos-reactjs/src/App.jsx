import { Header } from './components/Header';
import {Post} from './Post';
import { Sidebar } from './components/Sidebar';

import './global.css';

import styles from './App.module.css';

export function App() {

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post 
            author="Maíra Costa" 
            content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, velit? Repudiandae maxime illum possimus eligendi blanditiis, suscipit adipisci explicabo repellendus dolore velit. Eos rerum voluptas optio, fugit consequuntur reprehenderit maxime!" 
          />
          <Post 
            author="Mylena Azevedo" 
            content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, velit? Repudiandae maxime illum possimus eligendi blanditiis, suscipit adipisci explicabo repellendus dolore velit. Eos rerum voluptas optio, fugit consequuntur reprehenderit maxime!" 
          />
        </main>
      </div>
    </div>
  )
}


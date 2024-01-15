import './App.css';
import routes from './router'
import {Route, Routes} from 'react-router-dom'
import MenuLayout from "./components/MenuLayout";

function App() {
  return (
    <Routes>
      {routes.map(({component: Component, layout: Layout, path, name, isFullPage}) => {
        return (
          <Route
            key={name}
            path={path}
            element={
              <MenuLayout>
                <Component/>
              </MenuLayout>
            }
          />
        )
      })}
    </Routes>
  )
}

export default App;

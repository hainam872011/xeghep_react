import Home from '../components/Home'
import List from '../components/List'
import History from '../components/History'
import DetailAgency from '../components/Detail'
import MenuLayout from "../components/MenuLayout";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    exact: true,
    layout: MenuLayout
  },
  {
    path: '/list',
    name: 'List',
    component: List,
    exact: true,
    layout: MenuLayout
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    exact: true,
    layout: MenuLayout
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: DetailAgency,
    exact: true,
    layout: MenuLayout
  }
]

export default routes

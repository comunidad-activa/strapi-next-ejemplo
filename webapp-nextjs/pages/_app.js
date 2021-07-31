import '../styles/globals.css'
import App from "next/app"
import { createContext } from "react"
import { Layout, Menu, Breadcrumb } from 'antd';
export const GlobalContext = createContext({})



const { Header, Content, Footer } = Layout;



function MyApp({ Component, pageProps }) {

  const { categories } = pageProps

  return <Layout className="layout">
            <Header>
              <div className="logo" />
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                {
                  categories
                  ? categories.map((elem, index) => {return <Menu.Item key={index}>{`${elem.name}`}</Menu.Item>})
                  : <div>cargando....</div>
                }
              </Menu>
            </Header>
            <Component {...pageProps} />
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
         </Layout> 
}


MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi
  const res = await fetch('http://localhost:1337/categories')
  const categories = await res.json()
  // Pass the data to our page via props
  return { ...appProps, pageProps: { categories } }
}

export default MyApp

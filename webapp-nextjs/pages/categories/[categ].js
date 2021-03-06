import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { Layout, Menu, Breadcrumb } from 'antd';
import { Card, Col, Row } from 'antd';

const { Content } = Layout;


function Category(props) {
  const router = useRouter()
  const {articles} = props
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content style={{ padding: '0 50px' }}>
          <div className="site-card-wrapper">
            {
              articles
              ? articles.map((elem, index) => {
                  const data =
                  <div>
                  <h1>{elem.name}</h1>
                  <Row gutter={16}>
                    {
                      elem.articles.map((article, artIndex) => {
                        const imgSrc = `http://localhost:1337${article.image.url}`
                        return <Col span={8}>
                                <Card
                                  title={article.title}
                                  bordered={false}
                                  hoverable
                                  style={{ width: 240 }}
                                  cover={<img alt="example" src={imgSrc} />}
                                >
                                 {article.description}
                                </Card>
                              </Col>
                      })
                    }
                  </Row>
                  </div>
                  return data
                })
              : <div>cargando....</div>
            }
          </div>
      </Content>
    </div>
  )
}

Category.getInitialProps = async ({ query: { categ } }) => {
  const res = await fetch(`http://localhost:1337/categories/${categ}`)
  const articles = await res.json()
  return { articles: articles,}
}

export default Category
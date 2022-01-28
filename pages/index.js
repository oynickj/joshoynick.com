import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { useTheme } from 'next-themes'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {

  const {theme, setTheme} = useTheme()
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi! I'm Josh. You can e-mail me at oynickj@gmail.com, or find me on <a href="https://www.twitter.com/oynickj">Twitter</a> and <a href="https://www.instagram.com/oynickj">Instagram</a>.
        </p>
        <p>I built this site using <a href="https://nextjs.org/learn/basics/create-nextjs-app">NextJS</a> and <a href="https://vercel.com/">Vercel</a>.</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        
       {/*<h2 className={utilStyles.headingLg}>Blog</h2>*/}
       
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
import Head from 'next/head'

function HeadCustom({ title, desc }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
export default HeadCustom
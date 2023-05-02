import Head from "next/head";

export default function MyHead(props) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{props.title}</title>
      <link rel="icon" type="image/icon" href="imgs/favicon.ico" />
    </Head>
  );
}

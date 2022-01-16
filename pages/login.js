import { getProviders, signIn } from "next-auth/react"
import Head from "next/head"

// destructuring the props and getting providers
function Login({ providers }) {
    return (
        <div className="flex flex-col justify-center items-center w-full bg-black min-h-screen">
            <Head>
                <title>Spotify Clone</title>
                <link rel="icon" href="/favicon.ico" />

                {/* for post picture */}
                <meta property="og:title" content="" />
                <meta property="og:type" content="" />
                <meta name="image" property="og:image" content="https://links.papareact.com/9xl" />
                <meta name="twitter:card" content="summary_large_image" />

                <meta property="og:description" content="" />
                <meta name="twitter:image:alt" content="" />
            </Head>
            {/* min-h-screen >>> is important otherwise it will stick to top only, with min-h-screen it will take entire screen */}

            {/* items-center do horizontal access; 
                justify-center do vertical access
            */}

            <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="" />

            {/* it will map over the provider which we have put in the list in [...nextauth].js */}
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    {/* callbackUrl >> after login redirect to home url*/}
                    <button onClick={() => signIn(provider.id, { callbackUrl: "/" })} className="bg-[#18D860] text-white p-5 rounded-lg">Login with {provider.name}</button>
                </div>
            ))}

        </div>
    )
}

export default Login

// server side rendering
// function run on the server everytime 
export async function getServerSideProps() {
    // "getProviders()" will get response from pages/api/auth line:38
    const providers = await getProviders()

    // returning the provider which we get from from pages/api/auth line:38 to above Login function as a props
    return {
        props: {
            providers
        }
    }
}
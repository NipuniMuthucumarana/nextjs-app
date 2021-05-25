
import Link from 'next/link';


const Home = () => (
  <>
    <Link href= "/api/login">
      <a><button>login</button></a>
      </Link>
      <Link href= "/api/logout">
      <a><button>logout</button></a>
    </Link>
  </>
)

export default Home

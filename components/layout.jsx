import Link from 'next/link'

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h1>Zesty.ai Test Client</h1>
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/search">
                <a>Search</a>
              </Link>
            </li>
            <li>
              <Link href="/visual-search">
                <a>Visual Search</a>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

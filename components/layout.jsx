import Link from 'next/link'
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
} from 'react-bootstrap'

export default class Layout extends React.Component {
  render() {
    return (
      <Container>
        <Row className="my-5">
          <Col>
            <h1>Zesty.ai Test Client</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="p-3 bg-light">
              <Nav activeKey={`/`} className="flex-column">
                <Nav.Item>
                  <Link href="/" passHref>
                    <Nav.Link>
                      Home
                    </Nav.Link>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link href="/search" passHref>
                    <Nav.Link>
                      Search
                    </Nav.Link>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link href="/visual-search" passHref>
                    <Nav.Link>
                      Visual Search
                    </Nav.Link>
                  </Link>
                </Nav.Item>
              </Nav>
            </div>
          </Col>
          <Col md="9">
            {this.props.children}
          </Col>
        </Row>
      </Container>
    )
  }
}

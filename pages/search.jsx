import api from 'components/api'
import Layout from 'components/layout'
import PropertyImg from 'components/propertyImg'
import Link from 'next/link'
import {
  Form,
  Row,
  Col,
  Button,
  Alert,
  Table,
} from 'react-bootstrap'

const DEFAULT_RADIUS = 10000

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMsg: null,
      searchInputLongitude: '26.8849731',
      searchInputLatitude: '-80.0782213',
      searchInputRadius: `${DEFAULT_RADIUS}`,
      searchResults: null,
    }

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.handleSearchLongitudeChange = this.handleSearchLongitudeChange.bind(this)
    this.handleSearchLatitudeChange = this.handleSearchLatitudeChange.bind(this)
    this.handleSearchRadiusChange = this.handleSearchRadiusChange.bind(this)
  }

  handleSearchSubmit(e) {
    e.preventDefault()

    let {
      searchInputLatitude: latStr,
      searchInputLongitude: lonStr,
      searchInputRadius: radiusStr,
    } = this.state

    let [lat, lon] = [latStr, lonStr].map(parseFloat)
    let radius = parseInt(radiusStr)

    if([lat, lon].map(isNaN).indexOf(true) > -1) return this.setState({
      errorMsg: 'Please use valid coordinates.'
    })

    if(isNaN(radius) || radius < 0 || radiusStr.match(/\D+/)) return this.setState({
      errorMsg: 'Please use a valid radius.'
    })

    api.post('/find', {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lon, lat]
      },
      "x-distance": radius,
    }).then(result => {
      this.setState({
        searchResults: result.data
      })
    }).catch(e => {
      this.setState({
        errorMsg: 'There was an error.'
      })
      debugger
    })
  }

  handleSearchLongitudeChange(e) {
    this.setState({
      errorMsg: null,
      searchInputLongitude: e.target.value
    })
  }

  handleSearchLatitudeChange(e) {
    this.setState({
      errorMsg: null,
      searchInputLatitude: e.target.value
    })
  }

  handleSearchRadiusChange(e) {
    this.setState({
      errorMsg: null,
      searchInputRadius: e.target.value
    })
  }

  render() {
    let {
      errorMsg,
      searchResults
    } = this.state

    let alertEl = errorMsg ? (
      <Alert variant="danger" className="mb-3">{errorMsg}</Alert>
    ) : null

    let renderResults = () => {
      if (!searchResults) return null

      let rows = searchResults.map(result => {
        let {
          propertyId,
          coordinates
        } = result

        let [
          latitude,
          longitude,
        ] = coordinates

        return (
          <tr key={propertyId}>
            <td>
              <Link
                href="/detail/[id]"
                as={`/detail/${propertyId}?lon=${longitude}&lat=${latitude}`}
              >
                <a>
                  <PropertyImg
                    style={{width: '10em'}}
                    propertyId={propertyId}
                  />
                </a>
              </Link>
            </td>
            <td>
              {longitude}
            </td>
            <td>
              {latitude}
            </td>
          </tr>
        )
      })

      let tableEl = (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>Longitude</th>
              <th>Latitude</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      )

      return (
        <div>
          <h3>Results:</h3>
          <p>{searchResults.length} results.</p>
          {searchResults.length ? tableEl : null}
        </div>
      )
    }

    return (
      <Layout>
        <h2>Search Properties</h2>
        {alertEl}
        <Form onSubmit={this.handleSearchSubmit} className="my-3">
          <Form.Group controlId="longitude">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="text"
              value={this.state.searchInputLongitude}
              onChange={this.handleSearchLongitudeChange}
            />
          </Form.Group>

          <Form.Group controlId="latitude">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="text"
              value={this.state.searchInputLatitude}
              onChange={this.handleSearchLatitudeChange}
            />
          </Form.Group>

          <Form.Group controlId="radius">
            <Form.Label>Radius</Form.Label>
            <Form.Control
              type="text"
              value={this.state.searchInputRadius}
              onChange={this.handleSearchRadiusChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
        {renderResults()}
      </Layout>
    )
  }
}

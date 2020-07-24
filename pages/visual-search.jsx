import api from 'components/api'
import Layout from 'components/layout'


const DEFAULT_RADIUS = 10000

export default class VisualSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchLatitude: null,
      searchLongitude: null,
      searchResults: null,
      errorMsg: null,
    }

    this.didClickUseMyLocation = this.didClickUseMyLocation.bind(this)
  }

  didClickUseMyLocation(e) {
    e.preventDefault()
    navigator.geolocation.getCurrentPosition((position) => {
      let {
        latitude: lon,
        longitude: lat
      } = position.coords

      api.post('/find', {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lon, lat].map(parseFloat)
        },
        "x-distance": 10000,
      }).then(result => {
        debugger
        // this.setState({
        //   searchResults: result.data
        // })
      }).catch(e => {
        this.setState({
          errorMsg: 'There was an error.'
        })
      })
    })
  }

  render() {
    return (
      <Layout>
        <h2>Visual Search</h2>
        <a href="#" onClick={this.didClickUseMyLocation}>Use my location</a>
      </Layout>
    )
  }
}

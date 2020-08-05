import React from 'react'
import { withRouter } from 'next/router'
import api from 'components/api'
import Layout from 'components/layout'
import PropertyImg from 'components/propertyImg'

export default withRouter(class Detail extends React.Component {
  static getInitialProps(context) {
    let { query } = context
    return api.get(`/statistics/${query.id}?distance=10000`).then(result => {
      return Promise.resolve({
        statistics: result.data
      })
    })
  }

  render() {
    let {
      statistics,
      router
    } = this.props

    let {
      id: propertyId,
      lat: latitude,
      lon: longitude
    } = router.query

    let statsEls = Object.keys(statistics).map((key, ix) => {
      let value = statistics[key]
      return (
        <>
          <dt>{key}</dt>
          <dd>{value}</dd>
        </>
      )
    })

    return (
      <Layout>
        <h2>Details</h2>
        <div>
          <p>
            <PropertyImg propertyId={propertyId} className="w-100" />
          </p>
          <dl>
            <dt>Latitude</dt>
            <dd>{latitude}</dd>
            <dt>Longitude</dt>
            <dd>{longitude}</dd>
            {statsEls}
          </dl>
        </div>
      </Layout>
    )
  }
})

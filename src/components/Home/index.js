// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {
    teamCardData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamCardDetails()
  }

  getTeamCardDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const fetchedData = await response.json()
    console.log(fetchedData)
    const updatedData = fetchedData.teams.map(eachTeamCard => ({
      id: eachTeamCard.id,
      name: eachTeamCard.name,
      teamImageUrl: eachTeamCard.team_image_url,
    }))
    this.setState({teamCardData: updatedData, isLoading: false})
  }

  renderTeamsList = () => {
    const {teamCardData} = this.state
    return (
      <ul className="team-card-list">
        {teamCardData.map(eachCard => (
          <TeamCard key={eachCard.id} teamCard={eachCard} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="app-container">
        <div className="ipl-dashboard-teams-container">
          <div className="ipl-dashboard-header-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              className="ipl-logo"
              alt="ipl logo"
            />
            <h1 className="ipl-heading"> IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamsList()}
        </div>
      </div>
    )
  }
}

export default Home

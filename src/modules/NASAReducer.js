export const GET_LATEST_HUBBLE = 'GET_LATEST_HUBBLE'
export const GET_DAILY_NASA = 'GET_DAILY_NASA'

const latestHubbleDefault = {
  name:
    'Astronomers Release Most Complete Ultraviolet-Light Survey of Nearby Galaxies',
  url: 'http://hubblesite.org/news_release/news/2018-27',
  publication: '2018-05-17T13:00:00.000-04:00',
  abstract:
    'Much of the light in the universe comes from stars, and yet, star formation is still a vexing question in astronomy.\r\n\r\nTo piece together a more complete picture of star birth, astronomers have used the Hubble Space Telescope to look at star formation among galaxies in our own cosmic back yard. The survey of 50 galaxies in the local universe, called the Legacy ExtraGalactic UV Survey (LEGUS), is the sharpest, most comprehensive ultraviolet-light look at nearby star-forming galaxies.\r\n\r\nThe LEGUS survey combines new Hubble observations with archival Hubble images for star-forming spiral and dwarf galaxies, offering a valuable resource for understanding the complexities of star formation and galaxy evolution. Astronomers are releasing the star catalogs for each of the LEGUS galaxies and cluster catalogs for 30 of the galaxies, as well as images of the galaxies themselves. The catalogs provide detailed information on young, massive stars and star clusters, and how their environment affects their development.\r\n\r\nThe local universe, stretching across the gulf of space between us and the great Virgo cluster of galaxies, is ideal for study because astronomers can amass a big enough sample of galaxies, and yet, the galaxies are close enough to Earth that Hubble can resolve individual stars. The survey will also help astronomers understand galaxies in the distant universe, where rapid star formation took place.\r\n',
  credits:
    '<a href="http://www.nasa.gov">NASA</a>, <a href="http://www.spacetelescope.org">ESA</a>, and D. Calzetti (University of Massachusetts) and the LEGUS team',
  keystone_image_1x:
    'https://media.stsci.edu/uploads/story/thumbnail/1228/low_STSCI-H-p1827a-t-400x400.png'
}

const dailyNASADefault = {
  title: 'Countryside Mars and Milky Way',
  date: '2018-06-09',
  explanation:
    "Mars shines brightly now in planet Earth's sky. Seen with a yellowish hue it rises over the hills and far away in this serene night skyscape, a countryside panorama recorded last month from Parque Nacional de Cabaneros in Spain. The Milky Way too extends above the distant hills into a starry sky. Its faint pinkish nebulae, cosmic rifts and rivers of dust are mingled with the pale, diffuse glow of starlight. Mimicking Mars' yellow tint, bright star Antares shines to the right of the central Milky Way starclouds. Of course, CubeSats from Earth are on their way to the Red Planet.",
  hdurl: 'https://apod.nasa.gov/apod/image/1806/ViaLacteaconMarte_c0.jpg',
  url: 'https://apod.nasa.gov/apod/image/1806/ViaLacteaconMarte_c01024.jpg',
  copyright: 'Jose Luis Hernandez Verdejo'
}

function fetchLatestHubble() {
  return fetch(
    'https://3few4kmu3i.execute-api.us-east-1.amazonaws.com/dev/api/nasa/daily-hubble'
  )
}

function fetchDailyNASA() {
  return fetch(
    'https://3few4kmu3i.execute-api.us-east-1.amazonaws.com/dev/api/nasa/daily-nasa'
  )
}

function latestHubble(data) {
  data.publication = String(new Date(data.publication))
  return {
    type: GET_LATEST_HUBBLE,
    latestHubble: {
      name: data.name,
      date: data.publication,
      image: data.keystone_image_1x,
      textContent: data.abstract,
      popoverText: 'Latest Hubble Publication',
      credits: data.credits,
      url: data.url
    }
  }
}

function dailyNASA(data) {
  return {
    type: GET_DAILY_NASA,
    dailyNASA: {
      title: data.title,
      date: data.date,
      image: data.hdurl || data.url,
      textContent: data.explanation,
      mediaType: data.media_type,
      popoverText: "NASA's Daily Image",
      copyright: data.copyright,
      url: data.url
    }
  }
}

export function getLatestHubble() {
  return function(dispatch) {
    return (
      fetchLatestHubble()
        .then(response => response.json())
        .then(json => dispatch(latestHubble(json.body))),
      error => dispatch(latestHubble(latestHubbleDefault))
    )
  }
}

export function getDailyNASA() {
  return function(dispatch) {
    return (
      fetchDailyNASA()
        .then(response => response.json())
        .then(json => dispatch(dailyNASA(json))),
      error => dispatch(dailyNASA(dailyNASADefault))
    )
  }
}

const initialState = {
  latestHubble: undefined,
  dailyNASA: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LATEST_HUBBLE:
      return Object.assign({}, state, {
        latestHubble: action.latestHubble
      })
    case GET_DAILY_NASA:
      return Object.assign({}, state, {
        dailyNASA: action.dailyNASA
      })
    default:
      return state
  }
}

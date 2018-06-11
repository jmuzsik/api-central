import { findDeep } from "../utilities"

export const GET_WHAT_WOULD_MICAH_SAY = "GET_WHAT_WOULD_MICAH_SAY"
export const GET_RANDOM_OBJECT = "GET_RANDOM_OBJECT"
export const GET_ROBOT_ROTHKO = "GET_ROBOT_ROTHKO"
export const GET_RANDOM_VIDEO = "GET_RANDOM_VIDEO"

const whatWouldMicahSayDefault = {
  micah: {
    says: "I want a Claes Oldenburg sandwich.",
  },
}
const randomObjectDefault = {
  object: {
    images: [
      {
        b: {
          url:
            "https://images.collection.cooperhewitt.org/332901_7f749d3c62533930_b.jpg",
        },
      },
    ],
    url: "https://collection.cooperhewitt.org/objects/1158789277/",
    date: "1971",
    description:
      "Rectangular ligher with plated metal body and black-colored gridded grips at front and back; ignition rotates out of the contour of the lighter casing horizontally.",
    title: "Mactron F1 Cigarette Lighter, 1971",
    "woe:country_name": "Madagascar",
  },
}
const robotRothkoDefault = {
  rothko: {
    background: {
      colour: "#c0bfb5",
    },
    palette: [
      {
        colour: "#fcf1d4",
      },
      {
        colour: "#cdb071",
      },
      {
        colour: "#b7b6a5",
      },
    ],
  },
}
const randomVideoDefault = {
  video: {
    formats: {
      mp4: {
        "720_subtitled":
          "https://videos.collection.cooperhewitt.org/DIGVID0244_720_s.mp4",
      },
    },
    description:
      "Making of Time Capsule and the placement of the Time Capsule in the Arctic",
    youtube_url: "www.youtube.com/watch?v=bg5ICAuMaDk",
  },
}

function fetchRandomObject() {
  return fetch("/api/cooper-hewitt/random-object")
}
function fetchWhatWouldMicahSay() {
  return fetch("/api/cooper-hewitt/what-would-micah-say")
}
function fetchRobotRothko() {
  return fetch("/api/cooper-hewitt/robot-rothko")
}
function fetchRandomVideo() {
  return fetch("/api/cooper-hewitt/random-video")
}

function randomObject(data) {
  return {
    type: GET_RANDOM_OBJECT,
    randomObject: {
      image: findDeep(
        data,
        ["object", "images", 0, "b", "url"],
        "https://uh8yh30l48rpize52xh0q1o6i-wpengine.netdna-ssl.com/wp-content/uploads/2014/04/ch-front1-e1456853352822.jpg"
      ),
      url: data.object.url || "https://www.cooperhewitt.org",
      date: data.object.date,
      description: data.object.description,
      title: data.object.title || "Cooper Hewitt",
      country: data.object["woe:country_name"],
    },
  }
}
function whatWouldMicahSay(data) {
  return {
    type: GET_WHAT_WOULD_MICAH_SAY,
    whatWouldMicahSay: {
      micahSays: data.micah.says,
    },
  }
}
function robotRothko(data) {
  return {
    type: GET_ROBOT_ROTHKO,
    robotRothko: {
      background: findDeep(data, ["rothko", "background", "colour"], "#c0bfb5"),
      palette1: findDeep(data, ["rothko", "palette", 0, "colour"], "#fcf1d4"),
      palette2: findDeep(data, ["rothko", "palette", 1, "colour"], "#cdb071"),
      palette3: findDeep(data, ["rothko", "palette", 2, "colour"], "#b7b6a5"),
    },
  }
}
function randomVideo(data) {
  console.log(
    findDeep(
      data,
      ["video", "formats", "mp4", "720_subtitled"],
      "https://videos.collection.cooperhewitt.org/DIGVID0244_720_s.mp4"
    )
  )
  return {
    type: GET_RANDOM_VIDEO,
    randomVideo: {
      video: findDeep(
        data,
        ["video", "formats", "mp4", "720_subtitled"],
        "https://videos.collection.cooperhewitt.org/DIGVID0244_720_s.mp4"
      ),
      description: data.video.description,
      youtube: data.video.youtube_url,
    },
  }
}

export function getRandomObject() {
  return function(dispatch) {
    return (
      // fetchRandomObject()
      //   .then(response => response.json())
      //   .then(json => dispatch(randomObject(json))),
      // error => 
      dispatch(randomObject(randomObjectDefault))
    )
  }
}
export function getWhatWouldMicahSay() {
  return function(dispatch) {
    return (
      // fetchWhatWouldMicahSay()
      //   .then(response => response.json())
      //   .then(json => dispatch(whatWouldMicahSay(json))),
      // error => 
      dispatch(whatWouldMicahSay(whatWouldMicahSayDefault))
    )
  }
}
export function getRobotRothko() {
  return function(dispatch) {
    return (
      fetchRobotRothko()
        .then(response => response.json())
        .then(json => dispatch(robotRothko(json))),
      error => dispatch(robotRothko(robotRothkoDefault))
    )
  }
}
export function getRandomVideo() {
  return function(dispatch) {
    return (
      // fetchRandomVideo()
      //   .then(response => response.json())
      //   .then(json => dispatch(randomVideo(json))),
      // error => 
      dispatch(randomVideo(randomVideoDefault))
    )
  }
}

const initialState = {
  randomObject: undefined,
  randomVideo: undefined,
  robotRothko: undefined,
  whatWouldMicahSay: undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WHAT_WOULD_MICAH_SAY:
      return Object.assign({}, state, {
        whatWouldMicahSay: action.whatWouldMicahSay,
      })
    case GET_RANDOM_OBJECT:
      return Object.assign({}, state, {
        randomObject: action.randomObject,
      })
    case GET_RANDOM_VIDEO:
      return Object.assign({}, state, {
        randomVideo: action.randomVideo,
      })
    case GET_ROBOT_ROTHKO:
      return Object.assign({}, state, {
        robotRothko: action.robotRothko,
      })
    default:
      return state
  }
}

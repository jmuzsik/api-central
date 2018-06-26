import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

export default function Footer(obj) {
  const { type, footerContent } = obj
  let returnJSX
  switch (type) {
    case 'daily nasa': {
      let copyright
      if (footerContent.copyright) {
        copyright = (
          <Typography component="p">
            Intellectual property of <strong>${footerContent.copyright}</strong>
          </Typography>
        )
      } else {
        copyright = ''
      }
      returnJSX = (
        <React.Fragment>
          {copyright}
          <a rel="noopener noreferrer" href={footerContent.url} target="_blank">
            <Button size="small" color="default">
              Learn More
            </Button>
          </a>
        </React.Fragment>
      )
      break
    }
    case 'latest hubble': {
      returnJSX = (
        <React.Fragment>
          <Typography
            component="p"
            dangerouslySetInnerHTML={{ __html: footerContent.credits }}
          />
          <a rel="noopener noreferrer" href={footerContent.url} target="_blank">
            <Button size="small" color="default">
              Learn More
            </Button>
          </a>
        </React.Fragment>
      )
      break
    }
    default:
      return returnJSX
  }
  return returnJSX
}

import {Fragment} from 'react'
import {Link} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
const ListItem = (props: {value: string; title: string | undefined; propertyName: string}) => {
  let template;

  switch (props.propertyName){
    case 'website_url':
      template = <p>
        <b>{props.title}: </b>
        <Tooltip placement={'right'} title={'Visit beer company page'}>
          <Link href={props.value} target={'_blank'}>{props.value}</Link>
        </Tooltip>
      </p>
      break
    case 'phone':
      template = <p>
        <b>{props.title}: </b>
        <Tooltip placement={'right'} title={'Call to beer company'}>
          <Link href={'tel:' + props.value} target={'_blank'}>{props.value}</Link>
        </Tooltip>
      </p>
      break
    default:
      template = <p>
        <b>{props.title}: </b> {props.value}
      </p>
  }


  return (
    <Fragment>
      {template}
    </Fragment>
  )
}

export default ListItem

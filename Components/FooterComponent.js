import { Facebook, GitHub, Twitter } from '@material-ui/icons';
import theme from '../src/theme';
function FooterComponent() {
  return (
    <div style = {{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", position: 'absolute', bottom: '0', width: '100%'}}>
      <div style = {{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: '25%', padding: '1%'}}>
        <Facebook color="primary"/>
        <Twitter color="primary"/>
        <GitHub color="primary"/>
      </div>
     
    </div>
  )
}

export default FooterComponent

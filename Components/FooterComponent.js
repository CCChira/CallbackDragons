import { Facebook, GitHub, Twitter } from '@material-ui/icons';

function FooterComponent() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '0',
        width: '100%',
        height: '53px'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '25%',
          padding: '1%',
        }}
      >
        <Facebook color='primary' />
        <Twitter color='primary' />
        <GitHub color='primary' />
      </div>
    </div>
  );
}

export default FooterComponent;
